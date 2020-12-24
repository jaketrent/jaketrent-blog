import { FC } from "react"

import {
  Head,
  MetaCommon,
  MetaFacebook,
  MetaTwitter,
  currentYear,
} from "../../common/ui"

interface StylingReactLayoutProps {
  head?: any
}

export const SvelteBasicsLayout: FC<StylingReactLayoutProps> = props => {
  return (
    <div>
      <Head>
        {MetaCommon({
          copyright: `${currentYear()} Jake Trent`,
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
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,600;1,900&display=swap"
          rel="stylesheet"
        />
        <script src="/js/analytics.js"></script>

        {props.head}
      </Head>

      {props.children}
      <style jsx>{``}</style>
    </div>
  )
}
