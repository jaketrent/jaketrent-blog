import * as http from "http"

interface RequestOptions<T> {
  hostname: string
  path: string
  parse: (json: any) => T
}

// TODO: redo with got
export const request = async <T>(opts: RequestOptions<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: opts.hostname,
      port: 80,
      path: opts.path,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }

    const req = http.request(options, res => {
      res.setEncoding("utf8")
      let body = ""
      res.on("data", chunk => {
        body += chunk
      })
      res.on("end", () => {
        const json = JSON.parse(body)
        const results = opts.parse(json)
        resolve(results)
      })
    })

    req.on("error", e => {
      reject(e)
    })

    req.end()
  })
}
