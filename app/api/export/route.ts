import { NextResponse } from 'next/server';

export async function GET() {
  const wpUrl = process.env.NEXT_PUBLIC_WP_URL;
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;

  const auth = Buffer.from(`${key}:${secret}`).toString('base64');

  try {
    const res = await fetch(`${wpUrl}/wp-json/wc/v3/products`, {
      headers: { Authorization: `Basic ${auth}` },
      next: { revalidate: 3600 } // Cache this endpoint for 1 hour to prevent DB load
    });

    const products = await res.json();

    // Map WooCommerce data to a clean Web Market JSON export format
    const marketExport = products.map((p: any) => ({
      sku: p.sku || p.id.toString(),
      title: p.name,
      price: p.price,
      currency: "USD",
      url: `https://www.digitalpictureframe.shop/product/${p.slug}`,
      image_url: p.images[0]?.src || "",
      stock_status: p.stock_status,
    }));

    return NextResponse.json({
      store: "Digital Picture Frame Shop",
      export_date: new Date().toISOString(),
      products: marketExport
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate web market export' }, { status: 500 });
  }
}
