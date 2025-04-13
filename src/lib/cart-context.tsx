import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types
type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  badge?: string;
};

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

// Create provider component
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

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

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

  const clearCart = () => {
    setCartItems([]);
  };

  const openCart = () => {
    setIsOpen(true);
  };

  const closeCart = () => {
    setIsOpen(false);
  };

  const toggleCart = () => {
    setIsOpen(prev => !prev);
  };

  // Calculate total items and price
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

// Create custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 