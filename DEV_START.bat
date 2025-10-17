@echo off
echo ========================================
echo   EvolvoAI - Development Serverlarni Ishga Tushirish
echo ========================================
echo.

REM Backend serverni ishga tushirish
echo [1/2] Backend development server ishga tushmoqda...
cd backend
start "EvolvoAI Backend Dev" cmd /k "npm run dev"
timeout /t 3 /nobreak >nul

REM Frontend serverni ishga tushirish  
echo [2/2] Frontend development server ishga tushmoqda...
cd ..\frontend
start "EvolvoAI Frontend Dev" cmd /k "npm run dev"
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   ✅ Barcha development serverlar ishga tushdi!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Serverlarni to'xtatish uchun terminal oynalarini yoping
echo.

pause
