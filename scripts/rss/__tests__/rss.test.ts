import { generatePostsRss } from "../rss"
// import { stabilizeDate } from "../../../test/util/date"

// const teardownStabilizeDate = stabilizeDate(new Date("2018-01-01"))

// afterAll(() => {
//   teardownStabilizeDate()
// })

it("renders all book, course, post, talk .md pages", async () => {
  const rss = await generatePostsRss()
  expect(rss).toMatchSnapshot()
})
