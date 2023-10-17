@echo off

set projectDir=.\BorsaZelenchuk

if exist "%projectDir%" (
    echo Changing directory to %projectDir%
    cd %projectDir%
    
    echo Running the Android app...
    cordova run android
) else (
    echo Cordova project directory does not exist. Please run the setup script first.
)

cd ..