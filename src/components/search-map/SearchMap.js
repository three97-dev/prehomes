import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";

import Map from "../basic/map/Map";

import UniversalLink from "../../utils/UniversalLink";

import "./SearchMap.css";

const containerStyle = {
  width: "100%",
  height: "100%",
  filter: "grayscale(1)",
};

const defaultCenter = { lat: 45, lng: -100 };

function SearchMap({ allProjects, filteredProjects, centerPosition, zoom, onMapChange }) {
  const [map, setMap] = useState(null);
  const [savedClusterer, setClusterer] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState();

  useEffect(() => {
    if (savedClusterer) {
      savedClusterer.repaint();
    }
  }, [savedClusterer, filteredProjects]);

  return (
    <Map
      mapOptions={{
        options: {
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
        },
        mapContainerStyle: containerStyle,
        center: centerPosition || defaultCenter,
        zoom: centerPosition ? zoom || 13 : 5,
        maxZoom: 9,
        onLoad: useCallback(
          map => {
            setMap(map);
            // set bounds as soon as map is loaded
            onMapChange({
              bounds: map.getBounds(),
              zoom: map.zoom,
            });
          },
          [setMap]
        ),
        onIdle: useCallback(() => {
          onMapChange({
            bounds: map.getBounds(),
            zoom: map.zoom,
          });
        }, [map, onMapChange]),
      }}
    >
      <MarkerClusterer
        gridSize={60}
        ignoreHidden={true}
        onClusteringEnd={clusterer => {
          setClusterer(clusterer);
        }}
        clusterClass="cluster-icon"
      >
        {clusterer => {
          return allProjects.map((project, index) => (
            <Marker
              key={index}
              position={{ lat: project.lat, lng: project.lng }}
              clusterer={clusterer}
              visible={filteredProjects.some(filteredProject => filteredProject.id === project.id)}
              onClick={() => setShowInfoWindow(index)}
            >
              {showInfoWindow === index && (
                <InfoWindow position={{ lat: project.lat, lng: project.lng }} onCloseClick={() => setShowInfoWindow()}>
                  <div className="p-8px">
                    <UniversalLink link={project.link}>
                      <span className="link-font font-bold">{project.title}</span>
                    </UniversalLink>
                    <p className="mt-10px font-bold">{project.city.toUpperCase()}</p>
                    {project.neighborhood}
                    <p className="mt-10px font-bold">{project.price}</p>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ));
        }}
      </MarkerClusterer>
    </Map>
  );
}

export default SearchMap;

SearchMap.propTypes = {
  allProjects: PropTypes.array,
  filteredProjects: PropTypes.array,
  onMapChange: PropTypes.func,
};

SearchMap.defaultProps = {
  allProjects: [],
  filteredProjects: [],
  onMapChange: () => {},
};
