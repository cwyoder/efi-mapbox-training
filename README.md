# efi-mapbox-training

## Installation & development environment.

Node and npm are required in order to run Browsersync and set up a local development server.

After cloning the repo, run `npm install` to install dependencies for Browsersync.

Run `npm start` to start up a local server that watches for changes in the `public` folder and refreshes the page.

## Public folder

The public folder contains elements necessary to make a simple static site with a mapbox map. If you are unable to run a local server, opening `index.html` in a web browser should display the map.

## Mapbox

A Mapbox access token is required for the map to work. The token goes in the appropriate place on line 4 of `base.js`.

Links:

- [Mapbox GL documentation](https://docs.mapbox.com/mapbox-gl-js/api/)
- [Mapbox examples](https://docs.mapbox.com/mapbox-gl-js/example/)
