import {
  Content,
  FrontMatter,
  getContentDir,
  readMarkdown,
  renderHtml,
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
  post.content = await renderHtml(post.content)
  return post
}
