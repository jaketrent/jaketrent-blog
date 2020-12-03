import { graphql, Link } from "gatsby"
import React, { FC } from "react"

import { styled, theme } from "../../christmas/styled"
import { Head, Layout } from "../../christmas/layout"

interface Song {
  year: number
  date: number
  phrase: string
  title: string
  artist: string
  performance: string
  desc: string
  img: string
  url: string
}

const numDays = 25

export const query = graphql`
  query {
    allChristmas(sort: { fields: [date], order: ASC }) {
      totalCount
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
  }
`

export default function ChristmasIndexPage(props) {
  const songs = props.data.allChristmas.edges.map(edge => edge.node as Song)
  return (
    <Layout>
      <Head />
      <Content>
        <Title>
          <h1>
            <span>Christmas</span> Music Box
          </h1>
        </Title>
        <Calendar>
          {songs.map((song, i) => (
            <CalendarDay key={i} date={i + 1} song={song} />
          ))}
          {Array.from(Array(numDays - songs.length)).map((_, i) => (
            <EmptyCalendarDay key={i} date={songs.length + i + 1} />
          ))}
        </Calendar>
        <Footer />
      </Content>
    </Layout>
  )
}

const CalendarDay: FC<{
  date: number
  song: Song
}> = props => {
  console.log("cal day", { song: props.song })
  return (
    <Day>
      <Link to={props.song.slug}>
        <header>
          <div>{props.date}</div>
          <h2>{props.song.phrase}</h2>
        </header>
      </Link>
    </Day>
  )
}

const EmptyCalendarDay: FC<{
  date: number
}> = props => {
  return (
    <Day empty>
      <header>
        <div>{props.date}</div>
      </header>
    </Day>
  )
}

const Title = styled.div`
  color: red;
`

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(5, calc(16vw - 0.8vw));
  grid-template-rows: repeat(5, calc(16vw - 0.8vw));
  gap: 1vw;
  margin: 48px 0;
`

const Content = styled.div`
  max-width: 80vw;
  margin: 0 auto;
`

interface DayProps {
  empty?: boolean
}
const Day = styled.article<DayProps>`
  border: 2px solid ${theme.colors.border};
  border-radius: 5px;
  height: 100%;
  width: 100%;
  display: flex;
  padding: ${props => props.empty && "0.5vw"};
  overflow: hidden;
  position: relative;
  background: ${props => (props.empty ? "#fff" : `${theme.colors.border}22`)};

  a {
    color: inherit;
    display: block;
    padding: 0.5vw;
    overflow: hidden;
  }

  div {
    color: ${theme.colors.border};
    color: ${theme.colors.border}22;
    text-align: left;
    position: absolute;
    top: 0;
    left: 1vw;
    font-size: 10vw;
    font-weight: 800;
  }

  h2 {
    opacity: 0;
    text-align: right;
    font-size: 2.5vw;
    color: #000;
    text-transform: uppercase;
    transition: all 400ms;
  }
  &:hover h2,
  &:focus h2 {
    opacity: 1;
  }
`

function Footer() {
  function now() {
    return new Date().getUTCFullYear()
  }
  return <footer>&copy; {now()} Jake Trent &middot; Merry Christmas!</footer>
}
