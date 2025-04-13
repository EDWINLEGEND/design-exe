import React, { useRef, useEffect } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Leaf, Zap } from 'lucide-react';
import { useCart } from '../lib/cart-context';

const Cart = () => {
  const { 
    isOpen, 
    closeCart, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    totalItems,
    totalPrice 
  } = useCart();
  
  const cartRef = useRef<HTMLDivElement>(null);
  
  // Calculate XP rewards - 10 XP per ₹83 spent (previously $1)
  const totalXP = Math.round(totalPrice * 10);
  
  // Track for clicking outside the cart
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        closeCart();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when cart is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, closeCart]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-end">
      <div 
        ref={cartRef}
        className="bg-white w-full max-w-md h-full flex flex-col shadow-xl animate-slide-in-right"
      >
        {/* Cart Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-primary w-5 h-5" />
            <h2 className="font-display font-bold text-lg">Your Cart</h2>
            <div className="text-sm text-muted-foreground">{totalItems} items</div>
          </div>
          <button 
            onClick={closeCart}
            className="text-foreground/70 hover:text-foreground transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto py-4 px-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="text-foreground/40 w-8 h-8" />
              </div>
              <h3 className="font-medium text-lg mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">Add sustainable products to your cart to earn eco-points!</p>
              <button 
                className="btn-primary"
                onClick={closeCart}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Game Mission */}
              <div className="bg-secondary/10 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <Leaf className="text-secondary w-4 h-4" />
                  <h3 className="font-medium text-sm">Eco Mission</h3>
                </div>
                <p className="text-xs text-foreground/80 mb-2">Complete your first order with 3+ items to earn the "Eco Starter" badge!</p>
                <div className="w-full h-1.5 bg-white/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full progress-bar-level"
                    style={{ width: `${Math.min(100, (totalItems/3) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-foreground/70">
                  <span>{totalItems}/3 items</span>
                  <span>{totalItems >= 3 ? 'Mission complete!' : `${3 - totalItems} more to go`}</span>
                </div>
              </div>
              
              {/* Cart Items */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-lg bg-muted/50 overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <span className="font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 mt-1">
                        {item.badge && (
                          <div className="eco-badge py-0.5 px-2 text-xs">{item.badge}</div>
                        )}
                        <div className="flex items-center gap-1 ml-2">
                          <Zap className="text-accent w-3 h-3" />
                          <span className="text-xs text-accent-foreground">+{Math.round(item.price * 10 * item.quantity)} XP</span>
                        </div>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-muted hover:bg-muted/70 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-muted hover:bg-muted/70 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-foreground/60 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-border p-4">
            {/* XP Rewards */}
            <div className="bg-accent/10 rounded-xl p-3 mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Zap className="text-accent w-4 h-4" />
                  <span className="font-medium text-sm">XP Rewards</span>
                </div>
                <span className="text-accent font-bold">{totalXP} XP</span>
              </div>
              <p className="text-xs text-foreground/70 mt-1">You'll earn XP points for this purchase!</p>
            </div>
            
            {/* Carbon Offset Option */}
            <div className="flex items-center justify-between p-3 border border-border rounded-lg mb-4 hover:bg-muted/30 transition-all cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md border-2 border-primary flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-sm"></div>
                </div>
                <div>
                  <div className="text-sm font-medium">Carbon offset</div>
                  <div className="text-xs text-muted-foreground">Add ₹165 to offset delivery emissions</div>
                </div>
              </div>
              <div className="xp-badge py-0.5 px-2 text-xs">+30 XP</div>
            </div>
            
            {/* Summary */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>₹414</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Carbon offset</span>
                <span>₹165</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-border">
                <span>Total</span>
                <span>₹{(totalPrice + 414 + 165).toFixed(2)}</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={clearCart}
                className="btn-outline"
              >
                Clear Cart
              </button>
              <button className="btn-primary">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 