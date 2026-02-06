@echo off
echo Starting BlokBio...

:: Check if Rscript is in PATH
where Rscript >nul 2>nul
if %errorlevel% neq 0 (
    echo Error: R is not found in your PATH.
    echo Please install R from https://cloud.r-project.org/
    echo If R is installed, make sure to add it to your PATH variable.
    echo.
    echo Common locations to check: "C:\Program Files\R\R-4.x.x\bin"
    pause
    exit /b
)

:: Run the start script
Rscript start_app.R

pause
