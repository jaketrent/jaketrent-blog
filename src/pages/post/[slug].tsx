import { useEffect } from "react"

import { BlogLayout } from "../../blog/ui/layout"
import { fetchPost, fetchAllPosts } from "../../blog/data/posts"
import { Buttons, Footer, Image, Meta, SiteTitle } from "../../blog/ui/post"
import { MetaFacebook, MetaTwitter } from "../../common/ui"
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

const PostPage: FC = ({ post }) => {
  // TODO: fix
  // const permalink = props.data.site.siteMetadata.siteUrl + post.fields.slug
  const permalink = "jakepermalink"

  useEffect(() => {
    setTimeout(() => {
      if (window && window.hljs) window.hljs.initHighlighting()
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
      desciption={post.frontmatter.description}
      keywords={
        !!post.frontmatter.metaKeywords
          ? post.frontmatter.metaKeywords
          : Array.isArray(post.frontmatter.tags)
          ? post.frontmatter.tags.join(",")
          : ""
      }
      head={[
        ...MetaFacebook({
          description: post.frontmatter.description,
          image: post.frontmatter.image,
          title: post.frontmatter.title,
          url: permalink,
        }),
        ...MetaTwitter({
          description: post.frontmatter.description,
          image: post.frontmatter.image,
          title: post.frontmatter.title,
        }),

        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js"
          key="hljs"
        ></script>,

        <script src="/js/disqusloader.js" key="discscript"></script>,
        <script key="discstart">
          {`setTimeout(() => { disqusLoader('#disqus_thread', { scriptUrl: '//jaketrent.disqus.com/embed.js' }) }, 55) `}
        </script>,
      ]}
    >
      <SiteTitle />

      <main>
        <article>
          <header className={css.header}>
            <h1 className={css.title}>{post.frontmatter.title}</h1>
            <Meta content={post} />
          </header>

          <div className={css.striped}>
            <Image post={post} />

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
