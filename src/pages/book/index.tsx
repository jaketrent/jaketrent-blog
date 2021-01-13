import { fetchAllBooks } from "../../blog/data/books"
import { BlogLayout } from "../../blog/ui/layout"
import { Link, Logo } from "../../common/ui"

import css from "../../blog/ui/content-list.module.css"
import bookCss from "../../blog/ui/book-list.module.css"

export async function getStaticProps() {
  const books = fetchAllBooks()
  return {
    props: {
      books,
    },
  }
}

export default function BookIndexPage(props) {
  const totalCount = props.books.length
  return (
    <BlogLayout title="Books | Jake Trent">
      <main className={css.contentList}>
        <Link href="/">
          <a className={css.logo}>
            <Logo />
          </a>
        </Link>
        <h1 className={css.title}>Books</h1>
        <div className={css.items}>
          <div className={css.count}>{totalCount} books</div>
          <div className={bookCss.links}>
            {props.books.map(book => (
              <Link href={`/book/${book.slug}`} key={book.slug}>
                <a>
                  <img
                    src={book.frontmatter.image}
                    alt={book.frontmatter.title}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </BlogLayout>
  )
}
