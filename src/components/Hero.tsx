import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Leaf, Zap, Award, Trophy, Sparkles, Shield } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

// Add animation keyframes 
const animationStyles = `
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes float-reverse {
  0% { transform: translateY(0px); }
  50% { transform: translateY(10px); }
  100% { transform: translateY(0px); }
}

@keyframes pulse-soft {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

@keyframes button-press {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

@keyframes shine {
  0% { background-position: -100px; }
  100% { background-position: 200px; }
}

.animate-on-hover-float:hover {
  animation: float 2s ease-in-out infinite;
}

.animate-on-hover-float-reverse:hover {
  animation: float-reverse 2s ease-in-out infinite;
}

.animate-on-hover-pulse:hover {
  animation: pulse-soft 2s ease-in-out infinite;
}

.button-shine {
  position: relative;
  overflow: hidden;
}

.button-shine:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
  transform: skewX(-25deg);
  animation: shine 2s infinite;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.button-shine:hover:after {
  opacity: 1;
}

.button-press:active {
  animation: button-press 0.2s ease-in-out;
  transform: scale(0.95);
}

.shadow-3d {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.shadow-3d:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-5px);
}

.icon-float {
  transition: transform 0.3s ease;
  transform-origin: center;
}

.icon-float:hover {
  transform: translateY(-5px) scale(1.1);
}

.icon-forward {
  z-index: 5;
  position: relative;
}
`;

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
    <Element name="hero" className="min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden flex flex-col justify-center bg-white">
      {/* Add animation styles */}
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} />
      
      {/* Parallax Background Elements - Repositioned to be near the content */}
      <div ref={parallaxBgRef} className="absolute top-0 left-0 w-full h-full -z-10">
        {/* Repositioned background elements to be centered around content */}
        <div className="absolute top-1/4 right-1/3 w-72 h-72 bg-secondary/30 rounded-full filter blur-3xl opacity-70 animate-on-hover-float"></div>
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-accent/40 rounded-full filter blur-3xl opacity-60 animate-on-hover-float-reverse"></div>
        
        {/* Floating leaf shapes - repositioned closer to center */}
        <div className="absolute top-1/3 left-1/3 w-16 h-16 shape-leaf bg-primary/10 animate-on-hover-float"></div>
        <div className="absolute bottom-2/5 right-2/5 w-12 h-12 shape-leaf bg-secondary/20 animate-on-hover-float-reverse"></div>
        <div className="absolute top-2/4 right-1/3 w-8 h-8 shape-leaf bg-accent/30 animate-on-hover-pulse"></div>
        
        {/* Game particles - repositioned closer to center */}
        <div className="absolute top-1/3 left-1/2 w-4 h-4 rounded-full bg-yellow-300/70 animate-on-hover-pulse"></div>
        <div className="absolute bottom-1/3 right-1/2 w-3 h-3 rounded-full bg-purple-400/70 animate-on-hover-pulse"></div>
        <div className="absolute top-1/2 left-2/5 w-2 h-2 rounded-full bg-blue-300/70 animate-on-hover-pulse"></div>
        
        {/* Blob shapes - repositioned closer to center */}
        <div className="absolute top-2/5 right-2/5 w-32 h-32 shape-blob bg-primary/5 animate-on-hover-float-reverse"></div>
        <div className="absolute bottom-2/5 left-2/5 w-40 h-40 shape-blob-2 bg-secondary/10 animate-on-hover-float"></div>
      </div>
      
      <div ref={parallaxContentRef} className="container-custom relative z-10 mt-auto mb-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 space-y-6 md:pr-8">
            {/* Achievement banner at top */}
            <div className={`flex items-center gap-2 p-2 px-3 bg-white/70 backdrop-blur-sm rounded-xl shadow-3d border border-primary/10 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: '50ms' }}>
              <div className="relative icon-forward icon-float">
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
            
            <span className={`eco-badge transition-all duration-700 animate-on-hover-pulse ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: '150ms' }}>
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
            <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-3d border border-secondary/10 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0 -translate-y-4'}`} style={{ transitionDelay: '450ms' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-secondary/10 ring-2 ring-secondary/50 flex items-center justify-center icon-forward icon-float">
                  <Trophy className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">Level {currentLevel}</h3>
                    <span className="level-badge py-0.5 animate-on-hover-pulse">Eco Enthusiast</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Saving the planet, one product at a time</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-accent icon-forward icon-float" />
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
                className="btn-primary group hover-lift cursor-pointer button-shine button-press shadow-3d"
              >
                Start Your Quest
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 icon-forward" />
              </ScrollLink>
              
              <ScrollLink 
                to="about" 
                smooth={true} 
                duration={800} 
                offset={-80}
                className="btn-secondary hover-lift cursor-pointer button-shine button-press shadow-3d"
              >
                Learn More
              </ScrollLink>
            </div>
          </div>
          
          <div className={`w-full md:w-1/2 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`} style={{ transitionDelay: '650ms' }}>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary rounded-full -z-10 animate-on-hover-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent rounded-full -z-10 animate-on-hover-pulse"></div>
              
              {/* Achievement badges overlaid on image - added z-index to ensure visibility */}
              <div className="absolute -left-4 top-1/4 transform -translate-y-1/2 flex flex-col gap-2 items-center z-10">
                <div className="w-16 h-16 rounded-full bg-white shadow-3d p-1 animate-on-hover-float">
                  <div className="w-full h-full rounded-full bg-green-100 flex items-center justify-center">
                    <Award className="w-8 h-8 text-green-600 icon-forward" />
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-white shadow-3d p-1 animate-on-hover-float-reverse">
                  <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-blue-600 icon-forward" />
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 top-2/3 transform -translate-y-1/2 flex flex-col gap-2 items-center z-10">
                <div className="w-14 h-14 rounded-full bg-white shadow-3d p-1 animate-on-hover-float">
                  <div className="w-full h-full rounded-full bg-secondary/20 flex items-center justify-center">
                    <Zap className="w-7 h-7 text-secondary icon-forward" />
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white shadow-3d p-0.5 animate-on-hover-float-reverse">
                  <div className="w-full h-full rounded-full bg-accent/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent icon-forward" />
                  </div>
                </div>
              </div>
              
              <img 
                src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/6811/Artboard_18.png"
                alt="People caring for the planet" 
                className="rounded-2xl shadow-3d w-full h-auto object-contain p-4 bg-white/70 backdrop-blur-sm animate-on-hover-pulse"
              />
              
              {/* Floating game-like elements */}
              <div className="absolute -top-3 -right-3 legendary-badge z-10 animate-on-hover-pulse">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 icon-forward" />
                  <span className="font-bold">Premium Eco</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats with gamification styles */}
        <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div 
            className={`game-card py-5 transition-all duration-700 ease-out shadow-3d animate-on-hover-float`}
            style={{ 
              transitionDelay: `0.7s`,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 icon-float">
                <Leaf className="w-6 h-6 text-primary icon-forward" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-primary">100+</h3>
              <p className="text-foreground/70 text-sm">Sustainable Products</p>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full shadow-3d flex items-center justify-center animate-on-hover-pulse">
                <Sparkles className="w-3 h-3 text-amber-500 icon-forward" />
              </div>
            </div>
          </div>
          
          <div 
            className={`game-card-rare py-5 transition-all duration-700 ease-out shadow-3d animate-on-hover-float-reverse`}
            style={{ 
              transitionDelay: `0.8s`,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center mb-3 icon-float">
                <Shield className="w-6 h-6 text-cyan-600 icon-forward" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-cyan-600">{carbonSaved}</h3>
              <p className="text-foreground/70 text-sm">kg CO₂ Saved</p>
              <div className="absolute -top-1 -right-1 rare-badge text-[10px] py-0.5 px-1.5 shadow-3d animate-on-hover-pulse">
                <div className="flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3 icon-forward" />
                  Rare
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`game-card-epic py-5 transition-all duration-700 ease-out shadow-3d animate-on-hover-float`}
            style={{ 
              transitionDelay: `0.9s`,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-3 icon-float">
                <Trophy className="w-6 h-6 text-secondary icon-forward" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-secondary">{ecoAchievements}</h3>
              <p className="text-foreground/70 text-sm">Achievements Unlocked</p>
              <div className="absolute -top-1 -right-1 epic-badge text-[10px] py-0.5 px-1.5 shadow-3d animate-on-hover-pulse">
                <div className="flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3 icon-forward" />
                  Epic
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`game-card py-5 transition-all duration-700 ease-out shadow-3d animate-on-hover-float-reverse`}
            style={{ 
              transitionDelay: `1s`,
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <div className="relative flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-3 icon-float">
                <Zap className="w-6 h-6 text-accent icon-forward" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-accent">24/7</h3>
              <p className="text-foreground/70 text-sm">Customer Support</p>
              <div className="absolute -top-1 -right-1 xp-badge text-[10px] py-0.5 px-1.5 shadow-3d animate-on-hover-pulse">
                +10 XP
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Level up notification */}
      {showLevelUp && (
        <div className="fixed bottom-8 right-8 z-50 animate-achievement">
          <div className="relative bg-white rounded-xl shadow-3d p-4 border-2 border-secondary flex items-center gap-4 max-w-xs animate-on-hover-pulse">
            <div className="absolute -top-3 -left-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center icon-float">
              <Trophy className="w-5 h-5 text-white icon-forward" />
            </div>
            
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
              <Award className="w-8 h-8 text-secondary icon-forward" />
            </div>
            
            <div>
              <div className="font-bold text-secondary">Level Up!</div>
              <p className="text-xs text-muted-foreground">You've reached level 3: Eco Enthusiast</p>
              <div className="text-xs text-primary font-medium">+500 XP</div>
            </div>
            
            <button className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full shadow-3d text-muted-foreground hover:text-foreground button-press">×</button>
          </div>
        </div>
      )}
    </Element>
  );
};

export default Hero;
