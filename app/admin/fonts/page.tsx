"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Download, Upload, FileText, Globe, Settings, Package, 
  AlertCircle, CheckCircle, RefreshCw, Trash2, Eye, Edit,
  FileArchive, Languages, Type
} from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock font data
const fonts = [
  { id: 1, name: "Aurora Sans Variable", formats: ["TTF", "WOFF2", "OTF"], languages: 12, glyphs: 4500, status: "active", downloads: 1234 },
  { id: 2, name: "Nordic Serif Variable", formats: ["TTF", "WOFF2"], languages: 8, glyphs: 3200, status: "active", downloads: 892 },
  { id: 3, name: "Ember Display CJK", formats: ["TTF", "WOFF2", "OTF"], languages: 5, glyphs: 28000, status: "active", downloads: 567 },
  { id: 4, name: "Celtic Script Pro", formats: ["TTF", "WOFF2"], languages: 6, glyphs: 1800, status: "draft", downloads: 0 },
  { id: 5, name: "Tokyo Gothic Variable", formats: ["TTF", "WOFF2", "OTF"], languages: 4, glyphs: 23000, status: "active", downloads: 445 },
]

const languagePacks = [
  { code: "zh-CN", name: "Chinese Simplified", glyphs: 6763, status: "complete" },
  { code: "zh-TW", name: "Chinese Traditional", glyphs: 13053, status: "complete" },
  { code: "ja", name: "Japanese", glyphs: 6355, status: "complete" },
  { code: "ko", name: "Korean", glyphs: 2350, status: "complete" },
  { code: "cy", name: "Welsh", glyphs: 145, status: "complete" },
  { code: "br", name: "Breton", glyphs: 142, status: "complete" },
  { code: "ga", name: "Irish Gaelic", glyphs: 156, status: "complete" },
  { code: "gd", name: "Scottish Gaelic", glyphs: 148, status: "in-progress" },
  { code: "kw", name: "Cornish", glyphs: 138, status: "pending" },
  { code: "gv", name: "Manx", glyphs: 135, status: "pending" },
]

const licenses = [
  { id: 1, customer: "John Doe", email: "john@example.com", plan: "All Access", fonts: 5, expires: "2025-04-04", status: "active" },
  { id: 2, customer: "Jane Smith", email: "jane@example.com", plan: "Single Template", fonts: 1, expires: "2025-10-15", status: "active" },
  { id: 3, customer: "Bob Wilson", email: "bob@example.com", plan: "Starter Trial", fonts: 3, expires: "2024-04-11", status: "expiring" },
  { id: 4, customer: "Alice Brown", email: "alice@example.com", plan: "Rent-to-Own", fonts: 10, expires: "2024-10-04", status: "active" },
]

export default function AdminFontsPage() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>(["TTF", "WOFF2"])
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["zh-CN", "ja"])
  const [generating, setGenerating] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => setGenerating(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Fonts Management</h1>
          <p className="text-muted-foreground">Generate, manage, and distribute font packages</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import Font
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Package className="w-4 h-4 mr-2" />
                Generate Package
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Generate Font Package</DialogTitle>
                <DialogDescription>
                  Configure and generate a font package with selected formats and language support.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* Font Selection */}
                <div className="space-y-2">
                  <Label>Select Font Family</Label>
                  <Select defaultValue="aurora-sans">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aurora-sans">Aurora Sans Variable</SelectItem>
                      <SelectItem value="nordic-serif">Nordic Serif Variable</SelectItem>
                      <SelectItem value="ember-display">Ember Display CJK</SelectItem>
                      <SelectItem value="celtic-script">Celtic Script Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Format Selection */}
                <div className="space-y-2">
                  <Label>Output Formats</Label>
                  <div className="flex gap-4">
                    {["TTF", "WOFF2", "OTF", "WOFF", "EOT"].map(format => (
                      <div key={format} className="flex items-center space-x-2">
                        <Checkbox 
                          id={format}
                          checked={selectedFormats.includes(format)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedFormats([...selectedFormats, format])
                            } else {
                              setSelectedFormats(selectedFormats.filter(f => f !== format))
                            }
                          }}
                        />
                        <Label htmlFor={format} className="text-sm font-normal">.{format.toLowerCase()}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Language Pack Selection */}
                <div className="space-y-2">
                  <Label>Language Packs</Label>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
                    {languagePacks.map(lang => (
                      <div key={lang.code} className="flex items-center space-x-2">
                        <Checkbox 
                          id={lang.code}
                          checked={selectedLanguages.includes(lang.code)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedLanguages([...selectedLanguages, lang.code])
                            } else {
                              setSelectedLanguages(selectedLanguages.filter(l => l !== lang.code))
                            }
                          }}
                        />
                        <Label htmlFor={lang.code} className="text-sm font-normal flex items-center gap-1">
                          {lang.name}
                          <span className="text-xs text-muted-foreground">({lang.glyphs})</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Options */}
                <div className="space-y-2">
                  <Label>Additional Options</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hinting" defaultChecked />
                      <Label htmlFor="hinting" className="text-sm font-normal">Include TrueType hinting</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ligatures" defaultChecked />
                      <Label htmlFor="ligatures" className="text-sm font-normal">Include ligatures</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="variable" defaultChecked />
                      <Label htmlFor="variable" className="text-sm font-normal">Generate as variable font</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="subset" />
                      <Label htmlFor="subset" className="text-sm font-normal">Subset to selected languages only</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleGenerate} disabled={generating}>
                  {generating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileArchive className="w-4 h-4 mr-2" />
                      Generate ZIP
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Fonts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">6</span>
              <Type className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Language Packs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">10</span>
              <Languages className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Licenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">156</span>
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">3,138</span>
              <Download className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="fonts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fonts">Font Families</TabsTrigger>
          <TabsTrigger value="languages">Language Packs</TabsTrigger>
          <TabsTrigger value="licenses">Licenses</TabsTrigger>
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
        </TabsList>

        {/* Fonts Tab */}
        <TabsContent value="fonts">
          <Card>
            <CardHeader>
              <CardTitle>Font Families</CardTitle>
              <CardDescription>Manage your font family collection</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Font Name</TableHead>
                    <TableHead>Formats</TableHead>
                    <TableHead>Languages</TableHead>
                    <TableHead>Glyphs</TableHead>
                    <TableHead>Downloads</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fonts.map(font => (
                    <TableRow key={font.id}>
                      <TableCell className="font-medium">{font.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {font.formats.map(f => (
                            <Badge key={f} variant="outline" className="text-xs">{f}</Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{font.languages}</TableCell>
                      <TableCell>{font.glyphs.toLocaleString()}</TableCell>
                      <TableCell>{font.downloads.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={font.status === "active" ? "default" : "secondary"}>
                          {font.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Language Packs Tab */}
        <TabsContent value="languages">
          <Card>
            <CardHeader>
              <CardTitle>Language Packs</CardTitle>
              <CardDescription>Character sets and diacritics for different languages</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Language</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Glyphs</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languagePacks.map(lang => (
                    <TableRow key={lang.code}>
                      <TableCell className="font-medium">{lang.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{lang.code}</Badge>
                      </TableCell>
                      <TableCell>{lang.glyphs.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          lang.status === "complete" ? "default" : 
                          lang.status === "in-progress" ? "secondary" : "outline"
                        }>
                          {lang.status === "complete" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {lang.status === "in-progress" && <RefreshCw className="w-3 h-3 mr-1" />}
                          {lang.status === "pending" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {lang.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Licenses Tab */}
        <TabsContent value="licenses">
          <Card>
            <CardHeader>
              <CardTitle>Font Licenses</CardTitle>
              <CardDescription>Manage customer font licenses and subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Fonts</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {licenses.map(license => (
                    <TableRow key={license.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{license.customer}</p>
                          <p className="text-sm text-muted-foreground">{license.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{license.plan}</Badge>
                      </TableCell>
                      <TableCell>{license.fonts}</TableCell>
                      <TableCell>{license.expires}</TableCell>
                      <TableCell>
                        <Badge variant={
                          license.status === "active" ? "default" : 
                          license.status === "expiring" ? "destructive" : "secondary"
                        }>
                          {license.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Downloads Tab */}
        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <CardTitle>Download Packages</CardTitle>
              <CardDescription>Pre-generated font packages available for download</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Aurora Sans Complete", size: "12.4 MB", formats: "TTF, WOFF2, OTF", languages: "All" },
                  { name: "CJK Language Pack", size: "45.2 MB", formats: "TTF, WOFF2", languages: "zh-CN, zh-TW, ja, ko" },
                  { name: "Celtic Languages Pack", size: "2.1 MB", formats: "TTF, WOFF2", languages: "cy, br, ga, gd" },
                  { name: "Minority Languages Pack", size: "8.7 MB", formats: "TTF, WOFF2", languages: "50+ languages" },
                  { name: "Web Fonts Bundle", size: "6.3 MB", formats: "WOFF2", languages: "Latin Extended" },
                  { name: "Variable Fonts Collection", size: "18.9 MB", formats: "TTF", languages: "All" },
                ].map((pkg, i) => (
                  <Card key={i} className="bg-muted/30">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <FileArchive className="w-10 h-10 text-muted-foreground" />
                        <Badge variant="outline">{pkg.size}</Badge>
                      </div>
                      <h4 className="font-semibold mb-1">{pkg.name}</h4>
                      <p className="text-sm text-muted-foreground mb-1">Formats: {pkg.formats}</p>
                      <p className="text-sm text-muted-foreground mb-4">Languages: {pkg.languages}</p>
                      <Button className="w-full" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download ZIP
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
