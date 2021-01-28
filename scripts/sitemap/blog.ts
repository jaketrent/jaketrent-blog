import { fileFromRoot, generateSitemap, writeSitemap } from "./common"

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
  writeSitemap("public/sitemap-blog.xml", sitemap)
})()
