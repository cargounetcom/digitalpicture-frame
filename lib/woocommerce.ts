import 'server-only';

const WP_URL = (process.env.NEXT_PUBLIC_WP_URL || 'https://wp.digitalpictureframe.shop')
  .replace('www.wp.', 'wp.')
  .replace(/\/$/, '');
const WC_KEY = process.env.WC_CONSUMER_KEY;
const WC_SECRET = process.env.WC_CONSUMER_SECRET;

function getAuthHeader() {
  const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString('base64');
  return `Basic ${auth}`;
}

export interface WooProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  stock_quantity: number | null;
  stock_status: string;
  manage_stock: boolean;
  weight: string;
  dimensions: {
    length: string;
    width: string;
    height: string;
  };
  categories: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  tags: Array<{
    id: number;
    name: string;
    slug: string;
  }>;
  images: Array<{
    id: number;
    src: string;
    name: string;
    alt: string;
  }>;
  attributes: Array<{
    id: number;
    name: string;
    options: string[];
  }>;
  variations: number[];
  date_created: string;
  date_modified: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  count: number;
  image: {
    id: number;
    src: string;
    name: string;
    alt: string;
  } | null;
}

export async function fetchWooProducts(params?: {
  per_page?: number;
  page?: number;
  category?: string;
  status?: string;
}): Promise<WooProduct[]> {
  const searchParams = new URLSearchParams();
  if (params?.per_page) searchParams.set('per_page', params.per_page.toString());
  if (params?.page) searchParams.set('page', params.page.toString());
  if (params?.category) searchParams.set('category', params.category);
  if (params?.status) searchParams.set('status', params.status);

  const url = `${WP_URL}/wp-json/wc/v3/products${searchParams.toString() ? `?${searchParams}` : ''}`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: getAuthHeader(),
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!res.ok) {
    throw new Error(`WooCommerce API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchWooCategories(): Promise<WooCategory[]> {
  const url = `${WP_URL}/wp-json/wc/v3/products/categories?per_page=100`;
  
  const res = await fetch(url, {
    headers: {
      Authorization: getAuthHeader(),
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`WooCommerce API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function fetchAllWooProducts(): Promise<WooProduct[]> {
  const allProducts: WooProduct[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const products = await fetchWooProducts({ per_page: perPage, page });
    if (products.length === 0) break;
    allProducts.push(...products);
    if (products.length < perPage) break;
    page++;
  }

  return allProducts;
}

// Create a new product in WooCommerce
export interface CreateWooProductData {
  name: string;
  type?: 'simple' | 'grouped' | 'external' | 'variable';
  status?: 'draft' | 'pending' | 'private' | 'publish';
  featured?: boolean;
  catalog_visibility?: 'visible' | 'catalog' | 'search' | 'hidden';
  description?: string;
  short_description?: string;
  sku?: string;
  regular_price?: string;
  sale_price?: string;
  virtual?: boolean;
  downloadable?: boolean;
  categories?: Array<{ id?: number; name?: string; slug?: string }>;
  tags?: Array<{ id?: number; name?: string; slug?: string }>;
  images?: Array<{ src: string; name?: string; alt?: string }>;
  attributes?: Array<{ name: string; options: string[]; visible?: boolean; variation?: boolean }>;
  meta_data?: Array<{ key: string; value: string }>;
}

export async function createWooProduct(data: CreateWooProductData): Promise<WooProduct> {
  const url = `${WP_URL}/wp-json/wc/v3/products`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`WooCommerce API error: ${res.status} - ${errorText}`);
  }

  return res.json();
}

// Update an existing product in WooCommerce
export async function updateWooProduct(id: number, data: Partial<CreateWooProductData>): Promise<WooProduct> {
  const url = `${WP_URL}/wp-json/wc/v3/products/${id}`;
  
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`WooCommerce API error: ${res.status} - ${errorText}`);
  }

  return res.json();
}

// Delete a product from WooCommerce
export async function deleteWooProduct(id: number, force: boolean = false): Promise<WooProduct> {
  const url = `${WP_URL}/wp-json/wc/v3/products/${id}?force=${force}`;
  
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Authorization': getAuthHeader(),
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`WooCommerce API error: ${res.status} - ${errorText}`);
  }

  return res.json();
}

// Batch create/update/delete products
export interface BatchProductsData {
  create?: CreateWooProductData[];
  update?: Array<{ id: number } & Partial<CreateWooProductData>>;
  delete?: number[];
}

export async function batchWooProducts(data: BatchProductsData): Promise<{
  create: WooProduct[];
  update: WooProduct[];
  delete: WooProduct[];
}> {
  const url = `${WP_URL}/wp-json/wc/v3/products/batch`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`WooCommerce API error: ${res.status} - ${errorText}`);
  }

  return res.json();
}

// Create or get a category
export async function createWooCategory(name: string, slug?: string, description?: string): Promise<WooCategory> {
  const url = `${WP_URL}/wp-json/wc/v3/products/categories`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': getAuthHeader(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description: description || '',
    }),
  });

  if (!res.ok) {
    // If category exists, try to find it
    if (res.status === 400) {
      const categories = await fetchWooCategories();
      const existing = categories.find(c => c.name.toLowerCase() === name.toLowerCase());
      if (existing) return existing;
    }
    const errorText = await res.text();
    throw new Error(`WooCommerce API error: ${res.status} - ${errorText}`);
  }

  return res.json();
}
