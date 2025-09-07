import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit, OnDestroy {

  totalProducts = 0;
  totalCustomers = 0;
  lowStockCount = 0;
  isDarkMode = false;
  private themeSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private productService: ProductService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();

    // Subscribe to theme changes
    this.themeSubscription = this.themeService.currentTheme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  async loadDashboardData(): Promise<void> {
    try {
      // Load products count
      const productsResponse = await this.productService.getProducts(1, 1000);
      this.totalProducts = productsResponse.total;

      // Count low stock items
      this.lowStockCount = productsResponse.products.filter(p => p.stockQuantity <= p.minStockLevel).length;

      // TODO: Load customers count when customer service is implemented
      this.totalCustomers = 0;
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
