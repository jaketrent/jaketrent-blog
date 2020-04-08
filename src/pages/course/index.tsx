import React from "react"
import { graphql } from "gatsby"

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

function Logo() {
  return <img src="/img/logo.svg" alt="Jake Trent" />
}

export default function CourseIndex(props) {
  return (
    <main class="meta-list">
      <a class="meta-list__logo" href="/">
        <Logo />
      </a>
      <h1 class="meta-list__title">Courses</h1>
      <div class="meta-list__items">
        <div class="meta-list__count">
          {props.data.course.totalCount} courses
        </div>
        <div class="meta-list__links">
          {props.data.course.edges.map(({ node }) => (
            <a href={node.frontmatter.landingPage}>{node.frontmatter.title}</a>
          ))}
        </div>
      </div>
    </main>
  )
}
