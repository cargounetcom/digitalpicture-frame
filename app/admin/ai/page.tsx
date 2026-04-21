"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button"
import { 
  Send, 
  Sparkles, 
  Code2, 
  Palette, 
  FileText, 
  Zap,
  Copy,
  Check,
  Trash2,
  Loader2,
  Settings2,
  ChevronDown,
  Plus,
  MessageSquare,
  History,
  Lightbulb,
  Image as ImageIcon,
  Mic,
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  RotateCcw
} from "lucide-react"

const modelOptions = [
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", description: "Fast and efficient" },
  { id: "gemini-2.0-pro", name: "Gemini 2.0 Pro", description: "Best quality" },
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", description: "Balanced" },
]

const promptSuggestions = [
  {
    icon: Code2,
    title: "Generate Code",
    description: "Create a React component",
    prompt: "Create a responsive React component for a pricing table with 3 tiers: Basic, Pro, and Enterprise. Include hover effects and a 'Most Popular' badge.",
  },
  {
    icon: Palette,
    title: "Design System",
    description: "Color palette & typography",
    prompt: "Create a complete design system with a modern color palette, typography scale, and spacing system for a SaaS dashboard application.",
  },
  {
    icon: FileText,
    title: "Write Content",
    description: "Marketing copy & descriptions",
    prompt: "Write compelling marketing copy for a premium WordPress theme focused on creative agencies, including tagline, hero text, and 3 feature highlights.",
  },
  {
    icon: Lightbulb,
    title: "Brainstorm Ideas",
    description: "Creative concepts",
    prompt: "Brainstorm 5 unique landing page concepts for a font marketplace that sells premium typography. Include layout ideas and key features.",
  },
]

const chatHistory = [
  { id: 1, title: "Template generation help", date: "Today" },
  { id: 2, title: "Color palette creation", date: "Yesterday" },
  { id: 3, title: "Code optimization tips", date: "2 days ago" },
]

export default function AIStudioDashboard() {
  const [input, setInput] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState(modelOptions[0])
  const [showModelDropdown, setShowModelDropdown] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  const { messages, append, isLoading, setMessages } = useChat({
    api: "/api/ai/chat",
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px"
    }
  }, [input])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    append({ role: "user", content: input })
    setInput("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleSuggestionClick = (prompt: string) => {
    if (isLoading) return
    append({ role: "user", content: prompt })
  }

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const clearChat = () => {
    setMessages([])
  }

  const getMessageText = (message: typeof messages[0]) => {
    return message.content || ""
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-64 border-r border-border flex flex-col bg-muted/30">
          {/* New Chat Button */}
          <div className="p-3">
            <Button 
              onClick={clearChat}
              variant="outline" 
              className="w-full justify-start gap-2 bg-background"
            >
              <Plus className="w-4 h-4" />
              New chat
            </Button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto px-3">
            <div className="mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Recent
              </span>
            </div>
            <div className="space-y-1">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-left rounded-lg hover:bg-muted transition-colors group"
                >
                  <MessageSquare className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <span className="truncate flex-1">{chat.title}</span>
                  <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-border">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              <History className="w-4 h-4" />
              <span>View all history</span>
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
              <Settings2 className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold">AI Studio</span>
            </div>

            {/* Model Selector */}
            <div className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-border hover:bg-muted transition-colors"
              >
                <span>{selectedModel.name}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
              
              {showModelDropdown && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-background border border-border rounded-lg shadow-lg z-50">
                  {modelOptions.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model)
                        setShowModelDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        selectedModel.id === model.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="font-medium text-sm">{model.name}</div>
                      <div className="text-xs text-muted-foreground">{model.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearChat}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            /* Welcome Screen */
            <div className="h-full flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-semibold mb-2">Welcome to AI Studio</h1>
              <p className="text-muted-foreground text-center mb-8 max-w-md">
                Powered by Google Gemini. Generate code, create designs, write content, and more.
              </p>

              {/* Suggestion Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl w-full">
                {promptSuggestions.map((suggestion, index) => {
                  const Icon = suggestion.icon
                  return (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.prompt)}
                      disabled={isLoading}
                      className="flex items-start gap-3 p-4 text-left rounded-xl border border-border hover:bg-muted/50 hover:border-primary/20 transition-all group disabled:opacity-50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{suggestion.title}</div>
                        <div className="text-xs text-muted-foreground truncate">
                          {suggestion.description}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            /* Chat Messages */
            <div className="max-w-3xl mx-auto py-6 px-4">
              {messages.map((message) => {
                const text = getMessageText(message)
                const isUser = message.role === "user"
                
                return (
                  <div key={message.id} className="mb-6">
                    {/* Message Header */}
                    <div className="flex items-center gap-2 mb-2">
                      {isUser ? (
                        <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center">
                          <span className="text-xs font-medium text-background">U</span>
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                      )}
                      <span className="text-sm font-medium">
                        {isUser ? "You" : "Gemini"}
                      </span>
                    </div>

                    {/* Message Content */}
                    <div className="pl-9">
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap">{text}</div>
                      </div>

                      {/* AI Message Actions */}
                      {!isUser && text && (
                        <div className="flex items-center gap-1 mt-3">
                          <button
                            onClick={() => copyToClipboard(text, message.id)}
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            title="Copy"
                          >
                            {copiedId === message.id ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-muted-foreground" />
                            )}
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            title="Good response"
                          >
                            <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            title="Bad response"
                          >
                            <ThumbsDown className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                            title="Regenerate"
                          >
                            <RotateCcw className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Loading State */}
              {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-sm font-medium">Gemini</span>
                  </div>
                  <div className="pl-9">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <div className="flex items-end gap-2 p-2 rounded-2xl border border-border bg-muted/30 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  {/* Left Actions */}
                  <div className="flex items-center gap-1 pb-1">
                    <button
                      type="button"
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      title="Add image"
                    >
                      <ImageIcon className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-lg hover:bg-muted transition-colors"
                      title="Voice input"
                    >
                      <Mic className="w-5 h-5 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Textarea */}
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter a prompt here..."
                    disabled={isLoading}
                    rows={1}
                    className="flex-1 bg-transparent border-0 resize-none text-sm focus:outline-none focus:ring-0 py-2 px-1 max-h-[200px] disabled:opacity-50"
                  />

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-1"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-3">
              Gemini may display inaccurate info, including about people, so double-check its responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
