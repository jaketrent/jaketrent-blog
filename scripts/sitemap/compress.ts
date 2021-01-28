import * as fs from "fs"
import * as zlib from "zlib"
;["public"].forEach(dir => {
  fs.readdirSync(dir).forEach(file => {
    if (file.endsWith(".xml")) {
      // gzip
      const fileContents = fs.createReadStream(dir + "/" + file)
      const writeStream = fs.createWriteStream(dir + "/" + file + ".gz")
      const zip = zlib.createGzip()

      fileContents
        .pipe(zip)
        .on("error", err => console.error(err))
        .pipe(writeStream)
        .on("error", err => console.error(err))
    }
  })
})
