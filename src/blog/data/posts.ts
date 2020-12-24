import { Content, getContentDir, readAllMarkdown } from "./markdown"

export interface Post extends Content {}

export const fetchAllPosts = () => {
  return readAllMarkdown<Post>(getContentDir("post"))
}
