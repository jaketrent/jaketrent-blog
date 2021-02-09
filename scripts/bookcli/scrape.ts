import * as http from "http"
import got from "got"
import terminalImage from "terminal-image"

import { request } from "./request"

const title = "Mary Poppins"

interface BookResult {
  coverId: string | undefined
  author: string | undefined
  title: string
}
interface BookResultWithCover extends BookResult {
  cover: string
}

// https://openlibrary.org/dev/docs/api/search
const parseBookResults = (json: any): BookResult[] =>
  json.docs.map((doc: any) => {
    return {
      coverId: doc.cover_i,
      author: (doc.author_name || [])[0],
      title: doc.title,
    }
  })

// TODO: deps pattern
const searchBooks = async (title: string): Promise<BookResult[]> => {
  const books = await request<BookResult[]>({
    hostname: "openlibrary.org",
    path: `/search.json?title=${formatInputTitle(title)}`,
    parse: parseBookResults,
  })

  return books.filter(filterHelpfulBooks).slice(0, 3)
}

const formatInputTitle = title =>
  title
    .toLowerCase()
    .split(" ")
    .join("+")

const augmentBookCover = async (
  book: BookResult
): Promise<BookResultWithCover> => {
  const requestBuffer = await got(
    `http://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
  ).buffer()
  const imageBuffer = await terminalImage.buffer(requestBuffer, { width: 200 })
  return {
    ...book,
    cover: imageBuffer,
  }
}

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

const print = console.log
const println = (content: any) => console.log(content + "\n")

const renderBooks = (books: BookResultWithCover[]) => {
  books.forEach((book, i) => {
    println(`${i}. ${book.title}`)
    println(book.author)
    print(book.cover)
  })
}

const filterHelpfulBooks = (book: BookResult) =>
  typeof book.coverId !== "undefined" && typeof book.author !== "undefined"
;(async () => {
  // const body = await got("https://sindresorhus.com/unicorn").buffer()
  // console.log(await terminalImage.buffer(body))

  const books = await searchBooks(title)
  const books2 = await augmentBooks(books)

  // const book = books[0]
  // const url = `http://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
  // console.log({ url })
  // const requestBuffer = await got(url).buffer()
  // print(await terminalImage.buffer(requestBuffer, { width: 200 }))

  renderBooks(books2)
})()
