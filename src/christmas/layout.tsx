import React, { FC } from "react"
import { Helmet } from "react-helmet"

import { year } from "../ui/date"
import GlobalStyles from "./global-styles"
import MetaCommon from "../ui/meta-common"
import MetaFacebook from "../ui/meta-facebook"
import MetaTwitter from "../ui/meta-twitter"

interface HeadProps {
  common?: {
    copyright?: string
    title?: string
    description?: string
    keywords?: string
  }
  facebook?: {
    title?: string
    url?: string
    description?: string
  }
  twitter?: {
    title?: string
    url?: string
    description?: string
  }
}
export const Head: FC<HeadProps> = props => {
  return (
    <>
      <Helmet>
        {MetaCommon({
          copyright: `${year()} Jake Trent`,
          title: "Christmas | Jake Trent",
          description: "Celebrating digital Christmas",
          keywords: "christmas, music, messages",
          ...props.common,
        })}

        {MetaFacebook({
          title: "Christmas with Jake Trent",
          url: "https://jaketrent.com/christmas",
          description: "Celebrating digital Christmas",
          ...props.facebook,
        })}
        {MetaTwitter({
          title: "Christmas with Jake Trent",
          url: "https://jaketrent.com/christmas",
          description: "Celebrating digital Christmas",
          ...props.twitter,
        })}

        <link
          rel="shortcut icon"
          type="image/png"
          href="/christmas/favicon.png"
        />
        <script src="/js/analytics.js"></script>

        {props.children}
      </Helmet>
      <GlobalStyles />
    </>
  )
}

export const Layout: FC = props => {
  return props.children
}
