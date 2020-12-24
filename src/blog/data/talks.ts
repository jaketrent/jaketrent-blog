import { getContentDir, readAllMarkdown } from "./markdown"

export const fetchAllTalks = () => {
  return readAllMarkdown(getContentDir("talk"))
}
