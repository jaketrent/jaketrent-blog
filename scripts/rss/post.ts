import { basename } from "path"

import { DOMAIN } from "../common/domain"
import {
  writeSitemap,
  parseUrlFromContentPath,
  searchFilePaths,
  fileFromRoot,
  mkdir,
} from "../common/file"
import { Content, parseDate } from "../../src/blog/data/markdown"
import { compileMarkdown, readMarkdown } from "../../src/blog/data"

export const formatItem = (pubDate, loc, title, description) => `
  <item>
    <link>${DOMAIN}${loc}</link>
    <guid isPermaLink="true">${DOMAIN}${loc}</guid>
    <pubDate>${pubDate}</pubDate>
    <title>${title}</title>
    <description>${description}</description>
  </item>
`

export const formatChannel = urls => `
  <?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>Jake Trent Articles</title>
      <link>https://jaketrent.com</link>
      <description>Articles on technology</description>
      <language>en-us</language>
    </channel>
    ${urls}
  </rss>
`

interface ContentItem {
  url: string
  title: string
  pubDate: string
  content: Content
}
const readContent = (pages: string[]) => {
  return pages.map(path => {
    const fileName = basename(path)
    const dir = path.substr(0, path.indexOf(fileName))
    const content = readMarkdown(dir, fileName)
    const pubDate = content.frontmatter.date
    const url = parseUrlFromContentPath(path)
    const title = content.frontmatter.title
    return { url, title, pubDate, content }
  })
}

const sortByDateDesc = (a: ContentItem, b: ContentItem): number => {
  const aDate = parseDate(a.pubDate)
  const bDate = parseDate(b.pubDate)
  const isBefore = aDate > bDate
  if (isBefore) return -1
  else return 0
}

const limitLatest = (contentItems: ContentItem[]) =>
  contentItems.sort(sortByDateDesc).slice(0, 10)

const formatItems = async (contentFiles: ContentItem[]) => {
  let urls = ""
  for (const contentFile of contentFiles) {
    const { url, title, pubDate, content } = contentFile
    const result = await compileMarkdown(content.content)
    const description = result.string

    const item = formatItem(pubDate, url, title, description)
    urls += item
  }
  return urls
}

export const generateRss = async ({ globs }) => {
  let pages = await searchFilePaths(globs)

  const contentFiles = limitLatest(readContent(pages))
  const items = await formatItems(contentFiles)

  return formatChannel(items)
}

export const generatePostsRss = () =>
  generateRss({
    globs: [fileFromRoot("content/post/*")],
  })
;(async () => {
  const sitemap = await generatePostsRss()
  mkdir("public/post")
  writeSitemap("public/post/rss.xml", sitemap)
})()
