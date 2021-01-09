import {
  Content,
  FrontMatter,
  getContentDir,
  readMarkdown,
  renderHtml,
} from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

type Disclosure =
  | "no-connection"
  | "affiliate"
  | "free"
  | "sponsor"
  | "employee"

interface BookFrontMatter extends FrontMatter {
  affiliateUrl?: string
  disclosures: Disclosure[]
  disclosuresUrl?: string
  image: string
  readUrl?: string
}

export interface Book extends Content {
  frontmatter: BookFrontMatter
}

export const fetchAllBooks = (opts: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll({ ...opts, contentPath: "book" })

export const fetchBook = async (slug: string) => {
  const post = readMarkdown<Book>(getContentDir("book"), slug + ".md")
  post.content = await renderHtml(post.content)
  return post
}
