# Instructions to run server

* Ensure you have Node.js installed on your machine:

https://nodejs.org/en/download/

* Install the latest version of npm

`npm install -g npm`

* Install all dependencies

`npm install`

* Run the server in development mode

`npm run dev`

* Optional: Build the server into a distributable located in `/dist`

`npm run build`

# Project structure

* `/config` : All code related to grabbing configuration information such as database URIs, third party API keys etc will reside here.

* `/dist` : Where the code built into js will go to.

* `/models` : All models for persistence.

* `/routes` : All route handlers and business logic.

