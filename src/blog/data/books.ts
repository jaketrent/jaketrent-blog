import { getContentDir, readAllMarkdown } from "./markdown"

export const fetchAllBooks = () => {
  return readAllMarkdown(getContentDir("book"))
}
