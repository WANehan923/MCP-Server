# Deployment Links & Instructions

## 🚀 Quick Deployment Options

### Option 1: Railway (Backend) + Vercel (Frontend) - **RECOMMENDED**

**Railway (MCP Server Backend):**
1. Go to [Railway.app](https://railway.app)
2. Click "Start a New Project" → "Deploy from GitHub repo"
3. Select your `nehan-cv-mcp-server` repository
4. Set environment variables:
   - `EMAIL_USER`: your-email@gmail.com
   - `EMAIL_APP_PASSWORD`: your-app-password
   - `NODE_ENV`: production
5. Railway will auto-deploy from main branch

**Vercel (Frontend):**
1. Go to [Vercel.com](https://vercel.com)
2. Click "New Project" → Import your GitHub repo
3. Set **Root Directory**: `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_MCP_SERVER_URL`: your-railway-app-url
5. Deploy!

---

### Option 2: Render (Full-Stack)

**Deploy Backend:**
1. Go to [Render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Use these settings:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Add environment variables (EMAIL_USER, EMAIL_APP_PASSWORD)

**Deploy Frontend:**
1. Create another Web Service on Render
2. Set Root Directory: `frontend`
3. Build Command: `npm run build`
4. Start Command: `npm start`

---

### Option 3: Heroku

**Backend Deployment:**
```bash
# Install Heroku CLI first
npm install -g heroku

# Login and create app
heroku login
heroku create nehan-cv-mcp-server

# Set environment variables
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_APP_PASSWORD=your-app-password
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

**Frontend Deployment:**
```bash
# Create frontend app
heroku create nehan-cv-frontend

# Set environment variables
heroku config:set NEXT_PUBLIC_MCP_SERVER_URL=https://nehan-cv-mcp-server.herokuapp.com

# Deploy frontend (from frontend directory)
git subtree push --prefix frontend heroku main
```

---

### Option 4: Netlify (Frontend Only)

1. Go to [Netlify.com](https://netlify.com)
2. Drag & drop your `frontend` folder OR connect GitHub
3. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`

---

## 📋 Environment Variables Setup

### For Backend Deployment:
```env
NODE_ENV=production
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-gmail-app-password
PORT=3000
```

### For Frontend Deployment:
```env
NEXT_PUBLIC_MCP_SERVER_URL=https://your-backend-url.com
```

## 🔗 Expected Live URLs

After deployment, you'll have:

**Backend (MCP Server):**
- Railway: `https://nehan-cv-mcp-server-production.up.railway.app`
- Render: `https://nehan-cv-mcp-server.onrender.com`
- Heroku: `https://nehan-cv-mcp-server.herokuapp.com`

**Frontend (Playground):**
- Vercel: `https://nehan-cv-frontend.vercel.app`
- Netlify: `https://nehan-cv-playground.netlify.app`
- Render: `https://nehan-cv-frontend.onrender.com`

## 🧪 Testing Deployment

Once deployed, test your endpoints:

```bash
# Health check (if you add a health endpoint)
curl https://your-backend-url.com/health

# Test with MCP client
# Configure Claude Desktop with your live server URL
```

## 📱 Mobile-Friendly

The Next.js frontend is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🔧 Continuous Deployment

Both Railway and Vercel offer automatic deployments:
- **Auto-deploy** when you push to `main` branch
- **Preview deployments** for pull requests
- **Environment-specific** configurations

## 💡 Pro Tips

1. **Use Railway for backend** - great for Node.js apps
2. **Use Vercel for frontend** - optimized for Next.js
3. **Set up custom domains** for professional URLs
4. **Enable HTTPS** (automatically enabled on all platforms)
5. **Monitor logs** through platform dashboards
6. **Set up alerts** for downtime or errors

## 🌍 Global CDN

Your deployed apps will have:
- **Global content delivery network (CDN)**
- **Automatic SSL certificates**
- **Fast loading times worldwide**
- **High availability and uptime**

---

**Choose your preferred deployment option and follow the steps above to get your CV MCP Server live on the internet!**