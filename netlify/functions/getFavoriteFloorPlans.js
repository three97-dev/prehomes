const db = require("../../src/db");

const headers = { "Content-Type": "application/json" };

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);

    const user_identification = data.email;

    const savedFloorPlans = await db.getSavedFloorPlans({ user_identification });
    const responseData = savedFloorPlans.map(floorPlan => floorPlan.floor_plan_contentful_id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(responseData),
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
