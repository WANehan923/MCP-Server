#!/usr/bin/env node

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} = require('@modelcontextprotocol/sdk/types.js');
const https = require('https');

const REMOTE_SERVER_URL = 'https://mcp-server-production-6aa7.up.railway.app';

// Create MCP server that proxies to remote
const server = new Server(
  {
    name: 'nehan-cv-remote-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools (same as remote server)
const tools = [
  {
    name: 'cv_chat',
    description: 'Ask questions about Nehan Chandira\'s CV, work experience, education, projects, or skills.',
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
    description: 'Send an email notification to a specified recipient with a subject and body.',
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
  }
];

// Function to make HTTP request to remote server
function makeRemoteRequest(endpoint, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, REMOTE_SERVER_URL);
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: data ? 'POST' : 'GET',
      headers: data ? {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(data))
      } : {}
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve(result);
        } catch (error) {
          reject(new Error(`Failed to parse response: ${body}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Handle tool listing
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool execution by proxying to remote server
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    let result;
    
    switch (name) {
      case 'cv_chat':
        result = await makeRemoteRequest('/api/cv-chat', { question: args.question });
        return {
          content: [{
            type: 'text',
            text: result.answer || result.error || 'No response received'
          }]
        };
        
      case 'send_email':
        result = await makeRemoteRequest('/api/send-email', {
          recipient: args.recipient,
          subject: args.subject,
          body: args.body
        });
        return {
          content: [{
            type: 'text',
            text: JSON.stringify(result, null, 2)
          }]
        };
        
      case 'get_cv_topics':
        result = await makeRemoteRequest('/api/cv-topics');
        return {
          content: [{
            type: 'text',
            text: `Available CV topics:\n${result.topics ? result.topics.join('\n- ') : 'Topics not available'}`
          }]
        };
        
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error calling remote server: ${error.message}\n\nMake sure the remote server at ${REMOTE_SERVER_URL} is accessible.`
      }]
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error('Nehan CV Remote MCP Server started successfully!');
  console.error(`Proxying requests to: ${REMOTE_SERVER_URL}`);
  console.error('Available tools: cv_chat, send_email, get_cv_topics');
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