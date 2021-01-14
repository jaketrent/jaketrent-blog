import { FC } from "react"

import { Head, MetaCommon } from "../../common/ui"

interface BlogLayoutProps {
  description?: string
  keywords?: string
  title?: string
}

export const BlogLayout: FC<BlogLayoutProps> = props => {
  return (
    <>
      <MetaCommon
        title={props.title}
        description={props.description}
        keywords={props.keywords}
      />

      <Head>
        <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
        <script src="/js/analytics.js" />
      </Head>

      {props.children}
    </>
  )
}
