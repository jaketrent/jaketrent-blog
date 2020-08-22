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
        .verb {
          color: red;
        }
        .subject {
          color: blue;
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
