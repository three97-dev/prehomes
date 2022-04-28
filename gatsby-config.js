require("dotenv").config();

module.exports = {
  flags: {
    DEV_SSR: false,
  },
  siteMetadata: {
    siteUrl: `https://demo-prehomes.netlify.app/`,
  },
  plugins: [
    "gatsby-plugin-netlify",
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: process.env.STRAPI_HOST, //`http://35.224.141.148`,
        // Defaults to 100, but we have much more records
        queryLimit: process.env.STRAPI_QUERY_LIMIT ? parseInt(process.env.STRAPI_QUERY_LIMIT, 10) : 100,
        collectionTypes: [`cities`, `developers`, `projects`, `amenities`, `project-types`, `special-incentives`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: "gatsby-source-hubspot-forms",
      options: {
        apiKey: process.env.HUBSPOT_API_KEY,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Prehomes`,
        short_name: `Prehomes`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#FFFFFF`,
        display: `minimal-ui`,
        icon: `static/android-chrome-512x512.png`, // This path is relative to the root of the site.
      },
    },
  ],
};
