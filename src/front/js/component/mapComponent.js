// MapComponent.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function MapComponent({ center }) {  // Acepta "center" como prop
  return (
    <LoadScript googleMapsApiKey="AIzaSyD6awrXJhU7zStchlInJF1Oi6ZrywPcl_0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}  // Usa el prop "center" para centrar el mapa
        zoom={10}
      >
        <Marker position={center} />  {/* Agrega un marcador en el centro */}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;
