import React from "react"

interface Props {
  description: string
  image?: string
  title: string
}

export default function MetaTwitter(props: Props) {
  return [
    <meta name="twitter:card" content="summary_large_image" key="twitcard" />,
    <meta name="twitter:title" content={props.title} key="twittitle" />,
    <meta
      name="twitter:description"
      content={props.description}
      key="twitdesc"
    />,
    <meta name="twitter:site" content="@jaketrent" key="twitsite" />,
    <meta name="twitter:creator" content="@jaketrent" key="twitcreator" />,
    props.image && (
      <meta name="twitter:image" content={props.image} key="twitimg" />
    ),
  ]
}
