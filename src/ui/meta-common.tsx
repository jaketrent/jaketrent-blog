import React from "react"

interface Props {
  copyright?: string
  description?: string
  keywords?: string
  title?: string
}

export default function MetaCommon(props: Props) {
  return [
    <meta charset="utf-8" key="char" />,
    <title key="title">{props.title || "Jake Trent"}</title>,
    <meta
      key="desc"
      name="description"
      content={
        props.description ||
        "Jibber jabber on tech topics around code, productivity, &amp; leadership."
      }
    />,
    <meta
      key="keywords"
      name="keywords"
      content={
        props.keywords || "Jake Trent, jaketrent, tech, code, leadership"
      }
    />,
    <meta
      key="author"
      name="author"
      content="https://plus.google.com/115032056022257436849"
    />,
    <meta
      key="copyright"
      name="copyright"
      content={
        props.copyright || "http://creativecommons.org/licenses/by/3.0/us/"
      }
    />,
    <meta
      key="verify"
      name="google-site-verification"
      content="uvx7BhaUTNz29nQgydsFPRsErfqYBhPEV_svnHvW7H0"
    />,

    <meta key="handheld" name="HandheldFriendly" content="True" />,
    <meta key="mobile" name="MobileOptimized" content="320" />,
    <meta
      key="viewport"
      name="viewport"
      content="width=device-width, initial-scale=1"
    />,
  ]
}
