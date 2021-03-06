import { generateSitemap } from "./common"
import { exclude, fileFromRoot, writeFile } from "../common/file"

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
;(async () => {
  const sitemap = await generateStaticSitemap()
  writeFile("public/sitemap-static.xml", sitemap)
})()
