import { parseISO } from "date-fns"

import { Content, getContentDir, parseDate, readAllMarkdown } from "./markdown"

// TODO: type to extend one of content types
type FilterFn<T = Content> = (value: T) => boolean
const filterByNonDraft: FilterFn<T> = (content: T) => {
  const ret = !content.frontmatter.draft
  console.log("filter", { ret })
  return ret
}

type SortFn = <T = Content>(a: T, b: T) => boolean
const sortByDateDesc: SortFn<T> = (a, b) => {
  const aDate = parseDate(a.frontmatter.date)
  const bDate = parseDate(b.frontmatter.date)
  const isBefore = aDate > bDate
  if (isBefore) return -1
  else return 0
}

export interface FetchAllOptions<T = Content> {
  contentPath: string
  filterBy?: FilterFn<T>
  sortBy?: SortFn<T>
  limit?: number
}

type FetchAllFn = <T = Content>(options: FetchAllOptions<T>) => T[]
export const fetchAll: FetchAllFn<T> = options => {
  const opts = applyOptionDefaults<T>(options)
  let contents = readAllMarkdown<T>(getContentDir(opts.contentPath))

  if (opts.filterBy) contents = contents.filter(opts.filterBy)

  if (opts.sortBy) contents = contents.sort(opts.sortBy)

  if (opts.limit) contents = contents.slice(0, opts.limit)

  return contents
}

type DefaultFn = <T = Content>(
  options: FetchAllOptions<T>
) => FetchAllOptions<T>
export const applyOptionDefaults: DefaultFn<T> = opts => {
  return {
    filterBy: filterByNonDraft,
    sortBy: sortByDateDesc,
    ...opts,
  }
}
