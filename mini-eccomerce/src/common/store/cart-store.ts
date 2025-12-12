import { create } from "zustand";
import type { Product } from "../types";

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addProductToCart: (value: Product) => void;
  removeProductFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  getTotal: () => number;
}

const loadCart = (): CartItem[] => {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
};

export const useCartStore = create<CartStore>((set,get) => ({
  //cart: [],
  cart: loadCart(),
  addProductToCart: (newProduct) =>
    set((state) => {
      const existing = state.cart.find(
        (product) => product.id === newProduct.id
      );
      let updatedCart;

      if (existing) {
        updatedCart = state.cart.map((product) =>
          product.id === newProduct.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        updatedCart = [...state.cart, { ...newProduct, quantity: 1 }];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  removeProductFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),
  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },
  increaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decreaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),

  getTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
