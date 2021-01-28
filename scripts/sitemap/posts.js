import { fileFromRoot, generateSitemap, writeSitemap } from "./common.js"

export const generatePostsSitemap = () =>
  generateSitemap({
    globs: [fileFromRoot("content/post/*")],
  })

const sitemap = await generatePostsSitemap()
writeSitemap("public/sitemap-posts.xml", sitemap)
