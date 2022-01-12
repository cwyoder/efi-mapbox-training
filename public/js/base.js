// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = '';

// Initializing map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-108.970000, 51.610000],
  zoom: 2,
});

// Zoom and rotation controls
map.addControl(new mapboxgl.NavigationControl({
  showCompass: false
}));

// on map load event
map.on('load', () => {
  // Adding pipelines geojson source to map
  map.addSource('hydrogen-pipelines', {
    type: 'geojson',
    data: 'hydrogen-pipelines.geojson',
  });

  // Adding refineries geojson source to map
  map.addSource('refineries', {
    type: 'geojson',
    data: 'refineries.geojson'
  });

  // Adding refinery circles as a layer on the map
  map.addLayer({
    id: 'refinery-points',
    type: 'circle',
    source: 'refineries',
    paint: {
      'circle-color': '#66ccff',
      'circle-radius': 6,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
    }
  });

  // Adding pipelines source as a layer on the map
  map.addLayer({
    id: 'pipelines',
    type: 'line',
    source: 'hydrogen-pipelines',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-color': '#cc3300',
      'line-width': 5,
    }
  });

  // Adding click event for refinery-points
  map.on('click', 'refinery-points', (e) => {
    // looking at features of clicked point
    console.log(e.features);

    // Naming variables
    const coordinates = e.features[0].geometry.coordinates.slice(); //copies the coordinates array
    const featureProps = e.features[0].properties;
    const popupContent = `<p>${featureProps.name}</p>
                          <p>${featureProps.city}, ${featureProps.state}</p>
                          <p>${featureProps.corp}</p>
                          <p>Hydrogen: ${featureProps.hydrogen}</p>`

    // Ensure that if the map is zoomed out such that
    // multiple copies of the feature are visible, the
    // popup appears over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(popupContent)
      .addTo(map);
  });

  // Mouse pointer on refinery points
  map.on('mouseenter', 'refinery-points', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'refinery-points', () => {
    map.getCanvas().style.cursor = '';
  });
});
