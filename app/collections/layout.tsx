import { StoreHeader } from "@/components/store-header"
import { StoreFooter } from "@/components/store-footer"
import { CartDrawer } from "@/components/cart-drawer"

export default function CollectionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <StoreHeader />
      <main>{children}</main>
      <StoreFooter />
      <CartDrawer />
    </div>
  )
}
