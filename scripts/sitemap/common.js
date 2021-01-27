import * as fs from "fs"
import { join } from "path"
import prettier from "prettier"

export const DOMAIN = "https://jaketrent.com"

export const fileFromRoot = path => {
  const root = [] // globby works from cwd. This is unneeded ['..', '..']
  const parts = path.split("/")

  const fullPath = [...root, ...parts]

  return join.apply(null, fullPath)
}

export const exclude = path => "!" + path

export const getCurrentDateStr = (date = new Date()) => date.toISOString()

export const prettify = html => prettier.format(html, { parser: "html" })

export const parseUrlFromFilePath = filePath => {
  const url = filePath
    .replace(fileFromRoot("src/pages/"), "")
    .replace(".tsx", "")
    .replace(/\/index/g, "")
  const routePath = url === "index" ? "" : url
  return routePath
}

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

export const writeSitemap = (path, sitemap) =>
  fs.writeFileSync(fileFromRoot(path), sitemap, "utf8")
