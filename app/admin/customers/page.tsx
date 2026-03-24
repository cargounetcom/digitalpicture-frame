"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search, Mail, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"

interface Customer {
  id: string
  name: string
  email: string
  avatar?: string
  orders: number
  totalSpent: number
  status: "active" | "inactive"
  joinedDate: string
}

const mockCustomers: Customer[] = [
  { id: "1", name: "John Smith", email: "john@example.com", orders: 5, totalSpent: 295, status: "active", joinedDate: "2025-12-01" },
  { id: "2", name: "Sarah Johnson", email: "sarah@example.com", orders: 3, totalSpent: 187, status: "active", joinedDate: "2025-11-15" },
  { id: "3", name: "Mike Wilson", email: "mike@example.com", orders: 8, totalSpent: 512, status: "active", joinedDate: "2025-10-20" },
  { id: "4", name: "Emily Davis", email: "emily@example.com", orders: 2, totalSpent: 98, status: "inactive", joinedDate: "2025-09-05" },
  { id: "5", name: "Chris Brown", email: "chris@example.com", orders: 12, totalSpent: 876, status: "active", joinedDate: "2025-08-12" },
  { id: "6", name: "Anna Lee", email: "anna@example.com", orders: 4, totalSpent: 224, status: "active", joinedDate: "2025-07-28" },
  { id: "7", name: "David Chen", email: "david@example.com", orders: 1, totalSpent: 59, status: "inactive", joinedDate: "2025-06-14" },
  { id: "8", name: "Lisa Wang", email: "lisa@example.com", orders: 6, totalSpent: 347, status: "active", joinedDate: "2025-05-30" },
]

export default function CustomersPage() {
  const [mounted, setMounted] = useState(false)
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setMounted(true)
    console.log("[v0] Customers page mounted, total customers:", customers.length)
  }, [customers.length])

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendEmail = (email: string) => {
    console.log("[v0] Sending email to:", email)
    toast.success(`Email sent to ${email}`)
  }

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === "active").length
  const totalRevenue = customers.reduce((acc, c) => acc + c.totalSpent, 0)
  const avgOrderValue = totalRevenue / customers.reduce((acc, c) => acc + c.orders, 0) || 0

  if (!mounted) {
    return null
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Customers</h1>
        <p className="text-muted-foreground mt-1">
          Manage your customer base
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{totalCustomers}</div>
            <p className="text-sm text-muted-foreground">Total Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">{activeCustomers}</div>
            <p className="text-sm text-muted-foreground">Active Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-foreground">${avgOrderValue.toFixed(0)}</div>
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
          <CardDescription>
            View and manage your customer base
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback>
                          {customer.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{customer.name}</p>
                        <p className="text-sm text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell className="font-medium">${customer.totalSpent}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        customer.status === "active"
                          ? "bg-green-500/10 text-green-500 border-green-500/20"
                          : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                      }
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{customer.joinedDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleSendEmail(customer.email)}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Orders</DropdownMenuItem>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
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
