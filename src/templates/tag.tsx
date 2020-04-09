import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Logo from "../ui/logo"

export default function TagPage(props) {
  const tag = props.pageContext.tag
  return (
    <main className="meta-list">
      <Helmet>
        <title>{tag} | Jake Trent</title>
      </Helmet>
      <Link className="meta-list__logo" to="/">
        <Logo />
      </Link>
      <h1 className="meta-list__title">{tag}</h1>
      <div className="meta-list__items">
        <div className="meta-list__count">
          {props.data.hits.totalCount} posts
        </div>
        <div className="meta-list__links">
          {props.data.hits.edges.map(({ node }) => (
            <Link to={node.fields.slug} key={node.frontmatter.title}>
              {node.frontmatter.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

export const query = graphql`
  query($tag: String) {
    hits: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
