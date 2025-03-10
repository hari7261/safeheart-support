
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface SafetyTip {
  id: string;
  title: string;
  description: string;
}

export interface SafetyTipsCardProps {
  title: string;
  tips: SafetyTip[];
  className?: string;
}

export function SafetyTipsCard({ title = "Safety Tips", tips = [], className = '' }: SafetyTipsCardProps) {
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null);

  const toggleTip = (id: string) => {
    setExpandedTipId(expandedTipId === id ? null : id);
  };

  const defaultTips: SafetyTip[] = [
    {
      id: "1",
      title: "Share your location with trusted contacts",
      description: "Make sure someone knows where you are going and when you expect to return. Consider using location sharing apps with trusted friends or family."
    },
    {
      id: "2",
      title: "Be aware of your surroundings",
      description: "Stay alert and aware of your environment, especially in unfamiliar areas. Avoid using headphones or being distracted by your phone when walking alone."
    },
    {
      id: "3",
      title: "Trust your instincts",
      description: "If a situation or person makes you uncomfortable, trust that feeling and remove yourself from the situation immediately."
    },
    {
      id: "4",
      title: "Have emergency contacts ready",
      description: "Keep important phone numbers easily accessible, including emergency services, trusted contacts, and local helplines."
    },
    {
      id: "5",
      title: "Plan your route",
      description: "Know your route before you start traveling, especially at night. Stick to well-lit, populated areas whenever possible."
    }
  ];

  // Use provided tips or default tips if none are provided
  const displayTips = tips.length > 0 ? tips : defaultTips;

  return (
    <div className={`p-6 rounded-xl glass-card ${className}`}>
      <h3 className="text-lg font-semibold text-pink-900 mb-4">{title}</h3>
      
      <div className="space-y-3">
        {displayTips.map((tip) => (
          <div 
            key={tip.id} 
            className="border border-pink-100 rounded-lg overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleTip(tip.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-pink-50 transition-colors"
            >
              <span className="font-medium text-pink-800">{tip.title}</span>
              {expandedTipId === tip.id ? (
                <ChevronUp className="w-5 h-5 text-pink-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-pink-500" />
              )}
            </button>
            
            {expandedTipId === tip.id && (
              <div className="px-4 py-3 bg-pink-50/50 border-t border-pink-100 text-pink-700">
                {tip.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
