import { NextResponse } from 'next/server';
import { fetchWooCategories } from '@/lib/woocommerce';

export async function GET() {
  try {
    const categories = await fetchWooCategories();
    
    return NextResponse.json({
      success: true,
      count: categories.length,
      categories,
    }, { status: 200 });
  } catch (error) {
    console.error('WooCommerce categories API error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch categories from WooCommerce' 
    }, { status: 500 });
  }
}
