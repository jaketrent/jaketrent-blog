import React from "react"
import { Helmet } from "react-helmet"

import MetaCommon from "../ui/meta-common"
import MetaFacebook from "../ui/meta-facebook"
import MetaTwitter from "../ui/meta-twitter"

interface Props {
  children?: node
  head?: any
}

export default function StylingReactLayout(props: Props) {
  return (
    <>
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
          href="/img/TODOreplace.png"
        />

        {props.head}
      </Helmet>

      {props.children}
    </>
  )
}

function now() {
  return new Date().getFullYear()
}
