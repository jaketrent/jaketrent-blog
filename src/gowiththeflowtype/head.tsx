import React from "react"
import { Helmet } from "react-helmet"

import MetaCommon from "../ui/meta-common"
import MetaFacebook from "../ui/meta-facebook"
import MetaTwitter from "../ui/meta-twitter"

const now = _ => new Date().getFullYear()

interface Props {
  children?: node
  head?: any
}

export default (props: Props) => (
  <Helmet>
    {MetaCommon({
      copyright: `${now()} Jake Trent`,
      title: "Go With the Flow Type | Jake Trent",
      description:
        "Learn to add strong static typing to your JavaScript with Flow.",
      keywords:
        "javascript, static typing, strong static types, flow, flowtype, typescript, learn flow",
    })}

    {MetaFacebook({
      title: "Go With the FlowType",
      url: "https://gowiththeflowtype.com",
      description:
        "Learn to add strong static typing to your JavaScript with Flow.",
    })}
    {MetaTwitter({
      title: "Go With the FlowType",
      url: "https://stylingreact.com",
      description:
        "Learn to add strong static typing to your JavaScript with Flow.",
    })}

    <link
      rel="shortcut icon"
      type="image/png"
      href="/gowiththeflowtype/img/favicon.png"
    />

    <meta
      name="author"
      content="https://plus.google.com/115032056022257436849"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Faustina|Fjalla+One"
      rel="stylesheet"
    />
    <script src="/js/analytics.js" />
    {props.head}
  </Helmet>
)
