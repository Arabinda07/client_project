import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, ProductColourOption } from '../types';
import { getCartSelectionKey, isSameCartSelection } from '../lib/cartItem';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, selectedColour?: ProductColourOption) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1, selectedColour?: ProductColourOption) => {
        set((state) => {
          const existingItem = state.items.find((item) =>
            isSameCartSelection(item, product.id, selectedColour?.id)
          );
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                isSameCartSelection(item, product.id, selectedColour?.id)
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...product,
                cartItemId: `${getCartSelectionKey(product.id, selectedColour?.id)}-${Date.now()}`,
                quantity,
                selectedColour,
              },
            ],
          };
        });
      },

      removeItem: (cartItemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        }));
      },

      updateQuantity: (cartItemId: string, quantity: number) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map((item) =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      cartTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      cartCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'terracotta-cart-storage',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
);
