import React from "react"

import vars from "./vars"

export default props => (
  <div className="content">
    {props.children}
    <style jsx>{`
      .content {
        position: relative;
        display: grid;
        grid-template-columns: 1fr;
        gap: ${vars.layout.spacingXLarge};
        width: 100%;
        padding: ${vars.layout.spacingLarge};
        color: ${vars.colors.grayDark};
        background: ${vars.colors.blueGreen};
      }
      @media screen and (min-width: 769px) {
        .content {
          grid-template-columns: 1fr 1fr;
          gap: ${vars.layout.spacingXLarge};
        }
      }
      @media screen and (min-width: 1261px) {
        .content {
          padding: ${vars.layout.spacingXLarge} calc((100vw - 1200px) / 2)
            ${vars.layout.spacingXLarge} calc((100vw - 1200px) / 2);
        }
      }
    `}</style>
  </div>
)
