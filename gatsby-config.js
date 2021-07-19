require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const token = process.env.SANITY_TOKEN;

module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.bandchords.co.za',
    title: 'bandChordsApp',
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId,
        dataset,
        token,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [
          require('tailwindcss'),
          require('./tailwind.config.js'), // Optional: Load custom Tailwind CSS configuration
        ],
      },
    },
    'gatsby-plugin-gatsby-cloud',
  ],
};
