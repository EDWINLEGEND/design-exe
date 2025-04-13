import React from 'react';
import { Globe, Shield, Truck, Leaf, Recycle, Droplet } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

// Enhanced animation keyframes styles
const animationStyles = `
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce-soft {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

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

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-slide-up {
  animation: slide-up 1s ease-out forwards;
}

.animate-bounce-soft {
  animation: bounce-soft 3s ease-in-out infinite;
}

.animate-on-hover-float:hover {
  animation: float 2s ease-in-out infinite;
}

.animate-on-hover-float-reverse:hover {
  animation: float-reverse 2s ease-in-out infinite;
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
`;

const Features = () => {
  const featureGroups = [
    {
      title: "Product Benefits",
      features: [
        {
          icon: <Globe className="w-10 h-10" />,
          title: "Eco-Friendly Materials",
          description: "Made from sustainable resources that reduce environmental impact."
        },
        {
          icon: <Shield className="w-10 h-10" />,
          title: "Durable & Lightweight",
          description: "Built to last without adding unnecessary weight to your daily carry."
        },
        {
          icon: <Truck className="w-10 h-10" />,
          title: "Carbon-Neutral Shipping",
          description: "We offset 100% of carbon emissions produced during shipping."
        }
      ]
    },
    {
      title: "Environmental Impact",
      features: [
        {
          icon: <Leaf className="w-10 h-10" />,
          title: "Zero Plastic Packaging",
          description: "All packaging is plastic-free and made from recycled materials."
        },
        {
          icon: <Recycle className="w-10 h-10" />,
          title: "Circular Economy",
          description: "Products designed for reuse, repair, and eventually full recycling."
        },
        {
          icon: <Droplet className="w-10 h-10" />,
          title: "Water Conservation",
          description: "Production processes that use 80% less water than traditional methods."
        }
      ]
    }
  ];

  return (
    <Element name="features" className="section relative overflow-hidden bg-white">
      <style>{animationStyles}</style>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Designed for the Planet<span className="text-primary">.</span>
          </h2>
          <p className="text-foreground/80 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Our products don't just minimize environmental impact—they actively contribute to a healthier planet.
            Here's what makes our offerings different from conventional alternatives.
          </p>
        </div>

        <div className="space-y-16">
          {/* Product Benefits */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-display text-center mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              Product Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {featureGroups[0].features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-3d border border-accent/5 hover:shadow-md transition-all opacity-0 animate-slide-up animate-on-hover-float"
                  style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                >
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary mx-auto icon-float">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-center">{feature.title}</h4>
                  <p className="text-foreground/70 text-sm text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Environmental Impact */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-display text-center mb-10 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s' }}>
              Environmental Impact
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {featureGroups[1].features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-3d border border-accent/5 hover:shadow-md transition-all opacity-0 animate-slide-up animate-on-hover-float-reverse"
                  style={{ animationDelay: `${1.4 + index * 0.1}s` }}
                >
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-secondary mx-auto icon-float">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-center">{feature.title}</h4>
                  <p className="text-foreground/70 text-sm text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Join the revolution section */}
        <div className="mt-24 text-center">
          <div className="inline-block bg-primary/5 text-primary px-4 py-2 rounded-full font-medium text-sm mb-4 animate-bounce-soft">
            Join The Sustainable Revolution
          </div>
          <div className="max-w-2xl mx-auto">
            <blockquote className="text-lg md:text-xl italic text-foreground/80 mb-6">
              "Switching to these products has not only reduced my environmental footprint, 
              but has also improved the quality of my everyday life."
            </blockquote>
            <div className="text-sm text-foreground/60 mb-8">
              — Amanda K., Customer since 2022
            </div>
            <ScrollLink 
              to="contact" 
              smooth={true} 
              duration={800} 
              offset={-80}
              className="btn-primary shadow-3d animate-on-hover-float"
            >
              Learn More About Our Impact
            </ScrollLink>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Features;
