@echo off

set projectDir=.\BorsaZelenchuk

if not exist "%projectDir%" (
    echo Creating Cordova project...
    start /wait cmd /c "cordova create BorsaZelenchuk com.marian.borsazelencuk BorsaZelenchuk"

    echo Waiting for Cordova project creation to complete...
    timeout /t 10 /nobreak > NUL
) else (
    echo Cordova project directory already exists. Skipping creation.
)

if exist "%projectDir%" (
    echo Changing directory to %projectDir%
    cd %projectDir%
    
    if exist "platforms\android" (
        echo Android platform already added. Skipping.
    ) else (
        echo Adding Android platform...
        cordova platform add android
    )

    echo Copying build files...
    xcopy /s /e /y ..\build\* www

    echo Building the Android app...
    cordova build android
)

cd ..