import { generateStaticSitemap, parseUrlFromSrcPath } from "../static"
import { stabilizeDate } from "../../../test/util/date"

describe("#generatedStaticSitemap", () => {
  const teardownStabilizeDate = stabilizeDate(new Date("2018-01-01"))

  afterAll(() => {
    teardownStabilizeDate()
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
