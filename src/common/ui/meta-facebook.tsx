import React from "react"

interface Props {
  description: string
  image?: string
  title: string
  url: string
}

export default function MetaFacebook(props: Props) {
  return [
    <meta property="og:title" content={props.title} key="ogtitle" />,
    <meta property="og:type" content="article" key="ogtype" />,
    <meta property="og:url" content={props.url} key="ogurl" />,
    <meta property="og:description" content={props.description} key="ogdesc" />,
    props.image && (
      <meta property="og:image" content={props.image} key="ogimg" />
    ),
  ]
}
