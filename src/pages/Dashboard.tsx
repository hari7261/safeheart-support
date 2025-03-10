
import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MoodTracker } from '@/components/MoodTracker';
import { useMoodData } from '@/hooks/useMoodData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Calendar, Clock, FileText } from 'lucide-react';

const Dashboard = () => {
  const { moodEntries, getMoodStats } = useMoodData();
  const [activeTab, setActiveTab] = useState<'today' | 'history'>('today');
  
  const moodStats = getMoodStats();
  
  const chartData = [
    { name: 'Great', value: moodStats?.counts.great || 0, color: '#10B981' },
    { name: 'Good', value: moodStats?.counts.good || 0, color: '#34D399' },
    { name: 'Okay', value: moodStats?.counts.okay || 0, color: '#FBBF24' },
    { name: 'Bad', value: moodStats?.counts.bad || 0, color: '#F97316' },
    { name: 'Terrible', value: moodStats?.counts.terrible || 0, color: '#EF4444' },
  ];
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 to-white">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-pink-900 mb-2">Your Wellbeing Dashboard</h1>
            <p className="text-pink-700">
              Track your mood and emotional wellbeing over time
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Mood Tracker */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">
                <MoodTracker />
              </div>
            </div>
            
            {/* Right column - Stats and History */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">
                <h2 className="text-xl font-semibold text-pink-900 mb-4">Mood Overview</h2>
                
                {moodStats ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-pink-50 rounded-lg p-4">
                        <div className="text-sm text-pink-600 mb-1">Entries this week</div>
                        <div className="text-2xl font-semibold text-pink-900">{moodStats.total}</div>
                      </div>
                      
                      <div className="bg-pink-50 rounded-lg p-4">
                        <div className="text-sm text-pink-600 mb-1">Average mood</div>
                        <div className="text-2xl font-semibold text-pink-900">
                          {moodStats.average.toFixed(1)}/5
                        </div>
                      </div>
                      
                      <div className="bg-pink-50 rounded-lg p-4">
                        <div className="text-sm text-pink-600 mb-1">Most frequent</div>
                        <div className="text-2xl font-semibold text-pink-900">
                          {Object.entries(moodStats.counts).reduce((a, b) => a[1] > b[1] ? a : b)[0]}
                        </div>
                      </div>
                    </div>
                    
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={chartData}
                          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-pink-700 mb-4">No mood data yet. Start tracking your mood to see statistics.</p>
                  </div>
                )}
              </div>
              
              {/* History */}
              <div className="bg-white rounded-xl shadow-sm border border-pink-100 overflow-hidden">
                <div className="border-b border-pink-100">
                  <div className="flex">
                    <button
                      onClick={() => setActiveTab('today')}
                      className={`flex-1 py-3 px-4 text-center font-medium ${
                        activeTab === 'today' 
                          ? 'bg-pink-50 text-pink-700 border-b-2 border-pink-500' 
                          : 'text-pink-600 hover:bg-pink-50/50'
                      }`}
                    >
                      Recent Entries
                    </button>
                    <button
                      onClick={() => setActiveTab('history')}
                      className={`flex-1 py-3 px-4 text-center font-medium ${
                        activeTab === 'history' 
                          ? 'bg-pink-50 text-pink-700 border-b-2 border-pink-500' 
                          : 'text-pink-600 hover:bg-pink-50/50'
                      }`}
                    >
                      All History
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {moodEntries.length > 0 ? (
                    <div className="divide-y divide-pink-100">
                      {(activeTab === 'today' ? moodEntries.slice(0, 5) : moodEntries).map((entry) => (
                        <div key={entry.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex justify-between mb-2">
                            <div className="flex items-center text-pink-900 font-medium">
                              <Calendar className="w-4 h-4 mr-2 text-pink-600" />
                              {formatDate(entry.date)}
                            </div>
                            <div className="flex items-center text-pink-600 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatTime(entry.date)}
                            </div>
                          </div>
                          
                          <div className="flex items-center mb-2">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                              entry.mood === 'great' ? 'bg-green-100 text-green-800' :
                              entry.mood === 'good' ? 'bg-emerald-100 text-emerald-800' :
                              entry.mood === 'okay' ? 'bg-yellow-100 text-yellow-800' :
                              entry.mood === 'bad' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                            </div>
                          </div>
                          
                          {entry.notes && (
                            <div className="flex items-start mt-2 text-pink-700">
                              <FileText className="w-4 h-4 mr-2 mt-0.5 text-pink-500 flex-shrink-0" />
                              <p className="text-sm">{entry.notes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-pink-700">No mood entries yet. Start tracking your mood above.</p>
                    </div>
                  )}
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

export default Dashboard;
