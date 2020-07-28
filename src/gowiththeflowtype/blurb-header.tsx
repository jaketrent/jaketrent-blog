import React from "react"

import vars from "./vars"

export default props => (
  <header>
    <h2>{props.children}</h2>
    <style jsx>{`
      h2 {
        color: ${vars.colors.blueDark};
      }
      @media screen and (min-width: 769px) {
        h2 {
          font-size: 1.75rem;
        }
      }
    `}</style>
  </header>
)
