
// Type definitions
export interface MoodEntry {
  id: string;
  date: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  notes?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface UserProfile {
  name: string;
  avatar?: string;
  phone?: string;
  emergencyMessage: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: number;
}

// Storage keys
const STORAGE_KEYS = {
  MOOD_DATA: 'safeheart-mood-data',
  EMERGENCY_CONTACTS: 'safeheart-emergency-contacts',
  USER_PROFILE: 'safeheart-user-profile',
  CHAT_HISTORY: 'safeheart-chat-history',
};

// Helper functions
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Mood tracking functions
export const getMoodEntries = (): MoodEntry[] => {
  return getStorageItem<MoodEntry[]>(STORAGE_KEYS.MOOD_DATA, []);
};

export const saveMoodEntry = (entry: Omit<MoodEntry, 'id'>): MoodEntry => {
  const entries = getMoodEntries();
  const newEntry = {
    ...entry,
    id: Date.now().toString(),
  };
  
  setStorageItem(STORAGE_KEYS.MOOD_DATA, [newEntry, ...entries]);
  return newEntry;
};

// Emergency contacts functions
export const getEmergencyContacts = (): EmergencyContact[] => {
  return getStorageItem<EmergencyContact[]>(STORAGE_KEYS.EMERGENCY_CONTACTS, []);
};

export const saveEmergencyContact = (contact: Omit<EmergencyContact, 'id'>): EmergencyContact => {
  const contacts = getEmergencyContacts();
  const newContact = {
    ...contact,
    id: Date.now().toString(),
  };
  
  setStorageItem(STORAGE_KEYS.EMERGENCY_CONTACTS, [...contacts, newContact]);
  return newContact;
};

export const deleteEmergencyContact = (id: string): void => {
  const contacts = getEmergencyContacts();
  const filteredContacts = contacts.filter(contact => contact.id !== id);
  setStorageItem(STORAGE_KEYS.EMERGENCY_CONTACTS, filteredContacts);
};

// User profile functions
export const getUserProfile = (): UserProfile => {
  return getStorageItem<UserProfile>(STORAGE_KEYS.USER_PROFILE, {
    name: 'User',
    emergencyMessage: 'I need help. This is an emergency.',
  });
};

export const saveUserProfile = (profile: UserProfile): void => {
  setStorageItem(STORAGE_KEYS.USER_PROFILE, profile);
};

// Chat history functions
export const getChatHistory = (): ChatMessage[] => {
  return getStorageItem<ChatMessage[]>(STORAGE_KEYS.CHAT_HISTORY, []);
};

export const saveChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>): ChatMessage => {
  const history = getChatHistory();
  const newMessage = {
    ...message,
    id: Date.now().toString(),
    timestamp: Date.now(),
  };
  
  setStorageItem(STORAGE_KEYS.CHAT_HISTORY, [...history, newMessage]);
  return newMessage;
};

export const clearChatHistory = (): void => {
  setStorageItem(STORAGE_KEYS.CHAT_HISTORY, []);
};
