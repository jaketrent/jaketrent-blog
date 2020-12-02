import React, { FC } from "react"
import { Helmet } from "react-helmet"

import { year } from "../ui/date"
import GlobalStyles from "./global-styles"
import MetaCommon from "../ui/meta-common"
import MetaFacebook from "../ui/meta-facebook"
import MetaTwitter from "../ui/meta-twitter"

export const Head: FC = props => {
  return (
    <>
      <Helmet>
        {MetaCommon({
          copyright: `${year()} Jake Trent`,
          title: "Christmas | Jake Trent",
          description: "Celebrating digital Christmas",
          keywords: "christmas, music, messages",
        })}

        {MetaFacebook({
          title: "Christmas with Jake Trent",
          url: "https://jaketrent.com/christmas",
          description: "Celebrating digital Christmas",
        })}
        {MetaTwitter({
          title: "Christmas with Jake Trent",
          url: "https://jaketrent.com/christmas",
          description: "Celebrating digital Christmas",
        })}

        <link
          rel="shortcut icon"
          type="image/png"
          href="/christmas/img/favicon.png"
        />
        <script src="/js/analytics.js"></script>

        {props.children}
      </Helmet>
      <GlobalStyles />
    </>
  )
}
