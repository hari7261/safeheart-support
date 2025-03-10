
import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ChatInterface } from '@/components/ChatInterface';
import { SafetyTipsCard } from '@/components/SafetyTipsCard';
import { ResourceCard } from '@/components/ResourceCard';
import { Heart, Book, ExternalLink, Lightbulb, Shield } from 'lucide-react';

const SAFETY_TIPS = [
  {
    id: '1',
    title: 'Create a safety plan',
    description: 'Have a clear plan of what to do and where to go if you feel unsafe. Share this plan with trusted friends or family members.'
  },
  {
    id: '2',
    title: 'Use location sharing',
    description: 'Share your location with trusted contacts when traveling or meeting someone new. Many phone apps allow temporary location sharing.'
  },
  {
    id: '3',
    title: 'Trust your instincts',
    description: 'If a situation feels wrong, it probably is. Don\'t worry about being polite—your safety comes first. Leave immediately if you feel uncomfortable.'
  },
  {
    id: '4',
    title: 'Use code words with friends',
    description: 'Establish code words or phrases with trusted friends that signal you need help without alerting others around you.'
  },
  {
    id: '5',
    title: 'Keep your phone charged',
    description: 'Always keep your phone charged and consider carrying a portable power bank for emergencies.'
  }
];

const COPING_TIPS = [
  {
    id: '1',
    title: 'Practice deep breathing',
    description: 'Breathe in slowly for a count of 4, hold for a count of 7, and exhale for a count of 8. Repeat 3-5 times to calm anxiety.'
  },
  {
    id: '2',
    title: 'Ground yourself with 5-4-3-2-1',
    description: 'Name 5 things you can see, 4 things you can feel, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.'
  },
  {
    id: '3',
    title: 'Use positive affirmations',
    description: 'Repeat positive statements such as "I am safe," "I am strong," or "I can handle this situation."'
  },
  {
    id: '4',
    title: 'Practice mindfulness',
    description: 'Focus on the present moment, acknowledging your thoughts and feelings without judgment.'
  },
  {
    id: '5',
    title: 'Try progressive muscle relaxation',
    description: 'Tense and then relax each muscle group in your body, working from your toes up to your head.'
  }
];

const Chat = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-900 mb-2">Emotional Support</h1>
            <p className="text-pink-700">
              Chat with our AI assistant for support, guidance, and resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <ChatInterface />
              
              <div className="mt-6 p-4 bg-pink-50 rounded-lg border border-pink-100">
                <div className="flex items-start">
                  <Lightbulb className="w-5 h-5 text-pink-500 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-pink-700">
                    This chat assistant provides emotional support and general advice. For immediate crisis support, please contact a professional helpline or emergency services.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Resources Column */}
            <div className="space-y-6">
              <SafetyTipsCard 
                title="Safety Tips" 
                tips={SAFETY_TIPS} 
              />
              
              <SafetyTipsCard 
                title="Coping Strategies" 
                tips={COPING_TIPS} 
              />
              
              <div className="p-6 rounded-xl glass-card">
                <h3 className="text-lg font-semibold text-pink-900 mb-4">Helpline Resources</h3>
                
                <div className="space-y-4">
                  <a href="https://www.thehotline.org/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-lg border border-pink-100 hover:border-pink-300 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Heart className="w-5 h-5 text-pink-500 mr-3" />
                        <div>
                          <div className="font-medium text-pink-900">National Domestic Violence Hotline</div>
                          <div className="text-sm text-pink-600">1-800-799-7233</div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-pink-400" />
                    </div>
                  </a>
                  
                  <a href="https://www.rainn.org/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-lg border border-pink-100 hover:border-pink-300 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-pink-500 mr-3" />
                        <div>
                          <div className="font-medium text-pink-900">RAINN Sexual Assault Hotline</div>
                          <div className="text-sm text-pink-600">1-800-656-4673</div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-pink-400" />
                    </div>
                  </a>
                  
                  <a href="https://suicidepreventionlifeline.org/" target="_blank" rel="noopener noreferrer" className="block p-4 bg-white rounded-lg border border-pink-100 hover:border-pink-300 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Book className="w-5 h-5 text-pink-500 mr-3" />
                        <div>
                          <div className="font-medium text-pink-900">National Suicide Prevention Lifeline</div>
                          <div className="text-sm text-pink-600">988 or 1-800-273-8255</div>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-pink-400" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
