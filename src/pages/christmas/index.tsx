import styled from "@emotion/styled"
import { Link } from "gatsby"
import React, { FC } from "react"

import { Head } from "../../christmas/layout"

interface Song {
  phrase: string
  title: string
  artist: string
  desc: string
  img: string
  url: string
}

const numDays = 25
// TODO: move to files, load in gatsby config, setup urls for each.
const songs: Song[] = [
  {
    phrase: "In solemn stillness lay",
    title: "It Came Upon a Midnight Clear",
    artist: "Jon Schmidt",
    desc: "We love the stillness, quiet and reverence here.",
    img: "https://via.placeholder.com/150",
    url:
      "https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3",
  },
]

export default function ChristmasIndexPage() {
  return (
    <>
      <Head />
      <Content>
        <Title>
          <h1>
            <span>Christmas</span> Music Box
          </h1>
        </Title>
        <Calendar>
          {songs.map((song, i) => (
            <CalendarDay date={i + 1} song={song} />
          ))}
          {Array.from(Array(numDays - songs.length)).map((_, i) => (
            <CalendarDay date={songs.length + i + 1} song={undefined} />
          ))}
        </Calendar>
        <Footer />
      </Content>
    </>
  )
}

const CalendarDay: FC<{
  date: number
  song: Song
}> = props => {
  return (
    <Day>
      <Link to={`/christmas/2020/${props.date}`}>
        <header>
          <div>{props.date}</div>
          <h2>{props.song?.phrase}</h2>
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
        <span>{props.date}</span>
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
`

const Content = styled.div`
  max-width: 80vw;
  margin: 0 auto;
`

interface DayProps {
  empty?: boolean
}
const Day = styled.article<DayProps>`
  outline: 1px solid green;
  height: 100%;
  width: 100%;
  display: flex;
  padding: ${props => props.empty && "0.5vw"};
  overflow: hidden;

  a {
    color: inherit;
    display: block;
    padding: 0.5vw;
    overflow: hidden;
  }

  div {
    text-align: left;
  }

  h2 {
    text-align: right;
    font-size: 2.5vw;
  }
`

function Footer() {
  function now() {
    return new Date().getUTCFullYear()
  }
  return <footer>&copy; {now()} Jake Trent &middot; Merry Christmas!</footer>
}
