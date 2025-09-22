@echo off
echo Starting AI Internship Platform...
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd src/backend && python main.py"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "npm start"

echo.
echo ✅ Both servers are starting!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:8000
echo 📚 API Docs: http://localhost:8000/docs
echo.
pause
