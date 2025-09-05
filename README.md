# Nehan Chandira's CV MCP Server

A Model Context Protocol (MCP) server that enables AI assistants to chat about Nehan Chandira's CV and send email notifications. This project showcases API design and integration skills through a practical implementation.

## Features

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

### Next.js Playground
- **Interactive Frontend**: Test both CV chat and email functionality
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Real-time Chat Interface**: Simulated MCP server interactions
- **Email Templates**: Pre-built templates for common use cases

## Technical Stack

- **Backend**: TypeScript, Node.js, MCP SDK
- **Email Service**: Nodemailer with Gmail/SMTP support
- **Validation**: Zod for schema validation
- **Frontend**: Next.js 14, React, Tailwind CSS
- **Build Tools**: TypeScript compiler, TSX for development

## Prerequisites

- Node.js 18+ and npm
- Gmail account (for email functionality)
- MCP-compatible AI assistant (Claude Desktop, etc.)

## Installation & Setup

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

## Usage

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


### `get_cv_topics`
Get available CV topics you can ask about.

**Parameters:** None

### `email_service_info`
Get email service configuration details.

**Parameters:** None


## Live Deployment

###  Quick Deploy

**Backend (MCP Server):**
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/your-template-id)

**Frontend (Playground):**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/nehan-cv-mcp-server&project-name=nehan-cv-playground&repository-name=nehan-cv-playground&root-directory=frontend)


### 🔗 Expected Live URLs

After deployment, you'll have:
- **Backend**: `https://your-app-name.railway.app`
- **Frontend**: `https://your-project.vercel.app`


> 📖 **Detailed deployment guide**: See [`docs/DEPLOYMENT_LINKS.md`](./docs/DEPLOYMENT_LINKS.md) for step-by-step instructions

## 📞 Contact

- **Email**: nehanchandira619@gmail.com
- **GitHub**: [WANehan923](https://github.com/WANehan923)
- **LinkedIn**: [nehancmp-bb7a43268](https://www.linkedin.com/in/nehancmp-bb7a43268)

---

*This project showcases technical proficiency in modern web development, API integration, and cloud-based solutions. Built as a demonstration of software engineering capabilities for potential employers and collaborators.*
