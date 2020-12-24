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

interface FetchAllOptions<T> {
  filterBy?: FilterFn<T>
  sortBy?: SortFn<T>
  limit?: number
}
type FetchAllFn = <T>(options: FetchAllOptions<T>) => T[]
export const fetchAllCourses: FetchAllFn<T> = options => {
  const opts = applyOptionDefaults<T>(options)
  let courses = readAllMarkdown<Course>(getContentDir("course"))

  if (opts.filterBy) courses = courses.filter(opts.filterBy)

  if (opts.sortBy) courses = courses.sort(opts.sortBy)

  if (opts.limit) courses = courses.slice(0, opts.limit)

  return courses
}

type DefaultFn = <T>(options: FetchAllOptions<T>) => FetchAllOptions<T>
const applyOptionDefaults: DefaultFn<T> = opts => {
  return {
    filterBy: filterByNonDraft,
    sortBy: sortByDateDesc,
    ...opts,
  }
}
