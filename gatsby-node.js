require("dotenv").config();
const path = require("path");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const hubspot = require("@hubspot/api-client");
const _ = require("lodash");

const hubspotClient = new hubspot.Client({ apiKey: process.env.HUBSPOT_API_KEY });

const projectTemplate = path.resolve("./src/templates/project.js");
const cityTemplate = path.resolve("./src/templates/city.js");
const developerTemplate = path.resolve("./src/templates/developer.js");
const projectTypeTemplate = path.resolve("./src/templates/project-type.js");

const { buildProjectUrl, buildCityUrl, buildDeveloperUrl, buildProjectTypeUrl } = require("./src/utils/buildUrl");
const { calculatePricePerSquareFoot } = require("./src/utils/calculatePricePerSquareFoot");
const { getProjectPricePerSqft } = require("./src/utils/getProjectPricePerSqft");
const { calculateAveragePrice } = require("./src/utils/calculateAveragePrice");
const { resolveStatus } = require("./src/utils/resolveStatus");
const { getNeighborhood } = require("./src/utils/getNeighborhood");
const {
  hubSpotProperties,
  mapOverProjectProperties,
  toHubSpotProjectProperties,
} = require("./src/utils/projectHubspotProperties");

async function wait(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

const getUniquePrices = projectFloors => {
  if (!projectFloors || projectFloors.length === 0) {
    return [];
  }

  return [...new Set(projectFloors.map(projectFloor => projectFloor.price))].sort((a, b) => {
    return a - b;
  });
};

const getMaxProjectBeds = projectFloors => {
  if (!projectFloors || projectFloors.length === 0) {
    return null;
  }

  const sortedByBeds = projectFloors.sort((a, b) => {
    return b.bedrooms - a.bedrooms;
  });

  return sortedByBeds[0].bedrooms;
};

const getMaxProjectBaths = projectFloors => {
  if (!projectFloors || projectFloors.length === 0) {
    return null;
  }

  const sortedByBaths = projectFloors.sort((a, b) => {
    return b.bathrooms - a.bathrooms;
  });

  return sortedByBaths[0].bathrooms;
};

const getUniqueSquareFootages = projectFloors => {
  return [...new Set(projectFloors.map(projectFloor => projectFloor.squareFootage))];
};

async function getWalkScore(lat, lon) {
  if (!lat || !lon) {
    return null;
  }

  try {
    const url = `https://api.walkscore.com/score?format=json&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=${process.env.WALK_SCORE_API_KEY}`;
    const result = await axios.get(url);
    return result.data;
  } catch (err) {
    console.log("Walk Score API error:", err.message);
  }
}

async function processHubSpotProject(project) {
  const projectHubSpotProperties = toHubSpotProjectProperties(project);

  await wait(300); // wait for little bit to prevent API limit error

  const searchResponse = await hubspotClient.crm.objects.searchApi.doSearch("PROJECT", {
    filterGroups: [{ filters: [{ value: project.contentful_id, propertyName: "project_id", operator: "EQ" }] }],
    properties: hubSpotProperties,
  });

  if (searchResponse.results.length > 0) {
    const [existingObject] = searchResponse.results;
    // update only if name changed (no other fields need synchronization for now)
    if (
      !_.isEqual(
        mapOverProjectProperties(existingObject.properties),
        mapOverProjectProperties(projectHubSpotProperties)
      )
    ) {
      await hubspotClient.crm.objects.basicApi.update("PROJECT", existingObject.id, {
        properties: projectHubSpotProperties,
      });
      console.log(
        `Updated HubSpot Project fields for "${project.projectName}" (contentful_id=${project.contentful_id})`
      );
    }
  } else {
    await hubspotClient.crm.objects.basicApi.create("PROJECT", {
      properties: projectHubSpotProperties,
    });
    console.log(`Created HubSpot Project for "${project.projectName}" (contentful_id=${project.contentful_id})`);
  }
}
let count = 0;
exports.sourceNodes = async args => {
  const { actions, getNodesByType, getNode } = args;
  const { createNodeField } = actions;

  const projects = getNodesByType("ContentfulProject");
  for (const project of projects) {
    const floorNodes = project.projectFloorPlans___NODE ? project.projectFloorPlans___NODE.map(id => getNode(id)) : [];
    const prices = getUniquePrices(floorNodes);
    const projectMinPrice = prices.length > 0 ? prices[0] : 0;
    const projectMaxPrice = prices.length > 0 ? prices[prices.length - 1] : 0;
    const pricePerSqft = getProjectPricePerSqft(floorNodes);
    const maxBeds = getMaxProjectBeds(floorNodes);
    const maxBaths = getMaxProjectBaths(floorNodes);
    const squareFootages = getUniqueSquareFootages(floorNodes);
    const lat = project?.projectAddressMapLocation?.lat;
    const lon = project?.projectAddressMapLocation?.lon;
    let score = {};
    if (process.env.SKIP_WALKSCORE_API_USAGE === "true") {
      console.log(`Skip WalkScore API call for "${project.projectName}"`);
    } else {
      score = await getWalkScore(lat, lon);
      if (score?.status !== 1) {
        console.log(`Failed to get WalkScore API response for "${project.projectName}"`);
      }
    }

    const walkScore = score?.walkscore || 0;
    const bikeScore = score?.bike?.score || 0;
    const transitScore = score?.transit?.score || 0;

    const status = resolveStatus(project.launchDate);

    const neighborhood = await getNeighborhood(project);

    createNodeField({
      node: project,
      name: "neighborhood",
      value: neighborhood,
    });
    createNodeField({
      node: project,
      name: "pageUrl",
      value: buildProjectUrl(project),
    });
    createNodeField({
      node: project,
      name: "maxBeds",
      value: maxBeds,
    });
    createNodeField({
      node: project,
      name: "maxBaths",
      value: maxBaths,
    });
    createNodeField({
      node: project,
      name: "prices",
      value: prices,
    });
    createNodeField({
      node: project,
      name: "projectMinPrice",
      value: projectMinPrice,
    });
    createNodeField({
      node: project,
      name: "projectMaxPrice",
      value: projectMaxPrice,
    });
    createNodeField({
      node: project,
      name: "pricePerSqft",
      value: pricePerSqft,
    });
    createNodeField({
      node: project,
      name: "squareFootages",
      value: squareFootages,
    });
    createNodeField({
      node: project,
      name: "projectStatus",
      value: status,
    });
    createNodeField({
      node: project,
      name: "walkScore",
      value: walkScore,
    });
    createNodeField({
      node: project,
      name: "bikeScore",
      value: bikeScore,
    });
    createNodeField({
      node: project,
      name: "transitScore",
      value: transitScore,
    });

    await processHubSpotProject(project);
  }

  for (const project of projects) {
    const pricesPerSqftByCity = projects
      .filter(p => p.isSoldOut === false && p.projectCity___NODE === project.projectCity___NODE)
      .map(p => p.fields.pricePerSqft);
    const priceCityAverage = project.projectCity___NODE // city is null
      ? calculateAveragePrice(pricesPerSqftByCity)
      : 0;

    const pricesPerSqftByNeighborhood = projects
      .filter(p => p.isSoldOut === false && p.projectNeighborhood___NODE === project.projectNeighborhood___NODE)
      .map(project => project.fields.pricePerSqft);

    const priceNeighborhoodAverage = project.projectNeighborhood___NODE // neighborhood is null
      ? calculateAveragePrice(pricesPerSqftByNeighborhood)
      : 0;

    createNodeField({
      node: project,
      name: "priceCityAverage",
      value: priceCityAverage,
    });
    createNodeField({
      node: project,
      name: "priceNeighborhoodAverage",
      value: priceNeighborhoodAverage,
    });
  }

  const floorPlans = getNodesByType("ContentfulFloorPlan");
  for (const floorPlan of floorPlans) {
    createNodeField({
      node: floorPlan,
      name: "pricePerSquareFoot",
      value: calculatePricePerSquareFoot(floorPlan.price, floorPlan.squareFootage),
    });
  }

  const cities = getNodesByType("ContentfulCity");
  for (const city of cities) {
    createNodeField({
      node: city,
      name: "pageUrl",
      value: buildCityUrl(city),
    });
  }

  const developers = getNodesByType("ContentfulDeveloper");
  for (const developer of developers) {
    createNodeField({
      node: developer,
      name: "pageUrl",
      value: buildDeveloperUrl(developer),
    });
  }

  const projectTypes = getNodesByType("ContentfulProjectType");
  for (const projectType of projectTypes) {
    createNodeField({
      node: projectType,
      name: "pageUrl",
      value: buildProjectTypeUrl(projectType),
    });
  }
};
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const projectsData = await graphql(`
    {
      allContentfulProject {
        nodes {
          contentful_id
          fields {
            pageUrl
          }
        }
      }
      allContentfulCity {
        nodes {
          contentful_id
          fields {
            pageUrl
          }
        }
      }
      allContentfulDeveloper {
        nodes {
          contentful_id
          fields {
            pageUrl
          }
        }
      }
      allContentfulProjectType {
        nodes {
          contentful_id
          name
          fields {
            pageUrl
          }
        }
      }
    }
  `);
  if (projectsData.errors) {
    reporter.panicOnBuild(`There was an error loading your Contentful Projects`, projectsData.errors);
    return;
  }
  const projects = projectsData.data.allContentfulProject.nodes;
  const cities = projectsData.data.allContentfulCity.nodes;
  const developers = projectsData.data.allContentfulDeveloper.nodes;
  const projectTypes = projectsData.data.allContentfulProjectType.nodes;

  for (const project of projects) {
    console.log(`Generating Project page: ${project.fields.pageUrl}`);
    createPage({
      path: project.fields.pageUrl,
      component: projectTemplate,
      context: {
        project_contentful_id: project.contentful_id,
      },
    });
  }

  for (const city of cities) {
    console.log(`Generating Project page: ${city.fields.pageUrl}`);
    createPage({
      path: city.fields.pageUrl,
      component: cityTemplate,
      context: {
        city_contentful_id: city.contentful_id,
      },
    });
  }

  for (const developer of developers) {
    console.log(`Generating Project page: ${developer.fields.pageUrl}`);
    createPage({
      path: developer.fields.pageUrl,
      component: developerTemplate,
      context: {
        developer_contentful_id: developer.contentful_id,
      },
    });
  }

  for (const projectType of projectTypes) {
    console.log(`Generating Project Type page: ${projectType.fields.pageUrl}`);
    createPage({
      path: projectType.fields.pageUrl,
      component: projectTypeTemplate,
      context: {
        projectType_contentful_id: projectType.contentful_id,
        projectType_name: projectType.name,
      },
    });
  }
};
