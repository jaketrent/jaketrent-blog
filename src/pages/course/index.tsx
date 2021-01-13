import { fetchAllCourses } from "../../blog/data/courses"
import { BlogLayout } from "../../blog/ui/layout"
import { Link, Logo } from "../../common/ui"

import css from "../../blog/ui/content-list.module.css"

export async function getStaticProps() {
  const courses = fetchAllCourses()
  return {
    props: {
      courses,
    },
  }
}

export default function PostIndexPage(props) {
  const totalCount = props.courses.length
  return (
    <BlogLayout title="Courses | Jake Trent">
      <main className={css.contentList}>
        <Link href="/">
          <a className={css.logo}>
            <Logo />
          </a>
        </Link>
        <h1 className={css.title}>Courses</h1>
        <div className={css.items}>
          <div className={css.count}>{totalCount} courses</div>
          <div className={css.links}>
            {props.courses.map(course => (
              <Link href={course.frontmatter.landingPage} key={course.slug}>
                <a>{course.frontmatter.title}</a>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </BlogLayout>
  )
}
