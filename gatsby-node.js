require("dotenv").config();
const path = require("path");
const axios = require("axios");

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
const processHubSpotProject = require("./src/utils/hubspot-sync");

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



exports.sourceNodes = async args => {
  const { actions, getNodesByType } = args;
  const { createNodeField } = actions;

  const projects = getNodesByType("StrapiProjects");
  for (const project of projects) {
    const floorNodes = project.floor_plans || [];

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

    const floorPricePerSquareFoot = floorNodes.map(floorPlan =>
      calculatePricePerSquareFoot(floorPlan.price, floorPlan.squareFootage)
    );

    createNodeField({
      node: project,
      name: "floorPricePerSquareFoot",
      value: floorPricePerSquareFoot,
    });

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
      .filter(p => p.isSoldOut === false && p?.city?.id === project?.city?.id)
      .map(p => p.fields.pricePerSqft);
    const priceCityAverage = project.city // city is null
      ? calculateAveragePrice(pricesPerSqftByCity)
      : 0;

    const pricesPerSqftByNeighborhood = projects
      .filter(
        p =>
          p.isSoldOut === false &&
          p?.city?.id === project?.city?.id &&
          p.fields.neighborhood === project.fields.neighborhood
      )
      .map(project => project.fields.pricePerSqft);

    const priceNeighborhoodAverage =
      pricesPerSqftByNeighborhood.length > 0 ? calculateAveragePrice(pricesPerSqftByNeighborhood) : 0;

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

  const cities = getNodesByType("StrapiCities");
  for (const city of cities) {
    const cityProjects = projects.filter(p => p.isSoldOut === false && p?.city?.id === city.strapiId);

    createNodeField({
      node: city,
      name: "pageUrl",
      value: buildCityUrl(city),
    });
    createNodeField({
      node: city,
      name: "specialIncentivesProjects",
      value: cityProjects.filter(project => project.special_incentive).length,
    });
    createNodeField({
      node: city,
      name: "newListingProjects",
      value: cityProjects.filter(project => project.fields.projectStatus === "platinum-access").length,
    });
    createNodeField({
      node: city,
      name: "sellingProjects",
      value: cityProjects.filter(project => project.fields.projectStatus === "selling").length,
    });
  }

  const developers = getNodesByType("StrapiDevelopers");
  for (const developer of developers) {
    createNodeField({
      node: developer,
      name: "pageUrl",
      value: buildDeveloperUrl(developer),
    });
  }

  const projectTypes = getNodesByType("StrapiProjectTypes");
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
      allStrapiProjects {
        nodes {
          strapiId
          fields {
            pageUrl
          }
        }
      }
      allStrapiCities {
        nodes {
          strapiId
          fields {
            pageUrl
          }
        }
      }
      allStrapiDevelopers {
        nodes {
          strapiId
          fields {
            pageUrl
          }
        }
      }
      allStrapiProjectTypes {
        nodes {
          strapiId
          fields {
            pageUrl
          }
        }
      }
    }
  `);
  if (projectsData.errors) {
    reporter.panicOnBuild(`There was an error loading your Strapi CMS data`, projectsData.errors);
    return;
  }

  const projects = projectsData.data.allStrapiProjects.nodes;
  const cities = projectsData.data.allStrapiCities.nodes;
  const developers = projectsData.data.allStrapiDevelopers.nodes;
  const projectTypes = projectsData.data.allStrapiProjectTypes.nodes;

  const renderProjectsLimit = process.env.RENDER_LIMIT_PROJECTS
    ? parseInt(process.env.RENDER_LIMIT_PROJECTS, 10)
    : projects.length;

  if (renderProjectsLimit === 0) {
    reporter.warn(`Skipping Project pages generation (see RENDER_LIMIT_PROJECTS env variable)`);
  } else {
    let counter = 1;
    const projectsToRender = projects.slice(0, renderProjectsLimit);
    for (const project of projectsToRender) {
      reporter.info(`Generating Project page [${counter++}/${projectsToRender.length}]: ${project.fields.pageUrl}`);
      createPage({
        path: project.fields.pageUrl,
        component: projectTemplate,
        context: {
          project_strapi_id: project.strapiId,
        },
      });
    }
  }

  const renderCitiesLimit = process.env.RENDER_LIMIT_CITIES
    ? parseInt(process.env.RENDER_LIMIT_CITIES, 10)
    : cities.length;

  if (renderCitiesLimit === 0) {
    reporter.warn(`Skipping City pages generation (see RENDER_LIMIT_CITIES env variable)`);
  } else {
    let counter = 1;
    const citiesToRender = cities.slice(0, renderCitiesLimit);
    for (const city of citiesToRender) {
      reporter.info(`Generating City page [${counter++}/${citiesToRender.length}]: ${city.fields.pageUrl}`);
      createPage({
        path: city.fields.pageUrl,
        component: cityTemplate,
        context: {
          city_strapi_id: city.strapiId,
        },
      });
    }
  }

  const renderDevelopersLimit = process.env.RENDER_LIMIT_DEVELOPERS
    ? parseInt(process.env.RENDER_LIMIT_DEVELOPERS, 10)
    : developers.length;

  if (renderDevelopersLimit === 0) {
    reporter.warn(`Skipping Developer pages generation (see RENDER_LIMIT_DEVELOPERS env variable)`);
  } else {
    let counter = 1;
    const developersToRender = developers.slice(0, renderDevelopersLimit);
    for (const developer of developersToRender) {
      reporter.info(
        `Generating Developer page [${counter++}/${developersToRender.length}]: ${developer.fields.pageUrl}`
      );
      createPage({
        path: developer.fields.pageUrl,
        component: developerTemplate,
        context: {
          developer_strapi_id: developer.strapiId,
        },
      });
    }
  }

  for (const projectType of projectTypes) {
    console.log(`Generating ProjectType Type page: ${projectType.fields.pageUrl}`);
    createPage({
      path: projectType.fields.pageUrl,
      component: projectTypeTemplate,
      context: {
        projectType_strapi_id: projectType.strapiId,
        projectType_name: projectType.name,
      },
    });
  }
};
