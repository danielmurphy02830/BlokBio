@echo off
setlocal
echo Checking for R installation...

:: 1. Try default PATH
where Rscript >nul 2>nul
if %errorlevel% equ 0 (
    echo Found R in PATH.
    Rscript start_app.R
    goto :EOF
)

:: 2. Search in Standard Directories (High Priority: x64)
echo R not found in PATH. Searching standard directories...

set "R_PATH="
for /d %%D in ("C:\Program Files\R\R-*") do (
    if exist "%%D\bin\x64\Rscript.exe" (
        set "R_PATH=%%D\bin\x64\Rscript.exe"
    ) else if exist "%%D\bin\Rscript.exe" (
        set "R_PATH=%%D\bin\Rscript.exe"
    )
)

if defined R_PATH (
    echo Found R at: "%R_PATH%"
    "%R_PATH%" start_app.R
    echo.
    echo NOTE: To fix this permanently, add the folder above to your System PATH.
    pause
    goto :EOF
)

:: 3. Failed
echo.
echo ========================================================
echo CRITICAL ERROR: R could not be found.
echo ========================================================
echo 1. Did you install R? (https://cloud.r-project.org/)
echo 2. If installed, it might be in a non-standard location.
echo.
pause
