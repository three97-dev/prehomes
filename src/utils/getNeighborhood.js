const { Client } = require("@googlemaps/google-maps-services-js");

const mapsClient = new Client({
  config: {
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
    timeout: 10000, // milliseconds
  },
});

exports.getNeighborhood = async (project) => {
  const { lat, lon } = project.projectAddressMapLocation;

  if (process.env.SKIP_RESOLVE_NEIGHBORHOOD) {
    console.log(`Skip resolve Neighborhood GMAP call for "${project.projectName}"`);
    return "UNRESOLVED";
  }

  const geocodeResp = await mapsClient.reverseGeocode({
    params: {
      latlng: [lat, lon],
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

  const sublocalityComponent = geoPlace.find(place =>
    place.address_components.some(part => part.types.includes("sublocality"))
  );
  if (sublocalityComponent) {
    const sublocalityName = sublocalityComponent.address_components.find(part => part.types.includes("sublocality"));

    return sublocalityName.long_name;
  }

  const localityComponent = geoPlace.find(place =>
    place.address_components.some(part => part.types.includes("locality"))
  );
  if (localityComponent) {
    const localityName = localityComponent.address_components.find(part => part.types.includes("locality"));

    return localityName.long_name;
  }

  return null;
};
