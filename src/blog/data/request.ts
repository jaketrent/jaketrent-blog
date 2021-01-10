import { parseISO } from "date-fns"

import { Content, getContentDir, parseDate, readAllMarkdown } from "./markdown"

const filterByNonDraft = (content: Content): boolean => {
  return !content?.frontmatter?.draft
}

const sortByDateDesc = (a: Content, b: Content): number => {
  const aDate = parseDate(a.frontmatter.date)
  const bDate = parseDate(b.frontmatter.date)
  const isBefore = aDate > bDate
  if (isBefore) return -1
  else return 0
}

export interface FetchAllOptions {
  contentPath: string
  filterBy?: (content: Content) => boolean
  sortBy?: (a: Content, b: Content) => number
  limit?: number
}
type FetchAllFn = (options: FetchAllOptions) => Content[]
export const fetchAll: FetchAllFn = options => {
  const opts = applyOptionDefaults(options)
  let contents = readAllMarkdown(getContentDir(opts.contentPath))

  if (opts.filterBy) contents = contents.filter(opts.filterBy)

  if (opts.sortBy) contents = contents.sort(opts.sortBy)

  if (opts.limit) contents = contents.slice(0, opts.limit)

  return contents
}

export const applyOptionDefaults = (opts: FetchAllOptions): FetchAllOptions => {
  return {
    filterBy: filterByNonDraft,
    sortBy: sortByDateDesc,
    ...opts,
  }
}
