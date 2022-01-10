import React from "react";
import PropTypes from "prop-types";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

const DEFAULT_MAP_OPTIONS = {
  libraries: ["places"],
};

function Map({ children, mapOptions }) {
  const googleMapsCredentials = null; // TODO: use static graphQL query (add new type MapConfig)

  const mapCredentials = googleMapsCredentials || {
    id: "model-academy-300219",
    googleMapsApiKey: "AIzaSyBi76kzF9HZr3hjSUvBA45aqIJTwe-zR9g",
  };
  const { isLoaded, loadError } = useLoadScript({
    ...mapCredentials,
    ...DEFAULT_MAP_OPTIONS,
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? <GoogleMap {...mapOptions}>{children}</GoogleMap> : <>Loading Google Maps...</>;
}

export default Map;

Map.propTypes = {
  mapOptions: PropTypes.object,
};

Map.defaultProps = {
  mapOptions: {},
};
