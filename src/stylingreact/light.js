import React from "react"

import { padding } from "./layout"

export default _ => (
  <div className="light">
    <style jsx>{`
      .light {
        position: absolute;
        top: 0;
        right: -10vw;
        height: 100%;
        width: calc(100% + 10vw + ${padding});
        background: url(/stylingreact/img/gradient.png) no-repeat top right;
      }
    `}</style>
  </div>
)
