import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const parallaxContentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Trigger animations after component mount
    setTimeout(() => setIsLoaded(true), 100);
    
    // Add parallax scroll effect
    const handleScroll = () => {
      if (!parallaxBgRef.current || !parallaxContentRef.current) return;
      
      const scrollPosition = window.scrollY;
      // Move background slower than foreground for parallax effect
      parallaxBgRef.current.style.transform = `translateY(${scrollPosition * 0.1}px)`;
      // Move content in opposite direction for enhanced effect
      parallaxContentRef.current.style.transform = `translateY(${scrollPosition * -0.05}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div ref={parallaxBgRef} className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/40 rounded-full filter blur-3xl opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating leaf shapes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 shape-leaf bg-primary/10 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 shape-leaf bg-secondary/20 animate-float-reverse"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 shape-leaf bg-accent/30 animate-sway"></div>
        
        {/* Blob shapes */}
        <div className="absolute top-1/3 right-1/3 w-32 h-32 shape-blob bg-primary/5 animate-float-reverse"></div>
        <div className="absolute bottom-1/4 left-1/5 w-40 h-40 shape-blob-2 bg-secondary/10 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div ref={parallaxContentRef} className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 space-y-6 md:pr-8">
            <span className={`eco-badge transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>
              🌿 Sustainable Future
            </span>
            <h1 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>
              Where eco-friendly meets 
              <span className="text-primary"> everyday living</span>
            </h1>
            <p className={`text-foreground/80 text-lg md:text-xl transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>
              Build a better future with our range of sustainable products designed to reduce waste 
              and empower conscious choices, one eco-friendly product at a time.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>
              <a href="#products" className="btn-primary group hover-lift">
                Explore Products
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#about" className="btn-secondary hover-lift">
                Our Mission
              </a>
            </div>
          </div>
          
          <div className={`w-full md:w-1/2 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-full -z-10 animate-bounce-soft"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-full -z-10 animate-bounce-soft" style={{ animationDelay: '1s' }}></div>
              <img 
                src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/6811/Artboard_18.png"
                alt="People caring for the planet" 
                className="rounded-2xl shadow-lg w-full h-auto object-contain p-4 bg-white/40 backdrop-blur-sm hover-grow"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {[
            { number: '100+', text: 'Sustainable Products' },
            { number: '10K+', text: 'Plastic Bottles Saved' },
            { number: '95%', text: 'Biodegradable Materials' },
            { number: '24/7', text: 'Customer Support' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`text-center p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-border hover-lift transition-all duration-700 ease-out`}
              style={{ 
                transitionDelay: `${(index * 0.1) + 0.6}s`,
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary animate-pulse-soft">{stat.number}</h3>
              <p className="text-foreground/70">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
