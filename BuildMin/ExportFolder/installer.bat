@echo off

setlocal enabledelayedexpansion

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Install form https://nodejs.org/en
    pause
    exit /b
)

node server.js
pause