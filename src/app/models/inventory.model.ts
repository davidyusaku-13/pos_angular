export interface InventoryTransaction {
  id: number;
  productId: number;
  transactionType: InventoryTransactionType;
  quantity: number;
  previousStock: number;
  newStock: number;
  referenceId?: number; // Sale ID, Purchase Order ID, etc.
  referenceType?: string;
  notes?: string;
  performedBy: number; // User ID
  transactionDate: Date;
  createdAt: Date;
}

export enum InventoryTransactionType {
  SALE = 'sale',
  PURCHASE = 'purchase',
  ADJUSTMENT = 'adjustment',
  RETURN = 'return',
  TRANSFER = 'transfer'
}

export interface StockAlert {
  id: number;
  productId: number;
  alertType: StockAlertType;
  threshold: number;
  currentStock: number;
  isActive: boolean;
  createdAt: Date;
  lastTriggered?: Date;
}

export enum StockAlertType {
  LOW_STOCK = 'low_stock',
  OUT_OF_STOCK = 'out_of_stock',
  OVER_STOCK = 'over_stock'
}

export interface Supplier {
  id: number;
  name: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  address?: string;
  paymentTerms?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseOrder {
  id: number;
  supplierId: number;
  orderNumber: string;
  status: PurchaseOrderStatus;
  totalAmount: number;
  expectedDeliveryDate?: Date;
  actualDeliveryDate?: Date;
  items: PurchaseOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PurchaseOrderItem {
  id: number;
  purchaseOrderId: number;
  productId: number;
  quantity: number;
  unitCost: number;
  totalCost: number;
  receivedQuantity: number;
}

export enum PurchaseOrderStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  PARTIALLY_RECEIVED = 'partially_received',
  RECEIVED = 'received',
  CANCELLED = 'cancelled'
}