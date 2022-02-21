const { google } = require("googleapis");
const hubspot = require("@hubspot/api-client");
const axios = require("axios");

const googleConfig = {
  clientId: process.env.GOOGLE_LOGIN_CLIENT_ID,
  clientSecret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
  redirect: process.env.GOOGLE_LOGIN_REDIRECT,
};

const headers = { "Content-Type": "application/json" };

const hubspotClient = new hubspot.Client({ apiKey: process.env.HUBSPOT_API_KEY });

/**
 * Extract the email and id of the google account from the "code" parameter.
 */
async function getGoogleAccountFromCode(code) {
  // get the auth "tokens" from the request
  const auth = new google.auth.OAuth2(googleConfig.clientId, googleConfig.clientSecret, googleConfig.redirect);

  const data = await auth.getToken(code);
  auth.setCredentials(data.tokens);
  const userData = await google.oauth2({ version: "v2", auth }).userinfo.v2.me.get({});

  const { email, name, given_name, family_name } = userData.data;

  return {
    email,
    name,
    given_name,
    family_name,
  };
}

async function createHubspotClient(userData) {
  const properties = {
    email: userData.email,
    lastname: userData.family_name,
    firstname: userData.given_name,
  };
  const SimplePublicObjectInput = { properties };

  try {
    const apiResponse = await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput);
    console.log(JSON.stringify(apiResponse, null, 2));
  } catch (e) {
    console.log(e);
  }
}

async function checkIsClientExist(userData) {
  try {
    await axios.get(
      `https://api.hubapi.com/contacts/v1/contact/email/${userData.email}/profile?hapikey=${process.env.HUBSPOT_API_KEY}`
    );
    console.log("Client already exist");
    return { hubspotContact: "exists" };
  } catch (e) {
    if (e?.response?.status === 404) {
      await createHubspotClient(userData);
      return { hubspotContact: "created" };
    } else {
      throw e;
    }
  }
}

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);

    const userData = await getGoogleAccountFromCode(data.code);

    const hubspotResp = await checkIsClientExist(userData);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ...userData, ...hubspotResp }),
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
