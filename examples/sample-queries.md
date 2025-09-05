# Sample Queries & Examples

This file contains example queries you can use to test the MCP server.

## CV Chat Examples

### Personal Information
```
Q: "What's your name?"
A: "My name is Welapura Arachchige Nehan Chandira Gunathilaka, but I go by Nehan Chandira."

Q: "How can I contact you?"
A: "You can reach me at nehanchandira619@gmail.com or call me at 072 2171358 / 0705868097."
```

### Education
```
Q: "What is your educational background?"
A: "I'm currently pursuing a BSc (Hons) in Computer Science at Plymouth University - United Kingdom (2022 - 2025). My student ID is 27225."

Q: "When do you graduate?"
A: "I'm expected to graduate in 2025 with my BSc (Hons) in Computer Science from Plymouth University."
```

### Work Experience
```
Q: "What role did you have at your last position?"
A: "My most recent position was TBDA (Trainee Business Development Associate) in the Deposit & Mobilization Unit at NDB Bank, where I worked for 2 months."

Q: "Tell me about your work experience"
A: "My work experience includes:
- 2 Months as TBDA in Deposit & Mobilization Unit at NDB Bank
- 3 Months as Quality Assurance Technician at Global System Solution Sri Lanka
- 2 Years as Freelancer in Graphic Design Field"
```

### Technical Skills
```
Q: "What are your programming skills?"
A: "My technical skills include:
- Programming: React, HTML, CSS, JavaScript, Node.js, JAVA, C#, PHP, Python
- Databases: MySQL, MongoDB, Firebase
- Cloud: AWS, Google Cloud Platform
- Design: Figma, Photoshop, Illustrator
- Other: AI & Machine Learning, IoT, Flutter"

Q: "Do you know React?"
A: "Yes, I'm skilled in frontend development with: React, HTML, CSS, JavaScript. I've used these in several projects including my AI Chatbot and E-Commerce applications."
```

### Projects
```
Q: "What are your latest projects?"
A: "My latest projects from 2025:
- Acceleration-Based User Authentication System - Explore acceleration-based user authentication using ML techniques
- AI Chatbot For University Inquiries - AI-powered virtual assistant specifically tailored for NSBM Green University"

Q: "Tell me about your AI projects"
A: "My AI/ML projects include:
- Acceleration-Based User Authentication System - Explore acceleration-based user authentication using ML techniques
- AI Chatbot For University Inquiries - AI-powered virtual assistant specifically tailored for NSBM Green University"
```

## Email Examples

### Basic Email
```json
{
  "recipient": "test@example.com",
  "subject": "Test Email from CV Server",
  "body": "Hello! This is a test email sent through Nehan's CV MCP server."
}
```

### Contact Form Email
```json
{
  "recipient": "nehanchandira619@gmail.com",
  "subject": "Contact from CV Playground",
  "body": "Hi Nehan,\n\nI came across your CV playground and wanted to reach out about potential opportunities.\n\nBest regards,\nYour Name"
}
```

### Collaboration Request
```json
{
  "recipient": "nehanchandira619@gmail.com",
  "subject": "Collaboration Opportunity",
  "body": "Hello Nehan,\n\nI'd like to discuss a potential collaboration on a React/Node.js project. Your experience with AI chatbots caught my attention.\n\nLooking forward to hearing from you."
}
```

## MCP Client Configuration

### Claude Desktop
```json
{
  "mcpServers": {
    "nehan-cv-server": {
      "command": "node",
      "args": ["/path/to/your/project/dist/index.js"],
      "env": {
        "EMAIL_USER": "your-email@gmail.com",
        "EMAIL_APP_PASSWORD": "your-app-password"
      }
    }
  }
}
```

### Environment Variables
```bash
# .env file
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
NODE_ENV=development
PORT=3000
```

## Testing Commands

### Local Testing
```bash
# Start development server
npm run dev

# Build and start production server
npm run build
npm start

# Start frontend playground
cd frontend && npm run dev
```

### Using with Claude Desktop
1. Configure the MCP server in Claude Desktop
2. Restart Claude Desktop
3. Ask questions like:
   - "What are Nehan's technical skills?"
   - "Can you send an email to test@example.com with subject 'Hello' and body 'Test message'?"
   - "What topics can I ask about regarding Nehan's CV?"

## Common Use Cases

### Recruiter Scenario
```
"What role did Nehan have at his last position?"
"What are his technical skills in web development?"
"What projects has he worked on recently?"
"Can you send an email to recruiting@company.com about interview scheduling?"
```

### Developer Collaboration
```
"What AI/ML experience does Nehan have?"
"Has he worked with React and Node.js?"
"What's his GitHub profile?"
"Send an email about potential open source collaboration"
```

### Project Inquiry
```
"Tell me about the e-commerce app project"
"What technologies were used in the wheelchair system?"
"What's his experience with IoT development?"
```