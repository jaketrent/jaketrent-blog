import { getCurrentDateStr } from "../common/date"
import { DOMAIN } from "../common/domain"
import {
  fileFromRoot,
  prettify,
  searchFilePaths,
  writeSitemap,
} from "../common/file"

export const generateSitemapIndex = async () => {
  const sitemapPaths = await searchFilePaths([fileFromRoot("public/*.gz")])

  const formatSitemapForToday = formatSitemap.bind(null, getCurrentDateStr())
  const sitemaps = `
    ${sitemapPaths
      .map(parseUrlFromPublicPath)
      .map(formatSitemapForToday)
      .join("")}
  `
  return prettify(formatSitemapIndex(sitemaps))
}

const parseUrlFromPublicPath = path => path.replace(fileFromRoot("public"), "")

const formatSitemap = (lastmod, loc) => `
  <sitemap>
    <loc>${`${DOMAIN}${loc}`}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
`

const formatSitemapIndex = sitemaps => `
  <?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemaps}
  </sitemapindex>
`
;(async () => {
  const formattedSitemapIndex = await generateSitemapIndex()
  writeSitemap("public/sitemap.xml", formattedSitemapIndex)
})()
