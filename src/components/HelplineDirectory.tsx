
import React, { useState } from 'react';
import { Phone, PhoneCall, ExternalLink, Filter, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Helpline {
  id: string;
  organization: string;
  phone: string;
  category: 'emergency' | 'counseling' | 'legal' | 'government' | 'support';
  description?: string;
}

interface HelplineDirectoryProps {
  className?: string;
}

export function HelplineDirectory({ className = '' }: HelplineDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Helpline data
  const helplines: Helpline[] = [
    { id: '1', organization: 'National Commission for Women Helpline', phone: '7827170170', category: 'government', description: 'Government helpline for women in distress' },
    { id: '2', organization: 'Women Helpline (All India)', phone: '181', category: 'emergency', description: '24/7 Emergency Response' },
    { id: '3', organization: 'Police Helpline', phone: '100', category: 'emergency', description: 'National emergency police number' },
    { id: '4', organization: 'Domestic Violence Helpline', phone: '1091', category: 'emergency', description: 'For immediate help in domestic violence situations' },
    { id: '5', organization: 'Shakti Shalini', phone: '10920', category: 'support', description: 'NGO supporting women survivors of violence' },
    { id: '6', organization: 'RAHI Foundation', phone: '01126238466', category: 'counseling', description: 'Support for child sexual abuse survivors' },
    { id: '7', organization: 'All India Women\'s Conference', phone: '01123389680', category: 'support', description: 'Women\'s rights organization' },
    { id: '8', organization: 'Delhi Commission for Women', phone: '01123370597', category: 'legal', description: 'Legal support for women in Delhi' },
    { id: '9', organization: 'National Human Rights Commission', phone: '01123385368', category: 'legal', description: 'Human rights complaints and assistance' },
    { id: '10', organization: 'Child Helpline', phone: '1098', category: 'emergency', description: '24/7 free emergency helpline for children' },
    { id: '11', organization: 'CATS Ambulance Service', phone: '1099', category: 'emergency', description: 'Centralized Ambulance for Trauma Services' },
    { id: '12', organization: 'Tarshi - Reproductive Health Counselling', phone: '9996553638', category: 'counseling', description: 'Sexual and reproductive health counseling' },
  ];

  const handleCall = (phone: string, organization: string) => {
    // In a real app, this would use the phone API
    // For this demo, we'll simulate the action
    console.log(`Calling ${organization} at ${phone}`);
    
    toast({
      title: "Initiating call",
      description: `Calling ${organization} at ${phone}`,
    });
  };

  const filteredHelplines = helplines.filter(helpline => {
    const matchesSearch = helpline.organization.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            helpline.phone.includes(searchTerm);
    const matchesCategory = !activeCategory || helpline.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'emergency', label: 'Emergency', color: 'bg-red-100 text-red-700' },
    { id: 'counseling', label: 'Counseling', color: 'bg-blue-100 text-blue-700' },
    { id: 'legal', label: 'Legal Aid', color: 'bg-green-100 text-green-700' },
    { id: 'government', label: 'Government', color: 'bg-purple-100 text-purple-700' },
    { id: 'support', label: 'Support', color: 'bg-orange-100 text-orange-700' },
  ];

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-pink-100 p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-pink-900 mb-4">Helplines Directory</h2>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-pink-400" />
          <input
            type="text"
            placeholder="Search helplines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-pink-200 rounded focus:ring focus:ring-pink-200 focus:border-pink-400"
          />
        </div>
        
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
          <Filter className="h-4 w-4 text-pink-500 flex-shrink-0" />
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3 py-1 text-sm rounded-full ${!activeCategory 
              ? 'bg-pink-100 text-pink-700' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'} transition-colors`}
          >
            All
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                activeCategory === category.id ? category.color : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              } transition-colors`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Helplines List */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {filteredHelplines.length > 0 ? (
          filteredHelplines.map((helpline) => {
            const categoryInfo = categories.find(c => c.id === helpline.category);
            
            return (
              <div 
                key={helpline.id} 
                className="border border-pink-100 rounded-lg p-4 hover:border-pink-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-pink-900">{helpline.organization}</h3>
                  <span className={`text-xs ${categoryInfo?.color} px-2 py-0.5 rounded-full`}>
                    {categoryInfo?.label}
                  </span>
                </div>
                
                {helpline.description && (
                  <p className="text-sm text-pink-600 mb-3">{helpline.description}</p>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-pink-800">
                    <Phone className="w-4 h-4 mr-2 text-pink-500" />
                    <span>{helpline.phone}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCall(helpline.phone, helpline.organization)}
                      className="flex items-center px-3 py-1.5 text-sm bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors"
                      aria-label={`Call ${helpline.organization}`}
                    >
                      <PhoneCall className="w-3.5 h-3.5 mr-1" />
                      <span>Call</span>
                    </button>
                    
                    <a
                      href={`tel:${helpline.phone}`}
                      className="flex items-center px-3 py-1.5 text-sm bg-pink-100 text-pink-700 rounded hover:bg-pink-200 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${helpline.organization} in phone app`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8 bg-pink-50/50 rounded-lg">
            <p className="text-pink-700">No helplines found matching your search</p>
            <p className="text-sm text-pink-500 mt-1">Try different search terms or filters</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-4 border-t border-pink-100">
        <p className="text-sm text-pink-600">
          If you are in immediate danger, please call your country's emergency services (like 911 in the US or 112 in the EU).
        </p>
      </div>
    </div>
  );
}
