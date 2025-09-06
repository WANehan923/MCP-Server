'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export function CVChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: "Hi! I&apos;m Nehan&apos;s CV assistant. Ask me anything about my background, education, work experience, projects, or skills. Try asking: &apos;What role did you have at your last position?&apos; or &apos;What are your technical skills?&apos;",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the real MCP server API
      const response = await fetch('/api/cv-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputValue }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      
      const botMessage: Message = {
        type: 'bot',
        content: data.answer || 'No response received from the server',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Frontend CV Chat error:', error);
      const errorMessage: Message = {
        type: 'bot',
        content: `Connection error: Unable to reach the MCP server. Please check if the backend is deployed and the environment variable NEXT_PUBLIC_MCP_SERVER_URL is configured correctly.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const suggestions = [
    "What role did you have at your last position?",
    "What are your technical skills?",
    "Tell me about your latest projects",
    "What is your educational background?",
    "What programming languages do you know?",
    "How can I contact you?"
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-blue-500 text-white p-4">
        <h2 className="text-xl font-semibold">Chat with Nehan's CV</h2>
        <p className="text-blue-100 text-sm">Ask me about my background, experience, and skills</p>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${
              message.type === 'user' ? 'user-message' : 'bot-message'
            }`}
          >
            <div className="flex items-start space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-500 text-white'
                }`}
              >
                {message.type === 'user' ? 'U' : 'N'}
              </div>
              <div className="flex-1">
                <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="chat-message bot-message">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center text-sm font-semibold">
                N
              </div>
              <div className="flex-1">
                <div className="animate-pulse text-gray-500">Thinking...</div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      <div className="border-t p-4 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">💡 Try asking:</h3>
        <div className="flex flex-wrap gap-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-button text-sm font-medium bg-white hover:bg-blue-50 text-gray-800 hover:text-blue-700 px-4 py-2 rounded-full transition-all duration-200 border border-gray-300 hover:border-blue-300 shadow-sm hover:shadow-md active:scale-95"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask me anything about my background..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

