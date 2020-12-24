import Link from "next/link"
import { FC } from "react"

import { Course, fetchAllCourses } from "../blog/data/courses"
import { Post, fetchAllPosts } from "../blog/data/posts"
import { Talk, fetchAllTalks } from "../blog/data/talks"
import { Book, fetchAllBooks } from "../blog/data/books"
import BlogLayout from "../blog/ui/layout"

interface IndexProps {
  courses: Course[]
  posts: Post[]
  talks: Talk[]
  books: Book[]
}

export async function getStaticProps() {
  const topOptions = { limit: 3 }
  const courses = fetchAllCourses(topOptions)
  const posts = fetchAllPosts(topOptions)
  const talks = fetchAllTalks(topOptions)
  const books = fetchAllBooks(topOptions)
  return {
    props: {
      courses,
      posts,
      talks,
      books,
    },
  }
}

const IndexPage: FC<IndexProps> = props => {
  return (
    <BlogLayout>
      <main className="home-main">
        <div className="home-sky">
          <div className="home-channel home-channel--first">
            <TopThreeCourses {...props} />
          </div>
          <div className="home-channel home-channel--second">
            <TopThreePosts {...props} />
          </div>
          <div className="home-channel home-channel--third">
            <TopThreeTalks {...props} />
          </div>
          <div className="home-channel home-channel--fourth">
            <TopThreeBooks {...props} />
          </div>
        </div>
        <div className="home-logo">
          <img src="/img/logo.svg" alt="Jake Trent" />
        </div>
        <div className="home-grid">
          <GridAnimated />
        </div>
      </main>
    </BlogLayout>
  )
}
export default IndexPage

function TopThreeCourses(props) {
  return (
    <>
      <h2 className="home-channel__title">
        <Link href="/course">
          <a>Courses</a>
        </Link>
      </h2>
      {props.courses.map(course => (
        <a
          href={course.frontmatter.landingPage}
          className="home-item__link"
          key={course.frontmatter.landingPage}
        >
          <span className="home-item__border">
            <img
              alt={course.frontmatter.title}
              className="home-item__img"
              src={course.frontmatter.image}
            />
          </span>
        </a>
      ))}
    </>
  )
}

function TopThreePosts(props) {
  return (
    <>
      <h2 className="home-channel__title">
        <Link href="/post">
          <a>Posts</a>
        </Link>
      </h2>
      {props.posts.map(post => (
        <Link href={post.path} key={post.slug}>
          <a>
            <span className="home-item__border" className="home-item__link">
              <img
                alt={post.frontmatter.title}
                className="home-item__img"
                src={post.frontmatter.image}
              />
            </span>
          </a>
        </Link>
      ))}
    </>
  )
}

function TopThreeTalks(props) {
  return (
    <>
      <h2 className="home-channel__title">
        <Link href="/talk">
          <a>Talks</a>
        </Link>
      </h2>
      {props.talks.map(talk => (
        <Link href={talk.path} key={talk.slug}>
          <a className="home-item__link">
            <span className="home-item__border">
              <img
                alt={talk.frontmatter.title}
                className="home-item__img"
                src={talk.frontmatter.image}
              />
            </span>
          </a>
        </Link>
      ))}
    </>
  )
}

function TopThreeBooks(props) {
  return (
    <>
      <h2 className="home-channel__title">
        <Link href="/book">
          <a>Reading</a>
        </Link>
      </h2>
      {props.books.map(book => (
        <Link href={book.path} key={book.slug}>
          <a className="home-item__link">
            <span className="home-item__border">
              <img
                alt={book.frontmatter.title}
                className="home-item__img"
                src={book.frontmatter.image}
              />
            </span>
          </a>
        </Link>
      ))}
    </>
  )
}

function GridAnimated() {
  return (
    <div className="grid" aria-hidden="true">
      <div className="grid__horizon"></div>
      <div className="grid__deck">
        <div className="grid__grid-plane">
          <div className="grid__grid">
            <div className="grid__grid--vertical">
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
            </div>
            <div className="grid__dots">
              <div className="grid__dots__dot"></div>
              <div className="grid__dots__dot"></div>
              <div className="grid__dots__dot"></div>
              <div className="grid__dots__dot"></div>
              <div className="grid__dots__dot"></div>
              <div className="grid__dots__dot"></div>
              <div className="grid__dots__dot"></div>
            </div>
            <div className="grid__grid--horizontal">
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
              <div className="grid__grid__line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
