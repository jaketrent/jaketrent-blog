module.exports = {
  siteMetadata: {
    title: "Jake Trent",
    description: "Recent content from Jake Trent",
    siteUrl: "https://jaketrent.com",
  },
  plugins: [
    "gatsby-plugin-typescript",
    "gatsby-plugin-emotion",
    "gatsby-plugin-postcss",
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        createLinkInHead: true,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return {
                  title: edge.node.frontmatter.title,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  description: edge.node.excerpt,
                  custom_elements: [
                    {
                      pubDate: edge.node.frontmatter.date,
                    },
                    {
                      link: site.siteMetadata.siteUrl + edge.node.fields.slug,
                    },
                  ],
                }
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      fields { slug }
                      frontmatter {
                        title
                        date(formatString: "ddd, DD MMM YYYY HH:MM:SS ZZ")
                      }
                    }
                  }
                }
              }
            `,
            output: "/index.xml",
            title: "Jake Trent RSS Feed",
          },
        ],
      },
    },
    "gatsby-plugin-styled-jsx",
    // "gatsby-plugin-no-javascript", // NOTE: must be last
  ],
}
