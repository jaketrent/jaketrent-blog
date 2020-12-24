import { parseISO, format } from "date-fns"
import matter from "gray-matter"
import fs from "fs"
import { join, resolve } from "path"

export interface FrontMatter {
  date: string
  title: string
}

export interface Content {
  slug: string
  frontmatter: FrontMatter
  content: string
}

export const getContentDir = (subpath?: string): string =>
  resolve(join(process.cwd(), "content", subpath))
// resolve(join(__dirname, "..", "..", "..", "content", subpath))

export const readMarkdown = <T>(dir: string, fileName: string): T => {
  try {
    const fileContents = fs.readFileSync(join(dir, fileName), "utf8")
    const slug = fileName.replace(/\.md$/, "")
    const { data, content } = matter(fileContents)
    const date = formatDate(parseDate(data.date))

    return {
      slug,
      frontmatter: { ...data, date },
      content,
    }
  } catch (err) {
    console.error("markdown read failed", { fileName, err })
  }
}

export const readAllMarkdown = <T>(dir: string): T[] => {
  const fileNames = fs.readdirSync(dir)
  return fileNames.map(fileName => readMarkdown<T>(dir, fileName))
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
