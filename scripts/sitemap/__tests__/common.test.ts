import { formatUrl, formatUrlset } from "../common"

describe("#formatUrl", () => {
  it("renders", () => {
    expect(formatUrl("mockISODateString", "/post/test-post")).toMatchSnapshot()
  })
})

describe("#formatUrlset", () => {
  it("renders", () => {
    expect(formatUrlset("<mockFormattedUrls />")).toMatchSnapshot()
  })
})
