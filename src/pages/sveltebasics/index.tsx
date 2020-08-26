import React from "react"

import GlobalStyles from "../../sveltebasics/global-styles"
import Layout from "../../sveltebasics/layout"
import { LogoBw } from "../../ui/logo"

export default function SvelteBasicsIndexPage() {
  return (
    <Layout>
      <GlobalStyles />

      <Title />
      <div className="grid">
        <Explanation />
        <CourseCredit />
      </div>
      <Footer />
      <style jsx>{`
        .grid {
          padding: 0 10vw;
        }
        @media (min-width: 769px) {
          .grid {
            display: grid;
            grid-template-areas: "a b";
            grid-template-columns: 1fr 2fr;
            column-gap: 5vw;
          }
        }
      `}</style>
    </Layout>
  )
}

function Title() {
  return (
    <header>
      <h1>
        <span className="verb">
          <em>Learn</em> the <em>basics</em> of
        </span>
        <span className="subject">SVELTE</span>
      </h1>
      <style jsx>{`
        header {
          padding-top: 2vw;
          padding-bottom: 8vw;
          text-align: left;
        }
        h1 {
          font-weight: 900;
          font-style: italic;
        }
        .verb {
          position: relative;
          display: inline-block;
          padding: 0 0 0 calc(10vw + 2vw);
          transform: rotate(-4deg) skewX(-4deg);
        }
        .verb:after {
          display: block;
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 0.5vw;
          width: 100%;
          background: #000;
          transform: skewX(-6deg);
        }
        .verb em {
          text-transform: uppercase;
        }
        .subject {
          position: relative;
          padding: 0 10vw;
          display: block;
          color: #fff;
          background: linear-gradient(
            rgb(237, 199, 74) 0%,
            rgb(247, 176, 3) 12%,
            rgb(218, 107, 15) 52%,
            rgb(255, 42, 0) 100%
          );
          font-size: 20vw;
          transform: rotate(-4deg) skewX(-4deg);
        }
        .subject:after {
          position: absolute;
          top: 2vw;
          left: calc(10vw + 2vw);
          display: block;
          content: "SVELTE";
          color: #000;
          z-index: -1;
        }
      `}</style>
    </header>
  )
}

function CourseCredit() {
  return (
    <div className="course">
      <span>A course by</span>
      <a href="/">
        <LogoBw />
      </a>
      <style jsx>{`
        .course {
          grid-area: a;
          color: rgba(0, 0, 0, 0.65);
          padding-top: calc(4px + 2em);
        }
        span {
          display: block;
        }
        a {
          display: inline-block;
          min-width: 200px;
          max-width: 80%;
        }
        @media (min-width: 769px) {
          a {
            display: block;
          }
        }
      `}</style>
    </div>
  )
}

function Explanation() {
  return (
    <div className="explain">
      <p>
        Svelte has a charm to it. There's a simplicity that we need in this age
        of UI framework complexity. I had a ton of fun making this course. If
        you're into JavaScript-rendered UI, I think you'll have fun working
        through it with me.
      </p>
      <p>
        Watch it on Pluralsight. Try it out free with a short 10 days trial.
      </p>
      <p>
        We'll hit all the fundamentals and create a fun library app that'll prep
        you to start your own first Svelte app.
      </p>
      <a href="http://bit.ly/jaketrent-svelte-basics">Watch the Course</a>
      <style jsx>{`
        .explain {
          position: relative;
          grid-area: b;
          border: 4px solid #000;
          padding: 1em 3vw;
          margin-bottom: 3em;
          text-align: left;
        }
        a {
          position: absolute;
          display: block;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 50%);
          background: linear-gradient(
            rgb(237, 199, 74) 0%,
            rgb(247, 176, 3) 12%,
            rgb(218, 107, 15) 52%,
            rgb(255, 42, 0) 100%
          );
          color: inherit;
          text-decoration: none;
          border: 4px solid #fff;
          padding: 0.5em 1em;
          text-shadow: 1px 1px 0 #fff;
          font-weight: 900;
          font-style: italic;
          transition: 300ms;
          white-space: nowrap;
          text-overflow: clip;
        }
        a:focus,
        a:hover {
          color: #fff;
          text-shadow: 1px 1px 0 #000;
          outline: none;
        }
        a:after {
          position: absolute;
          top: -8px;
          right: -8px;
          bottom: -8px;
          left: -8px;
          content: " ";
          border: 4px solid #000;
          transition: 300ms;
        }
        a:focus:after,
        a:hover:after {
          border-color: #0084bd;
        }
      `}</style>
    </div>
  )
}

function Footer() {
  function now() {
    return new Date().getUTCFullYear()
  }
  return (
    <footer>
      &copy; {now()} Jake Trent &middot; This page contains affiliate links.
      Click them. It's good for you.
      <style jsx>{`
        footer {
          font-size: 0.5em;
          padding: 6em 10vw 1em 10vw;
        }
      `}</style>
    </footer>
  )
}
