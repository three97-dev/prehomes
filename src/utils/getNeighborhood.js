const { Client } = require("@googlemaps/google-maps-services-js");

const mapsClient = new Client({
  config: {
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
    timeout: 10000, // milliseconds
  },
});

exports.getNeighborhood = async (sessionToken, project) => {
  const { lat, lon } = project.projectAddressMapLocation;

  const geocodeResp = await mapsClient.reverseGeocode({
    params: {
      latlng: [lat, lon],
      result_type: ["neighborhood"],
    },
  });

  const geoPlace = geocodeResp?.data?.results || [];

  const neighborhoodComponent = geoPlace.find(place =>
    place.address_components.some(part => part.types.includes("neighborhood"))
  );
  if (neighborhoodComponent) {
    const neighborhoodName = neighborhoodComponent.address_components.find(part => part.types.includes("neighborhood"));

    return neighborhoodName.long_name;
  }

  // const placeResponse = await mapsClient.placeDetails({
  //   params: {
  //     fields: "address_component",
  //     place_id: mostLikelyLocation.place_id,
  //     sessiontoken: sessionToken,
  //   },
  // });

  // placeAddressComponents = placeResponse?.data?.result?.address_components;

  // const sublocalityComponent = placeAddressComponents.find(part => part.types.includes("sublocality"));
  // if (sublocalityComponent) {
  //   return sublocalityComponent.long_name;
  // }

  // const localityComponent = placeAddressComponents.find(part => part.types.includes("locality"));
  // if (localityComponent) {
  //   return localityComponent.long_name;
  // }

  return null;
};
