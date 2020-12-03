import React from "react"
import { graphql, Link } from "gatsby"

import { Head } from "./layout"
import MetaFacebook from "../ui/meta-facebook"
import MetaTwitter from "../ui/meta-twitter"

export const query = graphql`
  query($slug: String!) {
    allChristmas(filter: { slug: { eq: $slug } }) {
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
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export default function ChristmasDetailPage(props) {
  const detail = props.data.allChristmas.edges[0].node
  const permalink = props.data.site.siteMetadata.siteUrl + detail.slug

  // TODO: meta override to head
  return (
    <>
      <Head />
      {permalink}
      {JSON.stringify(detail)}
    </>
  )
}
