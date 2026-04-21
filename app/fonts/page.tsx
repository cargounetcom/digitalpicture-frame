"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Globe, Check, Search, Filter } from "lucide-react"

const fontFamilies = [
  {
    id: "aurora-sans",
    name: "Aurora Sans Variable",
    category: "Sans Serif",
    styles: 18,
    formats: ["TTF", "WOFF2", "OTF"],
    languages: ["Latin Extended", "CJK", "Celtic", "Cyrillic"],
    features: ["Variable Weight", "Perfect Diacritics", "Ligatures"],
    price: 49,
    originalPrice: 79,
    preview: "The quick brown fox jumps over the lazy dog",
    isNew: true,
    isFeatured: true,
    glyphs: 4500,
    weights: "100-900",
    languagePacks: [
      { name: "Chinese Simplified", code: "zh-CN", glyphs: 6763 },
      { name: "Chinese Traditional", code: "zh-TW", glyphs: 13053 },
      { name: "Japanese", code: "ja", glyphs: 6355 },
      { name: "Korean", code: "ko", glyphs: 2350 },
      { name: "Welsh", code: "cy", glyphs: 145 },
      { name: "Breton", code: "br", glyphs: 142 },
      { name: "Irish Gaelic", code: "ga", glyphs: 156 },
      { name: "Scottish Gaelic", code: "gd", glyphs: 148 },
    ]
  },
  {
    id: "nordic-serif",
    name: "Nordic Serif Variable",
    category: "Serif",
    styles: 12,
    formats: ["TTF", "WOFF2", "OTF"],
    languages: ["Latin Extended", "Celtic", "Cyrillic"],
    features: ["Variable Weight", "Old Style Figures", "Swashes"],
    price: 59,
    originalPrice: 89,
    preview: "Elegant typography for modern design",
    isNew: false,
    isFeatured: true,
    glyphs: 3200,
    weights: "300-800",
    languagePacks: [
      { name: "Welsh", code: "cy", glyphs: 145 },
      { name: "Breton", code: "br", glyphs: 142 },
      { name: "Cornish", code: "kw", glyphs: 138 },
      { name: "Manx", code: "gv", glyphs: 135 },
    ]
  },
  {
    id: "ember-display",
    name: "Ember Display CJK",
    category: "Display",
    styles: 8,
    formats: ["TTF", "WOFF2", "OTF"],
    languages: ["CJK Full", "Latin Extended"],
    features: ["CJK Support", "Variable Weight", "Stylistic Sets"],
    price: 89,
    originalPrice: 129,
    preview: "Bold statements deserve bold type",
    isNew: true,
    isFeatured: false,
    glyphs: 28000,
    weights: "400-900",
    languagePacks: [
      { name: "Chinese Simplified", code: "zh-CN", glyphs: 6763 },
      { name: "Chinese Traditional", code: "zh-TW", glyphs: 13053 },
      { name: "Japanese", code: "ja", glyphs: 6355 },
      { name: "Korean", code: "ko", glyphs: 2350 },
    ]
  },
  {
    id: "celtic-script",
    name: "Celtic Script Pro",
    category: "Script",
    styles: 6,
    formats: ["TTF", "WOFF2", "OTF"],
    languages: ["Celtic Languages", "Latin Extended"],
    features: ["Contextual Alternates", "Swashes", "Ornaments"],
    price: 39,
    originalPrice: null,
    preview: "Crafted with Celtic heritage",
    isNew: false,
    isFeatured: true,
    glyphs: 1800,
    weights: "400-700",
    languagePacks: [
      { name: "Welsh", code: "cy", glyphs: 145 },
      { name: "Breton", code: "br", glyphs: 142 },
      { name: "Irish Gaelic", code: "ga", glyphs: 156 },
      { name: "Scottish Gaelic", code: "gd", glyphs: 148 },
      { name: "Cornish", code: "kw", glyphs: 138 },
      { name: "Manx", code: "gv", glyphs: 135 },
    ]
  },
  {
    id: "tokyo-gothic",
    name: "Tokyo Gothic Variable",
    category: "Sans Serif",
    styles: 9,
    formats: ["TTF", "WOFF2", "OTF"],
    languages: ["Japanese", "CJK", "Latin"],
    features: ["Japanese Optimized", "Variable Weight", "Proportional"],
    price: 79,
    originalPrice: 119,
    preview: "Modern Japanese typography",
    isNew: true,
    isFeatured: true,
    glyphs: 23000,
    weights: "100-900",
    languagePacks: [
      { name: "Japanese", code: "ja", glyphs: 6355 },
      { name: "Chinese Simplified", code: "zh-CN", glyphs: 6763 },
      { name: "Korean", code: "ko", glyphs: 2350 },
    ]
  },
  {
    id: "minority-pack",
    name: "Minority Languages Pack",
    category: "Language Pack",
    styles: 4,
    formats: ["TTF", "WOFF2"],
    languages: ["50+ Minority Languages"],
    features: ["Perfect Diacritics", "Extended Unicode", "IPA Support"],
    price: 149,
    originalPrice: 199,
    preview: "Every language deserves beautiful type",
    isNew: true,
    isFeatured: true,
    glyphs: 8500,
    weights: "400-700",
    languagePacks: [
      { name: "Basque", code: "eu", glyphs: 140 },
      { name: "Catalan", code: "ca", glyphs: 145 },
      { name: "Occitan", code: "oc", glyphs: 148 },
      { name: "Romani", code: "rom", glyphs: 165 },
      { name: "Sorbian", code: "hsb", glyphs: 152 },
      { name: "Frisian", code: "fy", glyphs: 138 },
      { name: "Sami Languages", code: "se", glyphs: 178 },
      { name: "Faroese", code: "fo", glyphs: 142 },
    ]
  },
]

const categories = ["All", "Sans Serif", "Serif", "Display", "Script", "Language Pack"]
const languageFilters = ["All Languages", "CJK", "Celtic", "Latin Extended", "Minority Languages"]

export default function FontsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages")

  const filteredFonts = fontFamilies.filter(font => {
    const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || font.category === selectedCategory
    const matchesLanguage = selectedLanguage === "All Languages" || 
      font.languages.some(lang => lang.toLowerCase().includes(selectedLanguage.toLowerCase()))
    return matchesSearch && matchesCategory && matchesLanguage
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl">Digital Picture Frame</Link>
          <div className="flex gap-4">
            <Link href="/collections" className="text-sm text-muted-foreground hover:text-foreground">Collections</Link>
            <Link href="/dashboard/generator" className="text-sm text-muted-foreground hover:text-foreground">AI Generator</Link>
            <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">Admin</Link>
          </div>
        </div>
      </nav>
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="secondary" className="mb-4">Variable Fonts Collection</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Premium Variable Fonts
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Professional variable fonts with full CJK support, Celtic languages, and perfect diacritics 
                for minority languages. Available in TTF, WOFF2, and OTF formats.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Badge variant="outline" className="py-1.5 px-3">
                  <Globe className="w-4 h-4 mr-1" /> 50+ Languages
                </Badge>
                <Badge variant="outline" className="py-1.5 px-3">TTF / WOFF2 / OTF</Badge>
                <Badge variant="outline" className="py-1.5 px-3">Variable Weights</Badge>
                <Badge variant="outline" className="py-1.5 px-3">Perfect Diacritics</Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search fonts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <Button 
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm text-muted-foreground flex items-center mr-2">
                <Filter className="w-4 h-4 mr-1" /> Language:
              </span>
              {languageFilters.map(lang => (
                <Button 
                  key={lang}
                  variant={selectedLanguage === lang ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Font Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFonts.map(font => (
                <Card key={font.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex gap-2 mb-2">
                          {font.isNew && <Badge className="bg-green-500">New</Badge>}
                          {font.isFeatured && <Badge variant="secondary">Featured</Badge>}
                        </div>
                        <h3 className="font-semibold text-lg">{font.name}</h3>
                        <p className="text-sm text-muted-foreground">{font.category} • {font.styles} styles</p>
                      </div>
                      <div className="text-right">
                        {font.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through block">
                            {font.originalPrice}
                          </span>
                        )}
                        <span className="text-xl font-bold">{font.price}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    {/* Font Preview */}
                    <div className="bg-muted/50 rounded-lg p-6 mb-4">
                      <p className="text-2xl font-medium text-center" style={{ fontFamily: 'inherit' }}>
                        {font.preview}
                      </p>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        Weights: {font.weights} • {font.glyphs.toLocaleString()} glyphs
                      </p>
                    </div>
                    
                    {/* Formats */}
                    <div className="flex gap-2 mb-3">
                      {font.formats.map(format => (
                        <Badge key={format} variant="outline" className="text-xs">
                          .{format.toLowerCase()}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Language Packs */}
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground mb-2">Language Packs Included:</p>
                      <div className="flex flex-wrap gap-1">
                        {font.languagePacks.slice(0, 4).map(pack => (
                          <Badge key={pack.code} variant="secondary" className="text-xs">
                            {pack.name}
                          </Badge>
                        ))}
                        {font.languagePacks.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{font.languagePacks.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div className="space-y-1">
                      {font.features.slice(0, 3).map(feature => (
                        <div key={feature} className="flex items-center text-sm text-muted-foreground">
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0 gap-2">
                    <Button className="flex-1" asChild>
                      <Link href={`/fonts/${font.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Language Support Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Comprehensive Language Support</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our fonts are designed with perfect diacritics and full Unicode support for minority 
                and endangered languages.
              </p>
            </div>
            
            <Tabs defaultValue="cjk" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="cjk">CJK</TabsTrigger>
                <TabsTrigger value="celtic">Celtic</TabsTrigger>
                <TabsTrigger value="minority">Minority</TabsTrigger>
                <TabsTrigger value="diacritics">Diacritics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cjk" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Chinese, Japanese, Korean Support</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-background rounded-lg">
                        <p className="text-3xl mb-2">中文</p>
                        <p className="text-sm text-muted-foreground">Simplified Chinese</p>
                        <p className="text-xs text-muted-foreground">6,763 glyphs</p>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <p className="text-3xl mb-2">繁體</p>
                        <p className="text-sm text-muted-foreground">Traditional Chinese</p>
                        <p className="text-xs text-muted-foreground">13,053 glyphs</p>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <p className="text-3xl mb-2">日本語</p>
                        <p className="text-sm text-muted-foreground">Japanese</p>
                        <p className="text-xs text-muted-foreground">6,355 glyphs</p>
                      </div>
                      <div className="text-center p-4 bg-background rounded-lg">
                        <p className="text-3xl mb-2">한��어</p>
                        <p className="text-sm text-muted-foreground">Korean</p>
                        <p className="text-xs text-muted-foreground">2,350 glyphs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="celtic" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Celtic Languages</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-background rounded-lg">
                        <p className="font-medium">Welsh (Cymraeg)</p>
                        <p className="text-sm text-muted-foreground">Full support including: ŵ, ŷ, â, ê, î, ô, û</p>
                      </div>
                      <div className="p-4 bg-background rounded-lg">
                        <p className="font-medium">Breton (Brezhoneg)</p>
                        <p className="text-sm text-muted-foreground">Including: ñ, c'h, ch digraph marks</p>
                      </div>
                      <div className="p-4 bg-background rounded-lg">
                        <p className="font-medium">Irish (Gaeilge)</p>
                        <p className="text-sm text-muted-foreground">Including: á, é, í, ó, ú, séimhiú</p>
                      </div>
                      <div className="p-4 bg-background rounded-lg">
                        <p className="font-medium">Scottish Gaelic</p>
                        <p className="text-sm text-muted-foreground">Including: à, è, ì, ò, ù, grave accents</p>
                      </div>
                      <div className="p-4 bg-background rounded-lg">
                        <p className="font-medium">Cornish (Kernewek)</p>
                        <p className="text-sm text-muted-foreground">Full diacritic support</p>
                      </div>
                      <div className="p-4 bg-background rounded-lg">
                        <p className="font-medium">Manx (Gaelg)</p>
                        <p className="text-sm text-muted-foreground">Complete character set</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="minority" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Minority Languages Pack</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      {["Basque", "Catalan", "Occitan", "Romani", "Sorbian", "Frisian", "Sami", "Faroese", 
                        "Aragonese", "Asturian", "Galician", "Sardinian", "Friulian", "Ladin", "Romansh", "Kashubian"].map(lang => (
                        <div key={lang} className="flex items-center p-2 bg-background rounded">
                          <Check className="w-4 h-4 mr-2 text-green-500" />
                          {lang}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="diacritics" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-4">Perfect Diacritics</h3>
                    <div className="bg-background rounded-lg p-6 text-center">
                      <p className="text-2xl mb-4 tracking-wide">
                        À Á Â Ã Ä Å Ā Ă Ą Ǻ Ǎ Ȁ Ȃ Ạ Ả Ấ Ầ Ẩ Ẫ Ậ Ắ Ằ Ẳ Ẵ Ặ
                      </p>
                      <p className="text-2xl mb-4 tracking-wide">
                        Ç Ć Ĉ Ċ Č Ḉ È É Ê Ë Ē Ĕ Ė Ę Ě Ȅ Ȇ Ẹ Ẻ Ẽ Ế Ề Ể Ễ Ệ
                      </p>
                      <p className="text-2xl tracking-wide">
                        Ñ Ń Ņ Ň Ǹ Ṅ Ṇ Ṉ Ṋ Ò Ó Ô Õ Ö Ø Ō Ŏ Ő Ǫ Ǭ Ǿ Ȍ Ȏ Ȫ Ȭ Ȯ
                      </p>
                      <p className="text-sm text-muted-foreground mt-4">
                        All combining diacritical marks with proper positioning and kerning
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need Custom Language Support?</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We can create custom font packages for specific languages or add support for 
              additional scripts and writing systems.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/pricing">View Font Licenses</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/support">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
