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
      <Head>
        {MetaCommon({
          copyright: `${currentYear()} Jake Trent`,
          title: "Styling React Components | Jake Trent",
          description: "Compare approaches to CSS in React.",
          keywords:
            "styling react components, react stylesheets, radium, react css modules, css in js, external stylesheet with react",
        })}

        {MetaFacebook({
          title: "Styling React Components",
          url: "https://jaketrent.com/stylingreact",
          description: "Compare approaches to CSS in React.",
        })}
        {MetaTwitter({
          title: "Styling React Components",
          url: "https://jaketrent.com/stylingreact",
          description: "Compare approaches to CSS in React.",
        })}

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

        {props.head}
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
