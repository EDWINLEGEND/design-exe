import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Switching to Verda products has reduced my household plastic waste by over 70%. The bamboo water bottle is my everyday companion now!",
      author: "Sarah J.",
      title: "Eco Enthusiast",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "As someone who runs an eco-conscious business, partnering with Verda has helped us align our values with our office supplies. Our team loves the products!",
      author: "Michael T.",
      title: "Small Business Owner",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "The quality of these sustainable products is exceptional. I've had my tote bag for over a year of heavy use and it still looks brand new.",
      author: "Elena R.",
      title: "Frequent Shopper",
      rating: 4,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "The menstrual cup has been life-changing. It's comfortable, eco-friendly, and has saved me so much money on disposable products.",
      author: "Jamie K.",
      title: "Healthcare Worker",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
    },
    {
      quote: "I was skeptical about the reusable coffee cup keeping drinks hot, but I'm amazed! It outperforms my old plastic travel mug and looks stylish too.",
      author: "Daniel W.",
      title: "Coffee Enthusiast",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Function to set up automatic rotation
  const setupAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    
    if (!isPaused) {
      autoplayRef.current = setInterval(() => {
        nextTestimonial();
      }, 6000);
    }
  };

  // Initialize autoplay
  useEffect(() => {
    setupAutoplay();
    
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [currentIndex, isPaused]);

  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('next');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('prev');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className="py-16 relative overflow-hidden animate-on-scroll">
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/30 rounded-full filter blur-3xl -z-10 animate-float"></div>
      <div className="absolute top-20 -right-20 w-52 h-52 bg-primary/20 rounded-full filter blur-3xl -z-10 animate-float-reverse"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="eco-badge mb-3">💬 Customer Stories</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
        </div>
        
        <div 
          className="relative max-w-4xl mx-auto" 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 relative overflow-hidden">
            <div className="absolute -top-6 -left-6 text-primary opacity-20">
              <Quote className="w-16 h-16" />
            </div>
            
            <div 
              className={`transition-all duration-500 ease-in-out ${
                isAnimating 
                  ? direction === 'next'
                    ? 'opacity-0 translate-x-10'
                    : 'opacity-0 -translate-x-10'
                  : 'opacity-100 translate-x-0'
              }`}
            >
              <p className="text-lg md:text-xl italic text-foreground/80 mb-6 relative z-10">
                {testimonials[currentIndex].quote}
              </p>
              
              <div className="flex items-center flex-wrap justify-between">
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
                
                <div className="flex mt-2 sm:mt-0">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* Progress bar indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-linear"
                style={{ 
                  width: `${(currentIndex / (testimonials.length - 1)) * 100}%`,
                  animationName: isPaused ? 'none' : 'progressAnimation',
                  animationDuration: '6s',
                  animationTimingFunction: 'linear',
                  animationIterationCount: '1',
                  animationPlayState: isPaused ? 'paused' : 'running'
                }}
              ></div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <button 
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 md:-left-6 transform -translate-y-1/2 bg-white hover:bg-white text-primary p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10"
            aria-label="Previous testimonial"
            disabled={isAnimating}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 md:-right-6 transform -translate-y-1/2 bg-white hover:bg-white text-primary p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 z-10"
            aria-label="Next testimonial"
            disabled={isAnimating}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          
          {/* Pagination Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (index > currentIndex) {
                    setDirection('next');
                  } else if (index < currentIndex) {
                    setDirection('prev');
                  }
                  setCurrentIndex(index);
                }}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary w-8' 
                    : 'bg-primary/30 w-2.5 hover:bg-primary/50'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#" 
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
