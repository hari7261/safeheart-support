
import { useState, useEffect } from 'react';
import { MoodEntry, getMoodEntries, saveMoodEntry } from '../utils/localStorage';

export function useMoodData() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const entries = getMoodEntries();
    setMoodEntries(entries);
    setLoading(false);
  }, []);

  const addMoodEntry = (mood: MoodEntry['mood'], notes?: string) => {
    const newEntry = saveMoodEntry({
      date: new Date().toISOString(),
      mood,
      notes
    });
    
    setMoodEntries(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const getMoodStats = () => {
    if (moodEntries.length === 0) return null;
    
    const lastWeekEntries = moodEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });
    
    const moodValues = {
      'great': 5,
      'good': 4,
      'okay': 3,
      'bad': 2,
      'terrible': 1
    };
    
    const moodCounts = {
      'great': 0,
      'good': 0,
      'okay': 0,
      'bad': 0,
      'terrible': 0
    };
    
    let total = 0;
    
    lastWeekEntries.forEach(entry => {
      moodCounts[entry.mood]++;
      total += moodValues[entry.mood];
    });
    
    const avgMood = lastWeekEntries.length > 0 ? total / lastWeekEntries.length : 0;
    
    return {
      average: avgMood,
      counts: moodCounts,
      total: lastWeekEntries.length
    };
  };

  return {
    moodEntries,
    loading,
    addMoodEntry,
    getMoodStats
  };
}
