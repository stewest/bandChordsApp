require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const token = process.env.SANITY_TOKEN;

module.exports = {
  siteMetadata: {
    siteUrl: 'https://bandchordsapp.gatsbyjs.io',
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
      resolve: 'gatsby-plugin-web-font-loader',
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
    {
      resolve: 'gatsby-plugin-page-progress',
      options: {
        height: 3,
        prependToBody: false,
        color: `#663399`,
        footerHeight: 500,
        headerHeight: 0,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'bandChordsApp',
        short_name: 'bandChordsApp',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#2fa9e6',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
  ],
};
