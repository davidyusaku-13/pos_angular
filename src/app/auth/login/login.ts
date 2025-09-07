import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
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
export class Login implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  errorMessage = '';
  isDarkMode = false;
  private themeSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const credentials = this.loginForm.value;

      try {
        await this.authService.login(credentials);
        this.router.navigate(['/dashboard']);
      } catch (error: any) {
        console.error('Login error:', error);
        // Show more specific error messages
        if (error.message?.includes('Invalid login credentials')) {
          this.errorMessage = 'Invalid email or password. Please check your credentials.';
        } else if (error.message?.includes('Email not confirmed')) {
          this.errorMessage = 'Please check your email and confirm your account first.';
        } else if (error.message?.includes('Too many requests')) {
          this.errorMessage = 'Too many login attempts. Please wait a moment and try again.';
        } else {
          this.errorMessage = error.message || 'Login failed. Please try again.';
        }
        this.loading = false;
      }
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
    }
  }
}
