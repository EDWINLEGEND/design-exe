/**
 * === FILE: src/lib/cart-context.tsx ===
 * Short File Summary: React Context for a simple shopping cart demo. Provides provider + hook with state (items, open state) and actions (add/remove/update/clear, open/close/toggle) and computed totals for count and price.
 * Main exports:
 * - CartProvider: Context provider managing cart state and exposing actions + derived totals.
 * - useCart: Hook to consume cart context with runtime safety.
 * External deps: React (createContext/useContext/useState/useEffect), internal: none.
 * Assumptions: Client-side React. Currency formatting/locale are handled by consumers. Demo data initializes cart for UX preview; replace with real data in production.
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types
/**
 * Represents one line item in the cart.
 * - id: Stable product identifier (number for demo; would be string/UUID in prod).
 * - price: Unit price in currency units (no cents scaling in this demo).
 * - quantity: Positive integer; 0 removes item.
 * - badge: Optional marketing label for UI chip.
 */
 type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  badge?: string;
};

/** Public shape of the cart context, consumed via useCart(). */
 type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  cartCount: number;
  totalItems: number;
  totalPrice: number;
};

// Create context with a default value
const CartContext = createContext<CartContextType | undefined>(undefined);

// Sample products for demo
const demoProducts: Omit<CartItem, 'quantity'>[] = [
  {
    id: 1,
    name: "Bamboo Toothbrush",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&q=80",
    badge: "Plastic-Free"
  },
  {
    id: 2,
    name: "Reusable Water Bottle",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    badge: "Zero Waste"
  },
  {
    id: 3,
    name: "Organic Cotton Tote",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500&q=80",
    badge: "Sustainable"
  }
];

/**
 * CartProvider
 * - Purpose: Owns cart state and exposes CRUD actions + UI open state.
 * - Props:
 *   - children: ReactNode subtree that will access the cart context.
 * - Returns: <CartContext.Provider> with state/actions/derived totals.
 * - Side effects: Demo-only useEffect seeds initial cart items for UX.
 * - Lifecycle: Rerenders when cartItems or isOpen setState triggers.
 */
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // For demo purposes, initialize cart with sample items
  React.useEffect(() => {
    if (cartItems.length === 0) {
      setCartItems([
        { ...demoProducts[0], quantity: 1 },
        { ...demoProducts[1], quantity: 2 },
      ]);
    }
  }, []);

  /**
   * Add an item to the cart. If item exists, increment quantity; else insert.
   * @param item - Product info without quantity (quantity defaults to 1 on insert)
   */
  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // Increase quantity of existing item
        return prevItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  /**
   * Remove an item from the cart entirely by id.
   * @param id - Product identifier.
   */
  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  /**
   * Update the quantity of an existing item; removes when quantity <= 0.
   * @param id - Product identifier.
   * @param quantity - Desired quantity; if <= 0, item is removed.
   */
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  /** Clear the cart completely. */
  const clearCart = () => {
    setCartItems([]);
  };

  /** Open the cart UI (e.g., drawer/sheet). */
  const openCart = () => {
    setIsOpen(true);
  };

  /** Close the cart UI. */
  const closeCart = () => {
    setIsOpen(false);
  };

  /** Toggle the cart UI open state. */
  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };

  // Calculate total items and price
  // O(n) over cart length; cheap at typical UI scales
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Use totalItems as cartCount for UI indicators
  const cartCount = totalItems;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isOpen,
        openCart,
        closeCart,
        toggleCart,
        cartCount,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * useCart
 * - Purpose: Consume the cart context safely.
 * - Returns: CartContextType value with items/actions/derived totals.
 * - Errors: Throws if used outside of <CartProvider> to aid debugging.
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};