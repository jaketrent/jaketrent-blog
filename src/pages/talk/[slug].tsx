import { FC } from "react"

import { BlogLayout } from "../../blog/ui/layout"
import { Talk, fetchTalk, fetchAllTalks } from "../../blog/data"
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

interface TalkPageProps {
  talk: Talk
}
const TalkPage: FC<TalkPageProps> = ({ talk }) => {
  const permalink = "https://jaketrent.com/talk/" + talk.slug

  return (
    <BlogLayout
      title={talk.frontmatter.title + " | Jake Trent"}
      description={talk.frontmatter.description}
      keywords={
        !!talk.frontmatter.metaKeywords
          ? talk.frontmatter.metaKeywords
          : Array.isArray(talk.frontmatter.tags)
          ? talk.frontmatter.tags.join(",")
          : ""
      }
      head={
        <>
          <MetaFacebook
            description={talk.frontmatter.description}
            image={talk.frontmatter.image}
            title={talk.frontmatter.title}
            url={permalink}
          />
          <MetaTwitter
            description={talk.frontmatter.description}
            image={talk.frontmatter.image}
            title={talk.frontmatter.title}
          />
        </>
      }
    >
      <SiteTitle />

      <main>
        <article>
          <header className={css.header}>
            <h1 className={css.title}>{talk.frontmatter.title}</h1>
            <Meta content={talk} />
          </header>

          <div className={css.striped}>
            <Image content={talk} />

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
