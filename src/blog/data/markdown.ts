import { parseISO, format } from "date-fns"
import matter from "gray-matter"
import fs from "fs"
import { join, resolve } from "path"

export interface Content {
  slug: string
  frontmatter: {
    date: string
  }
  content: string
}

export const getContentDir = (subpath?: string): string =>
  resolve(join(process.cwd(), "content", subpath))
// resolve(join(__dirname, "..", "..", "..", "content", subpath))

export const readMarkdown = <T>(dir: string, fileName: string): T => {
  try {
    const fileContents = fs.readFileSync(join(dir, fileName), "utf8")
    const slug = fileName.replace(/\.md$/, "")
    console.log({ fileContents })
    const { data, content } = matter(fileContents)
    console.log("after matter", { data, content })
    console.log({ typeof: typeof data.date })
    // const [yyyy, mm, dd] = data.date.split("-").map(str => parseInt(str, 10))
    // const date = new Date(yyyy, mm - 1, dd)
    // const date = format(parseISO(data.date), "yyyy-mm-dd")
    // console.log({ data })
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
  console.log("read all", { dir })
  const fileNames = fs.readdirSync(dir)
  return fileNames.map(fileName => readMarkdown<T>(dir, fileName))
}

export const formatDate = (date: Date): string => {
  const yyyy = date.getUTCFullYear()
  const mm = date.getUTCMonth()
  const dd = date.getUTCDate()
  return `${yyyy}-${mm + 1}-${dd}`
}

export const parseDate = (date: string): Date => {
  const [yyyy, mm, dd] = date.split("-").map(str => parseInt(str, 10))
  return new Date(yyyy, mm - 1, dd)
}
