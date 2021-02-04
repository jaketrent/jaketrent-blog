import { generatePostsRss } from "../post"

it("renders latest 10 posts", async () => {
  const rss = await generatePostsRss()
  expect(rss).toMatchSnapshot()
})
