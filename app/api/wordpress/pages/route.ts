import { NextResponse } from 'next/server';
import { getPages, getPageBySlug } from '@/lib/wordpress';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const page = await getPageBySlug(slug);
      if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
      }
      return NextResponse.json(page);
    }

    const pages = await getPages();
    return NextResponse.json(pages);
  } catch (error) {
    console.error('WordPress API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch pages' },
      { status: 500 }
    );
  }
}
