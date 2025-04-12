import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Check, X } from 'lucide-react';
import { useCart } from '../lib/cart-context';

const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush",
    description: "Sustainable bamboo handle with BPA-free nylon bristles. 100% biodegradable handle helps eliminate plastic waste from your daily routine.",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&q=80&w=800",
    price: "$4.99",
    badges: ["100% Biodegradable Handle", "Plastic-Free Packaging"]
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    description: "GOTS-certified organic cotton t-shirt made without harmful chemicals. Ethically manufactured under fair-trade conditions to ensure living wages.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
    price: "$24.99",
    badges: ["Ethically Made", "Zero Chemical Processing"]
  },
  {
    id: 3,
    name: "Reusable Glass Water Bottle",
    description: "Durable borosilicate glass bottle with protective silicone sleeve. Leak-proof and free from BPA, lead, and other toxins found in plastic bottles.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800",
    price: "$32.99",
    badges: ["Infinitely Recyclable", "Plastic Waste Reduction"]
  },
  {
    id: 4,
    name: "Reusable Coffee Cup",
    description: "Insulated bamboo fiber coffee cup that keeps your drinks hot. Eliminates single-use cup waste with a stylish, sustainable alternative.",
    image: "/src/images/coffeecup.webp",
    price: "$18.99",
    badges: ["Heat Insulated", "Replaces 500+ Disposable Cups"]
  },
  {
    id: 5,
    name: "Menstrual Cup",
    description: "Medical-grade silicone menstrual cup that can be reused for years. Comfortable, leak-free protection that drastically reduces period waste.",
    image: "/src/images/menstrualcup.png",
    price: "$29.99",
    badges: ["Medical-Grade Silicone", "Saves 1000s of Disposables"]
  }
];

const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const { addToCart } = useCart();
  const [addedToCartId, setAddedToCartId] = useState<number | null>(null);

  useEffect(() => {
    // Auto-rotate carousel every 7 seconds
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('next');
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('prev');
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    
    // Show added to cart feedback
    setAddedToCartId(product.id);
    setTimeout(() => {
      setAddedToCartId(null);
    }, 1500);
  };

  return (
    <section id="products" className="section relative overflow-hidden animate-on-scroll">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl -z-10 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl -z-10 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
          <span className="eco-badge mb-3">🚀 New Products</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Sustainable Products for Everyday Life
          </h2>
          <p className="text-foreground/80 text-lg">
            Discover our latest eco-friendly products designed to help you reduce waste 
            while enhancing your daily routine. Sustainable living has never been easier.
          </p>
        </div>
        
        <div className="relative animate-on-scroll">
          {/* Product Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
            <div 
              className={`flex transition-all duration-500 ease-in-out ${
                isAnimating 
                  ? direction === 'next'
                    ? 'opacity-0 translate-x-10'
                    : 'opacity-0 -translate-x-10'
                  : 'opacity-100 translate-x-0'
              }`}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="min-w-full">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover aspect-[4/3] md:aspect-auto hover-grow transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="md:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                      <h3 className="font-display text-2xl md:text-3xl font-bold mb-2">
                        {product.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.badges.map((badge, index) => (
                          <span 
                            key={index} 
                            className="eco-badge animate-bounce-soft"
                            style={{ animationDelay: `${index * 0.2}s` }}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <p className="text-foreground/80 mb-4">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-display font-bold text-primary animate-pulse-soft">
                          {product.price}
                        </span>
                        <div className="bg-primary/10 px-3 py-1 rounded-full text-sm text-primary animate-pulse-soft">
                          Pre-order Now
                        </div>
                      </div>
                      <button 
                        className={`btn-primary hover-lift ${addedToCartId === product.id ? 'bg-green-600' : ''}`}
                        onClick={() => handleAddToCart(product)}
                      >
                        {addedToCartId === product.id ? (
                          <>
                            <Check className="w-5 h-5" />
                            Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Controls */}
            <button 
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md hover-grow z-10"
              aria-label="Previous product"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md hover-grow z-10"
              aria-label="Next product"
              disabled={isAnimating}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Pagination Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (activeIndex > index) {
                      setDirection('prev');
                    } else if (activeIndex < index) {
                      setDirection('next');
                    }
                    setActiveIndex(index);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    index === activeIndex 
                      ? 'bg-primary w-8 animate-pulse-soft' 
                      : 'bg-primary/30 w-2.5'
                  }`}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-10 bg-muted rounded-2xl p-6 md:p-8 animate-on-scroll">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-display text-xl md:text-2xl font-bold mb-2">
                Impact Counter
              </h3>
              <p className="text-foreground/80">
                Together, we've saved <span className="text-primary font-semibold animate-pulse-soft">10,250</span> plastic bottles so far.
              </p>
            </div>
            
            <div className="w-full md:w-2/3 bg-white rounded-full h-5 overflow-hidden shadow-inner">
              <div 
                className="bg-primary h-full rounded-full animate-gradient"
                style={{ 
                  width: '67%',
                  backgroundImage: 'linear-gradient(90deg, rgba(var(--primary), 0.7) 0%, rgba(var(--primary), 1) 50%, rgba(var(--primary), 0.7) 100%)'
                }}
              >
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Comparison Table */}
        <div className="mt-16 animate-on-scroll">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Why Choose Sustainable?
            </h2>
            <p className="text-foreground/80">
              See how our sustainable products compare to conventional alternatives
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="w-full bg-white">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-display">Feature</th>
                  <th className="p-4 text-center font-display text-primary">Sustainable Option</th>
                  <th className="p-4 text-center font-display text-gray-500">Conventional Option</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4">Biodegradable Materials</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4">Free from Harmful Chemicals</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4">Reduces Plastic Waste</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4">Ethically Manufactured</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4">Lower Carbon Footprint</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                </tr>
                <tr className="border-b hover:bg-muted/30">
                  <td className="p-4">Reusable for Years</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                </tr>
                <tr className="hover:bg-muted/30">
                  <td className="p-4">Cost-Effective Long Term</td>
                  <td className="p-4 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                  <td className="p-4 text-center"><X className="w-5 h-5 text-destructive mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
