import { NextResponse } from 'next/server';

export async function GET() {
  const wpUrl = process.env.NEXT_PUBLIC_WP_URL;
  const key = process.env.WC_CONSUMER_KEY;
  const secret = process.env.WC_CONSUMER_SECRET;

  const auth = Buffer.from(`${key}:${secret}`).toString('base64');

  try {
    const res = await fetch(`${wpUrl}/wp-json/wc/v3/products`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await res.json();
    
    // Send data to frontend
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch API' }, { status: 500 });
  }
}
