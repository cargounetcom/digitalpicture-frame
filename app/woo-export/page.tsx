'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, RefreshCw, ExternalLink, Package, DollarSign, Boxes, Lock, LogOut } from 'lucide-react';

interface ExportProduct {
  id: number;
  sku: string;
  name: string;
  slug: string;
  type: string;
  status: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  stock_quantity: number | null;
  categories: string;
  tags: string;
  image_url: string;
  permalink: string;
  short_description: string;
  total_sales: number;
  date_created: string;
}

interface ExportResponse {
  store: string;
  source_url: string;
  export_date: string;
  total_products: number;
  products: ExportProduct[];
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        onLogin();
      } else {
        const data = await res.json();
        setError(data.error || 'Invalid password');
      }
    } catch {
      setError('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your password to access the WooCommerce Export</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Authenticating...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function WooExportPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [data, setData] = useState<ExportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    setIsAuthenticated(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/export');
      if (!res.ok) throw new Error('Failed to fetch products');
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadJSON = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `woocommerce-products-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadCSV = async () => {
    const res = await fetch('/api/export?format=csv');
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `woocommerce-products-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'instock':
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
      case 'outofstock':
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      case 'onbackorder':
        return <Badge className="bg-yellow-100 text-yellow-800">Backorder</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Show loading while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">WooCommerce Product Export</h1>
          <p className="text-muted-foreground">
            Export products from your WordPress shop at{' '}
            <a 
              href="https://wp.digitalpictureframe.shop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              wp.digitalpictureframe.shop
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <Button onClick={fetchProducts} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Fetch Products'}
        </Button>
        {data && (
          <>
            <Button variant="outline" onClick={downloadJSON}>
              <Download className="mr-2 h-4 w-4" />
              Download JSON
            </Button>
            <Button variant="outline" onClick={downloadCSV}>
              <Download className="mr-2 h-4 w-4" />
              Download CSV
            </Button>
          </>
        )}
      </div>

      {error && (
        <Card className="mb-6 border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {data && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data.total_products}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">In Stock</CardTitle>
                <Boxes className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.products.filter(p => p.stock_status === 'instock').length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">On Sale</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {data.products.filter(p => p.on_sale).length}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>
                Exported on {new Date(data.export_date).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Image</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Categories</TableHead>
                      <TableHead>Sales</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          {product.image_url ? (
                            <img 
                              src={product.image_url} 
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                              <Package className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          <a 
                            href={product.permalink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {product.name}
                          </a>
                          {product.on_sale && (
                            <Badge className="ml-2 bg-red-500 text-white">Sale</Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-sm">{product.sku || '-'}</TableCell>
                        <TableCell>
                          {product.on_sale && product.regular_price ? (
                            <div>
                              <span className="line-through text-muted-foreground mr-2">
                                ${product.regular_price}
                              </span>
                              <span className="text-red-600 font-semibold">${product.price}</span>
                            </div>
                          ) : (
                            <span>${product.price || '0.00'}</span>
                          )}
                        </TableCell>
                        <TableCell>{getStockBadge(product.stock_status)}</TableCell>
                        <TableCell className="max-w-32 truncate">{product.categories || '-'}</TableCell>
                        <TableCell>{product.total_sales}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!data && !loading && !error && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              Click &quot;Fetch Products&quot; to load products from your WooCommerce store
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
