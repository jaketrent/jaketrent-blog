import React from "react"

export const parsePhraseLines = (phrase: string) => {
  return /\//.test(phrase) ? (
    <>
      {phrase.split("/").map(bit => (
        <div>{bit}</div>
      ))}
    </>
  ) : (
    phrase
  )
}
