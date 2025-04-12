import React, { useRef, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../lib/cart-context';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, toggleCart } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node) && isCartOpen) {
        toggleCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, toggleCart]);

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-end">
      <div 
        ref={cartRef}
        className="bg-white w-full max-w-md h-full flex flex-col shadow-lg animate-slide-in-right"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-display text-xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart
          </h2>
          <button 
            onClick={toggleCart}
            className="btn-action rounded-full"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8 text-foreground/40" />
            </div>
            <h3 className="font-display text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-foreground/60 mb-6">Start adding some sustainable products to make a difference!</p>
            <button 
              onClick={toggleCart} 
              className="btn-primary"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b">
                  <div className="w-20 h-20 bg-muted rounded-md overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex justify-between mt-1">
                      <span className="text-primary font-medium">{item.price}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border rounded-md overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="btn-action py-1 px-2 rounded-none"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="btn-action py-1 px-2 rounded-none"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="btn-action rounded-full text-rose-500"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t p-4 space-y-4">
              <div className="flex items-center justify-between font-medium">
                <span>Subtotal</span>
                <span>{cartTotal}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={clearCart}
                  className="btn-destructive py-2"
                >
                  Clear Cart
                </button>
                <button className="btn-checkout py-2">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 