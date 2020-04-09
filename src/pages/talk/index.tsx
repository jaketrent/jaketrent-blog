import React from "react"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"

import Logo from "../../ui/logo"

export const query = graphql`
  query {
    talk: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: "Talk" } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            image
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default function TalkIndex(props) {
  return (
    <main className="meta-list">
      <Helmet>
        <title>Talks | Jake Trent</title>
      </Helmet>
      <Link className="meta-list__logo" to="/">
        <Logo />
      </Link>
      <h1 className="meta-list__title">Talks</h1>
      <div className="meta-list__items">
        <div className="meta-list__count">
          {props.data.talk.totalCount} talks
        </div>
        <div className="meta-list__links">
          {props.data.talk.edges.map(({ node }) => (
            <Link to={node.fields.slug} key={node.fields.slug}>
              {node.frontmatter.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
