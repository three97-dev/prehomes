const contentful = require(`contentful`);

const db = require("../../src/db");
const convertContentfulImageToGatsbyFormat = require("../../src/db/transformImage");
const { buildProjectUrl } = require("../../src/utils/buildUrl");

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

    const savedProjects = await db.getSavedProjects({ user_identification });
    const contentfulProjects = await client.getEntries({
      content_type: "project",
      select: "sys.id,fields.projectName,fields.projectCity,fields.projectFloorPlans,fields.projectPreviewImage",
      "fields.isSoldOut": false,
      "sys.id[in]": savedProjects.map(savedProject => savedProject.project_contentful_id).join(),
    });

    const responseData = contentfulProjects.items.map(project => {
      const projectFloorPrices = roject?.fields?.projectFloorPlans
        ? project?.fields?.projectFloorPlans.map(floor => floor.fields.price)
        : [0];
      return {
        contentful_id: project?.sys?.id,
        projectName: project?.fields?.projectName,
        projectCity: {
          cityName: project?.fields?.projectCity?.fields?.cityName,
        },
        fields: {
          pageUrl: buildProjectUrl({ projectName: project?.fields?.projectName }),
          projectMinPrice: Math.min(...projectFloorPrices),
        },
        projectPreviewImage: convertContentfulImageToGatsbyFormat(project?.fields?.projectPreviewImage?.fields, {
          width: 300,
        }),
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
