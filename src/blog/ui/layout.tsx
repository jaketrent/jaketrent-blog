import { FC } from "react"

import { Head, MetaCommon } from "../../common/ui"

interface BlogLayoutProps {
  description?: string
  head?: any
  keywords?: string
  title?: string
}

export const BlogLayout: FC<BlogLayoutProps> = props => {
  return (
    <>
      <Head>
        {MetaCommon({
          title: props.title,
          description: props.description,
          keywords: props.keywords,
        })}

        <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />

        {props.head}
        <script src="/js/analytics.js" />
      </Head>

      {props.children}
    </>
  )
}
