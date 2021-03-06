import { FC } from "react"

import {
  Head,
  MetaCommon,
  MetaFacebook,
  MetaTwitter,
  currentYear,
} from "../../common/ui"

interface StylingReactLayoutProps {
  head?: any
}

export const StylingReactLayout: FC<StylingReactLayoutProps> = props => {
  return (
    <div className="content">
      <MetaCommon
        copyright={`${currentYear()} Jake Trent`}
        description="Compare approaches to CSS in React."
        title="Styling React Components | Jake Trent"
        keywords="styling react components, react stylesheets, radium, react css modules, css in js, external stylesheet with react"
      />
      <MetaFacebook
        description="Styling React Components"
        url="https://jaketrent.com/stylingreact"
        title="Compare approaches to CSS in React."
      />
      <MetaTwitter
        description="Styling React Components"
        title="Compare approaches to CSS in React."
      />

      <Head>
        <link
          rel="shortcut icon"
          type="image/png"
          href="/stylingreact/img/favicon.png"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Libre+Franklin:400i,700"
          rel="stylesheet"
        />
        <script src="/js/analytics.js" />
      </Head>

      {props.children}
      <style jsx>{`
        .content {
          max-width: 1200px;
          margin: auto;
          padding: 20px;
        }
      `}</style>
    </div>
  )
}
