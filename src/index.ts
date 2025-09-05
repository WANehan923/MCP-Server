#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { CVChatService } from './cv-chat.js';
import { EmailService, EmailRequest } from './email-service.js';
import { z } from 'zod';
import express from 'express';
import cors from 'cors';

// Initialize services
const cvChat = new CVChatService();
const emailService = new EmailService();

// Define tool schemas
const CVChatToolSchema = z.object({
  question: z.string().describe('Question about Nehan\'s CV, experience, or background')
});

const SendEmailToolSchema = z.object({
  recipient: z.string().email('Must be a valid email address'),
  subject: z.string().min(1, 'Subject cannot be empty'),
  body: z.string().min(1, 'Body cannot be empty')
});

const GetTopicsToolSchema = z.object({});
const EmailServiceInfoToolSchema = z.object({});

// Create MCP server
const server = new Server(
  {
    name: 'nehan-cv-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
const tools: Tool[] = [
  {
    name: 'cv_chat',
    description: 'Ask questions about Nehan Chandira\'s CV, work experience, education, projects, or skills. This tool can answer questions like \"What role did you have at your last position?\", \"What are your technical skills?\", \"Tell me about your projects\", etc.',
    inputSchema: {
      type: 'object',
      properties: {
        question: {
          type: 'string',
          description: 'Your question about Nehan\'s background, experience, education, projects, or skills'
        }
      },
      required: ['question']
    }
  },
  {
    name: 'send_email',
    description: 'Send an email notification to a specified recipient with a subject and body. Perfect for contact forms, notifications, or reaching out.',
    inputSchema: {
      type: 'object',
      properties: {
        recipient: {
          type: 'string',
          format: 'email',
          description: 'Email address of the recipient'
        },
        subject: {
          type: 'string',
          description: 'Subject line of the email'
        },
        body: {
          type: 'string',
          description: 'Main content/body of the email'
        }
      },
      required: ['recipient', 'subject', 'body']
    }
  },
  {
    name: 'get_cv_topics',
    description: 'Get a list of topics you can ask about regarding Nehan\'s CV and background.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'email_service_info',
    description: 'Get information about the email service configuration and setup instructions.',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  }
];

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    switch (name) {
      case 'cv_chat': {
        const { question } = CVChatToolSchema.parse(args);
        const answer = cvChat.answerQuestion(question);
        return {
          content: [
            {
              type: 'text',
              text: answer
            }
          ]
        };
      }
      
      case 'send_email': {
        const emailData = SendEmailToolSchema.parse(args) as EmailRequest;
        const result = await emailService.sendEmail(emailData);
        
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        };
      }
      
      case 'get_cv_topics': {
        GetTopicsToolSchema.parse(args);
        const topics = cvChat.getAvailableTopics();
        return {
          content: [
            {
              type: 'text',
              text: `You can ask me about the following topics:\n\n${topics.map((topic, index) => `${index + 1}. ${topic}`).join('\n')}\n\nExample questions:\n- "What role did you have at your last position?"\n- "What are your technical skills?"\n- "Tell me about your latest projects"\n- "What is your educational background?"\n- "How can I contact you?"`
            }
          ]
        };
      }
      
      case 'email_service_info': {
        EmailServiceInfoToolSchema.parse(args);
        const info = emailService.getEmailServiceInfo();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(info, null, 2)
            }
          ]
        };
      }
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Invalid arguments: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`);
    }
    throw error;
  }
});

// Create Express app for HTTP API
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nehan CV MCP Server is running' });
});

// CV Chat HTTP endpoint
app.post('/api/cv-chat', async (req, res) => {
  try {
    const { question } = CVChatToolSchema.parse(req.body);
    const answer = cvChat.answerQuestion(question);
    res.json({ answer });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
  }
});

// Send Email HTTP endpoint
app.post('/api/send-email', async (req, res) => {
  try {
    const emailData = SendEmailToolSchema.parse(req.body) as EmailRequest;
    const result = await emailService.sendEmail(emailData);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Invalid request' });
  }
});

// Get Topics HTTP endpoint
app.get('/api/cv-topics', (req, res) => {
  try {
    const topics = cvChat.getAvailableTopics();
    res.json({ topics });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get topics' });
  }
});

// Email Service Info HTTP endpoint
app.get('/api/email-service-info', (req, res) => {
  try {
    const info = emailService.getEmailServiceInfo();
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get email service info' });
  }
});

// Start the server
async function main() {
  const isMCPMode = process.argv.includes('--mcp') || process.env.MCP_MODE === 'true';
  
  if (isMCPMode) {
    // MCP Server mode (for Claude Desktop)
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    console.error('Nehan CV MCP Server started successfully!');
    console.error('Available tools: cv_chat, send_email, get_cv_topics, email_service_info');
    console.error('Ready to answer questions about Nehan Chandira\'s background and send email notifications.');
  } else {
    // HTTP Server mode (for deployment)
    app.listen(PORT, () => {
      console.log(`Nehan CV Server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log('Available endpoints:');
      console.log(`- POST /api/cv-chat`);
      console.log(`- POST /api/send-email`);
      console.log(`- GET /api/cv-topics`);
      console.log(`- GET /api/email-service-info`);
    });
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.error('Shutting down server...');
  await server.close();
  process.exit(0);
});

main().catch((error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});