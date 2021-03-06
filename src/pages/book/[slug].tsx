import { FC } from "react"

import { BlogLayout } from "../../blog/ui/layout"
import { Book, fetchBook, fetchAllBooks } from "../../blog/data"
import { Buttons, Footer, Image, Meta, SiteTitle } from "../../blog/ui/post"
import { Head, MetaFacebook, MetaTwitter } from "../../common/ui"
import css from "../../blog/ui/post.module.css"

// TODO: type
export const getStaticProps = async context => {
  const slug = context.params.slug
  const book = await fetchBook(slug)
  delete book.frontmatter.tags

  return {
    props: {
      book,
    },
  }
}

export const getStaticPaths = () => {
  let books = fetchAllBooks()
  return {
    paths: books.map(book => ({ params: { slug: book.slug } })),
    fallback: false,
  }
}

interface BookPageProps {
  book: Book
}
const BookPage: FC<BookPageProps> = ({ book }) => {
  // TODO: fix
  // const permalink = props.data.site.siteMetadata.siteUrl + book.fields.slug
  const permalink = "https://jaketrent.com/book/" + book.slug

  return (
    <BlogLayout
      title={book.frontmatter.title + " | Jake Trent"}
      description={book.frontmatter.description}
      keywords={
        !!book.frontmatter.metaKeywords
          ? book.frontmatter.metaKeywords
          : Array.isArray(book.frontmatter.tags)
          ? book.frontmatter.tags.join(",")
          : ""
      }
    >
      <MetaFacebook
        description={book.frontmatter.description}
        image={book.frontmatter.image}
        title={book.frontmatter.title}
        url={permalink}
      />
      <MetaTwitter
        description={book.frontmatter.description}
        image={book.frontmatter.image}
        title={book.frontmatter.title}
      />

      <SiteTitle />

      <main>
        <article>
          <header className={css.header}>
            <h1 className={css.title}>{book.frontmatter.title}</h1>
            <Meta content={book} />
          </header>

          <div className={css.striped}>
            <Image content={book} />

            <div
              className={`${css.contentContainer} ${css.markdownContainer}`}
              dangerouslySetInnerHTML={{ __html: book.content }}
            ></div>

            <Buttons content={book} />
          </div>
        </article>
      </main>

      <Footer content={book} />
    </BlogLayout>
  )
}

export default BookPage
