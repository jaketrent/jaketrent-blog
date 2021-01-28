import { jest } from "@jest/globals"

import { generatePostsSitemap } from "../blog"

beforeAll(() => {
  const stableDate = new Date("2018-01-01")
  jest.spyOn(window, "Date").mockImplementation(() => stableDate)
})

afterAll(() => {
  window.Date.mockRestore()
})

it("renders all book, course, post, talk .md pages", async () => {
  const sitemap = await generatePostsSitemap()
  expect(sitemap).toMatchSnapshot()
})
