const { google } = require("googleapis");

const googleConfig = {
  clientId: process.env.GOOGLE_LOGIN_CLIENT_ID,
  clientSecret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
  redirect: process.env.GOOGLE_LOGIN_REDIRECT,
};

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

const headers = { "Content-Type": "application/json" };

exports.handler = async function (event, context) {
  try {
    const data = JSON.parse(event.body);

    const userData = await getGoogleAccountFromCode(data.code);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(userData),
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
