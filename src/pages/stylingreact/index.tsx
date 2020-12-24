import { FC } from "react"

import Caption from "../../stylingreact/ui/caption"
import Buffer from "../../stylingreact/ui/buffer"
import CssModules from "../../stylingreact/ui/icons/css-modules"
import ExternalCss from "../../stylingreact/ui/icons/external-css"
import Footer from "../../stylingreact/ui/footer"
import GlobalStyles from "../../stylingreact/ui/global-styles"
import Header from "../../stylingreact/ui/header"
import InlineCss from "../../stylingreact/ui/icons/inline-css"
import { StylingReactLayout } from "../../stylingreact/ui/layout"
import Link from "../../stylingreact/ui/link"
import Main from "../../stylingreact/ui/main"
import StyledComponents from "../../stylingreact/ui/icons/styledcomponents"
import Section from "../../stylingreact/ui/section"
import SectionBody from "../../stylingreact/ui/section-body"
import SectionHeader from "../../stylingreact/ui/section-header"
import Table from "../../stylingreact/ui/table"
import Trial from "../../stylingreact/ui/trial"
import Video from "../../stylingreact/ui/video"

const StylingReactIndexPage: FC = () => {
  return (
    <StylingReactLayout>
      <GlobalStyles />
      <Header />
      <Caption />

      <Main>
        <Section>
          <SectionHeader icon={<InlineCss />}>Inline Styles</SectionHeader>
          <SectionBody>
            Who said inline styles were a no-no? That's so 2010. A decade later,
            what is old is new, what was wrong is right. Will this work? Try it!
            You might be surprised.
          </SectionBody>
        </Section>

        <Section>
          <SectionHeader icon={<StyledComponents />}>CSS-in-JS</SectionHeader>
          <SectionBody>
            Add a CSS-in-JS library to the mix, and you'll get extra styling
            capabilities inside JavaScript. These superpowers used to be
            available only inside your CSS stylesheets. A great option for
            colocating styles while getting most of what CSS gives you.
          </SectionBody>
        </Section>

        <Section>
          <SectionHeader icon={<ExternalCss />}>CSS Stylesheet</SectionHeader>
          <SectionBody>
            Want to stick to what you know? It totally works. You've got some
            pitfalls to navigate, but you can do it! Just throw a stylesheet up
            on the page.
          </SectionBody>
        </Section>

        <Section>
          <SectionHeader icon={<CssModules />}>CSS Modules</SectionHeader>
          <SectionBody>
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
            Ever wondered which styling approach to take on your next project?
            There are so many options in the React world. What's the "right"
            way? There isn't one. But through this quick course, you'll be able
            to try out a few great methods and then have the context to make
            your own decision.
          </p>
          <p>
            Learn how to accomplish the basic patterns of styling in each tech.
            And then prepare to setup your own CSS project config, if needed.
          </p>
        </Section>
        <Section>
          <Video
            src="https://www.youtube.com/embed/UrK6GN4WVvw"
            height="315"
            width="560"
          />
        </Section>

        <Section>
          <SectionHeader>Course Materials</SectionHeader>
          <p>
            There are a some great examples that work through. We exercise
            static, dynamic and override styling in a real-world scenario. Grab
            the code. Follow along or take it to the next level!
          </p>
        </Section>
        <Section>
          <div style={{ marginTop: "3rem" }}>
            <Link href="https://github.com/jaketrent/styling-react-components">
              Download Examples
            </Link>
          </div>
        </Section>

        <Buffer />

        <Section>
          <Trial />
        </Section>

        <Section>
          <SectionHeader>Contents</SectionHeader>
          <Table />
        </Section>
      </Main>
      <Footer />
    </StylingReactLayout>
  )
}

export default StylingReactIndexPage
