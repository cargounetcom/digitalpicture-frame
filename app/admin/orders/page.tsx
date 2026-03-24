"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Eye, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface Order {
  id: string
  customer: string
  email: string
  product: string
  amount: number
  status: "pending" | "completed" | "refunded" | "cancelled"
  date: string
}

const mockOrders: Order[] = [
  { id: "ORD-001", customer: "John Smith", email: "john@example.com", product: "Flavor Business Theme", amount: 59, status: "completed", date: "2026-03-24" },
  { id: "ORD-002", customer: "Sarah Johnson", email: "sarah@example.com", product: "ShopMax WooCommerce", amount: 69, status: "completed", date: "2026-03-23" },
  { id: "ORD-003", customer: "Mike Wilson", email: "mike@example.com", product: "Corporate Elite", amount: 79, status: "pending", date: "2026-03-22" },
  { id: "ORD-004", customer: "Emily Davis", email: "emily@example.com", product: "Travel Blog Theme", amount: 49, status: "completed", date: "2026-03-21" },
  { id: "ORD-005", customer: "Chris Brown", email: "chris@example.com", product: "Fashion Store Theme", amount: 75, status: "refunded", date: "2026-03-20" },
  { id: "ORD-006", customer: "Anna Lee", email: "anna@example.com", product: "SaaS Landing Theme", amount: 45, status: "completed", date: "2026-03-19" },
  { id: "ORD-007", customer: "David Chen", email: "david@example.com", product: "Restaurant Theme", amount: 59, status: "cancelled", date: "2026-03-18" },
  { id: "ORD-008", customer: "Lisa Wang", email: "lisa@example.com", product: "NewsPress Magazine", amount: 49, status: "completed", date: "2026-03-17" },
]

const statusColors: Record<Order["status"], string> = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  completed: "bg-green-500/10 text-green-500 border-green-500/20",
  refunded: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  cancelled: "bg-red-500/10 text-red-500 border-red-500/20",
}

export default function OrdersPage() {
  const [mounted, setMounted] = useState(false)
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    setMounted(true)
    console.log("[v0] Orders page mounted, total orders:", orders.length)
  }, [orders.length])

  const filteredOrders = orders.filter((order) =>
    statusFilter === "all" || order.status === statusFilter
  )

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    console.log("[v0] Updating order status:", orderId, "->", newStatus)
    setOrders(orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    ))
    toast.success(`Order ${orderId} status updated to ${newStatus}`)
  }

  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((acc, o) => acc + o.amount, 0)

  if (!mounted) {
    return null
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Orders</h1>
        <p className="text-muted-foreground mt-1">
          Manage and track customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{orders.length}</div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">
              {orders.filter((o) => o.status === "completed").length}
            </div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">
              {orders.filter((o) => o.status === "pending").length}
            </div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">${totalRevenue}</div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders ({filteredOrders.length})</CardTitle>
          <CardDescription>
            View and manage all customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell className="font-medium">${order.amount}</TableCell>
                  <TableCell>
                    <Badge className={statusColors[order.status]} variant="outline">
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, "completed")}>
                          Mark as Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, "refunded")}>
                          Mark as Refunded
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusChange(order.id, "cancelled")}>
                          Mark as Cancelled
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
