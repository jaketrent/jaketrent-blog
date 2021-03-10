import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import * as fs from "fs"
import matter from "gray-matter"
import { join, resolve } from "path"
import Prism from "prismjs"
import marksy from "marksy"

type Disclosure =
  | "no-connection"
  | "affiliate"
  | "free"
  | "sponsor"
  | "employee"

export interface FrontMatter {
  comments: boolean
  date: string
  description: string
  disclosures?: Disclosure[]
  draft: boolean
  lastmod?: string
  layout: string
  metaKeywords: string
  tags: string[]
  title: string
}

export interface Content {
  slug: string
  path: string
  frontmatter: FrontMatter
  content: string
}

export const getContentDir = (subpath?: string): string =>
  resolve(join(process.cwd(), "content", subpath))

export const readMarkdown = (dir: string, fileName: string): Content => {
  try {
    const fileContents = fs.readFileSync(join(dir, fileName), "utf8")
    const slug = fileName.replace(/\.md$/, "")
    const path = join(dir, fileName)
      .split("content")
      .pop()
      .replace(/\.md$/, "")
    const { data, content } = matter(fileContents)
    const date = formatDate(parseDate(data.date))

    return {
      slug,
      path,
      frontmatter: { ...data, date },
      content,
    } as Content
  } catch (err) {
    console.error("markdown read failed", { fileName, err })
  }
}

export const readAllMarkdown = (dir: string): Content[] => {
  const fileNames = fs.readdirSync(dir)
  return fileNames.map(fileName => readMarkdown(dir, fileName))
}

export const formatDate = (date: Date): string => {
  const yyyy = date.getUTCFullYear()
  const mm = date.getUTCMonth()
  const dd = date.getUTCDate()
  return `${yyyy}-${mm + 1}-${dd}`
}

export const parseDate = (date: string | Date): Date => {
  if (typeof date === "string") {
    const [yyyy, mm, dd] = date.split("-").map(str => parseInt(str, 10))
    return new Date(yyyy, mm - 1, dd)
  } else return new Date(date)
}

interface MarksyResult {
  string: string
  tree: any
  toc: any
}

const highlight = (language, code) => {
  return Prism.highlight(code, Prism.languages.javascript, language)
}

export async function compileMarkdown(markdown: string): Promise<MarksyResult> {
  const compile = marksy({
    createElement,
    elements: {
      code({ language, code }) {
        return createElement(
          "pre",
          {},
          createElement("code", {
            dangerouslySetInnerHTML: { __html: highlight(language, code) },
            tabIndex: 0,
          })
        )
      },
    },
    highlight,
  })
  const result = compile(markdown, {})
  result.string = renderToStaticMarkup(result.tree)
  return result
}
