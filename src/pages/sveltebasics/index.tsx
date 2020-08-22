import React from "react"

import GlobalStyles from "../../sveltebasics/global-styles"
import Layout from "../../sveltebasics/layout"

export default function SvelteBasicsIndexPage() {
  return (
    <Layout>
      <GlobalStyles />

      <Title />
      <CourseCredit />
      <Explanation />
      <Footer />
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
        <img src="" alt="Jake Trent" />
      </a>
      <style jsx>{``}</style>
    </div>
  )
}

function Explanation() {
  return (
    <div className="explain">
      <p></p>
      <span className="invite">Try Pluralsight free for 10 days:</span>
      <a href="https://pluralsight.com">Watch</a>
      <style jsx>{``}</style>
    </div>
  )
}

function Footer() {
  function now() {
    return new Date().getUTCFullYear()
  }
  return (
    <footer>
      <span className="copy">&copy; {now()} Jake Trent</span>
      <span className="legal">
        This page contains affiliate links. Click them. It's good for you.
      </span>
    </footer>
  )
}
