import * as fs from "fs"
import globby from "globby"
import { join } from "path"
import prettier from "prettier"

export const searchFilePaths = async globs => {
  const paths = await globby(globs)
  return paths.sort()
}

export const fileFromRoot = path => {
  const root = [] // globby works from cwd. This is unneeded ['..', '..']
  const parts = path.split("/")

  const fullPath = [...root, ...parts]

  return join.apply(null, fullPath)
}

export const exclude = path => "!" + path

export const prettify = html => prettier.format(html, { parser: "html" })

export const parseUrlFromContentPath = filePath => {
  const url = filePath.replace(fileFromRoot("content"), "").replace(".md", "")
  return url
}

// TODO: rename
export const writeSitemap = (path, sitemap) =>
  fs.writeFileSync(fileFromRoot(path), sitemap, "utf8")
