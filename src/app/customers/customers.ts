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
import { ConfirmationService } from 'primeng/api';
import { Customer } from '../models';

@Component({
  selector: 'app-customers',
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
    ConfirmDialogModule
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  providers: [ConfirmationService]
})
export class Customers implements OnInit {
  customers: Customer[] = [];
  customerForm: FormGroup;
  showDialog = false;
  isEditing = false;
  selectedCustomer: Customer | null = null;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      address: [''],
      loyaltyPoints: [0, [Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    // Mock data for now
    this.customers = this.getMockCustomers();
  }

  openNewCustomerDialog(): void {
    this.isEditing = false;
    this.selectedCustomer = null;
    this.customerForm.reset({ loyaltyPoints: 0 });
    this.showDialog = true;
  }

  openEditCustomerDialog(customer: Customer): void {
    this.isEditing = true;
    this.selectedCustomer = customer;
    this.customerForm.patchValue({
      name: customer.name,
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
      loyaltyPoints: customer.loyaltyPoints
    });
    this.showDialog = true;
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      const formValue = this.customerForm.value;

      if (this.isEditing && this.selectedCustomer) {
        // Update existing customer
        const index = this.customers.findIndex(c => c.id === this.selectedCustomer!.id);
        if (index !== -1) {
          this.customers[index] = {
            ...this.selectedCustomer,
            ...formValue,
            updatedAt: new Date()
          };
        }
      } else {
        // Add new customer
        const newCustomer: Customer = {
          id: Math.max(...this.customers.map(c => c.id)) + 1,
          ...formValue,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        this.customers.push(newCustomer);
      }

      this.showDialog = false;
      this.customerForm.reset({ loyaltyPoints: 0 });
    }
  }

  deleteCustomer(customer: Customer): void {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${customer.name}?`,
      header: 'Delete Customer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.customers = this.customers.filter(c => c.id !== customer.id);
      }
    });
  }

  private getMockCustomers(): Customer[] {
    return [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+6281234567890',
        address: 'Jl. Sudirman No. 123, Jakarta',
        loyaltyPoints: 150,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-09-08')
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+6289876543210',
        address: 'Jl. Thamrin No. 456, Jakarta',
        loyaltyPoints: 75,
        isActive: true,
        createdAt: new Date('2024-03-20'),
        updatedAt: new Date('2024-08-15')
      }
    ];
  }
}
