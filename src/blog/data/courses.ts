import { Content, parseDate, readAllMarkdown } from "./markdown"
import { FetchAllOptions, fetchAll } from "./request"

export interface Course extends Contents {}

export const fetchAllCourses = (opts: Omit<FetchAllOptions, "contentPath">) =>
  fetchAll({ ...opts, contentPath: "course" })
