import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, MenubarModule, ButtonModule],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
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
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
