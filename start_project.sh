#!/bin/bash

echo "🚀 Starting AI Internship Platform..."
echo ""

echo "🔧 Starting Backend Server..."
gnome-terminal -- bash -c "cd src/backend && python main.py; exec bash" &

echo "⏳ Waiting 3 seconds for backend to start..."
sleep 3

echo "⚛️ Starting Frontend Server..."
gnome-terminal -- bash -c "npm start; exec bash" &

echo ""
echo "✅ Both servers are starting!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8000"
echo "📚 API Docs: http://localhost:8000/docs"
echo ""
