import React from "react"
import { transparentize } from "polished"

import ArrowLink from "../../gowiththeflowtype/arrow-link"
import BlurbHeader from "../../gowiththeflowtype/blurb-header"
import ContentGrid from "../../gowiththeflowtype/content-grid"
import Footer from "../../gowiththeflowtype/footer"
import GlobalStyles from "../../gowiththeflowtype/global-styles"
import Head from "../../gowiththeflowtype/head"
import Header from "../../gowiththeflowtype/header"
import vars from "../../gowiththeflowtype/vars"

const Octocat = _ => (
  <svg viewBox="0 0 16 16" version="1.1" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    <style jsx>{`
      height: 0.75em;
      margin-right: 0.25em;
    `}</style>
  </svg>
)

const Blurb = props => (
  <article>
    <BlurbHeader>{props.title}</BlurbHeader>
    <p>{props.children}</p>
    {props.footer}
  </article>
)

export default _ => (
  <div>
    <Head />
    <GlobalStyles />
    <Header />
    <ContentGrid>
      <Blurb title="Download the Demo">
        <p>Grab the files for yourself so you can follow along.</p>
        <a
          className="download"
          href="https://github.com/jaketrent/gowiththeflowtype-materials"
        >
          <Octocat />
          Github files
        </a>
        <p>
          Demo files are provided as-is, but they should be a handy reference
          and in a working state so that you can see the principles and examples
          of the course in action on your own machine.
        </p>
        <p>
          Download 'em, start from scratch like I do in the course and follow
          along or cut and paste key bits at milestones in the project. Whatever
          suits you!
        </p>
        <p>
          To really <a href="/post/lock-in-learning/">lock in your learning</a>,
          hands-on application is key.
        </p>
      </Blurb>
      <Blurb title="Our Project">
        <img
          src="/gowiththeflowtype/img/screenshot.jpg"
          className="screenshot"
        />
        <p>
          Together we build a web application that is a choose your own
          adventure game, entitle "Galactic Pigs: A Prelude". It is the lore and
          background story for a tabletop game that the Cub Scouts I lead
          designed. Pigs were always meant to be galactic.
        </p>
        <p>
          It is a simple web application, essentially all UI (but the same Flow
          skills apply to Node). We start from the very beginning so you don't
          miss anything in how to setup and run your own projects with Flow. We
          use what are meant to be generic tools and libraries (not the latest
          hotness) so they don't become the focus of the course and to see that
          Flow is usable across many different JavaScript libraries.
        </p>
        <p>
          <a href="http://bit.ly/jaketrent-flowtype-course">
            Join me and code along
          </a>{" "}
          !
        </p>
      </Blurb>
    </ContentGrid>
    <Footer />
    <style jsx>{`
      .screenshot {
        float: left;
        max-width: 50%;
        margin: 0 2em 0.5em 0;
      }
      .download {
        padding: ${vars.layout.spacingMedium} ${vars.layout.spacingLarge};
        font-size: 2rem;
        border-radius: 4px;
        border: 1px solid ${vars.colors.white};
        text-decoration: none;
      }
      .download:hover {
        border-color: ${vars.colors.yellow};
      }
    `}</style>
  </div>
)
