import { getCurrentDateStr } from "../common/date"
import { DOMAIN } from "../common/domain"
import {
  searchFilePaths,
  prettify,
  parseUrlFromContentPath,
} from "../common/file"

export const formatUrl = (lastmod, loc) => `
  <url>
    <loc>${DOMAIN}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
`

export const formatUrlset = urls => `
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
  >
    ${urls}
  </urlset>
`

export const generateSitemap = async ({
  globs,
  parseUrl = parseUrlFromContentPath,
}) => {
  const pages = await searchFilePaths(globs)

  const formatUrlForToday = formatUrl.bind(null, getCurrentDateStr())
  const urls = `
    ${pages
      .map(parseUrl)
      .map(formatUrlForToday)
      .join("")}
  `

  return prettify(formatUrlset(urls))
}
