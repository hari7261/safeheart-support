
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, MessageCircle, Shield, HeartPulse, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ResourceCard } from '@/components/ResourceCard';
import { EmergencyButton } from '@/components/EmergencyButton';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="flex-1 space-y-6">
                <div className="inline-block px-3 py-1 bg-pink-100 rounded-full text-pink-700 text-sm font-medium animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Women's Safety & Support
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-pink-900 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  Your companion for safety and emotional wellbeing
                </h1>
                
                <p className="text-lg text-pink-700 max-w-2xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  SafeHeart provides tools for emotional support, safety features, and resources designed specifically for women's wellbeing.
                </p>
                
                <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                  <Link
                    to="/dashboard"
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-200 flex items-center"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <Link
                    to="/emergency"
                    className="px-6 py-3 bg-white border border-pink-200 text-pink-700 font-medium rounded-full shadow-sm hover:shadow-md hover:border-pink-300 transition-all duration-200"
                  >
                    Emergency Resources
                  </Link>
                </div>
              </div>
              
              <div className="flex-1 flex justify-center items-center animate-fade-in" style={{ animationDelay: '1s' }}>
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-lavender-300 rounded-full blur-2xl opacity-20 animate-pulse-gentle"></div>
                  <div className="relative z-10 flex justify-center items-center h-full">
                    <EmergencyButton size="lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-pink-900 mb-4">Features Designed for You</h2>
              <p className="text-pink-700 max-w-2xl mx-auto">
                SafeHeart combines emotional support, safety tools, and resources in one convenient application.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-white border border-pink-100 shadow-sm hover-lift">
                <div className="p-3 bg-pink-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="w-7 h-7 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-pink-900 mb-2">Emotional Support</h3>
                <p className="text-pink-700 mb-4">
                  Chat with our AI assistant for emotional support, guidance, and resources tailored to your needs.
                </p>
                <Link to="/chat" className="text-pink-500 font-medium hover:text-pink-600 transition-colors inline-flex items-center">
                  Start Chatting
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="p-6 rounded-xl bg-white border border-pink-100 shadow-sm hover-lift">
                <div className="p-3 bg-pink-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 className="w-7 h-7 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-pink-900 mb-2">Mood Tracking</h3>
                <p className="text-pink-700 mb-4">
                  Monitor your emotional wellbeing with our interactive dashboard and mood tracking tools.
                </p>
                <Link to="/dashboard" className="text-pink-500 font-medium hover:text-pink-600 transition-colors inline-flex items-center">
                  View Dashboard
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="p-6 rounded-xl bg-white border border-pink-100 shadow-sm hover-lift">
                <div className="p-3 bg-pink-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-pink-500" />
                </div>
                <h3 className="text-xl font-semibold text-pink-900 mb-2">Emergency Alerts</h3>
                <p className="text-pink-700 mb-4">
                  Quickly alert emergency contacts with your location information during unsafe situations.
                </p>
                <Link to="/emergency" className="text-pink-500 font-medium hover:text-pink-600 transition-colors inline-flex items-center">
                  Emergency Features
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section className="py-16 bg-gradient-to-t from-pink-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-pink-900 mb-4">Helpful Resources</h2>
              <p className="text-pink-700 max-w-2xl mx-auto">
                Access to important information and resources for women's safety and wellbeing.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ResourceCard 
                title="Crisis Helplines"
                description="National helplines available 24/7 for women in crisis situations."
                icon={<HeartPulse className="w-6 h-6" />}
                link="https://www.thehotline.org/"
              />
              
              <ResourceCard 
                title="Mental Health Support"
                description="Resources for emotional wellbeing, anxiety, depression, and stress management."
                icon={<MessageCircle className="w-6 h-6" />}
                link="https://www.nimh.nih.gov/health/find-help"
              />
              
              <ResourceCard 
                title="Safety Planning"
                description="Learn how to create a personalized safety plan for various situations."
                icon={<Shield className="w-6 h-6" />}
                link="https://www.womenslaw.org/safety-tips/safety-planning"
              />
              
              <ResourceCard 
                title="Local Support Groups"
                description="Find community support groups and resources in your area."
                icon={<BarChart2 className="w-6 h-6" />}
                link="https://www.womenshelpline.ca/find-support/"
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
