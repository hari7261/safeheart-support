
import React, { useState } from 'react';
import { Smile, SmilePlus, Meh, Frown, Angry } from 'lucide-react';
import { useMoodData } from '@/hooks/useMoodData';
import { toast } from '@/hooks/use-toast';

const MOOD_OPTIONS = [
  { value: 'great', label: 'Great', icon: SmilePlus, color: 'text-green-500' },
  { value: 'good', label: 'Good', icon: Smile, color: 'text-emerald-500' },
  { value: 'okay', label: 'Okay', icon: Meh, color: 'text-yellow-500' },
  { value: 'bad', label: 'Bad', icon: Frown, color: 'text-orange-500' },
  { value: 'terrible', label: 'Terrible', icon: Angry, color: 'text-red-500' },
] as const;

export function MoodTracker() {
  const { addMoodEntry } = useMoodData();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    
    // Type assertion since we know it's one of the valid mood values
    addMoodEntry(selectedMood as 'great' | 'good' | 'okay' | 'bad' | 'terrible', notes);
    
    toast({
      title: "Mood logged",
      description: "Your mood has been saved successfully.",
    });
    
    // Reset form
    setSelectedMood(null);
    setNotes('');
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-pink-900">How are you feeling today?</h3>
        <p className="text-pink-600 text-sm">Track your mood to monitor your well-being</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center p-2 bg-white/50 backdrop-blur-sm rounded-full border border-pink-100 shadow-sm">
          {MOOD_OPTIONS.map((mood) => {
            const Icon = mood.icon;
            const isSelected = selectedMood === mood.value;
            
            return (
              <button
                key={mood.value}
                type="button"
                onClick={() => handleMoodSelect(mood.value)}
                className={`flex flex-col items-center justify-center p-2 rounded-full transition-all duration-200 ${
                  isSelected
                    ? `bg-pink-100 scale-110 ${mood.color}`
                    : `${mood.color} hover:bg-pink-50`
                }`}
              >
                <Icon className={`w-8 h-8 mb-1 transition-transform ${isSelected ? 'animate-pulse' : ''}`} />
                <span className="text-xs font-medium text-pink-900">{mood.label}</span>
              </button>
            );
          })}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="notes" className="block text-sm font-medium text-pink-700">
            Notes (optional)
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="How are you feeling? What's on your mind?"
            className="w-full p-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring focus:ring-pink-200 focus:ring-opacity-50 resize-none transition"
            rows={3}
          />
        </div>
        
        <button
          type="submit"
          disabled={!selectedMood || isSubmitting}
          className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : 'Save Mood'}
        </button>
      </form>
    </div>
  );
}
