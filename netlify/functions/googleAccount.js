const { google } = require("googleapis");

const googleConfig = {
  clientId: process.env.GOOGLE_LOGIN_CLIENT_ID,
  clientSecret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
  redirect: process.env.GOOGLE_LOGIN_REDIRECT,
};

const defaultScope = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

/**
 * Create the google Log In url to be sent to the client.
 */
function urlGoogle() {
  const auth = new google.auth.OAuth2(googleConfig.clientId, googleConfig.clientSecret, googleConfig.redirect);
  const url = auth.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope,
  });
  return url;
}

const headers = { "Content-Type": "application/json" };

exports.handler = async function (event, context) {
  try {
    const googleLogInUrl = urlGoogle();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        url: googleLogInUrl,
      }),
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
