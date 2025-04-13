import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Check, X, Trophy, Award, Star, Sparkles, Leaf, Droplets, TreePine, Users, ArrowRight, Info, X as CloseIcon, ZoomIn, Heart } from 'lucide-react';
import { useCart } from '../lib/cart-context';
import { Element } from 'react-scroll';
import { ScrollLink } from 'react-scroll';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Update products with standardized pricing and more detailed information
const products = [
  {
    id: 1,
    name: "Bamboo Toothbrush",
    description: "Sustainable bamboo handle with BPA-free nylon bristles. 100% biodegradable handle helps eliminate plastic waste from your daily routine.",
    image: "https://images.unsplash.com/photo-1553691475-f38e4026275b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFtYm9vJTIwdG9vdGglMjBicnVzaHxlbnwwfDF8MHx8fDA%3D",
    price: "From $4.99",
    priceRange: "$4.99 - $16.99",
    compareAtPrice: "$7.99",
    badges: ["100% Biodegradable Handle", "Plastic-Free Packaging"],
    eco: true,
    fullDescription: "Our bamboo toothbrushes feature handles made from 100% biodegradable bamboo, a highly sustainable resource that grows quickly without the need for pesticides or fertilizers. The bristles are made from BPA-free nylon that's gentle on gums while still being effective at removing plaque. Each toothbrush comes in plastic-free, compostable packaging with soy-based inks. Available in adult and child sizes, with soft, medium, and firm bristle options.",
    details: [
      { label: "Materials", value: "Bamboo handle, BPA-free nylon bristles" },
      { label: "Dimensions", value: "7.5 inches (Adult), 5.5 inches (Child)" },
      { label: "Options", value: "Soft, Medium, or Firm bristles" },
      { label: "Packaging", value: "Compostable cardboard" },
      { label: "End of Life", value: "Remove bristles for recycling, compost handle" }
    ],
    variants: [
      { name: "Single Adult Brush (Soft)", price: "$4.99" },
      { name: "Family Pack (4 Adult Brushes)", price: "$16.99" },
      { name: "Kids Brush", price: "$4.99" },
      { name: "Mixed Family Pack (2 Adult, 2 Kids)", price: "$16.99" }
    ]
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    description: "GOTS-certified organic cotton t-shirt made without harmful chemicals. Ethically manufactured under fair-trade conditions to ensure living wages.",
    image: "https://images.unsplash.com/photo-1739001411231-4fc0f4140259?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG9yZ2FuaWMlMjB0JTIwc2hpcnR8ZW58MHwxfDB8fHww",
    price: "From $24.99",
    priceRange: "$24.99 - $29.99",
    compareAtPrice: "$34.99",
    badges: ["Ethically Made", "Zero Chemical Processing"],
    eco: true,
    fullDescription: "Our organic cotton t-shirts are made from 100% GOTS-certified organic cotton, grown without harmful pesticides or synthetic fertilizers. The fabric is exceptionally soft and breathable, making it perfect for everyday wear. Every shirt is ethically manufactured in facilities that ensure fair wages and safe working conditions for all workers. The fabric undergoes minimal processing with no chemical treatments, making it safer for your skin and the environment.",
    details: [
      { label: "Materials", value: "100% GOTS-certified organic cotton" },
      { label: "Weight", value: "160 gsm medium weight jersey" },
      { label: "Care", value: "Machine wash cold, tumble dry low" },
      { label: "Sizes", value: "XS, S, M, L, XL, XXL" },
      { label: "Colors", value: "Natural, Black, Forest Green, Ocean Blue" }
    ],
    variants: [
      { name: "Natural - All Sizes", price: "$24.99" },
      { name: "Colored Options - All Sizes", price: "$26.99" },
      { name: "Long Sleeve Version - All Colors", price: "$29.99" }
    ]
  },
  {
    id: 3,
    name: "Reusable Glass Water Bottle",
    description: "Durable borosilicate glass bottle with protective silicone sleeve. Leak-proof and free from BPA, lead, and other toxins found in plastic bottles.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800",
    price: "From $24.99",
    priceRange: "$24.99 - $34.99",
    compareAtPrice: "$39.99",
    badges: ["Infinitely Recyclable", "Plastic Waste Reduction"],
    eco: true,
    fullDescription: "Our reusable glass water bottles are made from durable borosilicate glass that can withstand temperature changes without cracking. Each bottle includes a protective silicone sleeve that improves grip and protects against breakage. The stainless steel cap creates a leak-proof seal and includes a convenient carry loop. These bottles are completely free from BPA, lead, phthalates, and other toxins commonly found in plastic alternatives. Available in multiple sizes and sleeve colors.",
    details: [
      { label: "Materials", value: "Borosilicate glass, food-grade silicone, stainless steel" },
      { label: "Capacity", value: "500ml (16oz), 750ml (25oz), 1L (34oz)" },
      { label: "Features", value: "Leak-proof, dishwasher safe, wide mouth for ice" },
      { label: "Sleeve Colors", value: "Sage Green, Ocean Blue, Sunset Orange, Pebble Gray" },
      { label: "Temperature Range", value: "-20°C to 100°C (-4°F to 212°F)" }
    ],
    variants: [
      { name: "16oz Bottle - All Colors", price: "$24.99" },
      { name: "25oz Bottle - All Colors", price: "$29.99" },
      { name: "34oz Bottle - All Colors", price: "$34.99" }
    ]
  },
  {
    id: 4,
    name: "Reusable Coffee Cup",
    description: "Insulated bamboo fiber coffee cup that keeps your drinks hot. Eliminates single-use cup waste with a stylish, sustainable alternative.",
    image: "https://images.unsplash.com/photo-1669824614885-abb2a862553a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJldXNhYmxlJTIwY29mZmVlJTIwY3VwfGVufDB8fDB8fHww",
    price: "From $18.99",
    priceRange: "$18.99 - $24.99",
    compareAtPrice: "$27.99",
    badges: ["Heat Insulated", "Replaces 500+ Disposable Cups"],
    eco: true,
    fullDescription: "Our reusable coffee cups are made from bamboo fiber and lined with a food-grade silicone interior that doesn't affect the taste of your beverage. The double-walled design keeps hot drinks hot and cold drinks cold for hours longer than single-use cups. Each cup comes with a secure, splash-resistant lid and a comfortable heat-resistant sleeve. These cups fit in standard car cup holders and most coffee shop machines, making them a convenient, sustainable choice for your daily coffee routine.",
    details: [
      { label: "Materials", value: "Bamboo fiber, food-grade silicone, cornstarch-based bioplastic" },
      { label: "Capacity", value: "12oz (350ml), 16oz (475ml)" },
      { label: "Features", value: "Double-walled insulation, splash-resistant lid, heat-resistant sleeve" },
      { label: "Colors", value: "Natural Bamboo, Midnight Black, Forest Green, Ocean Blue" },
      { label: "Care", value: "Hand wash recommended, not microwave safe" }
    ],
    variants: [
      { name: "12oz Cup - All Colors", price: "$18.99" },
      { name: "16oz Cup - All Colors", price: "$22.99" },
      { name: "Gift Set (12oz Cup + Accessories)", price: "$24.99" }
    ]
  },
  {
    id: 5,
    name: "Menstrual Cup",
    description: "Medical-grade silicone menstrual cup that can be reused for years. Comfortable, leak-free protection that drastically reduces period waste.",
    image: "https://images.unsplash.com/photo-1556037823-5b389f0e1bc1?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    price: "From $29.99",
    priceRange: "$29.99 - $49.99",
    compareAtPrice: "$39.99",
    badges: ["Medical-Grade Silicone", "Saves 1000s of Disposables"],
    eco: true,
    fullDescription: "Our menstrual cups are made from 100% medical-grade silicone that's hypoallergenic and free from BPA, latex, and dyes. Each cup can be reused for up to 10 years with proper care, replacing thousands of disposable period products. The soft, flexible design conforms to your body for comfortable, reliable protection for up to 12 hours. Each cup comes with a natural cotton storage pouch and detailed instructions for use and care. Available in multiple sizes to ensure the perfect fit.",
    details: [
      { label: "Materials", value: "100% medical-grade silicone" },
      { label: "Sizes", value: "Small (Light Flow/No Births), Medium (Regular Flow), Large (Heavy Flow/Post-Birth)" },
      { label: "Capacity", value: "Small: 15ml, Medium: 25ml, Large: 30ml" },
      { label: "Duration", value: "Up to 12 hours of protection" },
      { label: "Includes", value: "Cup, organic cotton storage pouch, detailed instructions" }
    ],
    variants: [
      { name: "Single Cup - Any Size", price: "$29.99" },
      { name: "Starter Kit (Cup + Sterilizer)", price: "$39.99" },
      { name: "Complete Set (2 Cups + Sterilizer + Extras)", price: "$49.99" }
    ]
  }
];

const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('next');
  const { addToCart } = useCart();
  const [addedToCartId, setAddedToCartId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeProduct, setActiveProduct] = useState<any>(null);
  const [activeVariant, setActiveVariant] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    // Auto-rotate carousel every 7 seconds
    const interval = setInterval(() => {
      nextSlide();
    }, 7000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('next');
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setDirection('prev');
    setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
      setTimeout(() => setIsAnimating(false), 50);
    }, 300);
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    
    // Show added to cart feedback
    setAddedToCartId(product.id);
    setTimeout(() => {
      setAddedToCartId(null);
    }, 1500);
  };

  const openProductModal = (product: any) => {
    setActiveProduct(product);
    setActiveVariant(0); // Reset to first variant
    setShowModal(true);
  };

  const closeProductModal = () => {
    setShowModal(false);
    setActiveProduct(null);
  };

  const toggleWishlist = (productId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Custom success button style for "Added to Cart"
  const successStyle = {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    backgroundSize: '200% 100%',
    backgroundPosition: '0% 0%'
  };

  return (
    <Element name="products" className="section relative overflow-hidden animate-on-scroll">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl -z-10 animate-float"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl -z-10 animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-on-scroll">
          <Badge variant="outline" className="eco-badge mb-3 px-3 py-1">🚀 New Products</Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Sustainable Products for Everyday Life
          </h2>
          <p className="text-foreground/80 text-lg">
            Discover our latest eco-friendly products designed to help you reduce waste 
            while enhancing your daily routine. Sustainable living has never been easier.
          </p>
        </div>
        
        <div className="relative animate-on-scroll">
          {/* Product Carousel */}
          <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl">
            <div 
              className={`flex transition-all duration-500 ease-in-out ${
                isAnimating 
                  ? direction === 'next'
                    ? 'opacity-0 translate-x-10'
                    : 'opacity-0 -translate-x-10'
                  : 'opacity-100 translate-x-0'
              }`}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="min-w-full">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative group">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.eco && (
                          <Badge variant="secondary" className="bg-green-500/90 text-white hover:bg-green-500 flex items-center gap-1 shadow-lg">
                            <Leaf className="w-3 h-3" />
                            Eco-Friendly
                          </Badge>
                        )}
                      </div>
                      
                      {product.compareAtPrice && (
                        <Badge variant="destructive" className="absolute top-3 right-3 bg-accent/90 hover:bg-accent shadow-lg">
                          Save {Math.round(((parseFloat(product.compareAtPrice.substring(1)) - parseFloat(product.priceRange.split(' - ')[0].substring(1))) / parseFloat(product.compareAtPrice.substring(1))) * 100)}%
                        </Badge>
                      )}
                      
                      <button 
                        className="absolute bottom-3 right-3 p-2 rounded-full bg-white/80 text-primary hover:bg-white transition-colors shadow-md opacity-0 group-hover:opacity-100"
                        onClick={(e) => toggleWishlist(product.id, e)}
                      >
                        <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>
                    </div>
                    
                    <div className="md:w-1/2 p-4 md:p-6 lg:p-8 flex flex-col justify-center">
                      <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold mb-2">
                        {product.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {product.badges.map((badge, index) => (
                          <Badge 
                            key={index} 
                            variant="outline"
                            className="animate-bounce-soft"
                            style={{ animationDelay: `${index * 0.2}s` }}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-foreground/80 mb-4 text-sm md:text-base line-clamp-3 md:line-clamp-none">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col">
                          <span className="text-xl md:text-2xl font-display font-bold text-primary">
                            {product.price}
                          </span>
                          {product.compareAtPrice && (
                            <span className="text-xs md:text-sm text-muted-foreground line-through">
                              {product.compareAtPrice}
                            </span>
                          )}
                        </div>
                        <Badge variant="outline" className="bg-gradient-to-r from-primary/20 to-primary/10 text-primary border-primary/10">
                          Multiple Options
                        </Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <Button 
                          variant="default"
                          className="flex-1 hover:-translate-y-1 transition-transform"
                          onClick={() => handleAddToCart(product)}
                          style={addedToCartId === product.id ? successStyle : undefined}
                        >
                          {addedToCartId === product.id ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Added to Cart
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                        <Button 
                          variant="outline"
                          className="hover:-translate-y-1 transition-transform"
                          onClick={() => openProductModal(product)}
                        >
                          <Info className="w-4 h-4 mr-2" />
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Controls */}
            <Button
              variant="ghost" 
              size="icon"
              onClick={prevSlide}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/90 text-primary rounded-full shadow-md z-10 h-10 w-10 p-0"
              aria-label="Previous product"
              disabled={isAnimating}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon" 
              onClick={nextSlide}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/90 text-primary rounded-full shadow-md z-10 h-10 w-10 p-0"
              aria-label="Next product"
              disabled={isAnimating}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            
            {/* Pagination Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (activeIndex > index) {
                      setDirection('prev');
                    } else if (activeIndex < index) {
                      setDirection('next');
                    }
                    setActiveIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-gradient-to-r from-primary to-primary/70 w-6' 
                      : 'bg-primary/30 w-2 hover:bg-primary/50'
                  }`}
                  aria-label={`Go to product ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Modal - Using shadcn Dialog */}
        <Dialog open={showModal && activeProduct !== null} onOpenChange={(open) => !open && closeProductModal()}>
          <DialogContent className="sm:max-w-[95vw] md:max-w-[90vw] lg:max-w-4xl max-h-[90vh] p-0 overflow-hidden">
            <div className="max-h-[90vh] overflow-y-auto p-1 sm:p-2 md:p-6">
              <DialogHeader className="px-4 pt-5 pb-2">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl md:text-2xl font-display font-bold">{activeProduct?.name}</DialogTitle>
                  <DialogClose className="rounded-full hover:bg-muted p-2 transition-colors">
                    <CloseIcon className="w-4 h-4" />
                  </DialogClose>
                </div>
              </DialogHeader>
              
              {activeProduct && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4">
                  <div>
                    <div className="rounded-xl overflow-hidden relative group mb-4 aspect-square">
                      <img 
                        src={activeProduct.image} 
                        alt={activeProduct.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      
                      {activeProduct.eco && (
                        <Badge variant="secondary" className="absolute top-3 left-3 bg-green-500/90 text-white hover:bg-green-500 flex items-center gap-1 shadow-lg">
                          <Leaf className="w-3 h-3" />
                          Eco-Friendly
                        </Badge>
                      )}
                      
                      <Button 
                        variant="outline"
                        size="icon"
                        className="absolute bottom-3 right-3 rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {activeProduct.badges.map((badge: string, index: number) => (
                        <Badge key={index} variant="outline" className="justify-center py-1.5 text-center">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex items-baseline mb-2 gap-2">
                      <span className="text-xl font-bold text-primary">
                        {activeProduct.variants[activeVariant].price}
                      </span>
                      {activeProduct.compareAtPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {activeProduct.compareAtPrice}
                        </span>
                      )}
                    </div>
                    
                    <Tabs defaultValue="description" className="w-full mt-2">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="options">Options</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                      </TabsList>
                      <TabsContent value="description" className="mt-4">
                        <p className="text-foreground/80 text-sm md:text-base">{activeProduct.fullDescription}</p>
                      </TabsContent>
                      <TabsContent value="options" className="mt-4">
                        <div className="grid grid-cols-1 gap-2">
                          {activeProduct.variants.map((variant: any, index: number) => (
                            <div
                              key={index}
                              className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                activeVariant === index 
                                  ? 'border-primary bg-primary/5' 
                                  : 'border-border hover:border-primary/30'
                              }`}
                              onClick={() => setActiveVariant(index)}
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-sm md:text-base">{variant.name}</span>
                                <span className="font-semibold text-sm md:text-base">{variant.price}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="details" className="mt-4">
                        <div className="border rounded-lg divide-y">
                          {activeProduct.details.map((detail: any, index: number) => (
                            <div key={index} className="flex p-3 text-sm md:text-base">
                              <span className="font-medium w-1/3">{detail.label}:</span>
                              <span className="text-foreground/80 w-2/3">{detail.value}</span>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <Separator className="my-6" />
                    
                    <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          handleAddToCart({
                            ...activeProduct,
                            selectedVariant: activeProduct.variants[activeVariant]
                          });
                          closeProductModal();
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="flex-1"
                        onClick={(e) => toggleWishlist(activeProduct.id, e)}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${wishlist.includes(activeProduct.id) ? 'fill-red-500 text-red-500' : ''}`} />
                        {wishlist.includes(activeProduct.id) ? 'Saved' : 'Save for Later'}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Sustainability Comparison Table */}
        <div className="mt-16 animate-on-scroll">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              Why Choose Sustainable?
            </h2>
            <p className="text-foreground/80">
              See how our sustainable products compare to conventional alternatives
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="w-full bg-white">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left font-display">Feature</th>
                  <th className="p-4 text-center font-display text-primary">Sustainable Option</th>
                  <th className="p-4 text-center font-display text-gray-500">Conventional Option</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-secondary/10">
                  <td className="p-4 font-medium">Environmental Impact</td>
                  <td className="p-4 text-center bg-green-50">
                    <div className="flex flex-col items-center">
                      <Check className="w-5 h-5 text-primary mx-auto mb-1" />
                      <span className="text-sm text-primary/80">Minimal impact, often biodegradable</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <X className="w-5 h-5 text-destructive mx-auto mb-1" />
                      <span className="text-sm text-gray-500">Significant waste & pollution</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-secondary/10">
                  <td className="p-4 font-medium">Durability</td>
                  <td className="p-4 text-center bg-green-50">
                    <div className="flex flex-col items-center">
                      <Check className="w-5 h-5 text-primary mx-auto mb-1" />
                      <span className="text-sm text-primary/80">Designed for longevity & repair</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <X className="w-5 h-5 text-destructive mx-auto mb-1" />
                      <span className="text-sm text-gray-500">Often designed for replacement</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-secondary/10">
                  <td className="p-4 font-medium">Chemical Content</td>
                  <td className="p-4 text-center bg-green-50">
                    <div className="flex flex-col items-center">
                      <Check className="w-5 h-5 text-primary mx-auto mb-1" />
                      <span className="text-sm text-primary/80">Free from harmful toxins</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <X className="w-5 h-5 text-destructive mx-auto mb-1" />
                      <span className="text-sm text-gray-500">Often contains BPA, phthalates & more</span>
                    </div>
                  </td>
                </tr>
                <tr className="border-b hover:bg-secondary/10">
                  <td className="p-4 font-medium">End of Life</td>
                  <td className="p-4 text-center bg-green-50">
                    <div className="flex flex-col items-center">
                      <Check className="w-5 h-5 text-primary mx-auto mb-1" />
                      <span className="text-sm text-primary/80">Compostable or easily recyclable</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <X className="w-5 h-5 text-destructive mx-auto mb-1" />
                      <span className="text-sm text-gray-500">Landfill for centuries</span>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-secondary/10">
                  <td className="p-4 font-medium">Carbon Footprint</td>
                  <td className="p-4 text-center bg-green-50">
                    <div className="flex flex-col items-center">
                      <Check className="w-5 h-5 text-primary mx-auto mb-1" />
                      <span className="text-sm text-primary/80">85% lower emissions on average</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <X className="w-5 h-5 text-destructive mx-auto mb-1" />
                      <span className="text-sm text-gray-500">High emissions from production & transport</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Community Impact */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Our Community Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Droplets className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary">12,482</div>
                </div>
                <h3 className="text-xl font-medium mb-2">Plastic Bottles Saved</h3>
                <p className="text-gray-600 mb-4">Each reusable bottle replaces an average of 167 single-use bottles annually</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary h-2.5 rounded-full" style={{ width: '83%' }}></div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Goal: 15,000</span>
                  <span className="font-medium text-primary">83% Complete</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center">
                    <TreePine className="h-7 w-7 text-secondary" />
                  </div>
                  <div className="text-3xl font-bold text-secondary">3,547</div>
                </div>
                <h3 className="text-xl font-medium mb-2">Trees Planted</h3>
                <p className="text-gray-600 mb-4">One tree is planted for every 5 sustainable products purchased</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-secondary h-2.5 rounded-full" style={{ width: '71%' }}></div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Goal: 5,000</span>
                  <span className="font-medium text-secondary">71% Complete</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-14 w-14 rounded-full bg-accent/10 flex items-center justify-center">
                    <Users className="h-7 w-7 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent">8,953</div>
                </div>
                <h3 className="text-xl font-medium mb-2">Active Members</h3>
                <p className="text-gray-600 mb-4">Our community grows by an average of 250 new members each month</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-accent h-2.5 rounded-full" style={{ width: '89%' }}></div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">Goal: 10,000</span>
                  <span className="font-medium text-accent">89% Complete</span>
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-medium px-8">
                Join Our Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="mt-4 text-gray-600 max-w-lg mx-auto">Join thousands of eco-conscious individuals making a difference one sustainable choice at a time.</p>
            </div>
          </div>
        </section>
      </div>
    </Element>
  );
};

export default Products;
