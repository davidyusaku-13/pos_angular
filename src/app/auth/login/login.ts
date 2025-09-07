import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CardModule,
    MessageModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const credentials = this.loginForm.value;
      console.log('Attempting login with:', credentials.email);

      try {
        console.log('Calling auth service login...');
        const user = await this.authService.login(credentials);
        console.log('Login successful, user:', user);
        console.log('Navigating to dashboard...');
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        console.error('Login error:', error);
        // Show more specific error messages
        if (error.message?.includes('Invalid login credentials')) {
          this.errorMessage = 'Invalid email or password';
        } else if (error.message?.includes('Email not confirmed')) {
          this.errorMessage = 'Please check your email and confirm your account';
        } else if (error.message?.includes('Too many requests')) {
          this.errorMessage = 'Too many login attempts. Please try again later';
        } else {
          this.errorMessage = error.message || 'Login failed. Please try again';
        }
        this.loading = false;
      }
    } else {
      console.log('Form is invalid:', this.loginForm.errors);
      this.errorMessage = 'Please fill in all required fields correctly';
    }
  }
}
