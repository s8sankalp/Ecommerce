#!/bin/bash

echo "🚀 Starting ShopHub E-commerce Platform..."

# Check if MongoDB is running
echo "📊 Checking MongoDB connection..."
if ! pgrep -x "mongod" > /dev/null; then
    echo "❌ MongoDB is not running. Please start MongoDB first."
    echo "   On macOS: brew services start mongodb-community"
    echo "   On Windows: Start MongoDB service"
    echo "   On Linux: sudo systemctl start mongod"
    exit 1
fi

echo "✅ MongoDB is running"

# Start backend
echo "🔧 Starting backend server..."
cd backend
npm install
npm run seed &
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend development server..."
cd ../frontend
npm install
npm start &
FRONTEND_PID=$!

echo "✅ ShopHub is starting up!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5000"
echo "📊 Admin Login: admin@example.com / admin123"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait 