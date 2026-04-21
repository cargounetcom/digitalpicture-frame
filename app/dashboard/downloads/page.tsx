"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Download, 
  FileCode, 
  Search,
  Calendar,
  HardDrive,
  RefreshCw,
  ExternalLink,
  Package,
  CheckCircle
} from "lucide-react"

const downloads = [
  {
    id: 1,
    name: "Aurora Frame Pro",
    platform: "WooCommerce",
    version: "2.4.1",
    size: "12.4 MB",
    format: "zip",
    purchaseDate: "2024-01-15",
    lastDownload: "2024-01-16",
    downloadCount: 3,
    licenseType: "Single Site",
    status: "active",
  },
  {
    id: 2,
    name: "Nordic Gallery",
    platform: "Shopify",
    version: "1.8.0",
    size: "8.7 MB",
    format: "zip",
    purchaseDate: "2024-01-10",
    lastDownload: "2024-01-12",
    downloadCount: 2,
    licenseType: "Single Site",
    status: "active",
  },
  {
    id: 3,
    name: "Pearl London Shopify",
    platform: "Shopify",
    version: "3.1.2",
    size: "15.2 MB",
    format: "zip",
    purchaseDate: "2024-01-08",
    lastDownload: "2024-01-08",
    downloadCount: 1,
    licenseType: "Multi Site",
    status: "active",
  },
  {
    id: 4,
    name: "Nordic Sans Variable",
    platform: "Font",
    version: "1.2.0",
    size: "2.8 MB",
    format: "zip",
    purchaseDate: "2024-01-05",
    lastDownload: "2024-01-06",
    downloadCount: 4,
    licenseType: "Desktop + Web",
    status: "active",
  },
  {
    id: 5,
    name: "Copenhagen Living",
    platform: "WooCommerce",
    version: "1.0.0",
    size: "18.5 MB",
    format: "zip",
    purchaseDate: "2023-12-20",
    lastDownload: "2023-12-20",
    downloadCount: 1,
    licenseType: "Single Site",
    status: "expired",
  },
]

const generatedTemplates = [
  {
    id: 1,
    name: "Custom Jewelry Store",
    platform: "WordPress",
    generatedDate: "2024-01-14",
    size: "4.2 MB",
    status: "ready",
  },
  {
    id: 2,
    name: "SaaS Dashboard Pro",
    platform: "Next.js",
    generatedDate: "2024-01-13",
    size: "6.8 MB",
    status: "ready",
  },
  {
    id: 3,
    name: "Figma Design System",
    platform: "Figma",
    generatedDate: "2024-01-12",
    size: "1.2 MB",
    status: "ready",
  },
]

export default function DownloadsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredDownloads = downloads.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filter === "all" || item.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold">My Downloads</h1>
          <p className="text-muted-foreground">Access your purchased templates and generated files</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="purchased" className="space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <TabsList>
              <TabsTrigger value="purchased">Purchased Templates</TabsTrigger>
              <TabsTrigger value="generated">AI Generated</TabsTrigger>
              <TabsTrigger value="fonts">Fonts</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search downloads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
          </div>

          <TabsContent value="purchased" className="space-y-4">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{downloads.length}</p>
                      <p className="text-xs text-muted-foreground">Total Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{downloads.filter(d => d.status === "active").length}</p>
                      <p className="text-xs text-muted-foreground">Active Licenses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Download className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{downloads.reduce((acc, d) => acc + d.downloadCount, 0)}</p>
                      <p className="text-xs text-muted-foreground">Total Downloads</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <HardDrive className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">57.6 MB</p>
                      <p className="text-xs text-muted-foreground">Total Size</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Downloads List */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Purchased Templates</CardTitle>
                  <div className="flex gap-2">
                    <Button 
                      variant={filter === "all" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setFilter("all")}
                    >
                      All
                    </Button>
                    <Button 
                      variant={filter === "active" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setFilter("active")}
                    >
                      Active
                    </Button>
                    <Button 
                      variant={filter === "expired" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setFilter("expired")}
                    >
                      Expired
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDownloads.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                          <FileCode className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{item.name}</h3>
                            <Badge variant="outline">{item.platform}</Badge>
                            <Badge 
                              variant={item.status === "active" ? "default" : "secondary"}
                              className={item.status === "expired" ? "bg-red-500/10 text-red-500" : ""}
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>v{item.version}</span>
                            <span>{item.size}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {item.purchaseDate}
                            </span>
                            <span>{item.licenseType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.status === "active" ? (
                          <>
                            <Button variant="outline" size="sm" className="gap-2">
                              <RefreshCw className="h-4 w-4" />
                              Check Updates
                            </Button>
                            <Button size="sm" className="gap-2">
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          </>
                        ) : (
                          <Button variant="outline" size="sm">
                            Renew License
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generated" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI Generated Templates</CardTitle>
                <CardDescription>Templates created with the AI generator</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {generatedTemplates.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <FileCode className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{item.name}</h3>
                            <Badge variant="outline">{item.platform}</Badge>
                            <Badge className="bg-green-500/10 text-green-500">{item.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>{item.size}</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Generated {item.generatedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <ExternalLink className="h-4 w-4" />
                          Preview
                        </Button>
                        <Button size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          Download ZIP
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fonts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Font Downloads</CardTitle>
                <CardDescription>Your purchased font families and language packs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {downloads.filter(d => d.platform === "Font").map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-lg font-bold">
                          Aa
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{item.name}</h3>
                            <Badge variant="outline">Variable Font</Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>v{item.version}</span>
                            <span>{item.size}</span>
                            <span>{item.licenseType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">TTF</Button>
                        <Button variant="outline" size="sm">WOFF2</Button>
                        <Button variant="outline" size="sm">OTF</Button>
                        <Button size="sm" className="gap-2">
                          <Download className="h-4 w-4" />
                          All Formats
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
