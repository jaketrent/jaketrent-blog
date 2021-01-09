import * as React from "react"

import { fetchAllPosts } from "../../blog/data/posts"
import { BlogLayout } from "../../blog/ui/layout"
import { Link, Logo } from "../../common/ui"

import * as css from "../../blog/ui/content-list.module.css"

export async function getStaticProps() {
  const posts = fetchAllPosts()
  return {
    props: {
      posts,
    },
  }
}

export default function PostIndexPage(props) {
  const totalCount = props.posts.length
  return (
    <BlogLayout title="Posts | Jake Trent">
      <main className={css.contentList}>
        <Link href="/">
          <a className={css.logo}>
            <Logo />
          </a>
        </Link>
        <h1 className={css.title}>Posts</h1>
        <div className={css.items}>
          <div className={css.count}>{totalCount} posts</div>
          <div className={css.links}>
            {props.posts.map(post => (
              <Link href={post.slug} key={post.slug}>
                <a>{post.frontmatter.title}</a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </BlogLayout>
  )
}
