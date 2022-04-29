const _ = require("lodash");
const hubspot = require("@hubspot/api-client");

const hubspotClient = new hubspot.Client({ apiKey: process.env.HUBSPOT_API_KEY });

const {
  hubSpotProperties,
  mapOverProjectProperties,
  toHubSpotProjectProperties,
} = require("./projectHubspotProperties");

async function wait(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

let allHubSpotProjects = null;

module.exports = async function processHubSpotProject(project) {
  if (process.env.SKIP_HUBSPOT_SYNC === "true") {
    console.log(`Skip HubSpot sync for "${project.projectName}"`);
    return;
  }

  if (allHubSpotProjects == null) {
    const perPageLimit = 100;
    allHubSpotProjects = [];
    let resp;
    do {
      resp = await hubspotClient.crm.objects.basicApi.getPage(
        "PROJECT",
        perPageLimit,
        resp?.paging?.next?.after,
        hubSpotProperties
      );
      allHubSpotProjects.push(...resp.results);
    } while (resp?.paging?.next?.after);
  }

  const projectHubSpotProperties = toHubSpotProjectProperties(project);

  const existingObject = allHubSpotProjects.find(strapiProject => strapiProject.properties.project_id == project.strapiId);

  if (existingObject) {
    // update only if name changed (no other fields need synchronization for now)
    if (
      !_.isEqual(
        mapOverProjectProperties(existingObject.properties),
        mapOverProjectProperties(projectHubSpotProperties)
      )
    ) {
      await wait(300); // wait for little bit to prevent API limit error

      await hubspotClient.crm.objects.basicApi.update("PROJECT", existingObject.id, {
        properties: projectHubSpotProperties,
      });
      console.log(`Updated HubSpot Project fields for "${project.projectName}" (strapi_id=${project.strapiId})`);
    } else {
      console.log(`No changes for HubSpot Project "${project.projectName}" (strapi_id=${project.strapiId})`);
    }
  } else {
    await wait(300); // wait for little bit to prevent API limit error

    await hubspotClient.crm.objects.basicApi.create("PROJECT", {
      properties: projectHubSpotProperties,
    });
    console.log(`Created HubSpot Project for "${project.projectName}" (strapi_id=${project.strapiId})`);
  }
};
