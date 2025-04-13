import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf, ShoppingBag, Award, Zap, Trophy, Bell, UserCircle, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../lib/cart-context';
import { Link as ScrollLink } from 'react-scroll';
import { Button } from '@/components/ui/button';

// Navigation items
const NAV_ITEMS = [
  { name: 'About', href: 'about' },
  { name: 'Products', href: 'products' },
  { name: 'Features', href: 'features' },
  { name: 'Contact', href: 'contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();

  // Gamification data (would come from a context in a full implementation)
  const userLevel = 3;
  const xpPoints = 720;
  const xpToNextLevel = 1000;
  const achievements = 8;
  const newNotifications = 2;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <ScrollLink 
          to="hero" 
          smooth={true} 
          duration={800} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl text-primary">Verda</span>
        </ScrollLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
          <ScrollLink 
            to="about" 
            spy={true} 
            smooth={true} 
            duration={800} 
            offset={-80}
            className="text-foreground/80 hover:text-primary transition-colors cursor-pointer"
            activeClass="text-primary"
          >
            About
          </ScrollLink>
          
          <ScrollLink 
            to="products" 
            spy={true} 
            smooth={true} 
            duration={800} 
            offset={-80}
            className="text-foreground/80 hover:text-primary transition-colors cursor-pointer"
            activeClass="text-primary"
          >
            Products
          </ScrollLink>
          
          <ScrollLink 
            to="features" 
            spy={true} 
            smooth={true} 
            duration={800} 
            offset={-80}
            className="text-foreground/80 hover:text-primary transition-colors cursor-pointer"
            activeClass="text-primary"
          >
            Features
          </ScrollLink>
          
          {/* Gamification Stats */}
          <div className="flex items-center gap-3 border-l border-r border-border/40 px-4 py-1">
            {/* Level */}
            <div className="flex items-center gap-1 group">
              <div className="relative">
                <Trophy className="text-secondary w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {userLevel}
                </span>
              </div>
              
              {/* Tooltip */}
              <div className="invisible group-hover:visible absolute mt-2 top-full left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-xl shadow-lg z-30 w-56 text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none">
                <div className="font-semibold text-secondary mb-1">Level {userLevel}: Eco Enthusiast</div>
                <div className="flex items-center mb-2">
                  <div className="text-xs text-muted-foreground">XP: {xpPoints}/{xpToNextLevel}</div>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${(xpPoints/xpToNextLevel) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs mt-1 text-muted-foreground">Next level: 280 XP needed</div>
              </div>
            </div>
            
            {/* XP Points */}
            <div className="flex items-center gap-1 group">
              <div className="flex items-center">
                <Zap className="text-accent w-5 h-5" />
                <span className="text-xs font-semibold text-accent-foreground">{xpPoints}</span>
              </div>
              
              {/* Tooltip */}
              <div className="invisible group-hover:visible absolute mt-2 top-full left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-xl shadow-lg z-30 w-56 text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none">
                <div className="text-accent font-semibold mb-1">Experience Points</div>
                <div className="text-xs text-muted-foreground mb-2">Earn XP for every sustainable action!</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-xs">+ 50 XP: First purchase</div>
                  <div className="text-xs">+ 25 XP: Share on social</div>
                  <div className="text-xs">+ 100 XP: Monthly streak</div>
                  <div className="text-xs">+ 10 XP: Review a product</div>
                </div>
              </div>
            </div>
            
            {/* Achievements */}
            <div className="flex items-center gap-1 group">
              <div className="relative">
                <Award className="text-primary w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {achievements}
                </span>
              </div>
              
              {/* Tooltip */}
              <div className="invisible group-hover:visible absolute mt-2 top-full left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-xl shadow-lg z-30 w-64 text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none">
                <div className="font-semibold text-primary mb-2">Your Eco Achievements</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="text-xs">First Purchase</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="text-xs">Review Champion</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                    <span className="text-xs">Plastic Saver</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-xs text-muted-foreground">Water Guardian</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-border text-xs text-center text-muted-foreground">
                  Completed 8 of 12 achievements
                </div>
              </div>
            </div>
          </div>
          
          {/* Notification Bell */}
          <div className="relative">
            <button 
              className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {newNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {newNotifications}
                </span>
              )}
            </button>
            
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg py-2 z-30">
                <div className="px-4 py-2 border-b border-border">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  <div className="px-4 py-3 border-b border-border hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Trophy className="w-4 h-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Achievement Unlocked!</p>
                        <p className="text-xs text-muted-foreground">You've earned the "Plastic Saver" achievement.</p>
                        <p className="text-xs text-secondary mt-1">Just now</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <Zap className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">+ 50 XP Earned!</p>
                        <p className="text-xs text-muted-foreground">You're getting closer to level 4.</p>
                        <p className="text-xs text-primary mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2 border-t border-border text-center">
                  <button className="text-xs text-primary hover:text-primary/80 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Cart Icon */}
          <button 
            className="relative p-2 text-foreground/80 hover:text-primary transition-colors"
            onClick={toggleCart}
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          {/* User Profile */}
          <div className="relative">
            <button 
              className="flex items-center gap-2 p-1 hover:bg-muted/50 rounded-full transition-colors"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle className="w-6 h-6 text-primary" />
              </div>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg py-2 z-30">
                <div className="px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserCircle className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Eco Warrior</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Trophy className="w-3 h-3 text-secondary" />
                        <span>Level {userLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-2">
                  <div className="text-xs text-muted-foreground mb-1">XP Progress</div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${(xpPoints/xpToNextLevel) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-right text-accent">{xpPoints}/{xpToNextLevel}</div>
                </div>
                <div className="px-2 py-1">
                  <button className="w-full text-left px-2 py-2 text-sm hover:bg-muted rounded-lg transition-colors">
                    My Profile
                  </button>
                  <button className="w-full text-left px-2 py-2 text-sm hover:bg-muted rounded-lg transition-colors">
                    My Achievements
                  </button>
                  <button className="w-full text-left px-2 py-2 text-sm hover:bg-muted rounded-lg transition-colors">
                    Settings
                  </button>
                  <button className="w-full text-left px-2 py-2 text-sm hover:bg-muted rounded-lg transition-colors text-red-500">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <ScrollLink 
            to="contact" 
            smooth={true} 
            duration={800} 
            offset={-80}
            className="btn-primary cursor-pointer ml-2"
          >
            Join Now
          </ScrollLink>
        </nav>

        {/* Mobile Menu Button and Cart */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Gamification Mobile */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Trophy className="text-secondary w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {userLevel}
              </span>
            </div>
            
            <div className="relative">
              <Bell className="w-5 h-5 text-secondary-foreground" />
              {newNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {newNotifications}
                </span>
              )}
            </div>
          </div>
          
          {/* Cart Icon for Mobile */}
          <div className="relative">
            <ShoppingCart 
              className="w-5 h-5 text-secondary-foreground" 
              onClick={toggleCart}
              aria-label="Open cart"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            <Menu className="w-5 h-5 text-secondary-foreground" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background shadow-lg border-t border-border p-4 md:hidden z-50">
          <nav className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => (
              <ScrollLink
                key={item.name}
                to={item.href}
                smooth={true}
                duration={500}
                className="text-muted-foreground hover:text-secondary transition-colors cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </ScrollLink>
            ))}
          </nav>
          
          <div className="h-px w-full bg-border my-4"></div>
          
          <div className="flex flex-col space-y-2">
            <Button variant="outline" className="w-full border-secondary text-secondary">
              Sign in
            </Button>
            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Sign up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
