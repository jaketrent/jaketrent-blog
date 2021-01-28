import {
  exclude,
  fileFromRoot,
  generateSitemap,
  writeSitemap,
} from "./common.js"

export const generateStaticSitemap = async () =>
  generateSitemap({
    globs: [
      fileFromRoot("src/pages/**/*.tsx"),
      fileFromRoot("src/pages/*.tsx"),
      exclude(fileFromRoot("src/pages/_*.tsx")),
      exclude(fileFromRoot("src/pages/**/[*.tsx")),
    ],
    parseUrl: parseUrlFromSrcPath,
  })

export const parseUrlFromSrcPath = filePath => {
  const url = filePath
    .replace(fileFromRoot("src/pages"), "")
    .replace(".tsx", "")
    .replace(/\/index/g, "")
  const path = url === "index" ? "" : url
  return path
}

const sitemap = await generateStaticSitemap()
writeSitemap("public/sitemap-static.xml", sitemap)
