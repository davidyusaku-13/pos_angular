import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Product, Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private supabaseService: SupabaseService) {}

  // Product CRUD
  async getProducts(page = 1, limit = 20, search?: string): Promise<{ products: Product[]; total: number }> {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = this.supabaseService.client
      .from('products')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`name.ilike.%${search}%,sku.ilike.%${search}%`);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      products: data || [],
      total: count || 0
    };
  }

  async getProduct(id: number): Promise<Product> {
    const { data, error } = await this.supabaseService.client
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const { data, error } = await this.supabaseService.client
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const { data, error } = await this.supabaseService.client
      .from('products')
      .update(product)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteProduct(id: number): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  // Category CRUD
  async getCategories(): Promise<Category[]> {
    const { data, error } = await this.supabaseService.client
      .from('categories')
      .select('*')
      .order('name');

    if (error) throw error;
    return data || [];
  }

  async createCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Promise<Category> {
    const { data, error } = await this.supabaseService.client
      .from('categories')
      .insert([category])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateCategory(id: number, category: Partial<Category>): Promise<Category> {
    const { data, error } = await this.supabaseService.client
      .from('categories')
      .update(category)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteCategory(id: number): Promise<void> {
    const { error } = await this.supabaseService.client
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}