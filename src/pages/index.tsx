import Link from "next/link"
import React, { FC } from "react"

import { Course, fetchAllCourses } from "../blog/data/courses"
import { Post, fetchAllPosts } from "../blog/data/posts"
import { fetchAllTalks } from "../blog/data/talks"
import { fetchAllBooks } from "../blog/data/books"
import BlogLayout from "../ui/blog-layout"

interface IndexProps {
  courses: Course[]
  posts: Post[]
  // talks: Talk[]
  // books: Book[]
}

interface Talk {}
interface Book {}

export async function getStaticProps() {
  const courses = fetchAllCourses({ limit: 3 })
  console.log("get static", courses)
  // const posts = fetchAllPosts()
  // const talks = fetchAllTalks()
  // const books = fetchAllBooks()
  return {
    props: {
      courses,
      // posts,
      // talks,
      // books,
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
          {/*
            <div className="home-channel home-channel--second">
            <TopThreePosts {...props} />
            </div>
            <div className="home-channel home-channel--third">
            <TopThreeTalks {...props} />
            </div>
            <div className="home-channel home-channel--fourth">
            <TopThreeBooks {...props} />
            </div>
          */}
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
        <Link href="/course">Courses</Link>
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
        <Link href="/post">Posts</Link>
      </h2>
      {props.posts.map(post => (
        <Link
          to={node.fields.slug}
          className="home-item__link"
          key={node.fields.slug}
        >
          <span className="home-item__border">
            <img
              alt={node.frontmatter.title}
              className="home-item__img"
              src={node.frontmatter.image}
            />
          </span>
        </Link>
      ))}
    </>
  )
}

function TopThreeTalks(props) {
  return (
    <>
      <h2 className="home-channel__title">
        <Link href="/talk">Talks</Link>
      </h2>
      {props.data.talk.edges.map(({ node }) => (
        <Link
          to={node.fields.slug}
          className="home-item__link"
          key={node.fields.slug}
        >
          <span className="home-item__border">
            <img
              alt={node.frontmatter.title}
              className="home-item__img"
              src={node.frontmatter.image}
            />
          </span>
        </Link>
      ))}
    </>
  )
}

function TopThreeBooks(props) {
  return (
    <>
      <h2 className="home-channel__title">
        <Link href="/book">Reading</Link>
      </h2>
      {props.data.book.edges.map(({ node }) => (
        <Link
          to={node.fields.slug}
          className="home-item__link"
          key={node.fields.slug}
        >
          <span className="home-item__border">
            <img
              alt={node.frontmatter.title}
              className="home-item__img"
              src={node.frontmatter.image}
            />
          </span>
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
