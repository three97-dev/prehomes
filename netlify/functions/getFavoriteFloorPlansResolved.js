const fetch = require("node-fetch");

const db = require("../../src/db");
const { calculatePricePerSquareFoot } = require("../../src/utils/calculatePricePerSquareFoot");

const headers = { "Content-Type": "application/json" };

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

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);

    const user_identification = data.email;

    const savedFloorPlans = await db.getSavedFloorPlans({ user_identification });
    const strapiFloorPlans =
      savedFloorPlans.length > 0
        ? await getRequest(
            "/floor-plans?" +
              savedFloorPlans.map(savedFloorPlan => `id=${savedFloorPlan.floor_plan_contentful_id}&`).join("")
          )
        : [];

    const strapiProjects =
      savedFloorPlans.length > 0
        ? await getRequest(
            "/projects?isSoldOut=false&" +
              savedFloorPlans.map(savedFloorPlan => `id=${savedFloorPlan.project_contentful_id}&`).join("")
          )
        : [];

    const responseData = strapiFloorPlans
      .map(floorPlan => {
        const savedFloorPlan = savedFloorPlans.find(
          savedFloorPlan => savedFloorPlan.floor_plan_contentful_id == floorPlan?.id
        );
        const project = strapiProjects.find(project => project?.id == savedFloorPlan?.project_contentful_id);

        if (!project) {
          return null;
        }
        return {
          id: floorPlan?.id,
          squareFootage: floorPlan?.squareFootage,
          bedrooms: floorPlan?.bedrooms,
          bathrooms: floorPlan?.bathrooms,
          floorPlanName: floorPlan?.floorPlanName,
          price: floorPlan?.price,
          fields: {
            pricePerSquareFoot: calculatePricePerSquareFoot(floorPlan?.price, floorPlan?.squareFootage),
          },
          isAvailable: floorPlan?.isAvailable,
          projectName: project?.projectName,
          projectContentfulId: savedFloorPlan?.project_contentful_id,
          floorPlanImage: { mock: process.env.STRAPI_HOST + floorPlan.floorPlanImage.url },
        };
      })
      .filter(responseItem => responseItem);

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
