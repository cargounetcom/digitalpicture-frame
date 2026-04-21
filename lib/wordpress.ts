const WP_URL = (process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://wp.digitalpictureframe.shop')
  .replace('www.wp.', 'wp.')
  .replace(/\/$/, '');

// WordPress REST API helper
export async function fetchWordPress(endpoint: string, options?: RequestInit) {
  const url = `${WP_URL}/wp-json/wp/v2/${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`WordPress API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// WordPress GraphQL helper
export async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(`${WP_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`GraphQL error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  
  if (json.errors) {
    console.error('GraphQL Errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'GraphQL error');
  }

  return json.data;
}

// Types
export interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  featured_media: number;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WPPage {
  id: number;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  featured_media: number;
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  title: { rendered: string };
  media_details: {
    width: number;
    height: number;
    sizes: Record<string, {
      source_url: string;
      width: number;
      height: number;
    }>;
  };
}

// REST API functions
export async function getPosts(params?: { per_page?: number; page?: number; categories?: number }) {
  const queryParams = new URLSearchParams();
  if (params?.per_page) queryParams.set('per_page', String(params.per_page));
  if (params?.page) queryParams.set('page', String(params.page));
  if (params?.categories) queryParams.set('categories', String(params.categories));
  queryParams.set('_embed', 'true');
  
  return fetchWordPress(`posts?${queryParams}`) as Promise<WPPost[]>;
}

export async function getPostBySlug(slug: string) {
  const posts = await fetchWordPress(`posts?slug=${slug}&_embed=true`) as WPPost[];
  return posts[0] || null;
}

export async function getPages() {
  return fetchWordPress('pages?_embed=true') as Promise<WPPage[]>;
}

export async function getPageBySlug(slug: string) {
  const pages = await fetchWordPress(`pages?slug=${slug}&_embed=true`) as WPPage[];
  return pages[0] || null;
}

export async function getCategories() {
  return fetchWordPress('categories') as Promise<WPCategory[]>;
}

export async function getMedia(id: number) {
  return fetchWordPress(`media/${id}`) as Promise<WPMedia>;
}
