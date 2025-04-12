
import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Products from '../components/Products';
import Features from '../components/Features';
import Certifications from '../components/Certifications';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const Index = () => {
  const parallaxElements = useRef<HTMLDivElement[]>([]);
  const floatingLeaves = useRef<HTMLDivElement[]>([]);
  
  useEffect(() => {
    // Update document title
    document.title = "Verda - Sustainable Eco-Friendly Products";
    
    // Initialize scroll animation observer
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      elements.forEach(element => {
        observer.observe(element);
      });
    };
    
    // Initialize parallax effect
    const handleParallax = () => {
      const scrollPosition = window.scrollY;
      parallaxElements.current.forEach((element, index) => {
        const speed = 0.05 + (index * 0.01);
        const yPos = scrollPosition * speed;
        if (element) {
          element.style.transform = `translateY(${yPos}px)`;
        }
      });
    };
    
    // Initialize floating leaves animation
    const createFloatingLeaves = () => {
      floatingLeaves.current.forEach(leafContainer => {
        if (!leafContainer) return;
        
        // Clear existing leaves
        leafContainer.innerHTML = '';
        
        // Create random number of leaves (between 3 and 8)
        const numberOfLeaves = Math.floor(Math.random() * 6) + 3;
        
        for (let i = 0; i < numberOfLeaves; i++) {
          const leaf = document.createElement('div');
          leaf.className = 'absolute rounded-full animate-float';
          
          // Random properties
          const size = Math.random() * 40 + 10; // 10px to 50px
          const posX = Math.random() * 100; // 0% to 100%
          const posY = Math.random() * 100; // 0% to 100%
          const delay = Math.random() * 5; // 0s to 5s
          const duration = Math.random() * 10 + 10; // 10s to 20s
          const rotation = Math.random() * 360; // 0deg to 360deg
          const opacity = Math.random() * 0.5 + 0.1; // 0.1 to 0.6
          
          // Apply styles
          leaf.style.width = `${size}px`;
          leaf.style.height = `${size}px`;
          leaf.style.left = `${posX}%`;
          leaf.style.top = `${posY}%`;
          leaf.style.animationDelay = `${delay}s`;
          leaf.style.animationDuration = `${duration}s`;
          leaf.style.transform = `rotate(${rotation}deg)`;
          leaf.style.opacity = opacity.toString();
          leaf.style.backgroundColor = i % 2 === 0 ? 'rgb(var(--primary) / 10%)' : 'rgb(var(--secondary) / 20%)';
          leaf.style.zIndex = '-1';
          
          leafContainer.appendChild(leaf);
        }
      });
    };
    
    // Call animation functions after DOM has fully loaded
    setTimeout(() => {
      animateOnScroll();
      createFloatingLeaves();
      window.addEventListener('scroll', handleParallax);
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  const addParallaxRef = (el: HTMLDivElement) => {
    if (el && !parallaxElements.current.includes(el)) {
      parallaxElements.current.push(el);
    }
  };

  const addLeafContainerRef = (el: HTMLDivElement) => {
    if (el && !floatingLeaves.current.includes(el)) {
      floatingLeaves.current.push(el);
    }
  };

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      
      {/* Floating leaves containers */}
      <div ref={addLeafContainerRef} className="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden"></div>
      <div ref={addLeafContainerRef} className="fixed bottom-0 right-0 w-full h-screen pointer-events-none overflow-hidden"></div>
      
      {/* Parallax background elements */}
      <div ref={addParallaxRef} className="absolute top-0 right-0 w-96 h-96 bg-secondary/30 rounded-full filter blur-3xl -z-10 opacity-70"></div>
      <div ref={addParallaxRef} className="absolute top-[30%] left-0 w-80 h-80 bg-accent/20 rounded-full filter blur-3xl -z-10 opacity-60"></div>
      <div ref={addParallaxRef} className="absolute bottom-[20%] right-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl -z-10 opacity-50"></div>
      
      <Hero />
      <About />
      <Products />
      <Certifications />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
