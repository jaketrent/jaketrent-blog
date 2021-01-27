import {
  fileFromRoot,
  formatUrl,
  formatUrlset,
  parseUrlFromFilePath,
} from "../common"

describe("#fileFromRoot", () => {
  it("converts concrete paths", () => {
    expect(fileFromRoot("public/static.xml")).toEqual("public/static.xml")
  })
  it("converts glob paths", () => {
    expect(fileFromRoot("pages/**/*.tsx")).toEqual("pages/**/*.tsx")
  })
})

describe("#parseUrlFromFilePath", () => {
  it("removes dir path and extension", () => {
    expect(parseUrlFromFilePath("src/pages/posts/page.tsx")).toEqual(
      "/posts/page"
    )
  })

  it("removes index subpath", () => {
    expect(parseUrlFromFilePath("src/pages/posts/index.tsx")).toEqual("/posts")
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
