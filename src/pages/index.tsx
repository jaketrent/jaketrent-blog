import { FC } from "react"

import { Course, fetchAllCourses } from "../blog/data/courses"
import { Post, fetchAllPosts } from "../blog/data/posts"
import { Talk, fetchAllTalks } from "../blog/data/talks"
import { Book, fetchAllBooks } from "../blog/data/books"
import BlogLayout from "../blog/ui/layout"
import {
  Main,
  Sky,
  Channel,
  Logo,
  GridContainer,
  Item,
  CourseLink,
  InternalLink,
} from "../blog/ui"
import { GridAnimated } from "../blog/ui/grid"

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

interface IndexPageProps {
  courses: Course[]
  posts: Post[]
  talks: Talk[]
  books: Book[]
}
const IndexPage: FC<IndexPageProps> = props => {
  return (
    <BlogLayout>
      <Main>
        <Sky>
          <Channel>
            <Channel.Title href="/course">Courses</Channel.Title>
            {props.courses.map(course => (
              <CourseLink course={course} key={course.slug}>
                <Item content={course} />
              </CourseLink>
            ))}
          </Channel>
          <Channel>
            <Channel.Title href="/post">Posts</Channel.Title>
            {props.posts.map(post => (
              <InternalLink content={post} key={post.slug}>
                <Item content={post} />
              </InternalLink>
            ))}
          </Channel>
          <Channel>
            <Channel.Title href="/talk">Talks</Channel.Title>
            {props.talks.map(talk => (
              <InternalLink content={talk} key={talk.slug}>
                <Item content={talk} />
              </InternalLink>
            ))}
          </Channel>
          <Channel>
            <Channel.Title href="/book">Reading</Channel.Title>
            {props.books.map(book => (
              <InternalLink content={book} key={book.slug}>
                <Item content={book} />
              </InternalLink>
            ))}
          </Channel>
        </Sky>
        <Logo />
        <GridContainer>
          <GridAnimated />
        </GridContainer>
      </Main>
    </BlogLayout>
  )
}
export default IndexPage
