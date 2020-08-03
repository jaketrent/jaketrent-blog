import React from "react"
import { Helmet } from "react-helmet"

import MetaCommon from "../ui/meta-common"

interface Props {
  description?: string
  head?: any
  keywords?: string
  title?: string
}

export default function BlogLayout(props: Props) {
  return (
    <>
      <Helmet>
        {MetaCommon({
          title: props.title,
          description: props.description,
          keywords: props.keywords,
        })}

        <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />

        <link rel="stylesheet" type="text/css" href="/css/index.css" />
        {props.head}
        <script src="/js/analytics.js" />
      </Helmet>

      {props.children}
    </>
  )
}
