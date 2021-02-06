import {
  EntryInfo,
  _readEntryInfos,
  formatEntries,
  formatEntry,
  formatFeed,
  generateAtomFeed,
  limitLatest,
} from "../common"
import { fileFromRoot } from "../../common/file"
import { Content } from "../../../src/blog/data/markdown"
import { Post } from "../../../src/blog/data/post"
import { stabilizeDate } from "../../../test/util/date"

const stubDate = "2018-01-01"

// TODO: extract to helpers
const contentMockDefaults: Content = {
  slug: "mock-slug",
  path: "/path/mock-slug",
  content: "# Mock Markdown H1",
  frontmatter: {
    comments: true,
    date: stubDate,
    description: "Mock description",
    draft: false,
    lastmod: "2020-02-02",
    layout: "post",
    metaKeywords: "mock keyword, another mock keyword",
    tags: ["mock-tag-1", "mock-tag-2"],
    title: "Mock Title",
  },
}
const createMockContent = (
  defaults: Content,
  overrides: Partial<Content>
): Content => {
  return {
    ...defaults,
    ...overrides,
    frontmatter: {
      ...defaults.frontmatter,
      ...overrides.frontmatter,
    },
  }
}
const createMockPost: (o: Partial<Post> | undefined) => Post = (
  overrides: Partial<Post> | undefined
) =>
  createMockContent(contentMockDefaults, {
    ...overrides,
    frontmatter: {
      image: "https://mock/image.jpg",
      ...(overrides || {}).frontmatter,
    },
  })
const createMockEntryInfo = (overrides: Partial<EntryInfo> | undefined) => ({
  url: "/mock/url",
  ...overrides,
  content: createMockContent(contentMockDefaults, overrides.content),
})

describe("#formatFeed", () => {
  it("renders feed meta", () => {
    const teardownStabilizeDate = stabilizeDate(new Date(stubDate))

    expect(formatFeed("stubEntries")).toMatchSnapshot()

    teardownStabilizeDate()
  })
})

describe("#formatEntry", () => {
  it("renders entry data", () => {
    const entryInfo = {
      url: "https://mock.com/path",
      content: createMockContent(contentMockDefaults, {
        content: "<h1>Already compiled</h1>",
      }),
    }

    expect(formatEntry(entryInfo)).toMatchSnapshot()
  })
})

describe("#readEntryInfos", () => {
  it("reads markdown and combines with url", () => {
    const pages = ["/post/mock.md"]
    const deps = {
      ..._readEntryInfos.deps,
      read: (d: string, f: string): Content => createMockPost(),
    }
    const readEntryInfos = _readEntryInfos.bind(null, deps)

    expect(readEntryInfos(pages)).toMatchSnapshot()
  })
})

describe("#limitLatest", () => {
  it("creates a limited array of entries", () => {
    const entries = [
      createMockEntryInfo({ content: { frontmatter: { date: "2020-01-05" } } }),
      createMockEntryInfo({ content: { frontmatter: { date: "2020-01-01" } } }),
      createMockEntryInfo({ content: { frontmatter: { date: "2020-01-03" } } }),
    ]
    const opts = { limit: 2 }

    const actual = limitLatest(entries, opts)

    expect(actual.length).toEqual(opts.limit)
    expect(actual.map(e => e.content.frontmatter.date)).toEqual([
      "2020-01-05",
      "2020-01-03",
    ])
  })
})

describe("#formatEntries", () => {
  it("renders all entries together", async () => {
    const entryInfos = [
      {
        url: "https://mock.com/path/1",
        content: createMockContent(contentMockDefaults, {
          content: "<h1>Entry 1</h1>",
        }),
      },
      {
        url: "https://mock.com/path/2",
        content: createMockContent(contentMockDefaults, {
          content: "<h1>Entry 2</h1>",
        }),
      },
    ]

    const entries = await formatEntries(entryInfos)

    expect(entries).toMatchSnapshot()
  })
})

describe("#generateAtomFeed", () => {
  it("renders content specified up to limit", async () => {
    const teardownStabilizeDate = stabilizeDate(new Date(stubDate))

    const feed = await generateAtomFeed({
      // TODO: symlink these
      globs: [fileFromRoot("scripts/common/__mocks__/post/*")],
    })

    expect(feed).toMatchSnapshot()

    teardownStabilizeDate()
  })
})
