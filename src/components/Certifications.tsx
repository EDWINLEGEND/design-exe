
import React from 'react';
import { CheckCircle, Leaf, Globe, Award, Shield } from 'lucide-react';

const Certifications = () => {
  const certifications = [
    { 
      icon: <Leaf className="w-6 h-6" />, 
      name: "FSC Certified", 
      description: "All paper products sourced from responsibly managed forests" 
    },
    { 
      icon: <Globe className="w-6 h-6" />, 
      name: "Fair Trade", 
      description: "Ensuring fair wages and working conditions for all suppliers" 
    },
    { 
      icon: <CheckCircle className="w-6 h-6" />, 
      name: "Cruelty Free", 
      description: "No animal testing in our product development process" 
    },
    { 
      icon: <Award className="w-6 h-6" />, 
      name: "B Corp Certified", 
      description: "Meeting the highest standards of social and environmental performance" 
    },
    { 
      icon: <Shield className="w-6 h-6" />, 
      name: "Climate Neutral", 
      description: "Net-zero carbon footprint across all operations" 
    }
  ];

  return (
    <section className="py-10 bg-muted/50 relative overflow-hidden animate-on-scroll">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full filter blur-3xl animate-float"></div>
      
      <div className="container-custom">
        <h3 className="text-center font-display text-2xl font-semibold mb-8">Our Certifications</h3>
        
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-border hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-primary mb-2 animate-bounce-soft" style={{ animationDelay: `${index * 0.2}s` }}>
                {cert.icon}
              </div>
              <span className="font-semibold text-sm">{cert.name}</span>
              <div className="opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 text-xs text-center text-foreground/70 mt-1">
                {cert.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
