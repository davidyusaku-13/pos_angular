feat: Complete POS system with Supabase integration and Bun migration

🎯 Major Features Implemented:
- Full Point of Sale system with 8 modules (Products, Sales, Inventory, Customers, Suppliers, Reports, Auth, Dashboard)
- Real-time database integration with Supabase
- Responsive PWA with offline capabilities
- Role-based authentication and authorization
- Modern UI with PrimeNG and Tailwind CSS

🔧 Technical Improvements:
- Migrated from npm to Bun package manager for faster builds
- Enhanced security with comprehensive .gitignore for sensitive files
- Environment configuration with .env.example template
- Complete database schema with Row Level Security (RLS)
- TypeScript services converted from HTTP to Supabase queries

📦 Database & Backend:
- 8 core tables: users, categories, products, customers, suppliers, sales, sale_items, inventory_transactions
- Custom PostgreSQL types for enums (user_role, payment_method, inventory_transaction_type)
- Performance indexes on frequently queried columns
- Automatic updated_at triggers
- Secure RLS policies for data access control

🛡️ Security Enhancements:
- Environment variables for all sensitive configuration
- Service role keys protected from version control
- Row Level Security enabled on all tables
- Supabase Auth integration for secure user management

🚀 Development Experience:
- Bun package manager for 3x faster installs
- Comprehensive setup instructions (setup-instructions.md)
- Database seeding script with initial data
- TypeScript strict mode with proper error handling
- Modular architecture with lazy-loaded components

📱 User Experience:
- Responsive design for desktop, tablet, and mobile
- Intuitive navigation with sidebar menu
- Real-time data updates
- Form validation and error handling
- Loading states and user feedback

🔄 Migration Details:
- npm → Bun: Faster package management and builds
- Mock data → Supabase: Real database with persistence
- HTTP calls → Supabase client: Direct database queries
- Local storage → Supabase Auth: Secure authentication
- Static data → Dynamic seeding: Database population scripts

BREAKING CHANGES:
- Authentication now requires Supabase account setup
- All data now persists in Supabase database
- Package manager changed from npm to Bun
- Environment variables required for configuration

Closes: Initial POS system setup and database integration