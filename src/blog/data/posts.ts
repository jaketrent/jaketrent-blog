import {
  Content,
  FrontMatter,
  getContentDir,
  readMarkdown,
  renderHtml,
} from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

interface PostFrontMatter extends FrontMatter {
  image: string
}

export interface Post extends Content {
  frontmatter: PostFrontMatter
}

export const fetchAllPosts = (opts?: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll<Post>({ ...opts, contentPath: "post" })

export const fetchPost = async (slug: string) => {
  const post = readMarkdown<Post>(getContentDir("post"), slug + ".md")
  post.content = await renderHtml(post.content)
  return post
}
