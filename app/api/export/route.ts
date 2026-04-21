import { NextRequest, NextResponse } from 'next/server';
import { fetchAllWooProducts } from '@/lib/woocommerce';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const format = searchParams.get('format') || 'json';

  try {
    const products = await fetchAllWooProducts();

    // Map WooCommerce data to a clean export format
    const exportData = products.map((p) => ({
      id: p.id,
      sku: p.sku || p.id.toString(),
      name: p.name,
      slug: p.slug,
      type: p.type,
      status: p.status,
      price: p.price,
      regular_price: p.regular_price,
      sale_price: p.sale_price,
      on_sale: p.on_sale,
      stock_status: p.stock_status,
      stock_quantity: p.stock_quantity,
      categories: p.categories.map(c => c.name).join(', '),
      tags: p.tags.map(t => t.name).join(', '),
      image_url: p.images[0]?.src || '',
      permalink: p.permalink,
      short_description: p.short_description.replace(/<[^>]*>/g, ''),
      description: p.description.replace(/<[^>]*>/g, '').substring(0, 500),
      weight: p.weight,
      dimensions: `${p.dimensions.length}x${p.dimensions.width}x${p.dimensions.height}`,
      total_sales: p.total_sales,
      date_created: p.date_created,
      date_modified: p.date_modified,
    }));

    if (format === 'csv') {
      // Generate CSV
      const headers = Object.keys(exportData[0] || {});
      const csvRows = [
        headers.join(','),
        ...exportData.map(row => 
          headers.map(header => {
            const value = String(row[header as keyof typeof row] ?? '');
            // Escape quotes and wrap in quotes if contains comma or quotes
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          }).join(',')
        )
      ];
      
      return new NextResponse(csvRows.join('\n'), {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="woocommerce-products-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    // Default JSON format
    return NextResponse.json({
      store: 'Digital Picture Frame Shop',
      source_url: process.env.NEXT_PUBLIC_WP_URL,
      export_date: new Date().toISOString(),
      total_products: exportData.length,
      products: exportData,
    }, { status: 200 });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate export' 
    }, { status: 500 });
  }
}
