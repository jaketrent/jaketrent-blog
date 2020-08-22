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
    <div className="content">
      <Helmet>
        {MetaCommon({
          copyright: `${now()} Jake Trent`,
          title: "Learn Svelte Basics | Jake Trent",
          description: "Learn the Basics of Svelte, a JS UI framework",
          keywords:
            "svelte, ui framework, javascript framework, compiled ui, react alternative",
        })}

        {MetaFacebook({
          title: "Learn Svelte Basics",
          url: "https://jaketrent.com/sveltebasics",
          description: "Learn the Basics of Svelte, JS UI framework",
        })}
        {MetaTwitter({
          title: "Learn Svelte Basics",
          url: "https://jaketrent.com/sveltebasics",
          description: "Learn the Basics of Svelte, JS UI framework",
        })}

        <link
          rel="shortcut icon"
          type="image/png"
          href="/sveltebasics/img/favicon.png"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,600;1,600&display=swap"
          rel="stylesheet"
        />
        <script src="/js/analytics.js" />

        {props.head}
      </Helmet>

      {props.children}
      <style jsx>{`
        .content {
          max-width: 1200px;
          margin: auto;
          padding: 24px;
        }
      `}</style>
    </div>
  )
}

function now() {
  return new Date().getFullYear()
}
