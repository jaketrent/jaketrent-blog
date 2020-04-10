import React from "react"
import { Helmet } from "react-helmet"

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
        <meta charset="utf-8" />
        <title>{props.title || "Jake Trent"}</title>
        <meta
          name="description"
          content={
            props.description ||
            "Jibber jabber on tech topics around code, productivity, &amp; leadership."
          }
        />
        <meta
          name="keywords"
          content={
            props.keywords || "Jake Trent, jaketrent, tech, code, leadership"
          }
        />
        <meta
          name="author"
          content="https://plus.google.com/115032056022257436849"
        />
        <meta
          name="copyright"
          content="http://creativecommons.org/licenses/by/3.0/us/"
        />
        <meta
          name="google-site-verification"
          content="uvx7BhaUTNz29nQgydsFPRsErfqYBhPEV_svnHvW7H0"
        />

        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />

        <link rel="preload" href="/type/gobold-regular.otf" as="font" />
        <link rel="stylesheet" type="text/css" href="/css/index.css" />
        {props.head}
      </Helmet>

      {props.children}
    </>
  )
}
