import {
  fileFromRoot,
  formatUrl,
  formatUrlset,
  parseUrlFromContentPath,
} from "../common"

describe("#fileFromRoot", () => {
  it("converts concrete paths", () => {
    expect(fileFromRoot("public/static.xml")).toEqual("public/static.xml")
  })
  it("converts glob paths", () => {
    expect(fileFromRoot("pages/**/*.tsx")).toEqual("pages/**/*.tsx")
  })
})

describe("#parseUrlFromContentPath", () => {
  it("removes dir path and extension", () => {
    expect(parseUrlFromContentPath("content/post/page.md")).toEqual(
      "/post/page"
    )
  })
})

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
