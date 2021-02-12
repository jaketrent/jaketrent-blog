import got from "got"
import prompt from "prompt"
import slugify from "slugify"
import terminalImage from "terminal-image"

import { fileFromRoot, writeFile } from "../common/file"

interface BookResult {
  coverId: string | undefined
  author: string | undefined
  title: string
}
interface BookResultWithCover extends BookResult {
  cover: string
}

// schema from https://openlibrary.org/dev/docs/api/search
const parseBookResults = (json: any): BookResult[] =>
  json.docs.map((doc: any) => {
    return {
      coverId: doc.cover_i,
      author: (doc.author_name || [])[0],
      title: doc.title,
    }
  })

const searchBooks = async (title: string): Promise<BookResult[]> => {
  const formatTitle = title =>
    title
      .toLowerCase()
      .split(" ")
      .join("+")

  const result = await got(
    `http://openlibrary.org/search.json?title=${formatTitle(title)}`
  ).json()
  const books = parseBookResults(result)
  const helpful = books.filter(filterHelpfulBooks)
  log(`Found ${books.length} books (${helpful.length} helpful)`)
  return helpful.slice(0, 3)
}

const augmentBookCover = async (
  book: BookResult
): Promise<BookResultWithCover> => {
  const coverUrl = formatCoverUrl(book.coverId)
  try {
    const requestBuffer = await got(coverUrl).buffer()
    const imageBuffer = await terminalImage.buffer(requestBuffer, {
      width: "25%",
      height: "25%",
    })
    return {
      ...book,
      cover: imageBuffer,
    }
  } catch (err) {
    log(`Failed to render cover url: ${coverUrl}`)
    return { ...book, cover: coverUrl }
  }
}

const formatCoverUrl = (coverId: string) =>
  `http://covers.openlibrary.org/b/id/${coverId}-L.jpg`

const augmentBooks = async (
  books: BookResult[]
): Promise<BookResultWithCover[]> => {
  let augmented = []
  for (const book of books) {
    const withCover = await augmentBookCover(book)
    augmented.push(withCover)
  }
  return augmented
}

const log = console.debug
const print = console.log
const println = (content: any) => console.log(content + "\n")

const renderBooks = (books: BookResultWithCover[]) => {
  books.forEach((book, i) => {
    println(`${i}. ${book.title}`)
    println(book.author)
    print(book.cover)
  })
}

interface Prompt {
  message: string
  required?: boolean
}
type Prompts = Record<string, Prompt>

const promptInfo = async <T extends Prompts>(
  properties: T
): Promise<Record<string, string>> => {
  return new Promise((resolve, reject) => {
    const schema = {
      properties,
    }

    prompt.start()

    prompt.get(schema, (err: Error, result: Record<string, string>) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

interface TitlePrompts extends Prompts {
  title: {
    message: string
    required: true
  }
}
interface MetaPrompts extends Prompts {
  cover: {
    message: string
    required: true
  }
  author: {
    message: string
    required: true
  }
  date: {
    message: string
    required: true
  }
  rating: {
    message: string
    required: true
  }
}

const filterHelpfulBooks = (book: BookResult) =>
  typeof book.coverId !== "undefined" && typeof book.author !== "undefined"

const getSelectedCoverId = (books: BookResultWithCover[], index: string) =>
  books[parseInt(index, 10)].coverId

const formatBookPath = (title: string) =>
  `content/book/${slugify(title, { lower: true })}.md`

interface BookMeta {
  title: string
  author: string
  cover: string
  date: string
  rating: string
}
const formatMarkdown = (meta: BookMeta) =>
  `---
layout: book
author: "${meta.author}"
date: ${meta.date}
image: "${meta.cover}"
rating: ${meta.rating}
title: "${meta.title}"
---

<!--more-->`

const writeBook = (meta: BookMeta) => {
  writeFile(fileFromRoot(formatBookPath(meta.title)), formatMarkdown(meta))
}
;(async () => {
  const { title } = await promptInfo<TitlePrompts>({
    title: {
      message: "Title?",
      required: true,
    },
  })
  const books = await searchBooks(title)
  const booksWithCovers = await augmentBooks(books)
  renderBooks(booksWithCovers)
  const { cover, author, date, rating } = await promptInfo<MetaPrompts>({
    cover: {
      message: "Which cover? (0-2)",
      required: true,
    },
    author: {
      message: "Author?",
      required: true,
    },
    date: {
      message: "Date read? (YYYY-MM-DD)",
      required: true,
    },
    rating: {
      message: "rating? (1-5)",
      required: true,
    },
  })
  const coverUrl = getSelectedCoverId(booksWithCovers, cover)
  writeBook({ title, author, date, rating, cover: formatCoverUrl(coverUrl) })
})()
