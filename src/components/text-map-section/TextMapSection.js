import React from "react";
import PropTypes from "prop-types";
import { Marker } from "@react-google-maps/api";

import TextSection from "../text-section/TextSection";
import Map from "../basic/map/Map";

import "./TextMapSection.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const mapLocation = location => {
  if (location) {
    return {
      lat: location.lat,
      lng: location.lon,
    };
  }
  return null;
};

const TextMapSection = ({ content, title, centerPosition, mapZoom, textSectionStyle, isMarkerVisible, className }) => {
  return (
    <div className={`md:text-map-section-grid md:px-25px lg:px-0px ${className}`}>
      <TextSection
        title={title}
        content={content}
        className={`pb-40px md:pb-0px px-25px md:px-0px ${textSectionStyle}`}
      />
      <div className="w-full h-390px md:h-fit md:min-h-321px">
        <Map
          mapOptions={{
            mapContainerStyle: containerStyle,
            center: mapLocation(centerPosition),
            zoom: mapZoom,
            options: {
              draggable: false,
              zoomControl: false,
              mapTypeControl: false,
              scaleControl: false,
              streetViewControl: false,
              rotateControl: false,
              fullscreenControl: false,
            },
          }}
        >
          {isMarkerVisible ? <Marker position={mapLocation(centerPosition)} /> : null}
        </Map>
      </div>
    </div>
  );
};

TextMapSection.propTypes = {
  centerPosition: PropTypes.object,
  mapZoom: PropTypes.number,
  isMarkerVisible: PropTypes.bool,
};

TextMapSection.defaultProps = {
  centerPosition: {
    lat: 43.65107,
    lon: -79.347015,
  },
  mapZoom: 15,
  isMarkerVisible: false,
};

export default TextMapSection;
