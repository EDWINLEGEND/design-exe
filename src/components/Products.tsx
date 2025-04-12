
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Bamboo Water Bottle",
    description: "Reusable, BPA-free bamboo water bottle with stainless steel interior. Keeps drinks cold for 24 hours and hot for 12.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    price: "$29.99",
    badges: ["100% Biodegradable", "Saves 1000+ Plastic Bottles"]
  },
  {
    id: 2,
    name: "Organic Cotton Tote",
    description: "Durable, GOTS-certified organic cotton tote bag. Perfect for groceries, shopping, and everyday use.",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800",
    price: "$19.99",
    badges: ["Ethically Made", "Zero Plastic Packaging"]
  },
  {
    id: 3,
    name: "Hemp Cutlery Set",
    description: "Portable cutlery set made from sustainable hemp fibers. Includes fork, knife, spoon, and bamboo straw.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&q=80&w=800",
    price: "$24.99",
    badges: ["100% Biodegradable", "Zero Plastic Packaging"]
  }
];

const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');

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

  return (
    <section id="products" className="section relative overflow-hidden animate-on-scroll">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl -z-10 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl -z-10 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <span className="eco-badge mb-3">🚀 New Products</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Sustainable Products for Everyday Life
          </h2>
          <p className="text-foreground/80 text-lg">
            Discover our latest eco-friendly products designed to help you reduce waste 
            while enhancing your daily routine. Sustainable living has never been easier.
          </p>
        </div>
        
        <div className="relative py-8 animate-on-scroll">
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
                    <div className="md:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                      <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
                        {product.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-4">
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
                      <p className="text-foreground/80 mb-6">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-2xl font-display font-bold text-primary animate-pulse-soft">
                          {product.price}
                        </span>
                        <div className="bg-primary/10 px-3 py-1 rounded-full text-sm text-primary animate-pulse-soft">
                          Pre-order Now
                        </div>
                      </div>
                      <button className="btn-primary hover-lift">
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
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
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
        
        <div className="mt-16 bg-muted rounded-2xl p-6 md:p-8 animate-on-scroll">
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
      </div>
    </section>
  );
};

export default Products;
