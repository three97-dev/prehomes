require("dotenv").config();
const path = require("path");

const projectTemplate = path.resolve("./src/templates/project.js");
const cityTemplate = path.resolve("./src/templates/city.js");
const developerTemplate = path.resolve("./src/templates/developer.js");
const projectTypeTemplate = path.resolve("./src/templates/project-type.js");

const { buildProjectUrl, buildCityUrl, buildDeveloperUrl, buildProjectTypeUrl } = require("./src/utils/buildUrl");
const { calculatePricePerSquareFoot } = require("./src/utils/calculatePricePerSquareFoot");
const { getProjectPricePerSqft } = require("./src/utils/getProjectPricePerSqft");
const { calculateAveragePrice } = require("./src/utils/calculateAveragePrice");
const { resolveStatus } = require("./src/utils/resolveStatus");
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

    const status = resolveStatus(project.launchDate);

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
          p.neighborhood === project.neighborhood
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
