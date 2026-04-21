import { NextRequest, NextResponse } from 'next/server';
import { fetchWooProducts, fetchAllWooProducts } from '@/lib/woocommerce';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const all = searchParams.get('all') === 'true';
  const perPage = parseInt(searchParams.get('per_page') || '10');
  const page = parseInt(searchParams.get('page') || '1');
  const category = searchParams.get('category') || undefined;

  try {
    let products;
    
    if (all) {
      products = await fetchAllWooProducts();
    } else {
      products = await fetchWooProducts({
        per_page: perPage,
        page,
        category,
      });
    }
    
    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    }, { status: 200 });
  } catch (error) {
    console.error('WooCommerce API error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch products from WooCommerce' 
    }, { status: 500 });
  }
}
