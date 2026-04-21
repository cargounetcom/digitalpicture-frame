"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Key, 
  Calendar,
  Globe,
  Server,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  RefreshCw,
  ExternalLink,
  Copy
} from "lucide-react"

const licenses = [
  {
    id: "LIC-2024-001",
    product: "Aurora Frame Pro",
    type: "Single Site",
    status: "active",
    activatedDomain: "mystore.com",
    purchaseDate: "2024-01-15",
    expiryDate: "2025-01-15",
    daysRemaining: 365,
    key: "AURR-FRME-PRO1-XXXX-XXXX",
  },
  {
    id: "LIC-2024-002",
    product: "Nordic Gallery",
    type: "Single Site",
    status: "active",
    activatedDomain: "nordic-shop.myshopify.com",
    purchaseDate: "2024-01-10",
    expiryDate: "2025-01-10",
    daysRemaining: 360,
    key: "NRDC-GLRY-SHOP-XXXX-XXXX",
  },
  {
    id: "LIC-2024-003",
    product: "Pearl London Shopify",
    type: "Multi Site (5)",
    status: "active",
    activatedDomain: "3 of 5 sites activated",
    purchaseDate: "2024-01-08",
    expiryDate: "2025-01-08",
    daysRemaining: 358,
    key: "PERL-LNDN-MULT-XXXX-XXXX",
  },
  {
    id: "LIC-2023-045",
    product: "Copenhagen Living",
    type: "Single Site",
    status: "expiring",
    activatedDomain: "furniture-store.com",
    purchaseDate: "2023-02-20",
    expiryDate: "2024-02-20",
    daysRemaining: 14,
    key: "CPNH-LVNG-SNGL-XXXX-XXXX",
  },
  {
    id: "LIC-2023-012",
    product: "Frame Starter",
    type: "Single Site",
    status: "expired",
    activatedDomain: "old-site.com",
    purchaseDate: "2022-12-15",
    expiryDate: "2023-12-15",
    daysRemaining: 0,
    key: "FRME-STRT-SNGL-XXXX-XXXX",
  },
]

const subscriptions = [
  {
    id: "SUB-001",
    plan: "All Access",
    price: "299",
    interval: "year",
    status: "active",
    startDate: "2024-01-01",
    nextBilling: "2025-01-01",
    templatesIncluded: 5,
    templatesUsed: 3,
  },
  {
    id: "SUB-002",
    plan: "Font Pro",
    price: "149",
    interval: "year",
    status: "active",
    startDate: "2024-01-05",
    nextBilling: "2025-01-05",
    templatesIncluded: null,
    templatesUsed: null,
  },
]

const rentToOwnContracts = [
  {
    id: "RTO-001",
    product: "Agency Pack",
    totalPrice: 400,
    monthlyPayment: 67,
    paymentsMade: 4,
    paymentsRemaining: 2,
    status: "active",
    nextPayment: "2024-02-15",
    progress: 67,
  },
]

export default function LicensesPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyLicenseKey = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const activeCount = licenses.filter(l => l.status === "active").length
  const expiringCount = licenses.filter(l => l.status === "expiring").length
  const expiredCount = licenses.filter(l => l.status === "expired").length

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold">License Management</h1>
          <p className="text-muted-foreground">Manage your template licenses and subscriptions</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{activeCount}</p>
                  <p className="text-xs text-muted-foreground">Active Licenses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{expiringCount}</p>
                  <p className="text-xs text-muted-foreground">Expiring Soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{expiredCount}</p>
                  <p className="text-xs text-muted-foreground">Expired</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{subscriptions.length}</p>
                  <p className="text-xs text-muted-foreground">Active Subscriptions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="licenses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="licenses">Licenses</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            <TabsTrigger value="rent-to-own">Rent-to-Own</TabsTrigger>
          </TabsList>

          <TabsContent value="licenses" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Template Licenses</CardTitle>
                    <CardDescription>Manage your product license keys and activations</CardDescription>
                  </div>
                  <Link href="/templates">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Purchase New
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {licenses.map((license) => (
                    <div 
                      key={license.id} 
                      className={`p-4 rounded-lg border ${
                        license.status === "expiring" ? "border-yellow-500/50 bg-yellow-500/5" :
                        license.status === "expired" ? "border-red-500/50 bg-red-500/5" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{license.product}</h3>
                            <Badge variant="outline">{license.type}</Badge>
                            <Badge 
                              variant={
                                license.status === "active" ? "default" :
                                license.status === "expiring" ? "secondary" : "destructive"
                              }
                              className={
                                license.status === "expiring" ? "bg-yellow-500/10 text-yellow-600" : ""
                              }
                            >
                              {license.status === "expiring" ? "Expiring Soon" : license.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Key className="h-3 w-3" />
                              {license.id}
                            </span>
                            <span className="flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {license.activatedDomain}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Expires: {license.expiryDate}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 mt-2">
                            <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                              {license.key}
                            </code>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-2"
                              onClick={() => copyLicenseKey(license.key)}
                            >
                              {copiedKey === license.key ? (
                                <CheckCircle className="h-3 w-3 text-green-500" />
                              ) : (
                                <Copy className="h-3 w-3" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {license.status === "expired" ? (
                            <Button size="sm">Renew License</Button>
                          ) : license.status === "expiring" ? (
                            <>
                              <span className="text-sm text-yellow-600 font-medium">
                                {license.daysRemaining} days left
                              </span>
                              <Button size="sm" variant="outline">Renew Now</Button>
                            </>
                          ) : (
                            <>
                              <Button variant="outline" size="sm" className="gap-2">
                                <Server className="h-4 w-4" />
                                Manage Sites
                              </Button>
                              <Button variant="outline" size="sm" className="gap-2">
                                <ExternalLink className="h-4 w-4" />
                                Deactivate
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Subscriptions</CardTitle>
                    <CardDescription>Your recurring subscription plans</CardDescription>
                  </div>
                  <Link href="/pricing">
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Subscription
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subscriptions.map((sub) => (
                    <div key={sub.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{sub.plan}</h3>
                            <Badge className="bg-green-500/10 text-green-600">Active</Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CreditCard className="h-3 w-3" />
                              EUR {sub.price}/{sub.interval}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Next billing: {sub.nextBilling}
                            </span>
                          </div>

                          {sub.templatesIncluded && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Templates Used</span>
                                <span>{sub.templatesUsed} of {sub.templatesIncluded}</span>
                              </div>
                              <Progress value={(sub.templatesUsed! / sub.templatesIncluded) * 100} className="h-2" />
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Manage</Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rent-to-own" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Rent-to-Own Contracts</CardTitle>
                    <CardDescription>Pay monthly and own the license after completion</CardDescription>
                  </div>
                  <Link href="/pricing">
                    <Button variant="outline" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Start New Contract
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rentToOwnContracts.map((contract) => (
                    <div key={contract.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1 mr-8">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{contract.product}</h3>
                            <Badge className="bg-blue-500/10 text-blue-600">In Progress</Badge>
                          </div>
                          
                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Total Value</p>
                              <p className="font-semibold">EUR {contract.totalPrice}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Monthly Payment</p>
                              <p className="font-semibold">EUR {contract.monthlyPayment}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Payments Made</p>
                              <p className="font-semibold">{contract.paymentsMade} of 6</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Next Payment</p>
                              <p className="font-semibold">{contract.nextPayment}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress to Ownership</span>
                              <span>{contract.progress}%</span>
                            </div>
                            <Progress value={contract.progress} className="h-3" />
                            <p className="text-xs text-muted-foreground">
                              {contract.paymentsRemaining} payments remaining until full ownership
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button size="sm">Pay Early</Button>
                          <Button variant="outline" size="sm">View Details</Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {rentToOwnContracts.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No active rent-to-own contracts</p>
                      <Link href="/pricing">
                        <Button variant="link">Browse available plans</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
