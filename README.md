# PosAngular

A comprehensive Point of Sale (POS) system built with Angular 20, featuring inventory management, sales processing, customer management, and reporting capabilities. Now integrated with Supabase for real-time database functionality.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.2.

## Features

- 🛒 **Sales Management**: Process transactions, manage shopping cart, multiple payment methods
- 📦 **Inventory Control**: Track stock levels, manage products and categories
- 👥 **Customer Management**: Store customer information and purchase history
- 📊 **Reports & Analytics**: Generate sales reports and business insights
- 🔐 **Authentication**: Secure user login with role-based access
- 📱 **PWA Ready**: Installable web app with offline capabilities
- 🎨 **Modern UI**: Built with PrimeNG and Tailwind CSS
- ☁️ **Supabase Integration**: Real-time database with authentication

## Supabase Integration

This application is now fully integrated with Supabase for backend services:

### Database Tables
- `users` - User accounts and authentication
- `products` - Product catalog with inventory tracking
- `categories` - Product categorization
- `sales` - Transaction records
- `sale_items` - Individual sale line items
- `customers` - Customer information
- `suppliers` - Supplier management
- `inventory_transactions` - Stock movement tracking

### Environment Setup

1. **Install Dependencies**:
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Environment Configuration**:
   Create/update `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     supabase: {
       url: 'your-supabase-project-url',
       anonKey: 'your-supabase-anon-key'
     }
   };
   ```

3. **Database Seeding**:
   ```bash
   # Set your service role key as environment variable
   export SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

   # Run the seed script
   npm run seed
   ```

### Authentication

The app uses Supabase Auth for user management:
- Email/password authentication
- Role-based access control (Admin, Manager, Cashier, Inventory Clerk)
- Automatic session management

### API Integration

All services have been updated to use Supabase:
- **ProductService**: CRUD operations for products and categories
- **AuthService**: User authentication and session management
- **SupabaseService**: Generic database operations wrapper

## Quick Start

### Prerequisites
- [Bun](https://bun.sh) (Package manager)
- [Node.js](https://nodejs.org) (for Angular CLI)
- [Supabase](https://supabase.com) account and project

### Installation

1. **Install dependencies with Bun**:
   ```bash
   bun install
   ```

2. **Environment Setup**:
   ```bash
   # Copy environment template (create your own .env file)
   cp .env.example .env
   ```

   Edit `.env` with your Supabase credentials:
   ```bash
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

3. **Database Setup**:
   - 📖 **Detailed Setup Instructions**: See [`setup-instructions.md`](setup-instructions.md)
   - Run the SQL schema in your Supabase dashboard
   - Seed initial data with `bun run seed`

4. **Start development server**:
   ```bash
   bun run start
   # or
   bun dev
   ```

### Available Scripts

- `bun run start` - Start development server
- `bun run build` - Build for production
- `bun run test` - Run tests
- `bun run seed` - Seed database with initial data
- `bun dev` - Alternative development command

## Security Notes

⚠️ **Important**: Never commit sensitive environment variables to version control!

- All `.env` files are ignored by `.gitignore`
- Service role keys should only be used in server-side scripts
- Use environment variables for all sensitive configuration

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
