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

  console.log({ detail })
  const title = detail.title + " |  Jake Trent"
  const social = {
    title,
    url: permalink,
    description: detail.desc,
  }
  return (
    <>
      <Head
        common={{
          title,
          description: detail.desc,
        }}
        facebook={social}
        twitter={social}
      />
      {JSON.stringify(detail)}
    </>
  )
}
