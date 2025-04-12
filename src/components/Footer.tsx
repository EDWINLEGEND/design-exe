import React, { useState } from 'react';
import { Leaf, Instagram, Linkedin, Youtube, Heart, Twitter, Facebook, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubscriptionStatus('error');
      return;
    }
    
    // Normally would call an API here
    setSubscriptionStatus('success');
    setTimeout(() => {
      setSubscriptionStatus('idle');
      setEmail('');
    }, 3000);
  };

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: 'easeInOutQuart'
    });
  };

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-border">
      <div className="container-custom">
        {/* Newsletter Signup */}
        <div className="mb-16 max-w-3xl mx-auto">
          <div className="bg-primary/5 rounded-2xl p-6 md:p-8 text-center">
            <h3 className="font-display text-2xl font-bold mb-2">Stay in the loop</h3>
            <p className="text-foreground/70 mb-6 max-w-md mx-auto">
              Subscribe to our newsletter for updates on new products, sustainability tips, and exclusive offers.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full py-3 px-4 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
                {subscriptionStatus === 'error' && (
                  <div className="absolute -bottom-6 left-0 text-xs text-red-500 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Please enter a valid email
                  </div>
                )}
              </div>
              <button 
                type="submit" 
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </form>
            
            {subscriptionStatus === 'success' && (
              <div className="mt-4 text-sm text-primary flex items-center justify-center">
                <CheckCircle className="w-4 h-4 mr-1" />
                Thank you for subscribing!
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div onClick={scrollToTop} className="flex items-center gap-2 mb-4 cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl text-primary">Verda</span>
            </div>
            <p className="text-foreground/70 mb-6">
              Creating sustainable products that help reduce waste, conserve resources, 
              and promote a healthier planet—because everyday products shouldn't cost the Earth.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3 mb-6">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Verda on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Verda on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Verda on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Verda on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Verda on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
            
            {/* Payment Methods */}
            <div>
              <p className="text-sm text-foreground/50 mb-2">Secure Payment Methods</p>
              <div className="flex gap-2">
                <div className="p-1.5 bg-gray-100 rounded">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/visa.svg" className="w-8 h-5 opacity-70" alt="Visa" />
                </div>
                <div className="p-1.5 bg-gray-100 rounded">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mastercard.svg" className="w-8 h-5 opacity-70" alt="Mastercard" />
                </div>
                <div className="p-1.5 bg-gray-100 rounded">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/applepay.svg" className="w-8 h-5 opacity-70" alt="Apple Pay" />
                </div>
                <div className="p-1.5 bg-gray-100 rounded">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/paypal.svg" className="w-8 h-5 opacity-70" alt="PayPal" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Menu Columns */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">
                Products
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Bamboo Toothbrush
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Organic Cotton Tees
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Glass Water Bottles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Reusable Coffee Cups
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Menstrual Cups
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    All Products
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <ScrollLink 
                    to="about"
                    smooth={true}
                    duration={800}
                    offset={-80}
                    className="text-foreground/70 hover:text-primary transition-colors cursor-pointer"
                  >
                    About Us
                  </ScrollLink>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Impact Reports
                  </a>
                </li>
                <li>
                  <a href="#certifications" className="text-foreground/70 hover:text-primary transition-colors">
                    Certifications
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <ScrollLink 
                    to="contact"
                    smooth={true}
                    duration={800}
                    offset={-80}
                    className="text-foreground/70 hover:text-primary transition-colors cursor-pointer"
                  >
                    Contact
                  </ScrollLink>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">
                Help & Support
              </h4>
              <ul className="space-y-2.5">
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Returns Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Track Order
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Verda Sustainability. Made with <Heart className="inline-block w-4 h-4 text-primary fill-primary" /> for the planet.
          </p>
          
          <div className="flex items-center gap-4 text-sm text-foreground/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
