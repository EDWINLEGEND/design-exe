
import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send the data to your backend
    console.log('Form submitted:', formData);
    // Show success message
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        consent: false
      });
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact" className="section bg-gradient-to-b from-white to-accent/20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/20 rounded-full filter blur-3xl -z-10"></div>
      
      <div className="container-custom">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-primary p-8 md:p-10 text-white">
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Join Our Community
              </h2>
              <p className="mb-6 text-white/80">
                Get exclusive early access to new product launches, sustainability tips, 
                and special offers straight to your inbox.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <p className="text-sm">
                    Early access to new sustainable products before they're officially launched
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <p className="text-sm">
                    Exclusive discounts and promotions for newsletter subscribers
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <p className="text-sm">
                    Practical tips and guides on sustainable living and reducing waste
                  </p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-white/20 p-2 rounded-full mt-1">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <p className="text-sm">
                    Updates on our environmental impact and sustainability initiatives
                  </p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-10">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    Thank You for Joining!
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    You've successfully signed up for our newsletter. 
                    Get ready to receive updates on sustainable living!
                  </p>
                  <div className="eco-badge animate-pulse-soft">
                    Welcome to the Verda Community
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-6">
                    Sign Up for Updates
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="name">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-eco"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="email">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-eco"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1"
                        required
                      />
                      <label className="text-sm text-foreground/70" htmlFor="consent">
                        I agree to receive marketing communications from Verda. You can 
                        unsubscribe at any time. See our <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
                      </label>
                    </div>
                    
                    <button 
                      type="submit" 
                      className="btn-primary w-full group"
                    >
                      Subscribe Now
                      <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
