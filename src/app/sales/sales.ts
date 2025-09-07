import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductService } from '../services/product.service';
import { PaymentService } from '../services/payment.service';
import { Product, SaleItem, PaymentMethod } from '../models';

@Component({
  selector: 'app-sales',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    DialogModule,
    SelectModule,
    InputNumberModule
  ],
  templateUrl: './sales.html',
  styleUrl: './sales.css'
})
export class Sales implements OnInit {
  products: Product[] = [];
  cart: SaleItem[] = [];
  searchTerm = '';
  showCheckoutDialog = false;
  selectedPaymentMethod: PaymentMethod = PaymentMethod.CASH;
  paymentMethods = [
    { label: 'Cash', value: PaymentMethod.CASH },
    { label: 'Card', value: PaymentMethod.CARD },
    { label: 'Digital Wallet', value: PaymentMethod.DIGITAL_WALLET }
  ];

  constructor(
    private productService: ProductService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      const response = await this.productService.getProducts(1, 100, this.searchTerm);
      this.products = response.products;
    } catch (error) {
      this.products = this.getMockProducts();
    }
  }

  onSearch(): void {
    this.loadProducts();
  }

  addToCart(product: Product): void {
    const existingItem = this.cart.find(item => item.productId === product.id);
    if (existingItem) {
      existingItem.quantity++;
      existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
    } else {
      const newItem: SaleItem = {
        id: 0, // Will be set by backend
        saleId: 0,
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unitPrice: product.price,
        discount: 0,
        totalPrice: product.price
      };
      this.cart.push(newItem);
    }
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }

  updateQuantity(item: SaleItem, quantity: number | null): void {
    if (!quantity || quantity <= 0) {
      this.removeFromCart(this.cart.indexOf(item));
      return;
    }
    item.quantity = quantity;
    item.totalPrice = item.quantity * item.unitPrice - item.discount;
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  checkout(): void {
    if (this.cart.length === 0) return;

    const paymentRequest = {
      amount: this.getTotal(),
      method: this.selectedPaymentMethod,
      orderId: `ORDER-${Date.now()}`,
      customerInfo: {
        name: 'Walk-in Customer',
        email: '',
        phone: ''
      }
    };

    this.paymentService.processPayment(paymentRequest).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Checkout:', {
            items: this.cart,
            total: this.getTotal(),
            paymentMethod: this.selectedPaymentMethod,
            transactionId: response.transactionId
          });

          // Clear cart and show success
          this.cart = [];
          this.showCheckoutDialog = false;
          alert(`Sale completed successfully!\nTransaction ID: ${response.transactionId}`);

          // If payment requires additional action (like QR code)
          if (response.qrCode) {
            alert('Please scan the QR code to complete payment.');
          }
        } else {
          alert('Payment failed. Please try again.');
        }
      },
      error: (error) => {
        console.error('Payment error:', error);
        alert('Payment processing failed. Please try again.');
      }
    });
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
