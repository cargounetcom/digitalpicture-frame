"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/lib/data"
import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts"

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"]

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log("[v0] Analytics page mounted")
  }, [])

  // Sales by category
  const salesByCategory = products.reduce((acc, product) => {
    const existing = acc.find(item => item.category === product.category)
    if (existing) {
      existing.sales += product.sales || 0
      existing.revenue += (product.sales || 0) * product.price
    } else {
      acc.push({
        category: product.category,
        sales: product.sales || 0,
        revenue: (product.sales || 0) * product.price
      })
    }
    return acc
  }, [] as { category: string; sales: number; revenue: number }[])

  // Monthly data (simulated)
  const monthlyData = [
    { month: "Jan", sales: 4000, revenue: 240000 },
    { month: "Feb", sales: 3000, revenue: 180000 },
    { month: "Mar", sales: 5000, revenue: 300000 },
    { month: "Apr", sales: 4500, revenue: 270000 },
    { month: "May", sales: 6000, revenue: 360000 },
    { month: "Jun", sales: 5500, revenue: 330000 },
    { month: "Jul", sales: 7000, revenue: 420000 },
    { month: "Aug", sales: 6500, revenue: 390000 },
    { month: "Sep", sales: 8000, revenue: 480000 },
    { month: "Oct", sales: 7500, revenue: 450000 },
    { month: "Nov", sales: 9000, revenue: 540000 },
    { month: "Dec", sales: 10000, revenue: 600000 },
  ]

  // Product type distribution
  const typeDistribution = products.reduce((acc, product) => {
    const existing = acc.find(item => item.name === product.type)
    if (existing) {
      existing.value += 1
    } else {
      acc.push({ name: product.type, value: 1 })
    }
    return acc
  }, [] as { name: string; value: number }[])

  if (!mounted) {
    return null
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your store performance and insights
        </p>
      </div>

      <div className="grid gap-6 mb-6">
        {/* Revenue Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
            <CardDescription>Monthly revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `$${value / 1000}K`} />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sales by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Distribution of sales across categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesByCategory}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="category" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                    <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Product Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Product Types</CardTitle>
              <CardDescription>Distribution of product types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {typeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px"
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
