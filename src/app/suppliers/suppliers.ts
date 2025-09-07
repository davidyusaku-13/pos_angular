import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { ConfirmationService } from 'primeng/api';
import { Supplier, PurchaseOrder, PurchaseOrderStatus } from '../models';

@Component({
  selector: 'app-suppliers',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    CardModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ConfirmDialogModule,
    TagModule
  ],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.css',
  providers: [ConfirmationService]
})
export class Suppliers implements OnInit {
  suppliers: Supplier[] = [];
  purchaseOrders: PurchaseOrder[] = [];
  supplierForm: FormGroup;
  purchaseOrderForm: FormGroup;
  showSupplierDialog = false;
  showPurchaseOrderDialog = false;
  isEditingSupplier = false;
  isEditingPurchaseOrder = false;
  selectedSupplier: Supplier | null = null;
  selectedPurchaseOrder: PurchaseOrder | null = null;

  purchaseOrderStatuses = [
    { label: 'Draft', value: PurchaseOrderStatus.DRAFT },
    { label: 'Sent', value: PurchaseOrderStatus.SENT },
    { label: 'Partially Received', value: PurchaseOrderStatus.PARTIALLY_RECEIVED },
    { label: 'Received', value: PurchaseOrderStatus.RECEIVED },
    { label: 'Cancelled', value: PurchaseOrderStatus.CANCELLED }
  ];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      contactPerson: [''],
      email: ['', [Validators.email]],
      phone: [''],
      address: [''],
      paymentTerms: ['']
    });

    this.purchaseOrderForm = this.fb.group({
      supplierId: ['', Validators.required],
      totalAmount: [0, [Validators.min(0)]],
      expectedDeliveryDate: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
    this.loadPurchaseOrders();
  }

  loadSuppliers(): void {
    // Mock data
    this.suppliers = this.getMockSuppliers();
  }

  loadPurchaseOrders(): void {
    // Mock data
    this.purchaseOrders = this.getMockPurchaseOrders();
  }

  openNewSupplierDialog(): void {
    this.isEditingSupplier = false;
    this.selectedSupplier = null;
    this.supplierForm.reset();
    this.showSupplierDialog = true;
  }

  openEditSupplierDialog(supplier: Supplier): void {
    this.isEditingSupplier = true;
    this.selectedSupplier = supplier;
    this.supplierForm.patchValue({
      name: supplier.name,
      contactPerson: supplier.contactPerson || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      address: supplier.address || '',
      paymentTerms: supplier.paymentTerms || ''
    });
    this.showSupplierDialog = true;
  }

  saveSupplier(): void {
    if (this.supplierForm.valid) {
      const formValue = this.supplierForm.value;

      if (this.isEditingSupplier && this.selectedSupplier) {
        const index = this.suppliers.findIndex(s => s.id === this.selectedSupplier!.id);
        if (index !== -1) {
          this.suppliers[index] = {
            ...this.selectedSupplier,
            ...formValue,
            updatedAt: new Date()
          };
        }
      } else {
        const newSupplier: Supplier = {
          id: Math.max(...this.suppliers.map(s => s.id)) + 1,
          ...formValue,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.suppliers.push(newSupplier);
      }

      this.showSupplierDialog = false;
      this.supplierForm.reset();
    }
  }

  deleteSupplier(supplier: Supplier): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${supplier.name}?`,
      header: 'Delete Supplier',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.suppliers = this.suppliers.filter(s => s.id !== supplier.id);
      }
    });
  }

  openNewPurchaseOrderDialog(): void {
    this.isEditingPurchaseOrder = false;
    this.selectedPurchaseOrder = null;
    this.purchaseOrderForm.reset({ totalAmount: 0 });
    this.showPurchaseOrderDialog = true;
  }

  savePurchaseOrder(): void {
    if (this.purchaseOrderForm.valid) {
      const formValue = this.purchaseOrderForm.value;

      if (this.isEditingPurchaseOrder && this.selectedPurchaseOrder) {
        const index = this.purchaseOrders.findIndex(po => po.id === this.selectedPurchaseOrder!.id);
        if (index !== -1) {
          this.purchaseOrders[index] = {
            ...this.selectedPurchaseOrder,
            ...formValue,
            updatedAt: new Date()
          };
        }
      } else {
        const newPurchaseOrder: PurchaseOrder = {
          id: Math.max(...this.purchaseOrders.map(po => po.id)) + 1,
          ...formValue,
          orderNumber: `PO-${Date.now()}`,
          status: PurchaseOrderStatus.DRAFT,
          items: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.purchaseOrders.push(newPurchaseOrder);
      }

      this.showPurchaseOrderDialog = false;
      this.purchaseOrderForm.reset({ totalAmount: 0 });
    }
  }

  getSupplierName(supplierId: number): string {
    const supplier = this.suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : 'Unknown';
  }

  getStatusSeverity(status: PurchaseOrderStatus): string {
    switch (status) {
      case PurchaseOrderStatus.DRAFT: return 'info';
      case PurchaseOrderStatus.SENT: return 'warning';
      case PurchaseOrderStatus.PARTIALLY_RECEIVED: return 'warning';
      case PurchaseOrderStatus.RECEIVED: return 'success';
      case PurchaseOrderStatus.CANCELLED: return 'danger';
      default: return 'info';
    }
  }

  private getMockSuppliers(): Supplier[] {
    return [
      {
        id: 1,
        name: 'PT. Beras Makmur',
        contactPerson: 'Ahmad Santoso',
        email: 'ahmad@berasmakmur.com',
        phone: '+6281234567890',
        address: 'Jl. Industri No. 123, Jakarta',
        paymentTerms: 'Net 30 days',
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-09-08')
      },
      {
        id: 2,
        name: 'CV. Minyak Sejahtera',
        contactPerson: 'Siti Nurhaliza',
        email: 'siti@minyaksejahtera.com',
        phone: '+6289876543210',
        address: 'Jl. Perdagangan No. 456, Surabaya',
        paymentTerms: 'Net 15 days',
        isActive: true,
        createdAt: new Date('2024-02-20'),
        updatedAt: new Date('2024-08-15')
      }
    ];
  }

  private getMockPurchaseOrders(): PurchaseOrder[] {
    return [
      {
        id: 1,
        supplierId: 1,
        orderNumber: 'PO-001',
        status: PurchaseOrderStatus.SENT,
        totalAmount: 5000000,
        expectedDeliveryDate: new Date('2024-09-15'),
        items: [],
        createdAt: new Date('2024-09-01'),
        updatedAt: new Date('2024-09-08')
      },
      {
        id: 2,
        supplierId: 2,
        orderNumber: 'PO-002',
        status: PurchaseOrderStatus.RECEIVED,
        totalAmount: 3000000,
        expectedDeliveryDate: new Date('2024-09-10'),
        actualDeliveryDate: new Date('2024-09-12'),
        items: [],
        createdAt: new Date('2024-08-25'),
        updatedAt: new Date('2024-09-12')
      }
    ];
  }
}
