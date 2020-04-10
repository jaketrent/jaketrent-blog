import React from "react"
import { graphql, Link } from "gatsby"

import BlogLayout from "../../ui/blog-layout"
import Logo from "../../ui/logo"

export const query = graphql`
  query {
    course: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: "Course" } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            image
            landingPage
          }
        }
      }
    }
  }
`

export default function CourseIndex(props) {
  return (
    <BlogLayout title="Courses | Jake Trent">
      <main className="meta-list">
        <Link className="meta-list__logo" to="/">
          <Logo />
        </Link>
        <h1 className="meta-list__title">Courses</h1>
        <div className="meta-list__items">
          <div className="meta-list__count">
            {props.data.course.totalCount} courses
          </div>
          <div className="meta-list__links">
            {props.data.course.edges.map(({ node }) => (
              <a
                href={node.frontmatter.landingPage}
                key={node.frontmatter.landingPage}
              >
                {node.frontmatter.title}
              </a>
            ))}
          </div>
        </div>
      </main>
    </BlogLayout>
  )
}
