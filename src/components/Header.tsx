
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Heart, BarChart2, MessageCircle, Shield, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Close menu when screen size changes from mobile to desktop
  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-pink-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 hover-lift">
          <Heart className="w-6 h-6 text-pink-500" />
          <span className="font-semibold text-lg text-gradient">SafeHeart</span>
        </NavLink>
        
        {isMobile ? (
          <button 
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-pink-50 text-pink-900 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        ) : (
          <nav className="flex items-center gap-1">
            <NavLink to="/" className={({ isActive }) => 
              isActive ? "nav-item-active" : "nav-item"
            }>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => 
              isActive ? "nav-item-active" : "nav-item"
            }>
              Dashboard
            </NavLink>
            <NavLink to="/chat" className={({ isActive }) => 
              isActive ? "nav-item-active" : "nav-item"
            }>
              Support
            </NavLink>
            <NavLink to="/emergency" className={({ isActive }) => 
              isActive ? "nav-item-active" : "nav-item"
            }>
              Safety
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => 
              isActive ? "nav-item-active" : "nav-item"
            }>
              Profile
            </NavLink>
          </nav>
        )}
      </div>
      
      {/* Mobile menu */}
      {isMobile && (
        <div className={`fixed inset-0 z-40 bg-white transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}>
          <div className="container mx-auto px-4 py-16">
            <nav className="flex flex-col gap-4">
              <NavLink to="/" className="flex items-center p-3 rounded-xl hover:bg-pink-50 text-pink-900">
                <Heart className="w-5 h-5 mr-3" />
                <span className="font-medium">Home</span>
              </NavLink>
              <NavLink to="/dashboard" className="flex items-center p-3 rounded-xl hover:bg-pink-50 text-pink-900">
                <BarChart2 className="w-5 h-5 mr-3" />
                <span className="font-medium">Dashboard</span>
              </NavLink>
              <NavLink to="/chat" className="flex items-center p-3 rounded-xl hover:bg-pink-50 text-pink-900">
                <MessageCircle className="w-5 h-5 mr-3" />
                <span className="font-medium">Support Chat</span>
              </NavLink>
              <NavLink to="/emergency" className="flex items-center p-3 rounded-xl hover:bg-pink-50 text-pink-900">
                <Shield className="w-5 h-5 mr-3" />
                <span className="font-medium">Emergency</span>
              </NavLink>
              <NavLink to="/profile" className="flex items-center p-3 rounded-xl hover:bg-pink-50 text-pink-900">
                <User className="w-5 h-5 mr-3" />
                <span className="font-medium">Profile</span>
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
