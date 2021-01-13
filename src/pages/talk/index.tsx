import { fetchAllTalks } from "../../blog/data/talks"
import { BlogLayout } from "../../blog/ui/layout"
import { Link, Logo } from "../../common/ui"

import css from "../../blog/ui/content-list.module.css"

export async function getStaticProps() {
  const talks = fetchAllTalks()
  return {
    props: {
      talks,
    },
  }
}

export default function PostIndexPage(props) {
  const totalCount = props.talks.length
  return (
    <BlogLayout title="Talks | Jake Trent">
      <main className={css.contentList}>
        <Link href="/">
          <a className={css.logo}>
            <Logo />
          </a>
        </Link>
        <h1 className={css.title}>Talks</h1>
        <div className={css.items}>
          <div className={css.count}>{totalCount} talks</div>
          <div className={css.links}>
            {props.talks.map(talk => (
              <Link href={`/talk/${talk.slug}`} key={talk.slug}>
                <a>{talk.frontmatter.title}</a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </BlogLayout>
  )
}
