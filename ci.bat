echo off
setlocal EnableDelayedExpansion

:while1
call npm test
echo Type q to quit
set /P inp=""
if "%inp%"=="q" goto end
goto while1

:end

endlocal