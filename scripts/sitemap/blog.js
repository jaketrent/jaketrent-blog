import { fileFromRoot, generateSitemap, writeSitemap } from "./common.js"

export const generatePostsSitemap = () =>
  generateSitemap({
    globs: [
      fileFromRoot("content/book/*"),
      fileFromRoot("content/course/*"),
      fileFromRoot("content/post/*"),
      fileFromRoot("content/talk/*"),
    ],
  })

const sitemap = await generatePostsSitemap()
writeSitemap("public/sitemap-blog.xml", sitemap)
