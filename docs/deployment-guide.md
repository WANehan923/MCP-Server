# Deployment Guide

This guide covers different deployment options for your Nehan CV MCP Server.

## 🖥️ Local Development

### Quick Start
```bash
# Install dependencies
npm install

# Build the server
npm run build

# Start the server
npm start
```

### Development Mode
```bash
npm run dev
```

## 🌐 Production Deployment

### Option 1: Railway (Recommended)

Railway provides easy deployment for Node.js applications:

1. **Connect GitHub Repository**
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub account
   - Select the repository

2. **Configure Environment Variables**
   ```
   NODE_ENV=production
   EMAIL_USER=your-production-email@gmail.com
   EMAIL_APP_PASSWORD=your-production-app-password
   PORT=3000
   ```

3. **Deploy**
   - Railway will automatically build and deploy
   - Your MCP server will be available at the provided URL

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   # Install Heroku CLI
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create nehan-cv-mcp-server
   ```

3. **Configure Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_APP_PASSWORD=your-app-password
   ```

4. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 3: DigitalOcean App Platform

1. **Connect Repository**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository

2. **Configure Build Settings**
   ```yaml
   # app.yaml
   name: nehan-cv-mcp-server
   services:
   - name: api
     source_dir: /
     github:
       repo: your-username/your-repo
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: NODE_ENV
       value: production
   ```

### Option 4: AWS EC2

1. **Launch EC2 Instance**
   - Choose Ubuntu 22.04 LTS
   - Configure security groups (allow port 3000)

2. **Setup Server**
   ```bash
   # SSH into instance
   ssh -i your-key.pem ubuntu@your-instance-ip

   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Clone and setup project
   git clone your-repo-url
   cd New\ MCP\ Serever
   npm install
   npm run build
   ```

3. **Configure PM2 (Process Manager)**
   ```bash
   # Install PM2
   sudo npm install -g pm2

   # Start application
   pm2 start dist/index.js --name nehan-cv-server

   # Save PM2 configuration
   pm2 save
   pm2 startup
   ```

## 🔧 Configuration for MCP Clients

### Claude Desktop Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nehan-cv-server": {
      "command": "node",
      "args": ["/path/to/deployed/server/dist/index.js"],
      "env": {
        "EMAIL_USER": "your-email@gmail.com",
        "EMAIL_APP_PASSWORD": "your-app-password"
      }
    }
  }
}
```

### For Remote Deployment

If deployed remotely, you might need to create a wrapper script:

```bash
#!/bin/bash
# wrapper.sh
curl -X POST "https://your-deployed-server.com/mcp" \
  -H "Content-Type: application/json" \
  -d "$@"
```

## 🎯 Next.js Frontend Deployment

### Vercel (Recommended for Frontend)

1. **Connect Repository**
   - Go to [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `frontend`

2. **Configure Build Settings**
   ```
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Environment Variables**
   ```
   NEXT_PUBLIC_MCP_SERVER_URL=https://your-mcp-server.com
   ```

### Netlify

1. **Deploy Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Connect Repository**
   - Set build directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`

## 🔒 Security Considerations

### Production Security Checklist

- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS in production
- [ ] Implement rate limiting
- [ ] Validate all inputs
- [ ] Use secure email app passwords (not regular passwords)
- [ ] Keep dependencies updated
- [ ] Monitor logs for suspicious activity

### Email Security

```typescript
// Secure email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD // App password, not regular password
  },
  secure: true, // Use SSL
  port: 465
});
```

## 📊 Monitoring & Logging

### PM2 Monitoring
```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs nehan-cv-server

# Restart if needed
pm2 restart nehan-cv-server
```

### Application Logging
```typescript
// Add to your server for production logging
console.log(`[${new Date().toISOString()}] Server started on port ${port}`);
console.error(`[${new Date().toISOString()}] Error:`, error);
```

## 🚀 Performance Optimization

### Production Optimizations

1. **Enable Compression**
   ```typescript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Cache Static Assets**
   ```typescript
   app.use(express.static('public', {
     maxAge: '1d'
   }));
   ```

3. **Connection Pooling**
   ```typescript
   const transporter = nodemailer.createTransporter({
     pool: true,
     maxConnections: 5,
     maxMessages: 100
   });
   ```

## 🧪 Testing Deployment

### Test MCP Server
```bash
# Test server health
curl https://your-deployed-server.com/health

# Test with MCP client
# Use Claude Desktop or other MCP-compatible client
```

### Load Testing
```bash
# Install artillery
npm install -g artillery

# Create test config
# artillery.yml
config:
  target: 'https://your-server.com'
  phases:
    - duration: 60
      arrivalRate: 10
scenarios:
  - name: "CV Chat Test"
    requests:
      - post:
          url: "/mcp"
          json:
            tool: "cv_chat"
            params:
              question: "What are your skills?"

# Run test
artillery run artillery.yml
```

## 📝 Troubleshooting

### Common Issues

1. **Email Not Sending**
   - Verify app password is correct
   - Check 2FA is enabled
   - Ensure less secure app access is disabled

2. **MCP Connection Issues**
   - Verify server is running
   - Check file paths in configuration
   - Ensure proper permissions

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify TypeScript configuration

### Debug Commands
```bash
# Check server status
pm2 status

# View detailed logs
pm2 logs nehan-cv-server --lines 100

# Restart with logs
pm2 restart nehan-cv-server && pm2 logs
```

---

Choose the deployment option that best fits your needs and budget. Railway and Vercel are great for quick deployments, while AWS EC2 offers more control for enterprise applications.