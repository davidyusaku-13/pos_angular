import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ProductService } from '../services/product.service';
import { Product } from '../models';

@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule
  ],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: Product[] = [];
  loading = false;
  searchTerm = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.loading = true;
    try {
      const response = await this.productService.getProducts(1, 50, this.searchTerm || undefined);
      this.products = response.products;
    } catch (error) {
      // For now, use mock data
      this.products = this.getMockProducts();
    } finally {
      this.loading = false;
    }
  }

  onSearch(): void {
    this.loadProducts();
  }

  private getMockProducts(): Product[] {
    return [
      {
        id: 1,
        name: 'Beras Premium 5kg',
        description: 'Beras berkualitas tinggi',
        sku: 'BR001',
        barcode: '1234567890123',
        categoryId: 1,
        price: 75000,
        cost: 65000,
        stockQuantity: 100,
        minStockLevel: 10,
        maxStockLevel: 200,
        unit: 'pcs',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Minyak Goreng 2L',
        description: 'Minyak goreng kemasan',
        sku: 'MG001',
        barcode: '1234567890124',
        categoryId: 2,
        price: 25000,
        cost: 22000,
        stockQuantity: 50,
        minStockLevel: 5,
        maxStockLevel: 100,
        unit: 'pcs',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }
}
