import { transparentize } from "polished"
import React from "react"

import ArrowLink from "../../gowiththeflowtype/arrow-link"
import BlurbHeader from "../../gowiththeflowtype/blurb-header"
import ContentGrid from "../../gowiththeflowtype/content-grid"
import Footer from "../../gowiththeflowtype/footer"
import GlobalStyles from "../../gowiththeflowtype/global-styles"
import Head from "../../gowiththeflowtype/head"
import Header from "../../gowiththeflowtype/header"
import vars from "../../gowiththeflowtype/vars"

const Blurb = props => (
  <article>
    <BlurbHeader>{props.title}</BlurbHeader>
    <p>{props.children}</p>
    {props.footer}
  </article>
)

const ToCItem = props => (
  <div className="listItem">
    <a className="link" href={props.link}>
      {props.name}
    </a>
    <p className="time">{props.time}</p>
    <style jsx>{`
      .listItem {
        display: flex;
        justify-content: space-between;
        margin: .8em 0;
      }
      .time {
        margin: 0;
      }
    }
    `}</style>
  </div>
)

const ToC = _ => (
  <div className="table">
    <ToCItem
      name="Find a Place for Types and Flow"
      time="9:39"
      link="http://bit.ly/jaketrent-flowtype-course"
    />
    <ToCItem
      name="Setup Your Project for Flow"
      time="11:26"
      link="http://bit.ly/jaketrent-flowtype-course"
    />
    <ToCItem
      name="Start Your Project with Flow Types"
      time="40:00"
      link="http://bit.ly/jaketrent-flowtype-course"
    />
    <ToCItem
      name="Add Flow Types to Your Existing Project"
      time="32:08"
      link="http://bit.ly/jaketrent-flowtype-course"
    />
    <ToCItem
      name="Use Flow with Packages"
      time="11:08"
      link="http://bit.ly/jaketrent-flowtype-course"
    />
    <div className="totalContainer">
      <p className="total">Total Time</p>
      <p className="time">1h 44m</p>
    </div>
    <style jsx>{`
      .table {
        border-top: 4px solid ${transparentize(0.5, vars.colors.blue)};
        border-bottom: 4px solid ${transparentize(0.5, vars.colors.blue)};
        padding: ${vars.layout.spacingMedium} 0;
        margin-bottom: ${vars.layout.spacingLarge};
      }
      .totalContainer {
        display: flex;
        justify-content: flex-end;
        margin: 2em 0 0 0;
      }
      .total {
        margin: 0 1em 0 0;
      }
      .time {
        margin: 0 0 0 2em;
      }
    `}</style>
  </div>
)

const Type = props => (
  <div className="type">
    {props.children}
    <style jsx>{`
      .type {
        display: inline-block;
        border-radius: 6px;
        padding: ${vars.layout.spacingXSmall} ${vars.layout.spacingMedium};
        background: ${transparentize(0.5, vars.colors.blue)};
        text-align: center;
        color: ${vars.colors.white};
        text-shadow: 1px 1px 0 ${transparentize(0.5, vars.colors.grayDark)};
        border: 1px solid ${vars.colors.yellow};
      }
    `}</style>
  </div>
)

const Types = _ => (
  <div>
    <div className="header">
      <BlurbHeader>Types You'll Learn</BlurbHeader>
    </div>
    <div className="types">
      <Type>any</Type>
      <Type>object</Type>
      <Type>primitive</Type>
      <Type>array</Type>
      <Type>function</Type>
      <Type>mixed</Type>
      <Type>module</Type>
      <Type>maybe</Type>
      <Type>variable</Type>
      <Type>inference</Type>
      <Type>type alias</Type>
      <Type>generic</Type>
      <Type>class</Type>
      <Type>interface</Type>
      <Type>intersection</Type>
      <Type>tuple</Type>
      <Type>literal</Type>
      <Type>type cast</Type>
      <Type>union</Type>
      <Type>libdef</Type>
    </div>
    <style jsx>{`
      .header {
        padding: ${vars.layout.spacingXLarge} 0 ${vars.layout.spacingLarge} 0;
      }
      .types {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: ${vars.layout.spacingSmall};
      }
      @media screen and (min-width: 1024px) {
        .types {
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
      }
    `}</style>
  </div>
)

export default _ => (
  <div>
    <Head />
    <GlobalStyles />
    <Header />
    <ContentGrid>
      <Blurb
        title="Why types?"
        footer={
          <ArrowLink href="http://bit.ly/jaketrent-flowtype-course">
            Learn more
          </ArrowLink>
        }
      >
        Want to know if your program is correct before you ship it to the
        browser? Types can help you know if your code integrates well together.
        Want more insight into developer intent when reading code? Types can
        help expose that better. Want more feedback while your coding for a more
        confident development experience? Typing and compiling your code can
        help with that too.
      </Blurb>
      <Blurb
        title="Why Flow?"
        footer={<ArrowLink href="https://flow.org/">Official docs</ArrowLink>}
      >
        Flow, or Flowtype, is a strong, static typing system for JavaScript.
        Keep your language, your toolchain, your talent pool, and get some great
        benefits. Add types in your JavaScript project where you want or need
        them, gradually.
      </Blurb>
      <Blurb
        title="Take the Course"
        footer={[
          <ToC />,
          <ArrowLink href="http://bit.ly/jaketrent-flowtype-course">
            Start the course
          </ArrowLink>,
        ]}
      >
        Hear the quick pitch on Flow and then see Flow in action in a real-world
        project environment. This isn't an academic review of all the features
        of Flow. This is seeing those fundamental features used in the course of
        creating a real project.
      </Blurb>
      <div>
        <Blurb
          title="The Project"
          footer={
            <div>
              <ArrowLink href="/gowiththeflowtype/demo/">Learn more</ArrowLink>
              <ArrowLink href="https://github.com/jaketrent/gowiththeflowtype-materials">
                Github files
              </ArrowLink>
              <ArrowLink href="/gowiththeflowtype/editors/">Editors</ArrowLink>
            </div>
          }
        >
          To demonstrate Flow, we make a choose your own adventure game, where
          the narrative is chosen by the reader over time. It's a silly tale of
          galactic treachery and loyal friends. We start with an empty directory
          and end with a small, fully-flowtyped web application.
        </Blurb>
        <Types />
      </div>
    </ContentGrid>
    <Footer />
  </div>
)
