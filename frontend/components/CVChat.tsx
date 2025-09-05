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
      content: "Hi! I'm Nehan's CV assistant. Ask me anything about my background, education, work experience, projects, or skills. Try asking: 'What role did you have at your last position?' or 'What are your technical skills?'",
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
      // For demo purposes, we'll simulate the MCP server response
      // In a real implementation, you'd call your MCP server endpoint
      const response = await simulateMCPResponse(inputValue);
      
      const botMessage: Message = {
        type: 'bot',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        type: 'bot',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
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
      <div className="border-t p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Try asking:</h3>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
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

// Simulate MCP server response for demo
async function simulateMCPResponse(question: string): Promise<string> {
  // In a real implementation, this would call your MCP server
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  
  const q = question.toLowerCase();
  
  if (q.includes('last position') || q.includes('recent job')) {
    return "My most recent position was TBDA (Trainee Business Development Associate) in the Deposit & Mobilization Unit at NDB Bank, where I worked for 2 months.";
  }
  
  if (q.includes('skills') || q.includes('technology') || q.includes('programming')) {
    return `My technical skills include:
- Programming: React, HTML, CSS, JavaScript, Node.js, JAVA, C#, PHP, Python
- Databases: MySQL, MongoDB, Firebase
- Cloud: AWS, Google Cloud Platform
- Design: Figma, Photoshop, Illustrator
- Other: AI & Machine Learning, IoT, Flutter`;
  }
  
  if (q.includes('education') || q.includes('university') || q.includes('degree')) {
    return "I'm currently pursuing a BSc (Hons) in Computer Science at Plymouth University - United Kingdom (2022 - 2025). My student ID is 27225. I also completed an Advance Certification Programme for Maths, English, Programming at NSBM Green University in 2022.";
  }
  
  if (q.includes('projects') || q.includes('latest') || q.includes('recent')) {
    return `My latest projects from 2025:
- Acceleration-Based User Authentication System - Explore acceleration-based user authentication using ML techniques
- AI Chatbot For University Inquiries - AI-powered virtual assistant specifically tailored for NSBM Green University

Other recent projects include a Handcraft E-Commerce App using Flutter, Smart Automated Wheelchair System, and NSBM Accommodation Portal.`;
  }
  
  if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
    return "You can reach me at nehanchandira619@gmail.com or call me at 072 2171358 / 0705868097. You can also find me on GitHub: https://github.com/WANehan923 and LinkedIn: www.linkedin.com/in/nehancmp-bb7a43268";
  }
  
  if (q.includes('about') || q.includes('profile') || q.includes('yourself')) {
    return "I'm a dedicated Computer Science undergraduate with a strong foundation in software development, cloud computing concepts, and data analysis. I'm passionate about applying academic knowledge to real-world challenges, with a focus on building scalable cloud-based solutions and deriving insights from data. I'm skilled in algorithms, problem-solving, and collaborative teamwork, with a commitment to continuous learning and driving innovative solutions in dynamic IT environments.";
  }
  
  return "I'm not sure about that specific question. You can ask me about my education, work experience, projects, skills, contact information, or personal background. What would you like to know?";
}