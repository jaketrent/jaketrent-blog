import {
  Content,
  FrontMatter,
  getContentDir,
  readMarkdown,
  renderHtml,
} from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

interface BookFrontMatter extends FrontMatter {
  affiliateUrl?: string
  image: string
  layout: "book"
  readUrl?: string
}

export interface Book extends Content {
  frontmatter: BookFrontMatter
}

export const fetchAllBooks = (opts?: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll({ ...opts, contentPath: "book" })

export const fetchBook = async (slug: string) => {
  const book = readMarkdown(getContentDir("book"), slug + ".md") as Book
  book.content = await renderHtml(book.content)
  return book
}
