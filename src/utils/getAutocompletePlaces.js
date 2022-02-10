const { Client } = require("@googlemaps/google-maps-services-js");

const mapsClient = new Client({
  config: {
    params: {
      key: process.env.GOOGLE_MAPS_API_KEY,
    },
    timeout: 10000, // milliseconds
  },
});

exports.getAutocompletePlaces = async (sessionToken, searchTerm) => {
  const response = await mapsClient.placeAutocomplete({
    params: {
      input: searchTerm,
      types: "geocode",
      components: ["country:ca", "country:us"],
      sessiontoken: sessionToken,
    },
  });
  const places = response?.data?.predictions || [];
  const responses = await Promise.all(
    places.map(place =>
      mapsClient.placeDetails({
        params: {
          place_id: place.place_id,
          sessiontoken: sessionToken,
        },
      })
    )
  );

  return responses.map(response => response?.data?.result || []);
};
