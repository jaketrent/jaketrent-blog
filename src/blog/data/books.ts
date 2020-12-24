import { Content, FrontMatter } from "./markdown"
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
