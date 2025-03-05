@echo off

setlocal enabledelayedexpansion

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Install form https://nodejs.org/en
    pause
    exit /b
)

if exist "node_modules\" (
    echo "Running npm start..."
    npm start
) else (
    echo "App modules not installed. Running npm install to install modules..."
    npm install && npm start
)

npm start
pause