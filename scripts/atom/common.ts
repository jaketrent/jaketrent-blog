import escapeHtml from "escape-html"
import { basename } from "path"

import { DOMAIN } from "../common/domain"
import {
  parseUrlFromContentPath,
  searchFilePaths,
  prettify,
} from "../common/file"
import { Content } from "../../src/blog/data/markdown"
import { isPost } from "../../src/blog/data/posts"
import { sortByDateDesc } from "../../src/blog/data/request"
import { compileMarkdown, readMarkdown } from "../../src/blog/data"

export interface EntryInfo {
  url: string
  content: Content
}

export const formatFeed = (entries: string) => `
  <?xml version="1.0" encoding="utf-8"?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <link href="${DOMAIN}/post/feed.xml" rel="self" type="application/atom+xml" />
    <link href="${DOMAIN}" rel="alternate" type="text/html" />
    <updated>${new Date().toISOString()}</updated>
    <id>${DOMAIN}/post/feed.xml</id>
    <title type="html">Jake Trent articles</title>
    <subtitle>Development, design... art</subtitle>
    <author>
      <name>Jake Trent</name>
      <email>hi@jaketrent.com</email>
      <uri>${DOMAIN}</uri>
    </author>
    ${entries}
  </feed>
`

export const formatEntry = (entryInfo: EntryInfo) => `
  <entry>
  <title type="html">${entryInfo.content.frontmatter.title}</title>
  <link href="${entryInfo.url}" rel="alternate" type="text/html" title="${
  entryInfo.content.frontmatter.title
}" />
  <published>${entryInfo.content.frontmatter.date}</published>
  <updated>${entryInfo.content.frontmatter.lastmod ||
    entryInfo.content.frontmatter.date}</updated>
  <id>${entryInfo.url}</id>
  <content type="html" xml:base="${entryInfo.url}">
    ${escapeHtml(entryInfo.content.content)}
  </content>
  <author><name>Jake Trent</name><email>hi@jaketrent.com</email><uri>${DOMAIN}</uri></author>
  ${(entryInfo.content.frontmatter.tags || []).map(
    tag => `<category term="${tag}" />`
  )}
  <summary type="html">${entryInfo.content.frontmatter.title}</summary>
  ${
    isPost(entryInfo.content)
      ? `<media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${entryInfo.content.frontmatter.image}" />
  <media:content medium="image" url="${entryInfo.content.frontmatter.image}" xmlns:media="http://search.yahoo.com/mrss/" />`
      : ""
  }
  </entry>
`

export const _readEntryInfos = (
  deps: typeof readEntryInfos.deps,
  pages: string[]
): EntryInfo[] => {
  return pages.map(path => {
    const fileName = basename(path)
    const dir = path.substr(0, path.indexOf(fileName))
    const content = deps.read(dir, fileName)
    const url = DOMAIN + parseUrlFromContentPath(path)
    return { url, content }
  })
}
_readEntryInfos.deps = { read: readMarkdown }
export const readEntryInfos = _readEntryInfos.bind(null, _readEntryInfos.deps)

export const limitLatest = (entries: EntryInfo[], opts = { limit: 10 }) =>
  entries
    .sort((a: EntryInfo, b: EntryInfo) => sortByDateDesc(a.content, b.content))
    .slice(0, opts.limit)

export const formatEntries = async (entryInfos: EntryInfo[]) => {
  let urls = ""
  for (const entryInfo of entryInfos) {
    const result = await compileMarkdown(entryInfo.content.content)
    entryInfo.content.content = result.string

    const item = formatEntry(entryInfo)
    urls += item
  }
  return urls
}

export const generateAtomFeed = async ({ globs }) => {
  let pages = await searchFilePaths(globs)

  const entryInfos = limitLatest(readEntryInfos(pages))
  const entries = await formatEntries(entryInfos)

  return prettify(formatFeed(entries))
}
