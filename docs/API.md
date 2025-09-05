# API Documentation

This document describes the MCP tools available in Nehan's CV Server.

## Available Tools

### 1. `cv_chat`

Chat about Nehan's CV, background, and experience.

**Purpose**: Answer questions about education, work experience, projects, skills, and personal information.

**Parameters**:
- `question` (string, required): Your question about Nehan's background

**Example Usage**:
```json
{
  "tool": "cv_chat",
  "arguments": {
    "question": "What role did you have at your last position?"
  }
}
```

**Sample Questions**:
- "What are your technical skills?"
- "Tell me about your latest projects"
- "What is your educational background?"
- "How can I contact you?"
- "What programming languages do you know?"

**Response Format**: Plain text answer with relevant information from CV.

---

### 2. `send_email`

Send email notifications to specified recipients.

**Purpose**: Send emails through SMTP with proper validation and formatting.

**Parameters**:
- `recipient` (string, required): Valid email address
- `subject` (string, required): Email subject line
- `body` (string, required): Email content/message

**Example Usage**:
```json
{
  "tool": "send_email",
  "arguments": {
    "recipient": "contact@example.com",
    "subject": "Hello from Nehan's CV Server",
    "body": "This is a test email sent through the MCP server."
  }
}
```

**Response Format**:
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "unique-message-id"
}
```

**Error Response**:
```json
{
  "success": false,
  "message": "Validation error: Invalid email address"
}
```

---

### 3. `get_cv_topics`

Get available topics you can ask about regarding Nehan's CV.

**Purpose**: Help users understand what information is available.

**Parameters**: None

**Example Usage**:
```json
{
  "tool": "get_cv_topics",
  "arguments": {}
}
```

**Response**: List of available topics with example questions.

---

### 4. `email_service_info`

Get information about email service configuration and setup.

**Purpose**: Debug email service setup and get configuration instructions.

**Parameters**: None

**Example Usage**:
```json
{
  "tool": "email_service_info",
  "arguments": {}
}
```

**Response**: JSON object with service configuration details and setup instructions.

## Error Handling

All tools implement comprehensive error handling:

- **Validation Errors**: Invalid input parameters
- **Service Errors**: Email service unavailable
- **Network Errors**: Connection issues
- **Authentication Errors**: Invalid email credentials

## Rate Limiting

Currently no rate limiting is implemented, but for production use, consider:
- Max 10 requests per minute per IP
- Max 5 emails per hour per IP
- Implement request queuing for high volume

## Security Considerations

- All email inputs are validated and sanitized
- No sensitive information is logged
- Email credentials stored securely in environment variables
- HTTPS recommended for production deployment