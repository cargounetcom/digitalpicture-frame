"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  Database, 
  ShoppingCart, 
  Users, 
  FileText, 
  Package,
  RefreshCw,
  Download,
  ChevronRight,
  Layers
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface WooProduct {
  id: number
  name: string
  slug: string
  status: string
  price: string
  stock_status: string
  categories: Array<{ name: string }>
  images: Array<{ src: string }>
}

interface WooOrder {
  id: number
  status: string
  total: string
  currency: string
  date_created: string
  billing: { first_name: string; last_name: string; email: string }
  line_items: Array<{ name: string; quantity: number }>
}

interface WooCustomer {
  id: number
  email: string
  first_name: string
  last_name: string
  date_created: string
  orders_count: number
  total_spent: string
}

interface WPPost {
  id: number
  title: { rendered: string }
  slug: string
  date: string
  status: string
}

export default function DatabasePage() {
  const [products, setProducts] = useState<WooProduct[]>([])
  const [orders, setOrders] = useState<WooOrder[]>([])
  const [customers, setCustomers] = useState<WooCustomer[]>([])
  const [posts, setPosts] = useState<WPPost[]>([])
  const [categories, setCategories] = useState<Array<{ id: number; name: string; count: number }>>([])
  const [loading, setLoading] = useState<Record<string, boolean>>({})
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (endpoint: string, setter: (data: any) => void, key: string) => {
    setLoading(prev => ({ ...prev, [key]: true }))
    setError(null)
    try {
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error(`Failed to fetch ${key}`)
      const data = await res.json()
      setter(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }))
    }
  }

  const refreshAll = () => {
    fetchData('/api/products?per_page=20', setProducts, 'products')
    fetchData('/api/woocommerce/orders?per_page=20', setOrders, 'orders')
    fetchData('/api/woocommerce/customers?per_page=20', setCustomers, 'customers')
    fetchData('/api/wordpress/posts?per_page=20', setPosts, 'posts')
    fetchData('/api/categories', setCategories, 'categories')
  }

  useEffect(() => {
    refreshAll()
  }, [])

  const stats = [
    { label: 'Products', value: products.length, icon: Package, color: 'text-blue-500' },
    { label: 'Orders', value: orders.length, icon: ShoppingCart, color: 'text-green-500' },
    { label: 'Customers', value: customers.length, icon: Users, color: 'text-purple-500' },
    { label: 'Posts', value: posts.length, icon: FileText, color: 'text-orange-500' },
    { label: 'Categories', value: categories.length, icon: Layers, color: 'text-pink-500' },
  ]

  const exportData = (data: any[], filename: string) => {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-muted-foreground hover:text-foreground">
                <ChevronRight className="w-4 h-4 rotate-180" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Database className="w-6 h-6" />
                  WordPress / WooCommerce Database
                </h1>
                <p className="text-sm text-muted-foreground">
                  Connected to: {process.env.NEXT_PUBLIC_WORDPRESS_URL || 'wp.digitalpictureframe.shop'}
                </p>
              </div>
            </div>
            <Button onClick={refreshAll} variant="outline" className="gap-2">
              <RefreshCw className={`w-4 h-4 ${Object.values(loading).some(Boolean) ? 'animate-spin' : ''}`} />
              Refresh All
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
            {error}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>WooCommerce Products</CardTitle>
                  <CardDescription>Products from your WooCommerce store</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => exportData(products, 'products')}>
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Category</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-mono text-xs">{product.id}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.price ? `€${product.price}` : '-'}</TableCell>
                        <TableCell>
                          <Badge variant={product.status === 'publish' ? 'default' : 'secondary'}>
                            {product.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.stock_status === 'instock' ? 'default' : 'destructive'}>
                            {product.stock_status}
                          </Badge>
                        </TableCell>
                        <TableCell>{product.categories?.[0]?.name || '-'}</TableCell>
                      </TableRow>
                    ))}
                    {products.length === 0 && !loading.products && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No products found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>WooCommerce Orders</CardTitle>
                  <CardDescription>Recent orders from your store</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => exportData(orders, 'orders')}>
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-xs">#{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.billing?.first_name} {order.billing?.last_name}</p>
                            <p className="text-xs text-muted-foreground">{order.billing?.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.line_items?.length || 0} items</TableCell>
                        <TableCell className="font-medium">{order.currency} {order.total}</TableCell>
                        <TableCell>
                          <Badge variant={
                            order.status === 'completed' ? 'default' :
                            order.status === 'processing' ? 'secondary' :
                            order.status === 'pending' ? 'outline' : 'destructive'
                          }>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">
                          {new Date(order.date_created).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    {orders.length === 0 && !loading.orders && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No orders found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>WooCommerce Customers</CardTitle>
                  <CardDescription>Customer accounts in your store</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => exportData(customers, 'customers')}>
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell className="font-mono text-xs">{customer.id}</TableCell>
                        <TableCell className="font-medium">
                          {customer.first_name} {customer.last_name}
                        </TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.orders_count || 0}</TableCell>
                        <TableCell>€{customer.total_spent || '0.00'}</TableCell>
                        <TableCell className="text-xs">
                          {new Date(customer.date_created).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    {customers.length === 0 && !loading.customers && (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                          No customers found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>WordPress Posts</CardTitle>
                  <CardDescription>Blog posts from WordPress</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => exportData(posts, 'posts')}>
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-mono text-xs">{post.id}</TableCell>
                        <TableCell className="font-medium">{post.title?.rendered}</TableCell>
                        <TableCell className="text-muted-foreground">{post.slug}</TableCell>
                        <TableCell className="text-xs">
                          {new Date(post.date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                    {posts.length === 0 && !loading.posts && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          No posts found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Product Categories</CardTitle>
                  <CardDescription>WooCommerce product categories</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => exportData(categories, 'categories')}>
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Product Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((cat) => (
                      <TableRow key={cat.id}>
                        <TableCell className="font-mono text-xs">{cat.id}</TableCell>
                        <TableCell className="font-medium">{cat.name}</TableCell>
                        <TableCell>{cat.count}</TableCell>
                      </TableRow>
                    ))}
                    {categories.length === 0 && !loading.categories && (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                          No categories found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
