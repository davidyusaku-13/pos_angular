export interface Sale {
  id: number;
  saleNumber: string; // Unique sale identifier
  cashierId: number;
  customerId?: number;
  totalAmount: number;
  discountAmount: number;
  taxAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  saleDate: Date;
  notes?: string;
  items: SaleItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleItem {
  id: number;
  saleId: number;
  productId: number;
  productName: string; // Snapshot for historical data
  quantity: number;
  unitPrice: number;
  discount: number;
  totalPrice: number;
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  DIGITAL_WALLET = 'digital_wallet',
  BANK_TRANSFER = 'bank_transfer'
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export interface Customer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  loyaltyPoints: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}