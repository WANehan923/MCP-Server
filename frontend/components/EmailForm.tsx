'use client';

import { useState } from 'react';

interface EmailFormData {
  recipient: string;
  subject: string;
  body: string;
}

interface EmailResponse {
  success: boolean;
  message: string;
  messageId?: string;
}

export function EmailForm() {
  const [formData, setFormData] = useState<EmailFormData>({
    recipient: '',
    subject: '',
    body: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<EmailResponse | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse(null);

    try {
      // For demo purposes, we'll simulate the email sending
      // In a real implementation, you'd call your MCP server endpoint
      const result = await simulateEmailSending(formData);
      setResponse(result);
      
      if (result.success) {
        setFormData({
          recipient: '',
          subject: '',
          body: '',
        });
      }
    } catch (error) {
      setResponse({
        success: false,
        message: 'Failed to send email. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (template: 'contact' | 'collaboration' | 'inquiry') => {
    const templates = {
      contact: {
        subject: 'Getting in touch - From your CV Playground',
        body: `Hi Nehan,

I came across your CV playground and wanted to reach out. I'm impressed by your projects and technical skills.

Best regards,`
      },
      collaboration: {
        subject: 'Collaboration Opportunity',
        body: `Hello Nehan,

I'd like to discuss a potential collaboration opportunity. Your work on AI chatbots and e-commerce applications caught my attention.

Looking forward to hearing from you,`
      },
      inquiry: {
        subject: 'Question about your projects',
        body: `Hi Nehan,

I have some questions about your recent projects, particularly the Acceleration-Based User Authentication System and AI Chatbot for University Inquiries.

Could we schedule a brief discussion?

Thanks,`
      }
    };

    setFormData(prev => ({
      ...prev,
      subject: templates[template].subject,
      body: templates[template].body,
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-green-500 text-white p-4">
        <h2 className="text-xl font-semibold">Send Email Notification</h2>
        <p className="text-green-100 text-sm">Send emails directly through the MCP server</p>
      </div>

      <div className="p-6">
        {/* Email Templates */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Quick Templates</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTemplateSelect('contact')}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm px-3 py-2 rounded-md transition-colors"
            >
              Contact Message
            </button>
            <button
              onClick={() => handleTemplateSelect('collaboration')}
              className="bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm px-3 py-2 rounded-md transition-colors"
            >
              Collaboration
            </button>
            <button
              onClick={() => handleTemplateSelect('inquiry')}
              className="bg-orange-100 hover:bg-orange-200 text-orange-800 text-sm px-3 py-2 rounded-md transition-colors"
            >
              Project Inquiry
            </button>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
              Recipient Email *
            </label>
            <input
              type="email"
              id="recipient"
              name="recipient"
              value={formData.recipient}
              onChange={handleInputChange}
              required
              placeholder="recipient@example.com"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              required
              placeholder="Email subject"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
              Message Body *
            </label>
            <textarea
              id="body"
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder="Your message..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-vertical"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send Email'}
          </button>
        </form>

        {/* Response Display */}
        {response && (
          <div className={`mt-6 p-4 rounded-lg ${
            response.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-5 h-5 mt-0.5 ${
                response.success ? 'text-green-500' : 'text-red-500'
              }`}>
                {response.success ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h4 className={`text-sm font-medium ${
                  response.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {response.success ? 'Email Sent Successfully!' : 'Email Failed to Send'}
                </h4>
                <p className={`mt-1 text-sm ${
                  response.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {response.message}
                </p>
                {response.messageId && (
                  <p className="mt-1 text-xs text-green-600">
                    Message ID: {response.messageId}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Email Service Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Email Service Configuration</h4>
          <p className="text-sm text-blue-700">
            This demo uses a simulated email service. In the real MCP server implementation, 
            you'll need to configure your email credentials (Gmail, SMTP, etc.) via environment variables.
          </p>
          <div className="mt-2 text-xs text-blue-600">
            <p>• EMAIL_USER: Your email address</p>
            <p>• EMAIL_APP_PASSWORD: Your app-specific password</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simulate email sending for demo
async function simulateEmailSending(emailData: EmailFormData): Promise<EmailResponse> {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
  
  // Simulate success most of the time, occasional failure for demo
  const success = Math.random() > 0.1;
  
  if (success) {
    return {
      success: true,
      message: `Email sent successfully to ${emailData.recipient}`,
      messageId: `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
  } else {
    return {
      success: false,
      message: 'Failed to send email: SMTP configuration not found'
    };
  }
}