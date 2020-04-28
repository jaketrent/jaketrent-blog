import React from "react"
import { Helmet } from "react-helmet"

import MetaCommon from "../ui/meta-common"
import MetaFacebook from "../ui/meta-facebook"
import MetaTwitter from "../ui/meta-twitter"

interface Props {
  children?: node
  head?: any
}

export const padding = "20px"

export default function StylingReactLayout(props: Props) {
  return (
    <div className="content">
      <Helmet>
        {MetaCommon({
          copyright: `${now()} Jake Trent`,
          title: "Styling React Components | Jake Trent",
          description: "Compare approaches to CSS in React.",
          keywords:
            "styling react components, react stylesheets, radium, react css modules, css in js, external stylesheet with react",
        })}

        {MetaFacebook({
          title: "Styling React Components",
          url: "https://stylingreact.com",
          description: "Compare approaches to CSS in React.",
        })}
        {MetaTwitter({
          title: "Styling React Components",
          url: "https://stylingreact.com",
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
      </Helmet>

      {props.children}
      <style jsx>{`
        .content {
          max-width: 1200px;
          margin: auto;
          padding: ${padding};
        }
      `}</style>
    </div>
  )
}

function now() {
  return new Date().getFullYear()
}
