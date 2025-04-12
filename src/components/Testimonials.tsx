
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Switching to Verda products has reduced my household plastic waste by over 70%. The bamboo water bottle is my everyday companion now!",
      author: "Sarah J.",
      title: "Eco Enthusiast",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "As someone who runs an eco-conscious business, partnering with Verda has helped us align our values with our office supplies. Our team loves the products!",
      author: "Michael T.",
      title: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "The quality of these sustainable products is exceptional. I've had my tote bag for over a year of heavy use and it still looks brand new.",
      author: "Elena R.",
      title: "Frequent Shopper",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  return (
    <section className="py-16 relative overflow-hidden animate-on-scroll">
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/30 rounded-full filter blur-3xl -z-10 animate-float"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="eco-badge mb-3">💬 Customer Stories</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 relative">
            <div className="absolute -top-6 -left-6 text-primary opacity-20">
              <Quote className="w-16 h-16" />
            </div>
            
            <div 
              className={`transition-all duration-500 ease-in-out ${
                isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              <p className="text-lg md:text-xl italic text-foreground/80 mb-8 relative z-10">
                {testimonials[currentIndex].quote}
              </p>
              
              <div className="flex items-center">
                <div className="mr-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].author} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                  />
                </div>
                <div>
                  <h4 className="font-display font-semibold">
                    {testimonials[currentIndex].author}
                  </h4>
                  <p className="text-foreground/60 text-sm">
                    {testimonials[currentIndex].title}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Pagination Indicators */}
            <div className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    index === currentIndex 
                      ? 'bg-primary w-8 animate-pulse-soft' 
                      : 'bg-primary/30 w-2.5'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Navigation Controls */}
          <button 
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md hover-grow z-10"
            aria-label="Previous testimonial"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md hover-grow z-10"
            aria-label="Next testimonial"
            disabled={isAnimating}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 eco-badge px-4 py-2 hover-lift"
          >
            Watch Customer Video Testimonials
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
