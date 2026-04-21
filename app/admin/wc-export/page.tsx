"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Upload, 
  RefreshCw, 
  Check, 
  X, 
  AlertCircle,
  Package,
  ArrowUpRight,
  Loader2
} from "lucide-react"

interface ProductComparison {
  localId: string
  localTitle: string
  localPrice: number
  wooId: number | null
  wooTitle: string | null
  wooPrice: string | null
  synced: boolean
  needsUpdate: boolean
}

interface ExportStatus {
  totalLocal: number
  totalWoo: number
  synced: number
  notSynced: number
  needsUpdate: number
  products: ProductComparison[]
}

export default function WCExportPage() {
  const [status, setStatus] = useState<ExportStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set())
  const [exportResults, setExportResults] = useState<any>(null)

  const fetchStatus = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/woocommerce/export')
      const data = await res.json()
      if (data.error) {
        console.error(data.error)
      } else {
        setStatus(data)
      }
    } catch (err) {
      console.error('Failed to fetch status:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStatus()
  }, [])

  const handleSelectAll = (checked: boolean) => {
    if (checked && status) {
      setSelectedProducts(new Set(status.products.filter(p => !p.synced).map(p => p.localId)))
    } else {
      setSelectedProducts(new Set())
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    const newSelected = new Set(selectedProducts)
    if (checked) {
      newSelected.add(productId)
    } else {
      newSelected.delete(productId)
    }
    setSelectedProducts(newSelected)
  }

  const handleExportSelected = async () => {
    if (selectedProducts.size === 0) return
    
    setExporting(true)
    setExportResults(null)
    try {
      const res = await fetch('/api/woocommerce/export', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productIds: Array.from(selectedProducts),
          skipExisting: true,
        }),
      })
      const data = await res.json()
      setExportResults(data)
      if (data.success) {
        await fetchStatus()
        setSelectedProducts(new Set())
      }
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }

  const handleExportAll = async () => {
    setExporting(true)
    setExportResults(null)
    try {
      const res = await fetch('/api/woocommerce/export', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skipExisting: true }),
      })
      const data = await res.json()
      setExportResults(data)
      if (data.success) {
        await fetchStatus()
      }
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }

  const handleExportSingle = async (productId: string) => {
    setExporting(true)
    try {
      const res = await fetch('/api/woocommerce/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })
      const data = await res.json()
      if (data.success) {
        await fetchStatus()
      }
    } catch (err) {
      console.error('Export failed:', err)
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Export to WooCommerce</h1>
          <p className="text-muted-foreground">
            Sync your templates to WordPress/WooCommerce store
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchStatus} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExportAll} disabled={exporting}>
            {exporting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Upload className="h-4 w-4 mr-2" />
            )}
            Export All New
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Local Templates</CardDescription>
            <CardTitle className="text-3xl">{status?.totalLocal || 0}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>WooCommerce Products</CardDescription>
            <CardTitle className="text-3xl">{status?.totalWoo || 0}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Synced</CardDescription>
            <CardTitle className="text-3xl text-green-600">{status?.synced || 0}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Not Synced</CardDescription>
            <CardTitle className="text-3xl text-orange-600">{status?.notSynced || 0}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Export Results */}
      {exportResults && (
        <Card className={exportResults.success ? 'border-green-500' : 'border-red-500'}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {exportResults.success ? (
                <Check className="h-5 w-5 text-green-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              Export Results
            </CardTitle>
            <CardDescription>{exportResults.message}</CardDescription>
          </CardHeader>
          {exportResults.results && (
            <CardContent>
              <div className="space-y-2 text-sm">
                {exportResults.results.created?.length > 0 && (
                  <div className="text-green-600">
                    Created: {exportResults.results.created.map((p: any) => p.name).join(', ')}
                  </div>
                )}
                {exportResults.results.skipped?.length > 0 && (
                  <div className="text-muted-foreground">
                    Skipped (already exists): {exportResults.results.skipped.join(', ')}
                  </div>
                )}
                {exportResults.results.errors?.length > 0 && (
                  <div className="text-red-600">
                    Errors: {exportResults.results.errors.map((e: any) => `${e.id}: ${e.error}`).join(', ')}
                  </div>
                )}
              </div>
            </CardContent>
          )}
        </Card>
      )}

      {/* Selected Actions */}
      {selectedProducts.size > 0 && (
        <Card className="border-primary">
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {selectedProducts.size} product(s) selected
              </span>
              <Button onClick={handleExportSelected} disabled={exporting}>
                {exporting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4 mr-2" />
                )}
                Export Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Products Comparison</CardTitle>
          <CardDescription>
            Compare local templates with WooCommerce products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">
                    <Checkbox
                      checked={status?.products.filter(p => !p.synced).every(p => selectedProducts.has(p.localId))}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="text-left py-3 px-2">Local Product</th>
                  <th className="text-left py-3 px-2">Price</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">WooCommerce</th>
                  <th className="text-left py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {status?.products.map((product) => (
                  <tr key={product.localId} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">
                      <Checkbox
                        checked={selectedProducts.has(product.localId)}
                        onCheckedChange={(checked) => handleSelectProduct(product.localId, checked as boolean)}
                        disabled={product.synced}
                      />
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{product.localTitle}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">${product.localPrice}</td>
                    <td className="py-3 px-2">
                      {product.synced ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Check className="h-3 w-3 mr-1" />
                          Synced
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                          <X className="h-3 w-3 mr-1" />
                          Not Synced
                        </Badge>
                      )}
                      {product.needsUpdate && (
                        <Badge variant="outline" className="ml-1 bg-blue-50 text-blue-700 border-blue-200">
                          Needs Update
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      {product.wooId ? (
                        <a 
                          href={`https://wp.digitalpictureframe.shop/wp-admin/post.php?post=${product.wooId}&action=edit`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-blue-600 hover:underline"
                        >
                          #{product.wooId}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="py-3 px-2">
                      {!product.synced && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleExportSingle(product.localId)}
                          disabled={exporting}
                        >
                          Export
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
