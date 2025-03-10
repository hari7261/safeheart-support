
import { useState, useEffect, useCallback } from 'react';
import { ChatMessage, getChatHistory, saveChatMessage, clearChatHistory } from '../utils/localStorage';

// Sample responses for the chatbot
const SAMPLE_RESPONSES = [
  "I'm here to listen and support you. Would you like to talk more about how you're feeling?",
  "That sounds difficult. Remember that your feelings are valid and it's okay to seek help.",
  "Thank you for sharing that with me. Have you considered talking to someone you trust about this?",
  "Your safety is important. If you're in immediate danger, please reach out to emergency services or a trusted person.",
  "Self-care is essential. Have you taken some time for yourself today?",
  "It's brave of you to share your feelings. Would you like some resources that might help?",
  "I'm sorry you're going through this. Remember that difficult times are temporary.",
  "You're not alone in how you feel. Many people experience similar emotions.",
  "Would it help to try some deep breathing exercises together?",
  "I'm here to support you, but I'm not a replacement for professional help. Would you like information on counseling services?"
];

// Helper function to get a random response
const getRandomResponse = (): string => {
  const index = Math.floor(Math.random() * SAMPLE_RESPONSES.length);
  return SAMPLE_RESPONSES[index];
};

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const history = getChatHistory();
    
    if (history.length === 0) {
      // Add a welcome message for new users
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'bot',
        content: "Hello! I'm here to provide emotional support and safety advice. How can I help you today?",
        timestamp: Date.now()
      };
      setMessages([welcomeMessage]);
    } else {
      setMessages(history);
    }
    
    setLoading(false);
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage = saveChatMessage({
      role: 'user',
      content
    });
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate bot thinking
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Generate response
    // In a real app, this would call the Gemini API or another LLM
    const botResponse = saveChatMessage({
      role: 'bot',
      content: getRandomResponse()
    });
    
    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
    
    return botResponse;
  }, []);

  const resetChat = useCallback(() => {
    clearChatHistory();
    
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'bot',
      content: "Hello! I'm here to provide emotional support and safety advice. How can I help you today?",
      timestamp: Date.now()
    };
    
    setMessages([welcomeMessage]);
  }, []);

  return {
    messages,
    isTyping,
    loading,
    sendMessage,
    resetChat
  };
}
