import styled from "@emotion/styled"
import React from "react"
import ReactPlayer from "react-player"
import { graphql, Link } from "gatsby"

import { parsePhraseLines } from "./data"
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

      <Grid>
        <Controls>
          <header>
            <h1>{detail.title}</h1>
            {detail.artist}
          </header>
          <p>{detail.desc}</p>
          <ReactPlayer url={detail.url} controls height={50} width="100%" />
          <div>{detail.performance}</div>
          <Link to="/christmas">Play another</Link>
        </Controls>
        <Phrase>{parsePhraseLines(detail.phrase)}</Phrase>
      </Grid>
    </>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(320px, 30vw) 1fr;
  gap: 24px;
  height: 100vh;
  overflow: hidden;
`
const Controls = styled.article`
  position: relative;
  z-index: 2;
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  h1 {
    color: var(--colorsTeal);
    font-size: 2em;
    font-weight: 100;
  }

  p {
    font-family: sans-serif;
    font-size: 1em;
    line-height: 1.5em;
    margin-bottom: 3em;
  }

  div {
    margin-top: 12px;
    text-align: right;
    font-family: sans-serif;
    font-size: 0.5em;
    font-weight: 200;
    font-style: italic;
  }
`
const Phrase = styled.h2`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  padding-right: 2vw;
  overflow: hidden;
  font-family: var(--typeBold);
  font-size: 25vh;
  line-height: 1em;
  text-align: right;
  font-weight: normal;
  color: var(--colorsPink);

  div {
    white-space: nowrap;
  }
`
