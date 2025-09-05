'use client';

import { useState } from 'react';
import { CVChat } from '../components/CVChat';
import { EmailForm } from '../components/EmailForm';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'chat' | 'email'>('chat');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Nehan Chandira's CV Playground
          </h1>
          <p className="text-gray-600 text-lg">
            Chat about my background or send email notifications
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            <a
              href="https://github.com/WANehan923"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              GitHub
            </a>
            <span className="text-gray-400">•</span>
            <a
              href="https://www.linkedin.com/in/nehancmp-bb7a43268"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              LinkedIn
            </a>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">nehanchandira619@gmail.com</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              CV Chat
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === 'email'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Send Email
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'chat' && <CVChat />}
          {activeTab === 'email' && <EmailForm />}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>
            Built with Next.js and MCP (Model Context Protocol) •{' '}
            <span className="text-gray-700">Showcasing API Design & Integration Skills</span>
          </p>
          <p className="mt-1">
            Computer Science Undergraduate at Plymouth University (2022-2025)
          </p>
        </div>
      </div>
    </main>
  );
}