import { BlogLayout } from "../../blog/ui/layout"
import { fetchTalk, fetchAllTalks } from "../../blog/data/talks"
import { Buttons, Footer, Image, Meta, SiteTitle } from "../../blog/ui/post"
import { MetaFacebook, MetaTwitter } from "../../common/ui"
import css from "../../blog/ui/post.module.css"

// TODO: type
export const getStaticProps = async context => {
  const slug = context.params.slug
  const talk = await fetchTalk(slug)
  delete talk.frontmatter.tags

  return {
    props: {
      talk,
    },
  }
}

export const getStaticPaths = () => {
  let talks = fetchAllTalks()
  return {
    paths: talks.map(book => ({ params: { slug: book.slug } })),
    fallback: false,
  }
}

const TalkPage: FC = ({ talk }) => {
  // TODO: fix
  // const permalink = props.data.site.siteMetadata.siteUrl + talk.fields.slug
  const permalink = "https://jaketrent.com/talk/" + talk.slug

  return (
    <BlogLayout
      title={talk.frontmatter.title + " | Jake Trent"}
      desciption={talk.frontmatter.description}
      keywords={
        !!talk.frontmatter.metaKeywords
          ? talk.frontmatter.metaKeywords
          : Array.isArray(talk.frontmatter.tags)
          ? talk.frontmatter.tags.join(",")
          : ""
      }
      head={[
        ...MetaFacebook({
          description: talk.frontmatter.description,
          image: talk.frontmatter.image,
          title: talk.frontmatter.title,
          url: permalink,
        }),
        ...MetaTwitter({
          description: talk.frontmatter.description,
          image: talk.frontmatter.image,
          title: talk.frontmatter.title,
        }),

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
            <h1 className={css.title}>{talk.frontmatter.title}</h1>
            <Meta content={talk} />
          </header>

          <div className={css.striped}>
            <Image post={talk} />

            <div
              className={`${css.contentContainer} ${css.markdownContainer}`}
              dangerouslySetInnerHTML={{ __html: talk.content }}
            ></div>

            <Buttons content={talk} />
          </div>
        </article>
      </main>

      <Footer content={talk} />
    </BlogLayout>
  )
}

export default TalkPage
