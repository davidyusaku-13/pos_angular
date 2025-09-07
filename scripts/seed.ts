import { createClient } from '@supabase/supabase-js';

// Use service role key for seeding (this should be in environment variables)
const supabaseUrl = 'https://akiqdyqhuyizaarrwufb.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key-here';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Seed categories
    console.log('📂 Seeding categories...');
    const categories = [
      { name: 'Food & Beverages', description: 'Food and drink products', is_active: true },
      { name: 'Household', description: 'Household items and supplies', is_active: true },
      { name: 'Personal Care', description: 'Personal care and hygiene products', is_active: true },
      { name: 'Electronics', description: 'Electronic devices and accessories', is_active: true }
    ];

    const { data: categoryData, error: categoryError } = await supabase
      .from('categories')
      .insert(categories)
      .select();

    if (categoryError) throw categoryError;
    console.log(`✅ Inserted ${categoryData.length} categories`);

    // Seed products
    console.log('📦 Seeding products...');
    const products = [
      {
        name: 'Beras Premium 5kg',
        description: 'Beras berkualitas tinggi',
        sku: 'BR001',
        barcode: '1234567890123',
        category_id: categoryData[0].id,
        price: 75000,
        cost: 65000,
        stock_quantity: 100,
        min_stock_level: 10,
        max_stock_level: 200,
        unit: 'pcs',
        is_active: true
      },
      {
        name: 'Minyak Goreng 2L',
        description: 'Minyak goreng kemasan',
        sku: 'MG001',
        barcode: '1234567890124',
        category_id: categoryData[0].id,
        price: 25000,
        cost: 22000,
        stock_quantity: 50,
        min_stock_level: 5,
        max_stock_level: 100,
        unit: 'pcs',
        is_active: true
      },
      {
        name: 'Sabun Mandi 100g',
        description: 'Sabun mandi untuk kebersihan',
        sku: 'SM001',
        barcode: '1234567890125',
        category_id: categoryData[2].id,
        price: 5000,
        cost: 3500,
        stock_quantity: 200,
        min_stock_level: 20,
        max_stock_level: 500,
        unit: 'pcs',
        is_active: true
      },
      {
        name: 'Detergen Bubuk 1kg',
        description: 'Detergen untuk mencuci pakaian',
        sku: 'DT001',
        barcode: '1234567890126',
        category_id: categoryData[1].id,
        price: 15000,
        cost: 12000,
        stock_quantity: 75,
        min_stock_level: 15,
        max_stock_level: 150,
        unit: 'pcs',
        is_active: true
      },
      {
        name: 'Charger HP Universal',
        description: 'Charger universal untuk smartphone',
        sku: 'CH001',
        barcode: '1234567890127',
        category_id: categoryData[3].id,
        price: 35000,
        cost: 28000,
        stock_quantity: 30,
        min_stock_level: 5,
        max_stock_level: 50,
        unit: 'pcs',
        is_active: true
      }
    ];

    const { data: productData, error: productError } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (productError) throw productError;
    console.log(`✅ Inserted ${productData.length} products`);

    // Note: Users are created through Supabase Auth, not directly in the users table
    // The users table is automatically populated when users sign up
    console.log('👤 Note: Users will be created through Supabase Auth signup process');
    console.log('   Default admin account will be created when you first sign up');

    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📝 Next steps:');
    console.log('1. Sign up your first admin user through the app login page');
    console.log('2. The user will automatically get admin role');
    console.log('3. You can then create additional users through the admin panel');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();