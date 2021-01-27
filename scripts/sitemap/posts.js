import * as fs from "fs"
import fetch from "node-fetch"
import * as prettier from "prettier"

const getDate = new Date().toISOString()

// TODO: fix to read content md
const fetchUrl = "https://jsonplaceholder.typicode.com/posts"
// TODO: extract
const DOMAIN = "https://jaketrent.com"

const formatted = sitemap => prettier.format(sitemap, { parser: "html" })

;(async () => {
  const fetchPosts = await fetch(fetchUrl)
    .then(res => res.json())
    .catch(err => console.log(err))

  const postList = []
  fetchPosts.forEach(post => postList.push(post.id))

  const postListSitemap = `
    ${postList
      .map(id => {
        // TODO: extract
        return `
          <url>
            <loc>${`${DOMAIN}/post/${id}`}</loc>
            <lastmod>${getDate}</lastmod>
          </url>`
      })
      .join("")}
  `

  // TODO: extract
  const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    >
      ${postListSitemap}
    </urlset>
  `

  const formattedSitemap = [formatted(generatedSitemap)]

  fs.writeFileSync("../public/sitemap-posts.xml", formattedSitemap, "utf8")
})()
