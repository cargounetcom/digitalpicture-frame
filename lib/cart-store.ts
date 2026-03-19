"use client"

import { create } from "zustand"
import type { Product } from "./data"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  
  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      )
      
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          isOpen: true,
        }
      }
      
      return {
        items: [...state.items, { product, quantity: 1 }],
        isOpen: true,
      }
    })
  },
  
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }))
  },
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      ),
    }))
  },
  
  clearCart: () => set({ items: [] }),
  
  openCart: () => set({ isOpen: true }),
  
  closeCart: () => set({ isOpen: false }),
  
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  
  getTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  },
  
  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  },
}))
