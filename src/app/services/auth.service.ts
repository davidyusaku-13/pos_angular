import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private supabaseService: SupabaseService) {
    // Check for existing session on app start
    this.checkExistingSession();
  }

  private async checkExistingSession(): Promise<void> {
    try {
      const { data: { session } } = await this.supabaseService.client.auth.getSession();
      if (session?.user) {
        // Get user profile from database
        const { data: profile } = await this.supabaseService.client
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          this.currentUserSubject.next(profile);
        }
      }
    } catch (error) {
      console.error('Error checking existing session:', error);
    }
  }

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const { data, error } = await this.supabaseService.client.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password
      });

      if (error) throw error;

      if (data.user) {
        // Get user profile from database
        let { data: profile, error: profileError } = await this.supabaseService.client
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        // If user profile doesn't exist, create it automatically
        if (profileError && profileError.code === 'PGRST116') {
          console.log('User profile not found, creating automatically...');
          const { data: newProfile, error: createError } = await this.supabaseService.client
            .from('users')
            .insert([{
              id: data.user.id,
              email: data.user.email,
              full_name: data.user.user_metadata?.['full_name'] || data.user.email?.split('@')[0] || 'User',
              role: 'admin', // First user gets admin role
              is_active: true
            }])
            .select()
            .single();

          if (createError) throw createError;
          profile = newProfile;
        } else if (profileError) {
          throw profileError;
        }

        this.currentUserSubject.next(profile);
        return profile;
      }

      throw new Error('Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      const { error } = await this.supabaseService.client.auth.signOut();
      if (error) throw error;

      this.currentUserSubject.next(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  async register(userData: { email: string; password: string; fullName: string }): Promise<User> {
    try {
      const { data, error } = await this.supabaseService.client.auth.signUp({
        email: userData.email,
        password: userData.password
      });

      if (error) throw error;

      if (data.user) {
        // Create user profile in database
        const { data: profile, error: profileError } = await this.supabaseService.client
          .from('users')
          .insert([{
            id: data.user.id,
            email: userData.email,
            full_name: userData.fullName,
            role: 'cashier',
            is_active: true
          }])
          .select()
          .single();

        if (profileError) throw profileError;

        this.currentUserSubject.next(profile);
        return profile;
      }

      throw new Error('Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }
}