
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SafetyTip {
  id: string;
  title: string;
  description: string;
}

interface SafetyTipsCardProps {
  title: string;
  tips: SafetyTip[];
  className?: string;
}

export function SafetyTipsCard({ title, tips, className = '' }: SafetyTipsCardProps) {
  const [expandedTipId, setExpandedTipId] = useState<string | null>(null);

  const toggleTip = (id: string) => {
    setExpandedTipId(expandedTipId === id ? null : id);
  };

  return (
    <div className={`p-6 rounded-xl glass-card ${className}`}>
      <h3 className="text-lg font-semibold text-pink-900 mb-4">{title}</h3>
      
      <div className="space-y-3">
        {tips.map((tip) => (
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
