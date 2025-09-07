import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard), canActivate: [AuthGuard] },
  { path: 'products', loadComponent: () => import('./products/products').then(m => m.Products), canActivate: [AuthGuard] },
  { path: 'sales', loadComponent: () => import('./sales/sales').then(m => m.Sales), canActivate: [AuthGuard] },
  { path: 'inventory', loadComponent: () => import('./inventory/inventory').then(m => m.Inventory), canActivate: [AuthGuard] },
  { path: 'customers', loadComponent: () => import('./customers/customers').then(m => m.Customers), canActivate: [AuthGuard] },
  { path: 'reports', loadComponent: () => import('./reports/reports').then(m => m.Reports), canActivate: [AuthGuard] },
  { path: 'suppliers', loadComponent: () => import('./suppliers/suppliers').then(m => m.Suppliers), canActivate: [AuthGuard] },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
  { path: '**', redirectTo: '/dashboard' }
];
