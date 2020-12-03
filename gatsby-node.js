const fs = require("fs")
const { createFilePath } = require(`gatsby-source-filesystem`)
const yaml = require("js-yaml")
const path = require("path")

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  fs.readdirSync("./content/christmas/2020").map(file => {
    const doc = yaml.safeLoad(
      fs.readFileSync("./content/christmas/2020/" + file, "utf-8")
    )
    console.log("sourcing", { file, doc })
    createNode({
      ...doc,
      slug: "/christmas/2020/" + file.replace(".yml", ""),
      id: createNodeId(`Christmas-${doc.year}-${doc.date}`),
      parent: null,
      children: [],
      internal: {
        type: `Christmas`,
        mediaType: `text/json`,
        content: JSON.stringify(doc),
        contentDigest: createContentDigest(doc),
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      posts: allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      christmas: allChristmas {
        edges {
          node {
            id
            slug
            year
            date
            phrase
            title
            artist
            performance
            desc
            img
            url
          }
        }
      }
    }
  `)
  console.log("createPages", { data: result.data })
  result.data.posts.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
  result.data.tagsGroup.group.forEach(tag => {
    createPage({
      path: `/tags/${tag.fieldValue}`,
      component: path.resolve("./src/templates/tag.tsx"),
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  result.data.christmas.edges.forEach(({ node }) => {
    console.log("creating christmas file", { node })
    createPage({
      path: node.slug,
      component: path.resolve(`./src/christmas/detail-template.tsx`),
      context: {
        slug: node.slug,
      },
    })
  })
}
