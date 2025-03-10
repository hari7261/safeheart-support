
import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-pink-100 bg-white/50 backdrop-blur-sm py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span className="font-medium text-pink-900">SafeHeart</span>
          </div>
          
          <div className="text-sm text-pink-700">
            Supporting women's safety and emotional wellbeing
          </div>
          
          <div className="text-xs text-pink-500">
            &copy; {new Date().getFullYear()} SafeHeart Support. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
