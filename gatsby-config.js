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
  ],
}
