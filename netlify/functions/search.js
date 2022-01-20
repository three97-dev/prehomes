const contentful = require(`contentful`);
const { Client } = require("@googlemaps/google-maps-services-js");

const { buildProjectUrl, buildCityUrl, buildDeveloperUrl } = require("../../src/utils/buildUrl");

const contentfulConfig = {
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
};
const contentfulClient = contentful.createClient(contentfulConfig);

const mapsClient = new Client({
  config: {
    params: {
      key: "AIzaSyBi76kzF9HZr3hjSUvBA45aqIJTwe-zR9g",
    },
    timeout: 10000, // milliseconds
  },
});

const getAutocompletePlaces = async searchTerm => {
  const response = await mapsClient.placeAutocomplete({
    params: {
      input: searchTerm,
      types: "geocode",
      components: ["country:ca", "country:us"],
    },
  });

  const places = response?.data?.predictions || [];

  const responses = await Promise.all(
    places.map(place =>
      mapsClient.placeDetails({
        params: {
          place_id: place.place_id,
        },
      })
    )
  );

  return responses.map(response => response?.data?.result || []);
};

const searchProjectsByName = async searchTerm => {
  const contentfulProjects = await contentfulClient.getEntries({
    content_type: "project",
    "fields.projectName[match]": searchTerm,
  });

  return contentfulProjects?.items || [];
};

const searchCitiesByName = async searchTerm => {
  const contentfulProjects = await contentfulClient.getEntries({
    content_type: "city",
    "fields.cityName[match]": searchTerm,
  });

  return contentfulProjects?.items || [];
};
const searchDevelopersByName = async searchTerm => {
  const contentfulProjects = await contentfulClient.getEntries({
    content_type: "developer",
    "fields.developerName[match]": searchTerm,
  });

  return contentfulProjects?.items || [];
};

const searchProjectsByLocation = async places => {
  const roundTo2Decimals = number => {
    return Math.round((number + Number.EPSILON) * 1000) / 1000;
  };
  const coordinatesQuery = (lat, lng) => {
    return `${roundTo2Decimals(lat)},${roundTo2Decimals(lng)},5`;
  };
  const responses = await Promise.all(
    places.map(place => {
      const { lat, lng } = place.geometry.location;
      const locationQuery = coordinatesQuery(lat, lng);

      return contentfulClient.getEntries({
        content_type: "project",
        "fields.projectAddressMapLocation[within]": locationQuery,
      });
    })
  );

  const allProjects = responses.map(response => response.items);
  const uniqueProjects = [...new Map(allProjects.flat().map(item => [item.sys.id, item])).values()];

  return uniqueProjects;
};

const mapResults = ({
  places = [],
  projectMatchesByName = [],
  citiesMatchesByName = [],
  developersMatchesByName = [],
  projectsByLocation = [],
}) => {
  function placeToResponse(place) {
    const { lat, lng } = place?.geometry?.location || {};
    return {
      label: place?.formatted_address,
      type: "place",
      link: `/search?lat=${lat}&lng=${lng}`,
      lat,
      lng,
    };
  }

  function projectToResponse(project) {
    return {
      label: project?.fields?.projectName,
      type: "project",
      link: buildProjectUrl({ projectName: project?.fields?.projectName }),
    };
  }

  function cityToResponse(city) {
    return {
      label: city?.fields?.cityName,
      type: "city",
      link: buildCityUrl({ cityName: city?.fields?.cityName }),
    };
  }

  function developerToResponse(developer) {
    return {
      label: developer?.fields?.developerName,
      type: "developer",
      link: buildDeveloperUrl({ developerName: developer?.fields?.developerName }),
    };
  }

  const placeResponses = places.map(place => placeToResponse(place));
  const projectsByName = projectMatchesByName.map(project => projectToResponse(project));
  const nearbyProjects = projectsByLocation.map(project => projectToResponse(project));
  const projectResponses = [...projectsByName, ...nearbyProjects];
  const cityResponses = citiesMatchesByName.map(city => cityToResponse(city));
  const developerResponses = developersMatchesByName.map(developer => developerToResponse(developer));

  const shortList = [];
  shortList.push(...developerResponses.slice(0, 1)); // include at least 1 developer response
  shortList.push(...cityResponses.slice(0, 1)); // include at least 1 city response

  // up to 4th result
  shortList.push(...projectResponses.slice(0, 4 - shortList.length));

  // add 5th result
  if (shortList.length < 5) {
    shortList.push(...placeResponses.slice(0, 1));
  }

  const longList = [];
  longList.push(...projectResponses); // include all project responses
  longList.push(...developerResponses); // include all developer responses
  longList.push(...cityResponses); // include all city responses
  longList.push(...placeResponses); // include all places responses

  function resortResponses(responses) {
    function sortByLabel(a, b) {
      return ("" + a.label).localeCompare(b.label);
    }

    return [
      ...responses.filter(item => item.type === "project").sort(sortByLabel),
      ...responses.filter(item => item.type === "city").sort(sortByLabel),
      ...responses.filter(item => item.type === "developer").sort(sortByLabel),
      ...responses.filter(item => item.type === "place").sort(sortByLabel),
    ];
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      shortList: resortResponses(shortList),
      longList: resortResponses(longList),
    }),
  };
};

const headers = { "Content-Type": "application/json" };

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);
    const searchTerm = data.searchTerm || "";

    const [places, projectMatchesByName, citiesMatchesByName, developersMatchesByName] = await Promise.all([
      getAutocompletePlaces(searchTerm),
      searchProjectsByName(searchTerm),
      searchCitiesByName(searchTerm),
      searchDevelopersByName(searchTerm),
    ]);

    const projectsByLocation = await searchProjectsByLocation(places);

    return mapResults({
      places,
      projectMatchesByName,
      citiesMatchesByName,
      developersMatchesByName,
      projectsByLocation,
    });
  } catch (e) {
    console.log(`Netlify function error: ${e.message}`, e);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        status: "error",
        error: e.response ? e.response.data : e.message,
      }),
    };
  }
};
