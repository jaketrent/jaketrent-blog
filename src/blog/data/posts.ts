import { getContentDir, readAllMarkdown } from "./markdown"

export const fetchAllPosts = () => {
  return readAllMarkdown(getContentDir("post"))
}
