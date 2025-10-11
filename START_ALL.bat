@echo off
echo ========================================
echo   EvolvoAI - Barcha Serverlarni Ishga Tushirish
echo ========================================
echo.

REM Backend serverni ishga tushirish
echo [1/2] Backend server ishga tushmoqda...
cd backend
start "EvolvoAI Backend" cmd /k "node src/server.js"
timeout /t 3 /nobreak >nul

REM Frontend serverni ishga tushirish  
echo [2/2] Frontend server ishga tushmoqda...
cd ..\frontend
start "EvolvoAI Frontend" cmd /k "npm run start"
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   ✅ Barcha serverlar ishga tushdi!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Telegram botni test qiling: /start
echo PWA test qiling: Chrome'da localhost:3000
echo.
pause
