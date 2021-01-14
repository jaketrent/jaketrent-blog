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
      <MetaCommon
        copyright={`${currentYear()} Jake Trent`}
        description="Learn the Basics of Svelte, a JS UI framework"
        title="Learn Svelte Basics | Jake Trent"
        keywords="svelte, ui framework, javascript framework, compiled ui, react alternative"
      />
      <MetaFacebook
        description="Learn the Basics of Svelte, JS UI framework"
        url="https://jaketrent.com/sveltebasics"
        title="Learn Svelte Basics"
      />
      <MetaTwitter
        description="Learn the Basics of Svelte, JS UI framework"
        title="Learn Svelte Basics"
      />

      <Head>
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
