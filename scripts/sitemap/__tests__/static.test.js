import { jest } from "@jest/globals"

import { generateSitemap } from "../static"

jest.useFakeTimers()

describe("#generatedSitemap", () => {
  beforeAll(() => {
    const stableDate = new Date("2018-01-01")
    jest.spyOn(window, "Date").mockImplementation(() => stableDate)
  })

  afterAll(() => {
    window.Date.mockRestore()
  })

  it("renders all static .tsx pages", async () => {
    const sitemap = await generateSitemap()
    expect(sitemap).toMatchSnapshot()
  })
})
