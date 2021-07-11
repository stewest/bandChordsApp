module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "bandChordsApp",
  },
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "kvalmwto",
        dataset: "",
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-gatsby-cloud",
  ],
};
