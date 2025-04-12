import React from 'react';
import { Leaf, Droplet, Recycle } from 'lucide-react';
import { Link as ScrollLink, Element } from 'react-scroll';

const About = () => {
  return (
    <Element name="about" className="section bg-muted relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-accent/20 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-secondary/20 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="eco-badge mb-3">🌍 Our Mission</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Building a Sustainable Future Together
          </h2>
          <p className="text-foreground/80 text-lg">
            At Verda, we're committed to creating products that help reduce waste, conserve 
            resources, and promote a healthier planet. Our journey began with a simple idea: 
            everyday products shouldn't cost the Earth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Leaf className="w-8 h-8 text-primary" />,
              title: "100% Biodegradable",
              description: "Our products are made from materials that naturally decompose, leaving no harmful residue behind.",
            },
            {
              icon: <Droplet className="w-8 h-8 text-primary" />,
              title: "Saves 1000+ Plastic Bottles",
              description: "Each reusable product helps eliminate thousands of single-use plastics from entering our oceans.",
            },
            {
              icon: <Recycle className="w-8 h-8 text-primary" />,
              title: "Ethically Made",
              description: "Fair trade practices ensure that everyone in our supply chain receives fair compensation.",
            }
          ].map((item, index) => (
            <div 
              key={index} 
              className="card-eco group hover:bg-primary/5 hover:-translate-y-1"
            >
              <div className="p-3 mb-4 w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full">
                {item.icon}
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-foreground/70">
                {item.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 p-8 md:p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full filter blur-2xl"></div>
          <div className="relative z-10 text-center md:text-left md:flex items-center justify-between gap-8">
            <div className="md:max-w-xl mb-6 md:mb-0">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3">
                "Our mission is to build a better future by empowering conscious choices, one sustainable product at a time."
              </h3>
              <p className="text-foreground/80">
                — Emma Green, Founder of Verda
              </p>
            </div>
            <ScrollLink 
              to="contact" 
              smooth={true} 
              duration={800} 
              offset={-80}
              className="btn-primary inline-flex whitespace-nowrap cursor-pointer"
            >
              Join Our Mission
            </ScrollLink>
          </div>
        </div>
      </div>
    </Element>
  );
};

export default About;
