const db = require("../../src/db");

const headers = { "Content-Type": "application/json" };

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);

    const user_identification = data.email;
    const project_contentful_id = data.projectId;
    const floor_plan_contentful_id = data.floorPlanId;

    await db.deleteFloorPlan({ user_identification, project_contentful_id, floor_plan_contentful_id });

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
