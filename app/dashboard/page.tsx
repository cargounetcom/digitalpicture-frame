"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Sparkles, 
  Download, 
  FileCode, 
  Zap, 
  Clock, 
  CreditCard,
  Settings,
  LayoutTemplate,
  Package,
  ChevronRight
} from "lucide-react"

const recentGenerations = [
  { id: 1, name: "Nordic Furniture Store", platform: "Shopify", status: "completed", date: "2024-01-15" },
  { id: 2, name: "Jewelry Boutique Theme", platform: "WordPress", status: "completed", date: "2024-01-14" },
  { id: 3, name: "SaaS Dashboard", platform: "Next.js", status: "processing", date: "2024-01-14" },
  { id: 4, name: "Figma Design System", platform: "Figma", status: "completed", date: "2024-01-13" },
]

const downloadableTemplates = [
  { id: 1, name: "Aurora Frame Pro", format: "zip", size: "12.4 MB", downloads: 3 },
  { id: 2, name: "Nordic Gallery", format: "zip", size: "8.7 MB", downloads: 2 },
  { id: 3, name: "Pearl London Shopify", format: "zip", size: "15.2 MB", downloads: 1 },
]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-muted-foreground">Manage your AI-generated templates and licenses</p>
            </div>
            <Link href="/dashboard/generator">
              <Button className="gap-2">
                <Sparkles className="h-4 w-4" />
                New Generation
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Templates Generated</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+3 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">+12 this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
              <FileCode className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">3 templates, 2 fonts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <Progress value={47} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* AI Generator Card */}
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  AI Template Generator
                </CardTitle>
                <CardDescription>
                  Generate custom templates for WordPress, Shopify, Figma, or Next.js SaaS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/dashboard/generator?platform=wordpress">
                    <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <LayoutTemplate className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-medium">WordPress</p>
                          <p className="text-xs text-muted-foreground">Themes & Plugins</p>
                        </div>
                        <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/dashboard/generator?platform=shopify">
                    <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                          <Package className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <p className="font-medium">Shopify</p>
                          <p className="text-xs text-muted-foreground">Themes & Apps</p>
                        </div>
                        <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/dashboard/generator?platform=figma">
                    <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <p className="font-medium">Figma</p>
                          <p className="text-xs text-muted-foreground">Design Systems</p>
                        </div>
                        <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                  <Link href="/dashboard/generator?platform=nextjs">
                    <Card className="cursor-pointer hover:border-primary/50 transition-colors">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-foreground/10 flex items-center justify-center">
                          <FileCode className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Next.js SaaS</p>
                          <p className="text-xs text-muted-foreground">Full-Stack Apps</p>
                        </div>
                        <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Generations */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Generations</CardTitle>
                <CardDescription>Your latest AI-generated templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentGenerations.map((gen) => (
                    <div key={gen.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted flex items-center justify-center">
                          <FileCode className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{gen.name}</p>
                          <p className="text-xs text-muted-foreground">{gen.platform} - {gen.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={gen.status === "completed" ? "default" : "secondary"}>
                          {gen.status}
                        </Badge>
                        {gen.status === "completed" && (
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* License Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">All Access</span>
                    <Badge>Active</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>5 templates included</p>
                    <p>Renews: Feb 15, 2024</p>
                  </div>
                  <Progress value={60} className="h-2" />
                  <p className="text-xs text-muted-foreground">3 of 5 templates used</p>
                  <Link href="/pricing">
                    <Button variant="outline" className="w-full">
                      Upgrade Plan
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Downloads */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">My Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {downloadableTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground">{template.size}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard/downloads">
                  <Button variant="link" className="w-full mt-4 p-0">
                    View All Downloads
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/dashboard/licenses">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <CreditCard className="h-4 w-4" />
                    Manage Licenses
                  </Button>
                </Link>
                <Link href="/dashboard/settings">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Button>
                </Link>
                <Link href="/support">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <Clock className="h-4 w-4" />
                    Support
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
