@echo off
echo ====================================
echo   BlockBlitz Mobile Test Server
echo ====================================
echo.
echo Starting server...
echo.
cd /d "%~dp0"
node server.js
echo.
echo Server stopped. Press any key to close.
pause
