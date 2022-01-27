const contentful = require(`contentful`);

const db = require("../../src/db");
const convertContentfulImageToGatsbyFormat = require("../../src/db/transformImage");
const { calculatePricePerSquareFoot } = require("../../src/utils/calculatePricePerSquareFoot");

const contentfulConfig = {
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN,
  host: process.env.CONTENTFUL_HOST,
};
const client = contentful.createClient(contentfulConfig);

const headers = { "Content-Type": "application/json" };

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);

    const user_identification = data.email;

    const savedFloorPlans = await db.getSavedFloorPlans({ user_identification });
    const contentfulFloorPlans = await client.getEntries({
      content_type: "floor",
      "sys.id[in]": savedFloorPlans.map(savedFloorPlans => savedFloorPlans.floor_plan_contentful_id).join(),
    });

    const contentfulProjects = await client.getEntries({
      content_type: "project",
      select: "sys.id,fields.projectName",
      "fields.isSoldOut": false,
      "sys.id[in]": savedFloorPlans.map(savedFloorPlans => savedFloorPlans.project_contentful_id).join(),
    });

    const responseData = contentfulFloorPlans.items
      .map(floorPlan => {
        const savedFloorPlan = savedFloorPlans.find(
          savedFloorPlan => savedFloorPlan.floor_plan_contentful_id === floorPlan?.sys?.id
        );
        const project = contentfulProjects.items.find(
          project => project?.sys?.id === savedFloorPlan.project_contentful_id
        );

        if (!project) {
          return null;
        }
        return {
          contentful_id: floorPlan?.sys?.id,
          squareFootage: floorPlan?.fields?.squareFootage,
          bedrooms: floorPlan?.fields?.bedrooms,
          bathrooms: floorPlan?.fields?.bathrooms,
          name: floorPlan?.fields?.name,
          price: floorPlan?.fields?.price,
          fields: {
            pricePerSquareFoot: calculatePricePerSquareFoot(floorPlan?.fields?.price, floorPlan?.fields?.squareFootage),
          },
          isAvailable: floorPlan?.fields?.isAvailable,
          projectName: project?.fields?.projectName,
          projectContentfulId: savedFloorPlan.project_contentful_id,
          floorPlanImage: convertContentfulImageToGatsbyFormat(floorPlan?.fields?.floorPlanImage?.fields),
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
