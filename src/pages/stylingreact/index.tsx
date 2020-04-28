import { graphql, Link } from "gatsby"
import React from "react"

import Caption from "../../stylingreact/caption"
import Buffer from "../../stylingreact/buffer"
import CssModules from "../../stylingreact/icons/css-modules"
import ExternalCss from "../../stylingreact/icons/external-css"
import Footer from "../../stylingreact/footer"
import GlobalStyles from "../../stylingreact/global-styles"
import Header from "../../stylingreact/header"
import InlineCss from "../../stylingreact/icons/inline-css"
import Layout from "../../stylingreact/layout"
import Main from "../../stylingreact/main"
import Radium from "../../stylingreact/icons/radium"
import Section from "../../stylingreact/section"
import SectionBody from "../../stylingreact/section-body"
import SectionHeader from "../../stylingreact/section-header"
import Subscribe from "../../stylingreact/subscribe"
import Table from "../../stylingreact/table"
import Trial from "../../stylingreact/trial"
import Video from "../../stylingreact/video"

export default function StylingReactIndexPage(props) {
  return (
    <Layout>
      <GlobalStyles />
      <Header />
      <Caption />

      <Main>
        <Section>
          <SectionHeader icon={<InlineCss />}>Inline Styles</SectionHeader>
          <SectionBody
            src="https://www.youtube.com/embed/uG5qQ-X4LyY?rel=0"
            title="Inline styles video"
          >
            In the traditional world of CSS, inline styles are a no-no. But in
            the new world of components in UIs, inline styles have some
            advantages. Christopher Chedeau gave his exposition on what problems
            inline styles solve. We cover that talk and what it means for us in
            this section. Demonstrated here is the most basic form of inline
            styles possible.
          </SectionBody>
        </Section>

        <Section>
          <SectionHeader icon={<Radium />}>Radium</SectionHeader>
          <SectionBody
            src="https://www.youtube.com/embed/b6VyUAwslZM?rel=0"
            title="Radium video"
          >
            Radium provides a step up from vanilla inline styles. By using this
            library you get extra features available for use that you didn't
            have before. Radium is one of the pioneers in this enhanced inline
            styles space that has given rise to a string of similar libraries
            for CSS in JS.
          </SectionBody>
        </Section>

        <Section>
          <SectionHeader icon={<ExternalCss />}>
            External Stylesheet
          </SectionHeader>
          <SectionBody
            src="https://www.youtube.com/embed/W5_g2t3F2DM?rel=0"
            title="CSS stylesheet video"
          >
            If you're just getting into React and want to keep your CSS story as
            it has been traditionally, regular CSS in an external stylesheet
            will feel super familiar. This route will ensure you can use your
            tried and true styling strategies that you've developed over time.
            You'll also get a chance to play with some a new tool, Webpack, to
            get those styles on the page.
          </SectionBody>
        </Section>

        <Section>
          <SectionHeader icon={<CssModules />}>CSS Modules</SectionHeader>
          <SectionBody
            src="https://www.youtube.com/embed/bL_gMVMWSt8?rel=0"
            title="CSS modules video"
          >
            Once you taste CSS modules, there will be no going back. In a
            surprisingly-simple, genius way, CSS modules allow you to separate
            and compartmentalize your CSS. This allows you to make isolated
            changes to styles without affecting the world. It's life changing.
          </SectionBody>
        </Section>

        <Buffer />

        <Section>
          <SectionHeader>The Course</SectionHeader>
          <p>
            This course takes a project-based approach in trying out several of
            the most popular and promising approaches to styling React
            components. We start with a small UI project that is fully
            implemented in React and discover how it feels to try out each one
            of these approaches to layer on some sweet styles.{" "}
          </p>
          <p>
            You'll also get some great background on styling in web components.
            And there's a short, gentle introduction to how to handle the basics
            of CSS inside of Webpack.{" "}
          </p>
        </Section>
        <Section>
          <Video
            src="https://www.youtube.com/embed/WhiZlvRzbrc"
            height="315"
            width="560"
          />
        </Section>

        <Section>
          <Trial />
        </Section>

        <Section>
          <SectionHeader>Contents</SectionHeader>
          <Table />
        </Section>

        <Subscribe />
      </Main>
      <Footer />
    </Layout>
  )
}
