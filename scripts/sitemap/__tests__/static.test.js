import { jest } from "@jest/globals"

import { generateStaticSitemap, parseUrlFromSrcPath } from "../static.js"

describe("#generatedStaticSitemap", () => {
  beforeAll(() => {
    const stableDate = new Date("2018-01-01")
    jest.spyOn(window, "Date").mockImplementation(() => stableDate)
  })

  afterAll(() => {
    window.Date.mockRestore()
  })

  it("renders all static .tsx pages", async () => {
    const sitemap = await generateStaticSitemap()
    expect(sitemap).toMatchSnapshot()
  })
})

describe("#parseUrlFromSrcPath", () => {
  it("removes dir path and extension", () => {
    expect(parseUrlFromSrcPath("src/pages/posts/page.tsx")).toEqual(
      "/posts/page"
    )
  })

  it("removes index subpath", () => {
    expect(parseUrlFromSrcPath("src/pages/posts/index.tsx")).toEqual("/posts")
  })
})
