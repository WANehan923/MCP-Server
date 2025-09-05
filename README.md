# Nehan Chandira's CV MCP Server

A Model Context Protocol (MCP) server that enables AI assistants to chat about Nehan Chandira's CV and send email notifications. This project showcases API design and integration skills through a practical implementation.

## 🚀 Features

### CV Chat Functionality
- **Intelligent CV Parsing**: Structured data extraction from CV content
- **Natural Language Queries**: Ask questions like:
  - "What role did you have at your last position?"
  - "What are your technical skills?"
  - "Tell me about your latest projects"
  - "What is your educational background?"

### Email Notification System
- **SMTP Integration**: Send emails through configurable email service
- **Input Validation**: Robust validation using Zod schemas
- **Error Handling**: Comprehensive error messages and status reporting
- **HTML Email Templates**: Professional email formatting

### Next.js Playground (Optional)
- **Interactive Frontend**: Test both CV chat and email functionality
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Chat Interface**: Simulated MCP server interactions
- **Email Templates**: Pre-built templates for common use cases

## 🛠️ Technical Stack

- **Backend**: TypeScript, Node.js, MCP SDK
- **Email Service**: Nodemailer with Gmail/SMTP support
- **Validation**: Zod for schema validation
- **Frontend**: Next.js 14, React, Tailwind CSS
- **Build Tools**: TypeScript compiler, TSX for development

## 📋 Prerequisites

- Node.js 18+ and npm
- Gmail account (for email functionality)
- MCP-compatible AI assistant (Claude Desktop, etc.)

## 🔧 Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Navigate to project directory
cd "New MCP Serever"

# Install server dependencies
npm install

# Install frontend dependencies (optional)
cd frontend && npm install && cd ..
```

### 2. Configure Email Service

Create a `.env` file in the root directory:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password
```

**Email Setup Instructions:**
1. Enable 2-factor authentication on your Gmail account
2. Generate an app-specific password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password as `EMAIL_APP_PASSWORD`

### 3. Build the Server

```bash
npm run build
```

## 🚀 Usage

### As MCP Server

1. **Start the server:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

2. **Configure in Claude Desktop** (`claude_desktop_config.json`):
   ```json
   {
     "mcpServers": {
       "nehan-cv-server": {
         "command": "node",
         "args": ["/path/to/New MCP Serever/dist/index.js"]
       }
     }
   }
   ```

3. **Use in Claude Desktop:**
   - Ask questions about Nehan's CV
   - Send emails through the MCP tools

### Next.js Playground (Optional)

```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to access the interactive playground.

## 🔧 Available MCP Tools

### `cv_chat`
Chat about Nehan's background and experience.

**Parameters:**
- `question` (string): Your question about CV content

**Example:**
```json
{
  "question": "What programming languages does Nehan know?"
}
```

### `send_email`
Send email notifications to specified recipients.

**Parameters:**
- `recipient` (string): Email address
- `subject` (string): Email subject
- `body` (string): Email content

**Example:**
```json
{
  "recipient": "contact@example.com",
  "subject": "Hello from Nehan's CV Server",
  "body": "This is a test email from the MCP server."
}
```

### `get_cv_topics`
Get available CV topics you can ask about.

**Parameters:** None

### `email_service_info`
Get email service configuration details.

**Parameters:** None

## 📁 Project Structure

```
New MCP Serever/
├── src/
│   ├── index.ts           # Main MCP server
│   ├── cv-data.ts         # Structured CV data
│   ├── cv-chat.ts         # CV chat service
│   └── email-service.ts   # Email functionality
├── frontend/              # Optional Next.js playground
│   ├── app/
│   ├── components/
│   └── package.json
├── dist/                  # Compiled JavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## 🌐 Deployment Options

### Local Deployment
- Build: `npm run build`
- Start: `npm start`
- Configure in MCP client

### Cloud Deployment
- **Railway**: Connect GitHub repo, auto-deploy
- **Vercel**: Next.js frontend deployment
- **Heroku**: Full-stack deployment with email service

### Environment Variables for Production
```env
NODE_ENV=production
EMAIL_USER=your-production-email@gmail.com
EMAIL_APP_PASSWORD=your-production-app-password
PORT=3000
```

## 🎯 Key CV Highlights

This project demonstrates:

- **Full-Stack Development**: TypeScript backend with React frontend
- **API Integration**: MCP protocol implementation
- **Email Services**: SMTP integration with proper error handling
- **Data Modeling**: Structured CV data representation
- **Modern Tooling**: TypeScript, Next.js, Tailwind CSS
- **Production Ready**: Environment configuration, error handling, validation

## 👤 About Nehan Chandira

- **Education**: BSc (Hons) Computer Science, Plymouth University (2022-2025)
- **Experience**: Banking (NDB Bank), QA Testing, Freelance Graphic Design
- **Skills**: React, Node.js, Python, AWS, AI/ML, Mobile Development
- **Projects**: AI Chatbots, E-commerce Apps, IoT Systems, Authentication Systems

## 📞 Contact

- **Email**: nehanchandira619@gmail.com
- **GitHub**: [WANehan923](https://github.com/WANehan923)
- **LinkedIn**: [nehancmp-bb7a43268](https://www.linkedin.com/in/nehancmp-bb7a43268)

---

*This project showcases technical proficiency in modern web development, API integration, and cloud-based solutions. Built as a demonstration of software engineering capabilities for potential employers and collaborators.*