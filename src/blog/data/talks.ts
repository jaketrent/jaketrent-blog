import {
  Content,
  FrontMatter,
  readMarkdown,
  renderHtml,
  getContentDir,
} from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

interface TalkFrontMatter extends FrontMatter {
  image: string
}

export interface Talk extends Content {
  frontmatter: TalkFrontMatter
}

export const fetchAllTalks = (opts: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll({ ...opts, contentPath: "talk" })

export const fetchTalk = async (slug: string) => {
  const talk = readMarkdown(getContentDir("talk"), slug + ".md") as Talk
  talk.content = await renderHtml(talk.content)
  return talk
}
