import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const demoLocation = {
  lat: 52.25197647809785,
  lng: 20.982115526763753,
};

function MapsComponent({ location, googleMapsCredentials }) {
  const { isLoaded, loadError } = useLoadScript(
    googleMapsCredentials || {
      id: "API key 1",
      googleMapsApiKey: "AIzaSyB765yoNvYKI3Jdbfd7Vhxx2hZPb0Hbhs8",
    }
  );

  const mapLocation = location ? { lat: location.lat, lng: location.lon } : demoLocation;

  const renderMap = () => {
    return (
      <GoogleMap
        options={{
          zoomControlOptions: {
            position: "right-center",
          },
        }}
        mapContainerStyle={containerStyle}
        center={mapLocation}
        zoom={10}
      >
        <Marker position={mapLocation} clickable={false} />
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <>Loading Google Maps...</>;
}

export default MapsComponent;
