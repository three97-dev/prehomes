import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Marker } from "@react-google-maps/api";

import Map from "../basic/map/Map";

import TransportationMarker from "../../assets/map/transportation-marker.png";
import ShoppingMarker from "../../assets/map/shopping-marker.png";
import RestaurantMarker from "../../assets/map/restaurant-marker.png";
import CafesMarker from "../../assets/map/cafes-marker.png";
import ArtsMarker from "../../assets/map/arts-marker.png";
import FitnessMarker from "../../assets/map/fitness-marker.png";
import CenterMarker from "../../assets/map/center-marker.png";

import "./NeighborhoodMap.css";

const NeighborhoodMapButton = ({ isSelected, onClick, label, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${
        isSelected
          ? "text-left text-14px md+:text-20px leading-14px md+:leading-31px font-poppins font-bold md+:font-medium text-black h-full w-full bg-beige md+:bg-silver p-20px"
          : "text-left text-14px md+:text-20px leading-14px md+:leading-31px font-poppins text-dark-gray h-full w-full p-20px"
      } ${className}`}
    >
      {label}
    </button>
  );
};

const RADIUS = "2000";
const TYPES = ["bus_station", "store", "restaurant", "bar", "art_gallery", "gym"];

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 41.9,
  lng: -87.624,
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

const NeighborhoodMap = ({ geoLocation, className }) => {
  const [map, setMap] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSelected, setIsSelected] = useState({
    transportation: false,
    shopping: false,
    restaurants: false,
    cafeAndBars: false,
    artsAndEntertainment: false,
    fitness: false,
  });

  const shownResults = searchResults.filter(searchResult => {
    if (isSelected.transportation && searchResult.types.some(type => type === "bus_station")) return true;
    if (isSelected.shopping && searchResult.types.some(type => type === "store")) return true;
    if (isSelected.restaurants && searchResult.types.some(type => type === "restaurant")) return true;
    if (isSelected.cafeAndBars && searchResult.types.some(type => type === "bar")) return true;
    if (isSelected.artsAndEntertainment && searchResult.types.some(type => type === "art_gallery")) return true;
    if (isSelected.fitness && searchResult.types.some(type => type === "gym")) return true;
    return false;
  });

  useEffect(() => {
    async function wrapNearbySearch(service, location, type) {
      return new Promise((resolve, reject) => {
        service.nearbySearch({ location, radius: RADIUS, type }, (results, status) => {
          if (status !== "OK" || !results) reject();
          resolve(results);
        });
      });
    }
    async function fetchNearbyPlaces() {
      try {
        const location = mapLocation(geoLocation);
        const service = new window.google.maps.places.PlacesService(map);
        const results = await Promise.all(TYPES.map(type => wrapNearbySearch(service, location, type)));

        setSearchResults(results.flat());
      } catch (err) {
        console.log("Fetch Nearby Places error", err);
      }
    }

    if (map) {
      fetchNearbyPlaces();
    }
  }, [map]);

  const centerPosition = useMemo(() => {
    return mapLocation(geoLocation);
  }, [geoLocation]);

  const getIconByType = types => {
    if (types.some(type => type === "bus_station") && isSelected.transportation) return TransportationMarker;
    if (types.some(type => type === "store") && isSelected.shopping) return ShoppingMarker;
    if (types.some(type => type === "restaurant") && isSelected.restaurants) return RestaurantMarker;
    if (types.some(type => type === "bar") && isSelected.cafeAndBars) return CafesMarker;
    if (types.some(type => type === "art_gallery") && isSelected.artsAndEntertainment) return ArtsMarker;
    if (types.some(type => type === "gym") && isSelected.fitness) return FitnessMarker;
  };

  return (
    <div
      className={`md+:switch-location-grid max-w-1126px mx-auto bg-white-pink md:bg-transparent ${className}`}
    >
      <div className="switch-location-map-grid w-full md+:w-736px h-390px md+:h-369px pb-20px md+:pb-0px">
        <Map
          mapOptions={{
            mapContainerStyle: containerStyle,
            center: centerPosition || defaultCenter,
            zoom: 15,
            onLoad: useCallback(
              map => {
                setMap(map);
              },
              [setMap]
            ),
          }}
        >
          <Marker icon={CenterMarker} position={mapLocation(geoLocation)} zIndex={100}></Marker>
          {shownResults.map((result, index) => (
            <Marker
              key={index}
              position={result.geometry.location}
              icon={getIconByType(result.types)}
              title={result.name}
            ></Marker>
          ))}
        </Map>
      </div>
      <div className="switch-location-transportation-grid mx-25px md+:mx-0px">
        <NeighborhoodMapButton
          onClick={() => {
            isSelected.transportation
              ? setIsSelected({ ...isSelected, transportation: false })
              : setIsSelected({ ...isSelected, transportation: true });
          }}
          isSelected={isSelected.transportation}
          label="Transportation"
        />
      </div>
      <div className="switch-location-shopping-grid mx-25px md+:mx-0px">
        <NeighborhoodMapButton
          onClick={() => {
            isSelected.shopping
              ? setIsSelected({ ...isSelected, shopping: false })
              : setIsSelected({ ...isSelected, shopping: true });
          }}
          isSelected={isSelected.shopping}
          label="Shopping"
        />
      </div>
      <div className="switch-location-restaurants-grid mx-25px md+:mx-0px">
        <NeighborhoodMapButton
          onClick={() => {
            isSelected.restaurants
              ? setIsSelected({ ...isSelected, restaurants: false })
              : setIsSelected({ ...isSelected, restaurants: true });
          }}
          isSelected={isSelected.restaurants}
          label="Restaurants"
        />
      </div>
      <div className="switch-location-cafes-bars-grid mx-25px md+:mx-0px">
        <NeighborhoodMapButton
          onClick={() => {
            isSelected.cafeAndBars
              ? setIsSelected({ ...isSelected, cafeAndBars: false })
              : setIsSelected({ ...isSelected, cafeAndBars: true });
          }}
          isSelected={isSelected.cafeAndBars}
          label="Cafes & Bars"
        />
      </div>
      <div className="switch-location-arts-entertainment-grid mx-25px md+:mx-0px">
        <NeighborhoodMapButton
          onClick={() => {
            isSelected.artsAndEntertainment
              ? setIsSelected({ ...isSelected, artsAndEntertainment: false })
              : setIsSelected({ ...isSelected, artsAndEntertainment: true });
          }}
          isSelected={isSelected.artsAndEntertainment}
          label="Arts & Entertainment"
        />
      </div>
      <div className="switch-location-fitness-grid mx-25px md+:mx-0px">
        <NeighborhoodMapButton
          onClick={() => {
            isSelected.fitness
              ? setIsSelected({ ...isSelected, fitness: false })
              : setIsSelected({ ...isSelected, fitness: true });
          }}
          isSelected={isSelected.fitness}
          label="Fitness"
        />
      </div>
    </div>
  );
};

export default NeighborhoodMap;
