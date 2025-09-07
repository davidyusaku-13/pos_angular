export interface Product {
  id: number;
  name: string;
  description?: string;
  sku: string;
  barcode?: string;
  categoryId: number;
  price: number;
  cost: number;
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel?: number;
  unit: string; // e.g., 'pcs', 'kg', 'liter'
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  parentId?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}