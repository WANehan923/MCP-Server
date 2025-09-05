#!/bin/bash

echo "🚀 Setting up Nehan's CV MCP Server..."
echo

# Check Node.js version
NODE_VERSION=$(node --version 2>/dev/null || echo "not installed")
if [[ "$NODE_VERSION" == "not installed" ]]; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $NODE_VERSION"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Build the project
echo "🔨 Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Project built successfully"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Creating .env file from template..."
    cp .env.example .env
    echo "📝 Please edit .env file with your email credentials:"
    echo "   - EMAIL_USER: your-email@gmail.com"
    echo "   - EMAIL_APP_PASSWORD: your-app-password"
    echo
fi

# Setup frontend (optional)
read -p "🎨 Do you want to setup the Next.js frontend? (y/N): " setup_frontend

if [[ $setup_frontend =~ ^[Yy]$ ]]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install frontend dependencies"
        cd ..
        exit 1
    fi
    
    cd ..
    echo "✅ Frontend setup complete"
    echo "🌐 To start frontend: cd frontend && npm run dev"
fi

echo
echo "🎉 Setup complete!"
echo
echo "📋 Next steps:"
echo "1. Edit .env file with your email credentials"
echo "2. Start the server: npm start (or npm run dev for development)"
echo "3. Configure Claude Desktop with the MCP server"
echo "4. Optionally start the frontend: cd frontend && npm run dev"
echo
echo "📚 See README.md for detailed configuration instructions"
echo "🚀 See deployment-guide.md for deployment options"