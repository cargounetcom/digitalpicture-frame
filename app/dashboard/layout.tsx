import Link from "next/link"
import { Sparkles, Download, FileCode, Home, ArrowLeft } from "lucide-react"

const dashboardLinks = [
  { href: "/dashboard", icon: Home, label: "Overview" },
  { href: "/dashboard/generator", icon: Sparkles, label: "AI Generator" },
  { href: "/dashboard/downloads", icon: Download, label: "Downloads" },
  { href: "/dashboard/licenses", icon: FileCode, label: "Licenses" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to Home</span>
              </Link>
              <span className="text-muted-foreground/50">|</span>
              <span className="font-semibold">Dashboard</span>
            </div>
            <div className="flex items-center gap-1">
              {dashboardLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Page Content */}
      {children}
    </div>
  )
}
