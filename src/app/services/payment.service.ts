import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface PaymentRequest {
  amount: number;
  method: string;
  orderId: string;
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface PaymentResponse {
  success: boolean;
  transactionId: string;
  status: 'pending' | 'completed' | 'failed';
  paymentUrl?: string;
  qrCode?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly API_URL = 'http://localhost:3000/api/payments'; // TODO: Move to environment

  constructor(private http: HttpClient) {}

  // GoPay Integration
  processGoPayPayment(request: PaymentRequest): Observable<PaymentResponse> {
    // Mock implementation - replace with actual GoPay API
    return this.mockPaymentProcessing(request, 'gopay');
  }

  // OVO Integration
  processOvoPayment(request: PaymentRequest): Observable<PaymentResponse> {
    // Mock implementation - replace with actual OVO API
    return this.mockPaymentProcessing(request, 'ovo');
  }

  // BCA Virtual Account
  processBcaPayment(request: PaymentRequest): Observable<PaymentResponse> {
    // Mock implementation - replace with actual BCA API
    return this.mockPaymentProcessing(request, 'bca');
  }

  // Generic payment processing
  processPayment(request: PaymentRequest): Observable<PaymentResponse> {
    switch (request.method) {
      case 'gopay':
        return this.processGoPayPayment(request);
      case 'ovo':
        return this.processOvoPayment(request);
      case 'bca':
        return this.processBcaPayment(request);
      case 'cash':
        return this.processCashPayment(request);
      default:
        return this.mockPaymentProcessing(request, request.method);
    }
  }

  // Cash payment (no external processing needed)
  private processCashPayment(request: PaymentRequest): Observable<PaymentResponse> {
    const response: PaymentResponse = {
      success: true,
      transactionId: `CASH-${Date.now()}`,
      status: 'completed'
    };
    return of(response).pipe(delay(500)); // Simulate processing time
  }

  // Mock payment processing for demonstration
  private mockPaymentProcessing(request: PaymentRequest, method: string): Observable<PaymentResponse> {
    // Simulate API call
    const mockResponse: PaymentResponse = {
      success: Math.random() > 0.1, // 90% success rate
      transactionId: `${method.toUpperCase()}-${Date.now()}`,
      status: 'completed',
      paymentUrl: method !== 'cash' ? `https://payment.example.com/${method}/${request.orderId}` : undefined,
      qrCode: method === 'gopay' || method === 'ovo' ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' : undefined
    };

    return of(mockResponse).pipe(delay(2000)); // Simulate network delay
  }

  // Check payment status
  checkPaymentStatus(transactionId: string): Observable<PaymentResponse> {
    // Mock status check
    const mockResponse: PaymentResponse = {
      success: true,
      transactionId,
      status: 'completed'
    };
    return of(mockResponse).pipe(delay(1000));
  }

  // Refund payment
  refundPayment(transactionId: string, amount: number): Observable<PaymentResponse> {
    // Mock refund
    const mockResponse: PaymentResponse = {
      success: true,
      transactionId: `REFUND-${transactionId}`,
      status: 'completed'
    };
    return of(mockResponse).pipe(delay(1500));
  }
}