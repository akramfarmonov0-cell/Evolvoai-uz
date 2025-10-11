@echo off
chcp 65001 >nul
echo ============================================================
echo   EvolvoAI - To'liq Sistema Testi
echo ============================================================
echo.

echo [TEST 1/7] Backend Server...
timeout /t 1 /nobreak >nul
curl -s http://localhost:5000/api/health >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Backend ishlayapti [PORT 5000]
) else (
    echo    ❌ Backend ishlamayapti
    echo       Yo'nalish: START_ALL.bat ni ishga tushiring
)
echo.

echo [TEST 2/7] MongoDB Connection...
timeout /t 1 /nobreak >nul
curl -s http://localhost:5000/api/health | findstr "OK" >nul
if %errorlevel% equ 0 (
    echo    ✅ MongoDB ulangan
) else (
    echo    ❌ MongoDB ulanmagan
)
echo.

echo [TEST 3/7] Telegram Bot...
timeout /t 1 /nobreak >nul
curl -s http://localhost:5000/api/health | findstr "telegram" >nul
if %errorlevel% equ 0 (
    echo    ✅ Telegram Bot faol
    echo       Test: Telegram'da /start yuboring
) else (
    echo    ❌ Telegram Bot nofaol
    echo       Tekshiring: backend\.env da TELEGRAM_BOT_TOKEN
)
echo.

echo [TEST 4/7] Frontend Server...
timeout /t 1 /nobreak >nul
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Frontend ishlayapti [PORT 3000]
) else (
    echo    ❌ Frontend ishlamayapti
    echo       Yo'nalish: cd frontend ^&^& npm run start
)
echo.

echo [TEST 5/7] API Endpoints...
timeout /t 1 /nobreak >nul

echo    Testing /api/posts...
curl -s http://localhost:5000/api/posts >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Posts API
) else (
    echo    ❌ Posts API
)

echo    Testing /api/portfolio...
curl -s http://localhost:5000/api/portfolio >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Portfolio API
) else (
    echo    ❌ Portfolio API
)

echo    Testing /api/services...
curl -s http://localhost:5000/api/services >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Services API
) else (
    echo    ❌ Services API
)
echo.

echo [TEST 6/7] Frontend Pages...
timeout /t 1 /nobreak >nul

echo    Testing / (Home)...
curl -s http://localhost:3000/ | findstr "EvolvoAI" >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Home Page
) else (
    echo    ❌ Home Page
)

echo    Testing /services...
curl -s http://localhost:3000/services >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Services Page
) else (
    echo    ❌ Services Page
)

echo    Testing /portfolio...
curl -s http://localhost:3000/portfolio >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Portfolio Page
) else (
    echo    ❌ Portfolio Page
)

echo    Testing /contact...
curl -s http://localhost:3000/contact >nul 2>&1
if %errorlevel% equ 0 (
    echo    ✅ Contact Page
) else (
    echo    ❌ Contact Page
)
echo.

echo [TEST 7/7] PWA Features...
timeout /t 1 /nobreak >nul

if exist "frontend\public\manifest.json" (
    echo    ✅ manifest.json
) else (
    echo    ❌ manifest.json
)

if exist "frontend\public\icon-192x192.png" (
    echo    ✅ PWA Icons
) else (
    echo    ❌ PWA Icons (cd frontend ^&^& node generate-icons.js)
)

if exist "frontend\public\sw.js" (
    echo    ✅ Service Worker
) else (
    echo    ⚠️  Service Worker (npm run build kerak)
)
echo.

echo ============================================================
echo   Test Tugallandi
echo ============================================================
echo.
echo 📱 Manual Testlar:
echo    1. Telegram: Botga /start yuboring
echo    2. Website: http://localhost:3000
echo    3. Admin: http://localhost:3000/admin/login
echo    4. PWA: Chrome'da Install tugmasini bosing
echo.
pause
