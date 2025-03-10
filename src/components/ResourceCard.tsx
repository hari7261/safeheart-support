
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  className?: string;
}

export function ResourceCard({ title, description, icon, link, className = '' }: ResourceCardProps) {
  const cardContent = (
    <>
      <div className="p-4 bg-pink-50 rounded-full text-pink-600 mb-4 inline-block">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-pink-900 mb-2">{title}</h3>
      <p className="text-pink-700 mb-4">{description}</p>
      {link && (
        <div className="flex items-center text-pink-500 font-medium hover:text-pink-600 transition-colors">
          <span>Learn More</span>
          <ExternalLink className="ml-1 w-4 h-4" />
        </div>
      )}
    </>
  );

  if (link) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className={`block p-6 rounded-xl glass-card hover-lift ${className}`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <div className={`p-6 rounded-xl glass-card ${className}`}>
      {cardContent}
    </div>
  );
}
