import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  // Generic CRUD operations
  async select(table: string, columns: string = '*', filters?: any) {
    let query = this.supabase.from(table).select(columns);

    if (filters) {
      Object.keys(filters).forEach(key => {
        query = query.eq(key, filters[key]);
      });
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  }

  async insert(table: string, data: any) {
    const { data: result, error } = await this.supabase
      .from(table)
      .insert(data)
      .select();

    if (error) throw error;
    return result;
  }

  async update(table: string, data: any, filters: any) {
    let query = this.supabase.from(table).update(data);

    Object.keys(filters).forEach(key => {
      query = query.eq(key, filters[key]);
    });

    const { data: result, error } = await query.select();
    if (error) throw error;
    return result;
  }

  async delete(table: string, filters: any) {
    let query = this.supabase.from(table).delete();

    Object.keys(filters).forEach(key => {
      query = query.eq(key, filters[key]);
    });

    const { error } = await query;
    if (error) throw error;
  }
}