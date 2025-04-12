import React, { useState } from 'react';
import { CheckCircle, Leaf, Globe, Award, Shield, BadgeCheck, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

const Certifications = () => {
  const [activeCert, setActiveCert] = useState<number | null>(null);
  
  const certifications = [
    { 
      icon: <Leaf className="w-6 h-6" />, 
      name: "FSC Certified", 
      description: "All paper products sourced from responsibly managed forests that provide environmental, social and economic benefits" 
    },
    { 
      icon: <Globe className="w-6 h-6" />, 
      name: "Fair Trade", 
      description: "Ensuring fair wages and safe working conditions for all workers in our supply chain across the globe" 
    },
    { 
      icon: <CheckCircle className="w-6 h-6" />, 
      name: "Cruelty Free", 
      description: "No animal testing at any stage of product development, certified by Leaping Bunny Program" 
    },
    { 
      icon: <Award className="w-6 h-6" />, 
      name: "B Corp Certified", 
      description: "Meeting the highest standards of verified social and environmental performance, transparency, and accountability" 
    },
    { 
      icon: <Shield className="w-6 h-6" />, 
      name: "Climate Neutral", 
      description: "Achieving net-zero carbon footprint by measuring, reducing, and offsetting all carbon emissions" 
    },
    { 
      icon: <BadgeCheck className="w-6 h-6" />, 
      name: "GOTS Certified", 
      description: "All cotton products meet Global Organic Textile Standard for ecological and social criteria throughout the supply chain" 
    },
    { 
      icon: <Droplet className="w-6 h-6" />, 
      name: "Water Stewardship", 
      description: "Certified commitment to water conservation, protection of watersheds, and water-efficient production processes" 
    }
  ];

  return (
    <section id="certifications" className="py-16 bg-gradient-to-b from-muted/30 to-muted/80 relative overflow-hidden animate-on-scroll">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full filter blur-3xl animate-float"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl animate-float-reverse"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="eco-badge mb-3">🌿 Quality Assured</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Our Certifications & Standards
          </h2>
          <p className="text-foreground/70">
            We believe in transparency and accountability. Our products are backed by these recognized certifications that ensure quality, sustainability, and ethical practices.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="relative group"
              onMouseEnter={() => setActiveCert(index)}
              onMouseLeave={() => setActiveCert(null)}
            >
              <div className={`flex flex-col items-center bg-white rounded-xl border ${activeCert === index ? 'border-primary shadow-lg' : 'border-border shadow-sm'} p-4 h-full hover-lift transition-all duration-300`}>
                <div className={`text-primary mb-3 transform transition-transform duration-300 ${activeCert === index ? 'scale-110' : ''}`}>
                  {cert.icon}
                </div>
                <span className="font-semibold text-sm text-center">{cert.name}</span>
                
                {/* Description popup on hover */}
                <div className={`absolute inset-0 bg-white/95 backdrop-blur-sm rounded-xl p-3 flex items-center justify-center border border-primary shadow-lg transition-all duration-300 overflow-hidden ${activeCert === index ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                  <p className="text-xs text-center text-foreground/80">
                    {cert.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <a href="#" className="text-center text-primary hover:text-primary/70 flex flex-col items-center transition-colors">
            <span className="font-medium">View Our Certification Documents</span>
            <span className="text-sm text-foreground/60 mt-1">PDF download available</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
