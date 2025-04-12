
import React from 'react';
import { Leaf, Instagram, Linkedin, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
          <div className="max-w-sm">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="text-white w-6 h-6" />
              </div>
              <span className="font-display font-bold text-2xl text-primary">Verda</span>
            </a>
            <p className="text-foreground/70 mb-6">
              Creating sustainable products that help reduce waste, conserve resources, 
              and promote a healthier planet—because everyday products shouldn't cost the Earth.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Verda on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Verda on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground/60 hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Verda on YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">
                Products
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Water Bottles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Tote Bags
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Cutlery Sets
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Home Goods
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Sustainability
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-semibold text-lg mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Shipping Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors">
                    Return Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 mt-8 text-center">
          <p className="text-foreground/60 text-sm">
            © 2025 Sustainable Futures. Made with <Heart className="inline-block w-4 h-4 text-primary fill-primary" /> for the planet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
