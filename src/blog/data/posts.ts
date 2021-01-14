import {
  Content,
  FrontMatter,
  getContentDir,
  readMarkdown,
  compileMarkdown,
} from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

interface PostFrontMatter extends FrontMatter {
  layout: "post"
  image: string
}

export interface Post extends Content {
  frontmatter: PostFrontMatter
}

export const fetchAllPosts = (opts?: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll({ ...opts, contentPath: "post" })

export const fetchPost = async (slug: string) => {
  const post = readMarkdown(getContentDir("post"), slug + ".md") as Post
  const rendered = await compileMarkdown(post.content)
  post.content = rendered.string
  return post
}
