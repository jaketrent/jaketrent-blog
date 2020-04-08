import React from "react"
import { graphql, Link } from "gatsby"

import Logo from "../../ui/logo"

export const query = graphql`
  query {
    book: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { layout: { eq: "book" } } }
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

export default function BookIndex(props) {
  return (
    <main class="meta-list">
      <Link class="meta-list__logo" to="/">
        <Logo />
      </Link>
      <h1 class="meta-list__title">Books</h1>
      <div class="meta-list__items">
        <div class="meta-list__count">{props.data.book.totalCount} books</div>
        <div class="meta-list__links meta-list__links--book">
          {props.data.book.edges.map(({ node }) => (
            <Link to={node.fields.slug}>
              <img src={node.frontmatter.image} alt={node.frontmatter.title} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
