import { NextRequest, NextResponse } from 'next/server';
import { products as localProducts, Product } from '@/lib/data';
import { 
  createWooProduct, 
  updateWooProduct,
  fetchAllWooProducts,
  createWooCategory,
  CreateWooProductData 
} from '@/lib/woocommerce';

// Convert local product to WooCommerce format
function convertToWooFormat(product: Product, categoryId?: number): CreateWooProductData {
  const wooProduct: CreateWooProductData = {
    name: product.title,
    type: 'simple',
    status: 'publish',
    featured: product.featured,
    description: product.fullDescription || product.description,
    short_description: product.description,
    sku: `TMKT-${product.id}`,
    regular_price: product.price.toString(),
    sale_price: product.compareAtPrice ? product.price.toString() : undefined,
    virtual: true,
    downloadable: true,
    categories: categoryId ? [{ id: categoryId }] : [],
    tags: product.tags.map(tag => ({ name: tag })),
    attributes: [
      {
        name: 'Platform',
        options: [product.platform],
        visible: true,
        variation: false,
      },
      {
        name: 'Version',
        options: [product.version],
        visible: true,
        variation: false,
      },
      {
        name: 'License',
        options: [product.license],
        visible: true,
        variation: false,
      },
    ],
    meta_data: [
      { key: '_local_product_id', value: product.id },
      { key: '_demo_url', value: product.demoUrl || '' },
      { key: '_documentation_url', value: product.documentation || '' },
      { key: '_author', value: product.author },
      { key: '_last_update', value: product.lastUpdate },
      { key: '_compatibility', value: product.compatibility.join(', ') },
    ],
  };

  return wooProduct;
}

// Export single product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, action = 'create' } = body;

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    const product = localProducts.find(p => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Create or get category
    let categoryId: number | undefined;
    try {
      const category = await createWooCategory(
        product.category,
        product.category.toLowerCase().replace(/\s+/g, '-'),
        `${product.category} templates and themes`
      );
      categoryId = category.id;
    } catch (err) {
      console.error('Failed to create category:', err);
    }

    const wooData = convertToWooFormat(product, categoryId);

    let result;
    if (action === 'update' && body.wooProductId) {
      result = await updateWooProduct(body.wooProductId, wooData);
    } else {
      result = await createWooProduct(wooData);
    }

    return NextResponse.json({
      success: true,
      message: `Product ${action === 'update' ? 'updated' : 'created'} successfully`,
      product: result,
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Export failed' },
      { status: 500 }
    );
  }
}

// Export all products (bulk)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { productIds, skipExisting = true } = body;

    // Get products to export
    const productsToExport = productIds 
      ? localProducts.filter(p => productIds.includes(p.id))
      : localProducts;

    if (productsToExport.length === 0) {
      return NextResponse.json(
        { error: 'No products to export' },
        { status: 400 }
      );
    }

    // Get existing WooCommerce products to check for duplicates
    let existingProducts: any[] = [];
    if (skipExisting) {
      try {
        existingProducts = await fetchAllWooProducts();
      } catch (err) {
        console.error('Failed to fetch existing products:', err);
      }
    }

    const existingSkus = new Set(existingProducts.map(p => p.sku));
    const results = {
      created: [] as any[],
      skipped: [] as string[],
      errors: [] as { id: string; error: string }[],
    };

    // Create categories first
    const categoryMap = new Map<string, number>();
    for (const product of productsToExport) {
      if (!categoryMap.has(product.category)) {
        try {
          const category = await createWooCategory(
            product.category,
            product.category.toLowerCase().replace(/\s+/g, '-'),
            `${product.category} templates and themes`
          );
          categoryMap.set(product.category, category.id);
        } catch (err) {
          console.error(`Failed to create category ${product.category}:`, err);
        }
      }
    }

    // Export products one by one
    for (const product of productsToExport) {
      const sku = `TMKT-${product.id}`;
      
      if (skipExisting && existingSkus.has(sku)) {
        results.skipped.push(product.id);
        continue;
      }

      try {
        const categoryId = categoryMap.get(product.category);
        const wooData = convertToWooFormat(product, categoryId);
        const created = await createWooProduct(wooData);
        results.created.push({
          localId: product.id,
          wooId: created.id,
          name: created.name,
        });
      } catch (err) {
        results.errors.push({
          id: product.id,
          error: err instanceof Error ? err.message : 'Unknown error',
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Export complete: ${results.created.length} created, ${results.skipped.length} skipped, ${results.errors.length} errors`,
      results,
    });
  } catch (error) {
    console.error('Bulk export error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Bulk export failed' },
      { status: 500 }
    );
  }
}

// Get export status/comparison
export async function GET() {
  try {
    const wooProducts = await fetchAllWooProducts();
    
    const comparison = localProducts.map(local => {
      const sku = `TMKT-${local.id}`;
      const wooProduct = wooProducts.find(w => w.sku === sku);
      
      return {
        localId: local.id,
        localTitle: local.title,
        localPrice: local.price,
        wooId: wooProduct?.id || null,
        wooTitle: wooProduct?.name || null,
        wooPrice: wooProduct?.price || null,
        synced: !!wooProduct,
        needsUpdate: wooProduct ? (
          wooProduct.name !== local.title ||
          parseFloat(wooProduct.price) !== local.price
        ) : false,
      };
    });

    return NextResponse.json({
      totalLocal: localProducts.length,
      totalWoo: wooProducts.length,
      synced: comparison.filter(c => c.synced).length,
      notSynced: comparison.filter(c => !c.synced).length,
      needsUpdate: comparison.filter(c => c.needsUpdate).length,
      products: comparison,
    });
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Status check failed' },
      { status: 500 }
    );
  }
}
