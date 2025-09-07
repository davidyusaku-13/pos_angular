import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ChartModule,
    TableModule,
    ButtonModule,
    SelectModule
  ],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports implements OnInit {
  salesData: any;
  inventoryData: any;
  profitData: any;
  topProducts: any[] = [];
  salesByCategory: any[] = [];
  dateRange: Date[] = [];
  selectedPeriod = 'monthly';
  selectedCategory = 'all';

  periodOptions = [
    { label: 'Daily', value: 'daily' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' }
  ];

  categoryOptions = [
    { label: 'All Categories', value: 'all' },
    { label: 'Food', value: 'food' },
    { label: 'Beverages', value: 'beverages' },
    { label: 'Household', value: 'household' }
  ];

  salesChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  inventoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  ngOnInit(): void {
    this.initializeCharts();
    this.loadTopProducts();
    this.loadSalesByCategory();
    this.setDefaultDateRange();
  }

  initializeCharts(): void {
    // Sales chart data
    this.salesData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [
        {
          label: 'Sales (IDR)',
          data: [65000000, 59000000, 80000000, 81000000, 56000000, 55000000, 40000000, 65000000, 70000000],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };

    // Inventory chart data
    this.inventoryData = {
      labels: ['Beras', 'Minyak', 'Gula', 'Tepung', 'Susu'],
      datasets: [
        {
          label: 'Current Stock',
          data: [100, 50, 75, 30, 20],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  }

  loadTopProducts(): void {
    this.topProducts = [
      { name: 'Beras Premium 5kg', sales: 150, revenue: 112500000 },
      { name: 'Minyak Goreng 2L', sales: 120, revenue: 60000000 },
      { name: 'Gula Pasir 1kg', sales: 90, revenue: 27000000 },
      { name: 'Tepung Terigu 1kg', sales: 80, revenue: 24000000 },
      { name: 'Susu Kental Manis', sales: 60, revenue: 18000000 }
    ];
  }

  loadSalesByCategory(): void {
    this.salesByCategory = [
      { category: 'Food', sales: 45000000, percentage: 65 },
      { category: 'Beverages', sales: 15000000, percentage: 22 },
      { category: 'Household', sales: 9000000, percentage: 13 }
    ];
  }

  setDefaultDateRange(): void {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 3);
    this.dateRange = [startDate, endDate];
  }

  applyFilters(): void {
    // TODO: Implement filtering logic
    console.log('Applying filters:', {
      period: this.selectedPeriod,
      category: this.selectedCategory,
      dateRange: this.dateRange
    });
    // Reinitialize charts with filtered data
    this.initializeCharts();
  }

  exportReport(): void {
    // Mock export functionality
    const reportData = {
      salesData: this.salesData,
      inventoryData: this.inventoryData,
      topProducts: this.topProducts,
      filters: {
        period: this.selectedPeriod,
        category: this.selectedCategory,
        dateRange: this.dateRange
      }
    };

    // Create and download JSON file
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

    const exportFileDefaultName = `pos-report-${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  }

  getTotalRevenue(): number {
    return this.topProducts.reduce((sum, product) => sum + product.revenue, 0);
  }

  getTotalTransactions(): number {
    return this.topProducts.reduce((sum, product) => sum + product.sales, 0);
  }

  getAverageOrderValue(): number {
    const totalRevenue = this.getTotalRevenue();
    const totalTransactions = this.getTotalTransactions();
    return totalTransactions > 0 ? totalRevenue / totalTransactions : 0;
  }

  getSalesByCategoryChartData(): any {
    return {
      labels: this.salesByCategory.map(cat => cat.category),
      datasets: [
        {
          data: this.salesByCategory.map(cat => cat.sales),
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 205, 86, 0.8)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)'
          ]
        }
      ]
    };
  }

  getProfitChartData(): any {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [
        {
          label: 'Profit (IDR)',
          data: [45000000, 41000000, 56000000, 57000000, 39000000, 38000000, 28000000, 45000000, 49000000],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  }
}
