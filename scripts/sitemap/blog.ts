import { fileFromRoot, writeFile } from "../common/file"
import { generateSitemap } from "./common"

export const generatePostsSitemap = () =>
  generateSitemap({
    globs: [
      fileFromRoot("content/book/*"),
      fileFromRoot("content/course/*"),
      fileFromRoot("content/post/*"),
      fileFromRoot("content/talk/*"),
    ],
  })
;(async () => {
  const sitemap = await generatePostsSitemap()
  writeFile("public/sitemap-blog.xml", sitemap)
})()
