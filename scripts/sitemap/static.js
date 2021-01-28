import {
  exclude,
  fileFromRoot,
  formatUrl,
  formatUrlset,
  getCurrentDateStr,
  parseUrlFromFilePath,
  prettify,
  searchFilePaths,
  writeSitemap,
} from "./common.js"

export const generateSitemap = async () => {
  const pages = await searchFilePaths([
    fileFromRoot("src/pages/**/*.tsx"),
    fileFromRoot("src/pages/*.tsx"),
    exclude(fileFromRoot("src/pages/_*.tsx")),
    exclude(fileFromRoot("src/pages/**/[*.tsx")),
  ])

  const formatUrlForToday = formatUrl.bind(null, getCurrentDateStr())
  const parseUrlFromSrc = parseUrlFromFilePath.bind(null, "src/pages/")
  const urls = `
    ${pages
      .map(parseUrlFromSrc)
      .map(formatUrlForToday)
      .join("")}
  `

  return prettify(formatUrlset(urls))
}

const sitemap = await generateSitemap()
writeSitemap("public/sitemap-static.xml", sitemap)
