import globby from "globby"

import {
  exclude,
  fileFromRoot,
  formatUrl,
  formatUrlset,
  getCurrentDateStr,
  parseUrlFromFilePath,
  prettify,
  writeSitemap,
} from "./common.js"

export const generateSitemap = async () => {
  const pages = await globby([
    fileFromRoot("src/pages/**/*.tsx"),
    fileFromRoot("src/pages/*.tsx"),
    exclude(fileFromRoot("src/pages/_*.tsx")),
    exclude(fileFromRoot("src/pages/**/[*.tsx")),
  ])

  const formatUrlForToday = formatUrl.bind(null, getCurrentDateStr())
  const urls = `
    ${pages
      .map(parseUrlFromFilePath)
      .map(formatUrlForToday)
      .join("")}
  `

  return prettify(formatUrlset(urls))
}

const sitemap = await generateSitemap()
writeSitemap("public/sitemap-static.xml", sitemap)
