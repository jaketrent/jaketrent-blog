import { Content, FrontMatter, getContentDir, readMarkdown } from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

interface PostFrontMatter extends FrontMatter {
  image: string
}

export interface Post extends Content {
  frontmatter: PostFrontMatter
}

export const fetchAllPosts = (opts?: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll<Post>({ ...opts, contentPath: "post" })

export const fetchPost = (slug: string) =>
  // TODO: handle mdx
  readMarkdown<Post>(getContentDir("post"), slug + ".md")
