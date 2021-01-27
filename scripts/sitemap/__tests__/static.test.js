import { generateSitemap } from "../static"

describe("#generatedSitemap", () => {
  it("renders all static .tsx pages", async () => {
    const sitemap = await generateSitemap()
    expect(sitemap).toMatchSnapshot()
  })
})
