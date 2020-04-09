import React from "react"
import { graphql, Link } from "gatsby"

import Logo from "../../ui/logo"

export const query = graphql`
  query {
    tags: allMarkdownRemark {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
      totalCount
    }
  }
`

export default function TagIndex(props) {
  return (
    <main className="meta-list">
      <Link className="meta-list__logo" to="/">
        <Logo />
      </Link>
      <h1 className="meta-list__title">Tags</h1>
      <div className="meta-list__items">
        <div className="meta-list__count">
          {props.data.tags.totalCount} tags
        </div>
        <div className="meta-list__links">
          {props.data.tags.group.map(({ tag }) => (
            <Link to={"/tags/" + tag} key={tag}>
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
