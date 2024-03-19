//CHANGE !!

import * as React from 'react';
import Map from 'react-map-gl';

const API_KEY = import.meta.env.VITE_API_KEY

function MapPage() {
  return (
    <Map
      mapboxAccessToken={API_KEY}
      initialViewState={{
        longitude: -1.612920,
        latitude: 54.977840,
        zoom: 12
      }}
      style={{width: 900, height: 900}}
      mapStyle="mapbox://styles/mapbox/dark-v11"
    />
  );
}

export default MapPage