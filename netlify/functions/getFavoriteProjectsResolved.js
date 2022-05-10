const fetch = require("node-fetch");

const db = require("../../src/db");
const { buildProjectUrl } = require("../../src/utils/buildUrl");

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

    const savedProjects = await db.getSavedProjects({ user_identification });
    const strapiProjects =
      savedProjects.length > 0
        ? await getRequest(
            "/projects?isSoldOut=false&" +
              savedProjects.map(savedProject => `id=${savedProject.project_contentful_id}&`).join("")
          )
        : [];

    const responseData = strapiProjects.map(project => {
      const projectFloorPrices = project?.floor_plans ? project?.floor_plans.map(floor => floor.price) : [0];
      return {
        strapiId: project?.id,
        projectName: project?.projectName,
        city: {
          cityName: project?.city?.cityName,
        },
        fields: {
          pageUrl: buildProjectUrl({ projectName: project?.projectName }),
          projectMinPrice: Math.min(...projectFloorPrices),
        },
        projectHeroImage: { mock: project?.projectHeroImage?.url },
      };
    });

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
