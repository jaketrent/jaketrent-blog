import { Content, FrontMatter } from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

interface CourseFrontMatter extends FrontMatter {
  image: string
  landingPage: string
}

export interface Course extends Content {
  frontmatter: CourseFrontMatter
}

export const fetchAllCourses = (opts: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll({ ...opts, contentPath: "course" })
