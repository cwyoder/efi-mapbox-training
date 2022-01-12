// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiZWZpZm9ydGhlZnV0dXJlIiwiYSI6ImNrdjFmcjlraDB2dXMzMXExb3FjcmRwZnEifQ.TlPLp8iEo8k1Zbu1hVfHJA';

// Initializing map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-87.847155, 41.839420],
  zoom: 8.5,
});

// on map load event
map.on('load', () => {
  // Adding pipelines geojson source to map
  map.addSource('pipelines', {
    type: 'geojson',
    data: 'hydrogen-pipelines.geojson',
  });

  // Adding refineries geojson source to map
  map.addSource('refineries', {
    type: 'geojson',
    data: 'refineries.geojson'
  });

});
