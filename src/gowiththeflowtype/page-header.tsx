import React from "react"

import vars from "./vars"

export default props => (
  <header>
    <h1>{props.children}</h1>
    <style jsx>{`
      h1 {
        color: ${vars.colors.blueDark};
        margin: 0 auto 0 auto;
        max-width: 1200px;
      }
      @media screen and (min-width: 769px) {
        h1 {
          font-size: 2.75rem;
          line-height: 2.75rem;
        }
      }
      @media screen and (min-width: 1200px) {
        padding-top: -5rem;
      }
    `}</style>
  </header>
)
