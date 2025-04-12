import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link as ScrollLink } from 'react-scroll';
import { useCart } from '../lib/cart-context';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, toggleCart } = useCart();

  // Check scroll position for navbar style change
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationLinks = [
    { name: 'Home', to: 'hero' },
    { name: 'Products', to: 'products' },
    { name: 'Features', to: 'features' },
    { name: 'About', to: 'about' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom py-4 flex justify-between items-center">
        <ScrollLink 
          to="hero" 
          spy={true} 
          smooth={true} 
          duration={800} 
          className="font-display text-2xl font-bold flex items-center cursor-pointer" 
          offset={-80}
        >
          Eco<span className="text-primary">Store</span>
        </ScrollLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigationLinks.map((link) => (
            <ScrollLink
              key={link.name}
              to={link.to}
              spy={true}
              smooth={true}
              duration={800}
              offset={-80}
              activeClass="text-primary font-medium"
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {link.name}
            </ScrollLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleCart}
            className="btn-action relative" 
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="btn-action md:hidden" 
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white/95 backdrop-blur-md py-4 px-6 absolute top-full left-0 w-full shadow-lg animate-slide-in-right">
          <ul className="flex flex-col gap-4">
            {navigationLinks.map((link) => (
              <li key={link.name}>
                <ScrollLink
                  to={link.to}
                  spy={true}
                  smooth={true}
                  duration={800}
                  offset={-80}
                  activeClass="text-primary font-medium"
                  className="hover:text-primary transition-colors cursor-pointer block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </ScrollLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navigation; 