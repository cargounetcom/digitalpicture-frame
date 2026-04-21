"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Suspense } from "react"
import { 
  Sparkles, 
  Download, 
  Code, 
  Eye, 
  FileCode,
  Loader2,
  CheckCircle,
  AlertCircle,
  Copy,
  RefreshCw
} from "lucide-react"

const platformOptions = [
  { value: "wordpress", label: "WordPress", description: "Themes & WooCommerce Plugins" },
  { value: "shopify", label: "Shopify", description: "Liquid Themes & Apps" },
  { value: "figma", label: "Figma", description: "Design Systems & UI Kits" },
  { value: "nextjs", label: "Next.js SaaS", description: "Full-Stack Applications" },
]

const templateTypes = {
  wordpress: ["Theme", "WooCommerce Plugin", "Admin Plugin", "Widget", "Block Pattern"],
  shopify: ["Theme", "Section", "App Embed", "Checkout Extension", "Product Template"],
  figma: ["Design System", "UI Kit", "Icon Set", "Component Library", "Wireframe Kit"],
  nextjs: ["SaaS Dashboard", "E-commerce", "Blog Platform", "Landing Page", "Admin Panel"],
}

const stylePresets = [
  "Nordic Minimal",
  "Modern Dark",
  "Classic Elegant",
  "Bold & Colorful",
  "Clean Corporate",
  "Luxury Boutique",
]

function GeneratorContent() {
  const searchParams = useSearchParams()
  const initialPlatform = searchParams.get("platform") || "wordpress"
  
  const [platform, setPlatform] = useState(initialPlatform)
  const [templateType, setTemplateType] = useState("")
  const [projectName, setProjectName] = useState("")
  const [description, setDescription] = useState("")
  const [stylePreset, setStylePreset] = useState("Nordic Minimal")
  const [features, setFeatures] = useState<string[]>([])
  const [generationStep, setGenerationStep] = useState(0)
  const [generatedCode, setGeneratedCode] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [input, setInput] = useState("")

  const { messages, append, isLoading: chatLoading } = useChat({
    api: "/api/ai/generate-template",
  })

  const isLoading = chatLoading

  const featureOptions = {
    wordpress: ["Responsive Design", "SEO Optimized", "WooCommerce Ready", "Gutenberg Blocks", "Custom Widgets", "Translation Ready", "Dark Mode", "One-Click Demo Import"],
    shopify: ["Mobile First", "Quick View", "Wishlist", "Product Filters", "Multi-currency", "Instagram Feed", "Mega Menu", "Ajax Cart"],
    figma: ["Auto Layout", "Dark/Light Modes", "Responsive Variants", "Icon Library", "Color System", "Typography Scale", "Component Tokens", "Documentation"],
    nextjs: ["Authentication", "Database Integration", "Stripe Payments", "Email Templates", "Admin Dashboard", "API Routes", "SEO Optimized", "PWA Support"],
  }

  const handleGenerate = async () => {
    if (!projectName || !templateType || !description) return
    
    setIsGenerating(true)
    setGenerationStep(1)

    const prompt = `Generate a ${platform} ${templateType} template called "${projectName}".

Description: ${description}

Style: ${stylePreset}

Features to include:
${features.map(f => `- ${f}`).join("\n")}

Platform-specific requirements:
${platform === "wordpress" ? "- Use WordPress coding standards\n- Include functions.php, style.css, and template files\n- Add proper theme support declarations" : ""}
${platform === "shopify" ? "- Use Shopify Liquid templating\n- Include schema settings\n- Follow Dawn theme structure" : ""}
${platform === "figma" ? "- Create component hierarchy\n- Include design tokens\n- Add auto-layout specifications" : ""}
${platform === "nextjs" ? "- Use App Router structure\n- Include TypeScript types\n- Add Tailwind CSS styling" : ""}

Generate the complete template structure with all necessary files.`

    append({ role: "user", content: prompt })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Sparkles className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-2xl font-semibold">AI Template Generator</h1>
              <p className="text-muted-foreground">Generate custom templates with AI assistance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Configuration</CardTitle>
                <CardDescription>Define your template requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Platform Selection */}
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {platformOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setPlatform(opt.value)
                          setTemplateType("")
                          setFeatures([])
                        }}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          platform === opt.value 
                            ? "border-primary bg-primary/5" 
                            : "hover:border-primary/50"
                        }`}
                      >
                        <p className="font-medium">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Template Type */}
                <div className="space-y-2">
                  <Label>Template Type</Label>
                  <Select value={templateType} onValueChange={setTemplateType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select template type" />
                    </SelectTrigger>
                    <SelectContent>
                      {templateTypes[platform as keyof typeof templateTypes]?.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase().replace(/ /g, "-")}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Project Name */}
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    placeholder="e.g., Nordic Furniture Store"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe your template requirements, target audience, and specific functionality needed..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Style Preset */}
                <div className="space-y-2">
                  <Label>Style Preset</Label>
                  <Select value={stylePreset} onValueChange={setStylePreset}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {stylePresets.map((style) => (
                        <SelectItem key={style} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {featureOptions[platform as keyof typeof featureOptions]?.map((feature) => (
                      <label
                        key={feature}
                        className="flex items-center gap-2 p-2 rounded border cursor-pointer hover:bg-muted/50"
                      >
                        <Checkbox
                          checked={features.includes(feature)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFeatures([...features, feature])
                            } else {
                              setFeatures(features.filter((f) => f !== feature))
                            }
                          }}
                        />
                        <span className="text-sm">{feature}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button 
                  onClick={handleGenerate} 
                  disabled={isLoading || !projectName || !templateType || !description}
                  className="w-full gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Template
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            {/* Generation Progress */}
            {isLoading && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating Template
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>Processing...</span>
                    </div>
                    <Progress value={33} className="h-2" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Analyzing requirements
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Generating code structure
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="h-4 w-4" />
                      Creating files
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Generated Output */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Generated Output</CardTitle>
                  {messages.length > 0 && (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download ZIP
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="code">
                  <TabsList className="mb-4">
                    <TabsTrigger value="code">Code</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="code">
                    <div className="relative">
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm max-h-[500px] overflow-auto">
                        {messages.length > 0 ? (
                          messages.filter(m => m.role === "assistant").map((message) => (
                            <div key={message.id} className="mb-4">
                              <pre className="whitespace-pre-wrap">
                                {message.content}
                              </pre>
                            </div>
                          ))
                        ) : (
                          <div className="text-muted-foreground text-center py-12">
                            Configure your template and click Generate to see the output here
                          </div>
                        )}
                      </div>
                      {messages.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            const text = messages
                              .filter((m) => m.role === "assistant")
                              .map((m) => m.content)
                              .join("\n")
                            copyToClipboard(text)
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="files">
                    <div className="space-y-2">
                      {messages.length > 0 ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                            <FileCode className="h-4 w-4" />
                            <span className="text-sm">functions.php</span>
                            <Badge variant="secondary" className="ml-auto">PHP</Badge>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                            <FileCode className="h-4 w-4" />
                            <span className="text-sm">style.css</span>
                            <Badge variant="secondary" className="ml-auto">CSS</Badge>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                            <FileCode className="h-4 w-4" />
                            <span className="text-sm">index.php</span>
                            <Badge variant="secondary" className="ml-auto">PHP</Badge>
                          </div>
                        </div>
                      ) : (
                        <div className="text-muted-foreground text-center py-12">
                          No files generated yet
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="chat">
                    <div className="space-y-4">
                      <div className="max-h-[400px] overflow-auto space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`p-3 rounded-lg ${
                              message.role === "user" ? "bg-primary/10 ml-8" : "bg-muted mr-8"
                            }`}
                          >
                            <p className="text-xs font-medium mb-1 text-muted-foreground">
                              {message.role === "user" ? "You" : "AI Assistant"}
                            </p>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                        ))}
                      </div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault()
                          if (!input.trim() || isLoading) return
                          append({ role: "user", content: input })
                          setInput("")
                        }}
                        className="flex gap-2"
                      >
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Ask follow-up questions..."
                          disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading}>
                          Send
                        </Button>
                      </form>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Cost Estimate */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Generation Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">1 Credit</p>
                    <p className="text-sm text-muted-foreground">Estimated tokens: ~2,500</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Credits remaining</p>
                    <p className="text-lg font-semibold">47</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function GeneratorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <GeneratorContent />
    </Suspense>
  )
}
