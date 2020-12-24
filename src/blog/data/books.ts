import { Content, FrontMatter } from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

interface BookFrontMatter extends FrontMatter {
  image: string
}

export interface Book extends Content {
  frontmatter: BookFrontMatter
}

export const fetchAllBooks = (opts: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll({ ...opts, contentPath: "book" })
