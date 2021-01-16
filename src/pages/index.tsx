import { FC } from "react"

import { Course, fetchAllCourses } from "../blog/data/courses"
import { Post, fetchAllPosts } from "../blog/data/posts"
import { Talk, fetchAllTalks } from "../blog/data/talks"
import { Book, fetchAllBooks } from "../blog/data/books"
import { BlogLayout } from "../blog/ui/layout"
import { Channel, GridContainer, Header, Logo, Sky, Tagline } from "../blog/ui"
import { Grid } from "../blog/ui/grid"

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
      <main>
        <Header>
          <Tagline />
          <Sky>
            <Channel></Channel>
            <Channel></Channel>
            <Channel></Channel>
            <Channel></Channel>
          </Sky>
          <Logo />
          <GridContainer>
            <Grid animated />
          </GridContainer>
        </Header>
      </main>
    </BlogLayout>
  )
}
export default IndexPage
