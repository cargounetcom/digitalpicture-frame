"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign, 
  Package, 
  ShoppingCart, 
  Users,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"
import { products } from "@/lib/data"
import { useEffect, useState } from "react"

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  trend: "up" | "down"
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        <div className="flex items-center gap-1 text-sm mt-1">
          {trend === "up" ? (
            <>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
              <span className="text-green-500">+{change}%</span>
            </>
          ) : (
            <>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
              <span className="text-red-500">-{change}%</span>
            </>
          )}
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log("[v0] Admin dashboard mounted, products loaded:", products.length)
  }, [])

  const totalRevenue = products.reduce((acc, p) => acc + (p.sales || 0) * p.price, 0)
  const totalSales = products.reduce((acc, p) => acc + (p.sales || 0), 0)
  const totalProducts = products.length
  const avgRating = (products.reduce((acc, p) => acc + p.rating, 0) / products.length).toFixed(1)

  if (!mounted) {
    return null
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here&apos;s an overview of your store.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Revenue"
          value={`$${(totalRevenue / 1000000).toFixed(1)}M`}
          change={12.5}
          icon={<DollarSign className="h-4 w-4 text-primary" />}
          trend="up"
        />
        <StatCard
          title="Total Sales"
          value={totalSales.toLocaleString()}
          change={8.2}
          icon={<ShoppingCart className="h-4 w-4 text-primary" />}
          trend="up"
        />
        <StatCard
          title="Products"
          value={totalProducts.toString()}
          change={2}
          icon={<Package className="h-4 w-4 text-primary" />}
          trend="up"
        />
        <StatCard
          title="Avg Rating"
          value={avgRating}
          change={0.3}
          icon={<TrendingUp className="h-4 w-4 text-primary" />}
          trend="up"
        />
      </div>

      {/* Recent Products & Top Performers */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>Latest products added to your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{product.title}</p>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">
                      {product.price === 0 ? "Free" : `$${product.price}`}
                    </p>
                    {product.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {product.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...products]
                .sort((a, b) => (b.sales || 0) - (a.sales || 0))
                .slice(0, 5)
                .map((product, index) => (
                  <div key={product.id} className="flex items-center gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{product.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {(product.sales || 0).toLocaleString()} sales
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-green-500">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        ${((product.sales || 0) * product.price / 1000).toFixed(0)}K
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
