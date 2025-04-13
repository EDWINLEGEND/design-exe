import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Leaf, Zap, Award, Trophy, Sparkles, Shield } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const parallaxContentRef = useRef<HTMLDivElement>(null);
  
  // Mock gamification data
  const currentLevel = 3;
  const xpPoints = 720;
  const xpToNextLevel = 1000;
  const carbonSaved = "1,250";
  const ecoAchievements = 8;
  
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
    
    // Mock level up notification
    const timer = setTimeout(() => {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 5000);
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <Element name="hero" className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden flex flex-col justify-center">
      {/* Parallax Background Elements */}
      <div ref={parallaxBgRef} className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/40 rounded-full filter blur-3xl opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating leaf shapes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 shape-leaf bg-primary/10 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 shape-leaf bg-secondary/20 animate-float-reverse"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 shape-leaf bg-accent/30 animate-sway"></div>
        
        {/* Game particles */}
        <div className="absolute top-1/5 left-1/2 w-4 h-4 rounded-full bg-yellow-300/70 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/5 w-3 h-3 rounded-full bg-purple-400/70 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-2/3 left-1/3 w-2 h-2 rounded-full bg-blue-300/70 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Blob shapes */}
        <div className="absolute top-1/3 right-1/3 w-32 h-32 shape-blob bg-primary/5 animate-float-reverse"></div>
        <div className="absolute bottom-1/4 left-1/5 w-40 h-40 shape-blob-2 bg-secondary/10 animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <div ref={parallaxContentRef} className="container-custom relative z-10 mt-auto mb-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 space-y-6 md:pr-8">
            {/* Achievement banner at top */}
            <div className={`flex items-center gap-2 p-2 px-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-sm border border-primary/10 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: '50ms' }}>
              <div className="relative">
                <Shield className="w-5 h-5 text-primary" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border-2 border-primary"></span>
              </div>
              <div>
                <p className="text-xs font-medium">Your daily mission</p>
                <p className="text-xs text-primary font-bold">Explore 3 eco-products today</p>
              </div>
              <div className="ml-auto">
                <div className="text-xs font-medium text-muted-foreground">1/3</div>
                <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
            
            <span className={`eco-badge transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: '150ms' }}>
              🌿 Green Guardian
            </span>
            
            <h1 className={`font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: '250ms' }}>
              Level up your 
              <span className="text-primary"> eco journey</span>
            </h1>
            
            <p className={`text-foreground/80 text-lg md:text-xl transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: '350ms' }}>
              Join thousands of eco-warriors making a difference. Earn rewards, unlock achievements, and 
              save the planet with each sustainable choice.
            </p>
            
            {/* Player level card */}
            <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md border border-secondary/10 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: '450ms' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-secondary/10 ring-2 ring-secondary/50 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">Level {currentLevel}</h3>
                    <span className="level-badge py-0.5">Eco Enthusiast</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Saving the planet, one product at a time</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-accent" />
                    <span>Experience</span>
                  </div>
                  <span className="font-medium">{xpPoints}/{xpToNextLevel} XP</span>
                </div>
                
                <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full progress-bar-xp"
                    style={{ width: `${(xpPoints/xpToNextLevel) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: '550ms' }}>
              <ScrollLink 
                to="products" 
                smooth={true} 
                duration={800} 
                offset={-80}
                className="btn-primary group hover-lift cursor-pointer"
              >
                Start Your Quest
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </ScrollLink>
              
              <ScrollLink 
                to="about" 
                smooth={true} 
                duration={800} 
                offset={-80}
                className="btn-secondary hover-lift cursor-pointer"
              >
                Learn More
              </ScrollLink>
            </div>
          </div>
          
          <div className={`w-full md:w-1/2 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`} style={{ transitionDelay: '650ms' }}>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-full -z-10 animate-bounce-soft"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-full -z-10 animate-bounce-soft" style={{ animationDelay: '1s' }}></div>
              
              {/* Achievement badges overlaid on image */}
              <div className="absolute -left-4 top-1/4 transform -translate-y-1/2 flex flex-col gap-2 items-center">
                <div className="w-16 h-16 rounded-full bg-white shadow-lg p-1">
                  <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-white shadow-lg p-1">
                  <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 top-2/3 transform -translate-y-1/2 flex flex-col gap-2 items-center">
                <div className="w-14 h-14 rounded-full bg-white shadow-lg p-1">
                  <div className="w-full h-full rounded-full bg-secondary/20 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-secondary" />
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white shadow-lg p-0.5">
                  <div className="w-full h-full rounded-full bg-accent/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                </div>
              </div>
              
              <img 
                src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/6811/Artboard_18.png"
                alt="People caring for the planet" 
                className="rounded-2xl shadow-lg w-full h-auto object-contain p-4 bg-white/70 backdrop-blur-sm hover-grow"
              />
              
              {/* Floating game-like elements */}
              <div className="absolute -top-3 -right-3 legendary-badge">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-bold">Premium Eco</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats with gamification styles */}
        <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div 
            className={`game-card py-5 transition-all duration-700 ease-out`}
            style={{ 
              transitionDelay: `0.7s`,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <Leaf className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary animate-pulse-soft">100+</h3>
              <p className="text-foreground/70 text-sm">Sustainable Products</p>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow flex items-center justify-center animate-pulse-soft">
                <Sparkles className="w-3 h-3 text-amber-500" />
              </div>
            </div>
          </div>
          
          <div 
            className={`game-card-rare py-5 transition-all duration-700 ease-out`}
            style={{ 
              transitionDelay: `0.8s`,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-cyan-600" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-cyan-600 animate-pulse-soft">{carbonSaved}</h3>
              <p className="text-foreground/70 text-sm">kg CO₂ Saved</p>
              <div className="absolute -top-1 -right-1 rare-badge text-[10px] py-0.5 px-1.5 shadow-sm animate-pulse-soft">
                <div className="flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3" />
                  Rare
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`game-card-epic py-5 transition-all duration-700 ease-out`}
            style={{ 
              transitionDelay: `0.9s`,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-secondary animate-pulse-soft">{ecoAchievements}</h3>
              <p className="text-foreground/70 text-sm">Achievements Unlocked</p>
              <div className="absolute -top-1 -right-1 epic-badge text-[10px] py-0.5 px-1.5 shadow-sm animate-pulse-soft">
                <div className="flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3" />
                  Epic
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`game-card py-5 transition-all duration-700 ease-out`}
            style={{ 
              transitionDelay: `1s`,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-accent animate-pulse-soft">24/7</h3>
              <p className="text-foreground/70 text-sm">Customer Support</p>
              <div className="absolute -top-1 -right-1 xp-badge text-[10px] py-0.5 px-1.5 shadow-sm animate-pulse-soft">
                +10 XP
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Level up notification */}
      {showLevelUp && (
        <div className="fixed bottom-8 right-8 z-50 animate-achievement">
          <div className="relative bg-white rounded-xl shadow-xl p-4 border-2 border-secondary flex items-center gap-4 max-w-xs">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center animate-pulse">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <Award className="w-8 h-8 text-secondary" />
            </div>
            
            <div>
              <div className="font-bold text-secondary">Level Up!</div>
              <p className="text-xs text-muted-foreground">You've reached level 3: Eco Enthusiast</p>
              <div className="text-xs text-primary font-medium">+500 XP</div>
            </div>
            
            <button className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full shadow text-muted-foreground hover:text-foreground">×</button>
          </div>
        </div>
      )}
    </Element>
  );
};

export default Hero;
