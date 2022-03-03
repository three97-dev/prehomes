const hubspot = require("@hubspot/api-client");
const db = require("../../src/db");

const hubspotClient = new hubspot.Client({ apiKey: process.env.HUBSPOT_API_KEY });
const headers = { "Content-Type": "application/json" };

async function deassociateProject({ user_identification, project_contentful_id }) {
  const searchProjectResponse = await hubspotClient.crm.objects.searchApi.doSearch("PROJECT", {
    filterGroups: [{ filters: [{ value: project_contentful_id, propertyName: "project_id", operator: "EQ" }] }],
  });

  if (searchProjectResponse.results.length === 0) {
    console.log(`Failed to find HubSpot Project with contentful_id="${project_contentful_id}"`);
    return;
  }
  const [existingProject] = searchProjectResponse.results;

  const searchContactResponse = await hubspotClient.crm.contacts.searchApi.doSearch({
    filterGroups: [{ filters: [{ value: user_identification, propertyName: "email", operator: "EQ" }] }],
  });

  if (searchContactResponse.results.length === 0) {
    console.log(`Failed to find HubSpot Contact with email="${user_identification}"`);
    return;
  }
  const [existingContact] = searchContactResponse.results;

  await hubspotClient.crm.contacts.associationsApi.archive(
    existingContact.id,
    "PROJECT",
    existingProject.id,
    "project_to_contact"
  );
}

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);

    const user_identification = data.email;
    const project_contentful_id = data.projectId;

    await db.deleteProject({ user_identification, project_contentful_id });

    await deassociateProject({ user_identification, project_contentful_id });

    return {
      statusCode: 200,
    };
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
