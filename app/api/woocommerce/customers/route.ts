import { NextResponse } from 'next/server';

const WP_URL = (process.env.NEXT_PUBLIC_WP_URL || 'https://wp.digitalpictureframe.shop').replace(/\/$/, '');
const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;

function getAuthHeader() {
  const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
  return `Basic ${auth}`;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const perPage = searchParams.get('per_page') || '10';
    const page = searchParams.get('page') || '1';

    const params = new URLSearchParams({ per_page: perPage, page });

    const url = `${WP_URL}/wp-json/wc/v3/customers?${params}`;
    
    const res = await fetch(url, {
      headers: {
        Authorization: getAuthHeader(),
      },
    });

    if (!res.ok) {
      throw new Error(`WooCommerce API error: ${res.status}`);
    }

    const customers = await res.json();
    return NextResponse.json(customers);
  } catch (error) {
    console.error('WooCommerce customers error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch customers' },
      { status: 500 }
    );
  }
}
