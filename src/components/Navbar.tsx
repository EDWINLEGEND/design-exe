import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, ShoppingBag } from 'lucide-react';
import { useCart } from '../lib/cart-context';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl text-primary">Verda</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">About</a>
          <a href="#products" className="text-foreground/80 hover:text-primary transition-colors">Products</a>
          <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">Features</a>
          
          {/* Cart Icon */}
          <button 
            className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
            onClick={toggleCart}
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          <a href="#contact" className="btn-primary">Join Now</a>
        </nav>

        {/* Mobile Menu Button and Cart */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Cart Icon for Mobile */}
          <button 
            className="relative p-1 text-foreground/80 hover:text-primary transition-colors"
            onClick={toggleCart}
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          <button 
            className="text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg animate-slide-up">
          <div className="container-custom py-4 flex flex-col space-y-4">
            <a 
              href="#about" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#products" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </a>
            <a 
              href="#features" 
              className="text-foreground/80 hover:text-primary transition-colors py-2 border-b border-border"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#contact" 
              className="btn-primary self-start"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
