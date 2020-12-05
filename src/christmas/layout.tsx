import { ThemeProvider } from "@emotion/react"
import React, { FC } from "react"
import { Helmet } from "react-helmet"

import { year } from "../ui/date"
import GlobalStyles from "./global-styles"
import MetaCommon from "../ui/meta-common"
import MetaFacebook from "../ui/meta-facebook"
import MetaTwitter from "../ui/meta-twitter"
import { theme } from "./styled"

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
  // NOTE: this ThemeProvider is new, but the @emotion/styled components are old. The context doesn't match up, and theme doesn't pass through.
  // emotion-theming won't work on this gatsby version
  // @emotion/react won't work with this version either
  // theming with emotion on gatsby is dead
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}
