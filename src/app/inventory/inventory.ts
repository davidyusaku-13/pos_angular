import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ProductService } from '../services/product.service';
import { Product, InventoryTransaction, InventoryTransactionType } from '../models';

@Component({
  selector: 'app-inventory',
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    CardModule,
    TagModule
  ],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory implements OnInit {
  products: Product[] = [];
  transactions: InventoryTransaction[] = [];
  lowStockAlerts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadInventoryData();
  }

  async loadInventoryData(): Promise<void> {
    try {
      const response = await this.productService.getProducts(1, 100);
      this.products = response.products;
    } catch (error) {
      this.products = this.getMockProducts();
    }

    this.checkLowStockAlerts();
    // Mock transactions for now
    this.transactions = this.getMockTransactions();
  }

  checkLowStockAlerts(): void {
    this.lowStockAlerts = this.products.filter(
      product => product.stockQuantity <= product.minStockLevel
    );
  }

  getStockStatus(product: Product): string {
    if (product.stockQuantity <= product.minStockLevel) {
      return 'low';
    } else if (product.maxStockLevel && product.stockQuantity >= product.maxStockLevel) {
      return 'high';
    }
    return 'normal';
  }

  getStockStatusSeverity(status: string): string {
    switch (status) {
      case 'low': return 'danger';
      case 'high': return 'warning';
      default: return 'success';
    }
  }

  private getMockProducts(): Product[] {
    return [
      {
        id: 1,
        name: 'Beras Premium 5kg',
        sku: 'BR001',
        stockQuantity: 5, // Low stock
        minStockLevel: 10,
        maxStockLevel: 200,
        unit: 'pcs',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Product,
      {
        id: 2,
        name: 'Minyak Goreng 2L',
        sku: 'MG001',
        stockQuantity: 60, // Normal
        minStockLevel: 5,
        maxStockLevel: 100,
        unit: 'pcs',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      } as Product
    ];
  }

  private getMockTransactions(): InventoryTransaction[] {
    return [
      {
        id: 1,
        productId: 1,
        transactionType: InventoryTransactionType.SALE,
        quantity: -2,
        previousStock: 7,
        newStock: 5,
        referenceId: 123,
        referenceType: 'sale',
        notes: 'Sale transaction',
        performedBy: 1,
        transactionDate: new Date('2024-09-08'),
        createdAt: new Date('2024-09-08')
      },
      {
        id: 2,
        productId: 2,
        transactionType: InventoryTransactionType.PURCHASE,
        quantity: 20,
        previousStock: 40,
        newStock: 60,
        referenceId: 456,
        referenceType: 'purchase_order',
        notes: 'Restock',
        performedBy: 1,
        transactionDate: new Date('2024-09-07'),
        createdAt: new Date('2024-09-07')
      }
    ];
  }
}
