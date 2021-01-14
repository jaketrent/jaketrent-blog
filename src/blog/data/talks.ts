import {
  Content,
  FrontMatter,
  readMarkdown,
  compileMarkdown,
  getContentDir,
} from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

interface TalkFrontMatter extends FrontMatter {
  image: string
  layout: "talk"
}

export interface Talk extends Content {
  frontmatter: TalkFrontMatter
}

export const fetchAllTalks = (opts?: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll({ ...opts, contentPath: "talk" })

export const fetchTalk = async (slug: string) => {
  const talk = readMarkdown(getContentDir("talk"), slug + ".md") as Talk
  const rendered = await compileMarkdown(talk.content)
  talk.content = rendered.string
  return talk
}
