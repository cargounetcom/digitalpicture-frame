import { NextResponse } from 'next/server';
import { getPosts, getPostBySlug } from '@/lib/wordpress';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const perPage = parseInt(searchParams.get('per_page') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    if (slug) {
      const post = await getPostBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    const posts = await getPosts({ per_page: perPage, page });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('WordPress API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
