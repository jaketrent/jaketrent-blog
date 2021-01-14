import { FC, useEffect } from "react"

import { BlogLayout } from "../../blog/ui/layout"
import { Post, fetchPost, fetchAllPosts } from "../../blog/data"
import { Buttons, Footer, Image, Meta, SiteTitle } from "../../blog/ui/post"
import { Head, MetaFacebook, MetaTwitter } from "../../common/ui"
import css from "../../blog/ui/post.module.css"

// TODO: type
export const getStaticProps = async context => {
  const slug = context.params.slug
  const post = await fetchPost(slug)

  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths = () => {
  let posts = fetchAllPosts()
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

interface PostPageProps {
  post: Post
}
const PostPage: FC<PostPageProps> = ({ post }) => {
  // TODO: fix
  // const permalink = props.data.site.siteMetadata.siteUrl + post.fields.slug
  const permalink = "https://jaketrent.com/post/" + post.slug

  useEffect(() => {
    setTimeout(() => {
      if (window && (window as any).hljs)
        (window as any).hljs.initHighlighting()
    }, 55)
  })

  const ad = null
  // (
  // <div className="single-article__ad">
  //   <iframe
  //     id="$iradid"
  //     src="//a.impactradius-go.com/gen-ad-code/1200557/871605/7490/"
  //     width="251"
  //     height="251"
  //     scrolling="no"
  //     frameborder="0"
  //     marginheight="0"
  //     marginwidth="0"
  //   ></iframe>
  // </div>
  // )
  return (
    <BlogLayout
      title={post.frontmatter.title + " | Jake Trent"}
      description={post.frontmatter.description}
      keywords={
        !!post.frontmatter.metaKeywords
          ? post.frontmatter.metaKeywords
          : Array.isArray(post.frontmatter.tags)
          ? post.frontmatter.tags.join(",")
          : ""
      }
    >
      <MetaFacebook
        description={post.frontmatter.description}
        image={post.frontmatter.image}
        title={post.frontmatter.title}
        url={permalink}
      />
      <MetaTwitter
        description={post.frontmatter.description}
        image={post.frontmatter.image}
        title={post.frontmatter.title}
      />

      <Head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js"></script>

        <script src="/js/disqusloader.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `setTimeout(() => { if (typeof disqusLoader === 'function') disqusLoader('#disqus_thread', { scriptUrl: '//jaketrent.disqus.com/embed.js' }) }, 55) `,
          }}
        ></script>
      </Head>
      <SiteTitle />

      <main>
        <article>
          <header className={css.header}>
            <h1 className={css.title}>{post.frontmatter.title}</h1>
            <Meta content={post} />
          </header>

          <div className={css.striped}>
            <Image content={post} />

            <div className={`${css.contentContainer} ${css.markdownContainer}`}>
              {ad}
            </div>

            <div
              className={`${css.contentContainer} ${css.markdownContainer}`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>

            <Buttons content={post} />
          </div>
        </article>
      </main>

      <Footer content={post} />
    </BlogLayout>
  )
}

export default PostPage
