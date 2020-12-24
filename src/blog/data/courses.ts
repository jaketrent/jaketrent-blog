import { parseISO } from "date-fns"
import { getContentDir, parseDate, readAllMarkdown } from "./markdown"

export interface Course {
  slug: string
  frontmatter: {
    date: string
  }
  content: string
}

// TODO: type to extend one of content types
type FilterFn<T> = (value: T) => boolean
const filterByNonDraft: FilterFn<T> = (content: T) => {
  const ret = !content.frontmatter.draft
  console.log("filter", { ret })
  return ret
}

type SortFn = <T>(a: T, b: T) => boolean
const sortByDateDesc: SortFn<Course> = (a, b) => {
  const aDate = parseDate(a.frontmatter.date)
  const bDate = parseDate(b.frontmatter.date)
  const isBefore = aDate > bDate
  if (isBefore) return -1
  else return 0
}

export const fetchAllCourses = (
  filterBy = filterByNonDraft,
  sortBy = sortByDateDesc
) => {
  return readAllMarkdown<Course>(getContentDir("course"))
    .filter(filterBy)
    .sort(sortBy)
}
