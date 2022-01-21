require("dotenv").config();
const path = require("path");
const { DateTime } = require("luxon");
const axios = require("axios");

const projectTemplate = path.resolve("./src/templates/project.js");
const cityTemplate = path.resolve("./src/templates/city.js");
const developerTemplate = path.resolve("./src/templates/developer.js");

const { buildProjectUrl, buildCityUrl, buildDeveloperUrl } = require("./src/utils/buildUrl");
const { calculatePricePerSquareFoot } = require("./src/utils/calculatePricePerSquareFoot");

const getUniquePrices = projectFloors => {
  return [...new Set(projectFloors.map(projectFloor => projectFloor.price))].sort((a, b) => {
    return a - b;
  });
};

const getMaxProjectBeds = projectFloors => {
  const sortedByBeds = projectFloors.sort((a, b) => {
    return b.bedrooms - a.bedrooms;
  });

  return sortedByBeds[0].bedrooms;
};

const getMaxProjectBaths = projectFloors => {
  const sortedByBaths = projectFloors.sort((a, b) => {
    return b.bathrooms - a.bathrooms;
  });

  return sortedByBaths[0].bathrooms;
};

const getUniqueSquareFootages = projectFloors => {
  return [...new Set(projectFloors.map(projectFloor => projectFloor.squareFootage))];
};

async function getWalkScore(lat, lon) {
  try {
    const url = `https://api.walkscore.com/score?format=json&lat=${lat}&lon=${lon}&transit=1&bike=1&wsapikey=${process.env.WALK_SCORE_API_KEY}`;
    const result = await axios.get(url);
    return result.data;
  } catch (err) {
    console.log("Walk Score API error:", err.message);
  }
}

exports.sourceNodes = async args => {
  const { actions, getNodesByType, getNode } = args;
  const { createNodeField } = actions;

  const projects = getNodesByType("ContentfulProject");
  for (const project of projects) {
    const floorNodes = project.projectFloorPlans___NODE.map(id => getNode(id));
    const prices = getUniquePrices(floorNodes);
    const maxBeds = getMaxProjectBeds(floorNodes);
    const maxBaths = getMaxProjectBaths(floorNodes);
    const squareFootages = getUniqueSquareFootages(floorNodes);
    const lat = project.projectAddressMapLocation.lat;
    const lon = project.projectAddressMapLocation.lon;
    const score = await getWalkScore(lat, lon);
    if (score?.status !== 1) {
      console.log(`Failed to get WalkScore API response for "${project.projectName}"`);
    }
    const walkScore = score?.walkscore || 0;
    const bikeScore = score?.bike?.score || 0;
    const transitScore = score?.transit?.score || 0;

    let status;
    if (project.isSoldOut) {
      status = "sold-out";
    } else {
      const launchDate = DateTime.fromISO(project.launchDate);
      const soonThreshold = DateTime.now().plus({ month: 6 });
      if (launchDate < soonThreshold) {
        status = "newest-releases";
      } else {
        status = "launching-soon";
      }
    }

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
    }
  `);
  if (projectsData.errors) {
    reporter.panicOnBuild(`There was an error loading your Contentful Projects`, projectsData.errors);
    return;
  }
  const projects = projectsData.data.allContentfulProject.nodes;
  const cities = projectsData.data.allContentfulCity.nodes;
  const developers = projectsData.data.allContentfulDeveloper.nodes;

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
};
