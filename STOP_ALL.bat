@echo off
echo ========================================
echo   EvolvoAI - Barcha Serverlarni To'xtatish
echo ========================================
echo.

REM Barcha node processlarni to'xtatish
echo Node processlarni to'xtatish...
taskkill /F /IM node.exe 2>nul

echo.
echo ========================================
echo   ✅ Barcha serverlar to'xtatildi!
echo ========================================
echo.
pause
