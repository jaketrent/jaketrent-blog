import { fetchAllPosts } from "../../blog/data/posts"
import { BlogLayout } from "../../blog/ui/layout"
import { Link, Logo } from "../../common/ui"

import * as css from "../../blog/ui/content-list.module.css"

export async function getStaticProps({ params }) {
  const posts = fetchAllPosts({
    filterBy: post => post.frontmatter.tags?.includes(params.tag),
  })

  return {
    props: {
      tag: params.tag,
      posts,
    },
  }
}

export const getStaticPaths = () => {
  const posts = fetchAllPosts()
  const tags = posts.reduce((tags, post) => {
    const postTags = Array.isArray(post.frontmatter.tags)
      ? post.frontmatter.tags.map(tag => ({ params: { tag } }))
      : []
    return [...tags, ...postTags]
  }, [])
  return {
    paths: tags,
    fallback: false,
  }
}

export default function TagPage(props) {
  const totalCount = props.posts.length
  return (
    <BlogLayout title={`${props.tag} | Jake Trent`}>
      <main className={css.contentList}>
        <Link href="/">
          <a className={css.logo}>
            <Logo />
          </a>
        </Link>
        <h1 className={css.title}>{props.tag}</h1>
        <div className={css.items}>
          <div className={css.count}>{totalCount} posts</div>
          <div className={css.links}>
            {props.posts.map(post => (
              <Link href={`/post/${post.slug}`} key={post.slug}>
                <a>{post.frontmatter.title}</a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </BlogLayout>
  )
}
