import React from 'react';
import { Globe, Shield, Truck, Leaf, Recycle, Droplet } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

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
    <Element name="features" className="section bg-accent/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl -z-10 animate-float"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll">
          <span className="eco-badge mb-3">🌟 Why Choose Verda</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Features & Benefits
          </h2>
          <p className="text-foreground/80 text-lg">
            Our products aren't just good for the planet—they're designed to enhance your 
            everyday life with thoughtful features and lasting quality.
          </p>
        </div>
        
        {featureGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-16 last:mb-0 animate-on-scroll">
            <h3 className="text-center font-display text-2xl font-semibold mb-10">
              {group.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {group.features.map((feature, index) => (
                <div 
                  key={index}
                  className="card-eco text-center group hover-lift"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-white border border-primary/20 group-hover:bg-primary/10 transition-colors animate-on-scroll">
                    <div className="text-primary animate-bounce-soft" style={{ animationDelay: `${index * 0.2}s` }}>
                      {feature.icon}
                    </div>
                  </div>
                  <h4 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-foreground/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        <div className="mt-16 flex flex-col md:flex-row gap-8 bg-white rounded-2xl overflow-hidden shadow-lg animate-on-scroll hover-lift">
          <div className="md:w-1/2 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&q=80&w=800"
              alt="Person using eco-friendly products" 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Join the Sustainable Revolution
            </h3>
            <p className="text-foreground/80 mb-6">
              Every Verda product you use helps create a ripple effect of positive change. 
              Our customers have already helped save over 10,000 plastic bottles from ending up in landfills and oceans.
            </p>
            <div className="bg-muted p-4 rounded-lg mb-6 hover-grow">
              <p className="italic text-foreground/70">
                "These products have helped me reduce my plastic waste by 80% in just three months. 
                The quality is exceptional and they look beautiful too!" 
                <span className="font-semibold block mt-2">— Sarah J., Verified Customer</span>
              </p>
            </div>
            <ScrollLink 
              to="contact" 
              smooth={true} 
              duration={800} 
              offset={-80}
              className="btn-primary self-start hover-glow animate-wiggle cursor-pointer" 
              style={{ animationDelay: '1s' }}
            >
              Get Started Today
            </ScrollLink>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default Features;
