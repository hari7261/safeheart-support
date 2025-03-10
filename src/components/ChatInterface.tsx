
import React, { useState, useRef, useEffect } from 'react';
import { Send, RefreshCw } from 'lucide-react';
import { useChatbot } from '@/hooks/useChatbot';

export function ChatInterface() {
  const { messages, isTyping, sendMessage, resetChat } = useChatbot();
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  
  const handleSend = async () => {
    if (input.trim() === '') return;
    
    const message = input;
    setInput('');
    await sendMessage(message);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white rounded-xl border border-pink-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-pink-100 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-pink-900">Support Assistant</h3>
          <p className="text-xs text-pink-600">Share your thoughts and feelings safely</p>
        </div>
        <button
          onClick={resetChat}
          className="p-2 text-pink-600 hover:text-pink-800 hover:bg-pink-50 rounded-full transition-colors"
          aria-label="Reset chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-pink-500 text-white rounded-tr-none'
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-gray-500">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={endOfMessagesRef} />
      </div>
      
      <div className="p-4 border-t border-pink-100">
        <div className="flex items-center gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-lg border border-pink-200 focus:border-pink-400 focus:ring focus:ring-pink-200 focus:ring-opacity-50 resize-none transition"
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={input.trim() === '' || isTyping}
            className="p-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-2 text-xs text-center text-pink-600">
          Your conversations are private and stored locally on your device.
        </p>
      </div>
    </div>
  );
}
