import { Content, FrontMatter } from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

interface TalkFrontMatter extends FrontMatter {
  image: string
}

export interface Talk extends Content {
  frontmatter: TalkFrontMatter
}

export const fetchAllTalks = (opts: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll({ ...opts, contentPath: "talk" })
