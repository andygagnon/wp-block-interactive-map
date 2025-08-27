/******/ (() => { // webpackBootstrap
/*!*****************************************!*\
  !*** ./src/interactive-map-aag/view.js ***!
  \*****************************************/
/**
 * This script runs on the front end of the site, after the block is rendered.
 * It reads the attributes from the saved HTML and initializes a Mapbox GL JS map.
 */
document.addEventListener('DOMContentLoaded', () => {
  // A function to initialize the map for each instance of the block.
  function initializeMap(mapElement) {
    // Check if Mapbox GL JS is loaded before proceeding.
    if (typeof mapboxgl === 'undefined') {
      console.error('Mapbox GL JS is not loaded. Please check the plugin PHP file.');
      return;
    }

    // Retrieve block attributes from the data attributes of the saved div.
    const latitude = parseFloat(mapElement.dataset.latitude);
    const longitude = parseFloat(mapElement.dataset.longitude);
    const zoom = parseFloat(mapElement.dataset.zoom);
    const hasUserLocation = mapElement.dataset.hasUserLocation === 'true';

    // NOTE: Replace with your actual Mapbox API token.
    // This is a crucial step. Without a valid token, the map will not load.
    mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVnYWdub24iLCJhIjoiY21lbGpoem52MGdwMDJrb2gxZHhqeDF4diJ9._VP-w51o_z8f7T8wAFdtQQ';

    // Set initial viewport for the map.
    let initialViewport = {
      center: [longitude, latitude],
      zoom: zoom
    };

    // If the block is configured to use the user's location,
    // try to get it before initializing the map.
    if (hasUserLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        // Success callback: use the user's location.
        initialViewport.center = [position.coords.longitude, position.coords.latitude];
        renderMap(mapElement, initialViewport);
      }, error => {
        // Error callback: log the error and use the default location.
        console.error('Geolocation failed:', error);
        renderMap(mapElement, initialViewport);
      });
    } else {
      // If not configured for user location or not supported, render immediately.
      renderMap(mapElement, initialViewport);
    }
  }

  // Function to handle the actual rendering of the map.
  function renderMap(mapElement, viewport) {
    // Create a new map div to prevent issues with multiple block instances.
    const mapContainer = document.createElement('div');
    mapContainer.className = 'interactive-map-aag-map-container';
    mapContainer.style.height = '400px'; // Set a fixed height for the map.
    mapContainer.style.width = '100%';
    mapElement.innerHTML = ''; // Clear the fallback content.
    mapElement.appendChild(mapContainer);

    // Initialize the Mapbox GL JS map.
    const map = new mapboxgl.Map({
      container: mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      // You can choose a different style.
      center: viewport.center,
      zoom: viewport.zoom
    });

    // Add a marker for the user's location.
    new mapboxgl.Marker().setLngLat(viewport.center).addTo(map);

    // Mock data for dynamic markers. In a real-world scenario, this
    // would come from an API or CPT.
    const mockPlaces = [{
      name: 'Museum of Science',
      lat: 42.3677,
      lon: -71.0709
    }, {
      name: 'National Air and Space Museum',
      lat: 38.8878,
      lon: -77.0202
    }, {
      name: 'Exploratorium',
      lat: 37.8016,
      lon: -122.3973
    }];

    // Add mock markers to the map.
    mockPlaces.forEach(place => {
      new mapboxgl.Marker({
        color: 'blue'
      }).setLngLat([place.lon, place.lat]).setPopup(new mapboxgl.Popup().setHTML(`<h3>${place.name}</h3>`)) // add a popup
      .addTo(map);
    });

    // Add a simple zoom and navigation control.
    map.addControl(new mapboxgl.NavigationControl());
  }

  // Find all instances of our block on the page.
  const mapElements = document.querySelectorAll('.wp-block-create-block-interactive-map-aag');
  mapElements.forEach(initializeMap);
});
/******/ })()
;
//# sourceMappingURL=view.js.map