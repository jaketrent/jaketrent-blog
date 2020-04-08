module.exports = {
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-astroturf",
      options: {
        enableCssProp: true,
      },
    },
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    "gatsby-plugin-react-helmet",
  ],
}
