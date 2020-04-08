import React from "react"
import { graphql, Link } from "gatsby"

import Logo from "../../ui/logo"

export const query = graphql`
  query {
    course: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { layout: { eq: "post" } } }
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

export default function PostIndex(props) {
  return (
    <main class="meta-list">
      <a class="meta-list__logo" href="/">
        <Logo />
      </a>
      <h1 class="meta-list__title">Posts</h1>
      <div class="meta-list__items">
        <div class="meta-list__count">{props.data.course.totalCount} posts</div>
        <div class="meta-list__links">
          {props.data.course.edges.map(({ node }) => (
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          ))}
        </div>
      </div>
    </main>
  )
}
