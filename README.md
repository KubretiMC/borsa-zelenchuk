# BorsaZelenchuk
__BorsaZelenchuk__ is a React TypeScript app. It’s an online fruit and vegetable market where users can create accounts and interact with the products. 

It uses Tailwind for styling and redux for state management. 

It can run in browsers but for best user experience it uses Cordova to also run as an application on a phone. Its mobile version can also be tested on PC from the device toolbar. 

## Deployment

This app is hosted on Firebase. The deployed version of BorsaZelenchuk is accessible at [https://borsazelenchuk.web.app/](https://borsazelenchuk.web.app/).
### Note 
The backend is on  [https://render.com/](https://render.com/)

Render spins down after 15 minutes of inactivity, so the first request after starting the app takes a while, but subsequent requests are faster. 

## Features

Profile screen

Offer products that will be displayed to other users.

Search/reserve products offered by other users.


## Scripts
The following scripts are used in the project:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm cordova-setup`
Sets up the Cordova project. It creates the Cordova project, adds the Android platform, copies build files, and builds the Android app.
### `npm cordova-run-android`
This script runs the Android app. If the Cordova project directory does not exist, it prompts you to run the setup script first.


## Backend Repository

If you're interested in the backend code, you can find it in the [backend repository](https://github.com/KubretiMC/borsa-zelenchuk--backend).


