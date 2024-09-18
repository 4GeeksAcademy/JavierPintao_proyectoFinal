// MapComponent.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 40.24205,
  lng: -4.19574
};

function MapComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyD6awrXJhU7zStchlInJF1Oi6ZrywPcl_0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        {/* Puedes agregar marcadores, polígonos, o cualquier otro componente de Google Maps */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
