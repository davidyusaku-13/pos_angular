import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../models';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, RouterModule, MenubarModule, ButtonModule, TooltipModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit, OnDestroy {
  showMobileMenu = false;
  isAuthenticated = false;
  currentUser: User | null = null;
  isDarkMode = false;
  private authSubscription: Subscription = new Subscription();
  private themeSubscription: Subscription = new Subscription();

  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'pi pi-home',
      routerLink: '/dashboard'
    },
    {
      label: 'Products',
      icon: 'pi pi-box',
      routerLink: '/products'
    },
    {
      label: 'Sales',
      icon: 'pi pi-shopping-cart',
      routerLink: '/sales'
    },
    {
      label: 'Reports',
      icon: 'pi pi-chart-line',
      routerLink: '/reports'
    },
    {
      label: 'Customers',
      icon: 'pi pi-users',
      routerLink: '/customers'
    },
    {
      label: 'Inventory',
      icon: 'pi pi-list',
      routerLink: '/inventory'
    },
    {
      label: 'Suppliers',
      icon: 'pi pi-truck',
      routerLink: '/suppliers'
    }
  ];

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to authentication state changes
    this.authSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isAuthenticated = !!user;
    });

    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.themeSubscription.unsubscribe();
  }

  toggleMobileMenu(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getUserDisplayName(): string {
    if (!this.currentUser) return 'User';

    if (this.currentUser.firstName && this.currentUser.lastName) {
      return `${this.currentUser.firstName} ${this.currentUser.lastName}`;
    }

    if (this.currentUser.email) {
      return this.currentUser.email.split('@')[0];
    }

    return 'User';
  }
}
