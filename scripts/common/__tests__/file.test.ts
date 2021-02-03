import { fileFromRoot, parseUrlFromContentPath } from "../file"

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
