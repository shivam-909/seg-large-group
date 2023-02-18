# Instructions to run server

* Ensure you have Node.js installed on your machine:

https://nodejs.org/en/download/

* Install the latest version of npm : `npm install -g npm`

* Install all dependencies : `npm install`

* Run the server in development mode

  - First, run `npm run build`

  - Then copy `admin-sdk.json` into `/dist/config/`

  - `npm run dev`



# Project structure

* `/config` : All code related to grabbing configuration information such as database URIs, third party API keys etc will reside here.

* `/dist` : Where the code built into js will go to.

* `/models` : All models for persistence.

* `/routes` : All route handlers and business logic.

