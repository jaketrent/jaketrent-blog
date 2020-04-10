import React from "react"
import { graphql, Link } from "gatsby"

import BlogLayout from "../../ui/blog-layout"
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
    <BlogLayout title="Posts | Jake Trent">
      <main className="meta-list">
        <Link className="meta-list__logo" to="/">
          <Logo />
        </Link>
        <h1 className="meta-list__title">Posts</h1>
        <div className="meta-list__items">
          <div className="meta-list__count">
            {props.data.course.totalCount} posts
          </div>
          <div className="meta-list__links">
            {props.data.course.edges.map(({ node }) => (
              <Link to={node.fields.slug} key={node.frontmatter.title}>
                {node.frontmatter.title}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </BlogLayout>
  )
}
