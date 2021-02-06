import { writeFile, fileFromRoot, mkdir } from "../common/file"
import { generateAtomFeed } from "./common"
;(async () => {
  const feed = await generateAtomFeed({
    globs: [fileFromRoot("content/post/*")],
  })
  mkdir("public/post")
  writeFile("public/post/feed.xml", feed)
})()
