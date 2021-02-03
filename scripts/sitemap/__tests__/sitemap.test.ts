import { generateSitemapIndex } from "../sitemap"
import { stabilizeDate } from "../../../test/util/date"

describe("generateSitemapIndex", () => {
  const teardownStabilizeDate = stabilizeDate(new Date("2018-01-01"))

  afterAll(() => {
    teardownStabilizeDate()
  })

  it("renders all static .tsx pages", async () => {
    const sitemap = await generateSitemapIndex()
    expect(sitemap).toMatchSnapshot()
  })
})
