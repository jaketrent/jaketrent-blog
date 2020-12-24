import { Content } from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

interface PostFrontMatter extends FrontMatter {
  image: string
}

export interface Post extends Content {
  frontmatter: PostFrontMatter
}

export const fetchAllPosts = (opts: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll({ ...opts, contentPath: "post" })
