const fetch = require("node-fetch");
const { v4: uuidv4 } = require("uuid");

const { buildProjectUrl, buildCityUrl, buildDeveloperUrl } = require("../../src/utils/buildUrl");
const { getAutocompletePlaces } = require("../../src/utils/getAutocompletePlaces");

async function getRequest(url) {
  let resp;
  let rawResp;
  try {
    resp = await fetch(process.env.STRAPI_HOST + url);

    if (!resp.ok) {
      console.log("Not 200 response");
    }

    const rawResp = await resp.text();

    const data = JSON.parse(rawResp);
    return data;
  } catch (err) {
    console.log("Fetch error", err);
    if (resp && rawResp) {
      console.log("Fetch error response", rawResp);
    }
  }
}

const searchProjectsByName = async searchTerm => {
  const strapiProjects = await getRequest(`/projects?isSoldOut=false&projectName_contains=${searchTerm}`);
  return [...(strapiProjects || [])];
};

const searchCitiesByName = async searchTerm => {
  const starpiCities = await getRequest(`/cities?&cityName_contains=${searchTerm}`);
  return starpiCities || [];
};

const searchDevelopersByName = async searchTerm => {
  const strapiDevelopers = await getRequest(`/developers?&developerName_contains=${searchTerm}`);
  return strapiDevelopers || [];
};

const toRad = Value => {
  return (Value * Math.PI) / 180;
};

const calcCrow = (lat1, lon1, lat2, lon2) => {
  var R = 6371;
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};

let projectsCache = [];

const searchProjectsByLocation = async places => {
  if (!projectsCache || projectsCache.length === 0) {
    projectsCache = await getRequest("/projects?isSoldOut=false");
  }

  let projectsWithin = [];
  for (const project of projectsCache) {
    const projectLat = project?.projectAddressMapLocation?.lat;
    const projectLon = project?.projectAddressMapLocation?.lon;

    for (const place of places) {
      const { lat, lng } = place.geometry.location;
      const distance = calcCrow(projectLat, projectLon, lat, lng);
      if (distance < 5) {
        projectsWithin.push(project);
      }
    }
  }

  const uniqueProjects = [...new Map(projectsWithin.flat().map(item => [item?.id, item])).values()];

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
      label: project?.projectName,
      type: "project",
      link: buildProjectUrl({ projectName: project?.projectName }),
    };
  }

  function cityToResponse(city) {
    return {
      label: city?.cityName,
      type: "city",
      link: buildCityUrl({ cityName: city?.cityName }),
    };
  }

  function developerToResponse(developer) {
    return {
      label: developer?.developerName,
      type: "developer",
      link: buildDeveloperUrl({ developerName: developer?.developerName }),
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

  // add 5th result or fill up to 5 items
  if (shortList.length < 5) {
    shortList.push(...placeResponses.slice(0, 5 - shortList.length));
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

    const googleMapsSessionToken = data.sessiontoken || uuidv4();

    const [places, projectMatchesByName, citiesMatchesByName, developersMatchesByName] = await Promise.all([
      getAutocompletePlaces(googleMapsSessionToken, searchTerm),
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
