import { generatePostsSitemap } from "../blog"
import { stabilizeDate } from "../../../test/util/date"

const teardownStabilizeDate = stabilizeDate(new Date("2018-01-01"))

afterAll(() => {
  teardownStabilizeDate()
})

it("renders all book, course, post, talk .md pages", async () => {
  const sitemap = await generatePostsSitemap()
  expect(sitemap).toMatchSnapshot()
})
