import React from "react"

import vars from "./vars"

const Arrow = _ => (
  <svg
    role="img"
    aria-label="caret right icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M16 12l-5-5-1.41 1.41L13.17 12l-3.58 3.59L11 17" />
    <style jsx>{`
      height: 100%;
      width: 100%;
      fill: currentColor;
    `}</style>
  </svg>
)

export default props => (
  <a href={props.href} className="link">
    {props.children}
    <span className="arrow">
      <Arrow />
    </span>
    <style jsx>{`
      .link {
        display: inline-block;
        margin-right: ${vars.layout.spacingXLarge};
        position: relative;
        font-size: 1.125rem;
      }
      .arrow {
        position: absolute;
        top: 3px;
        right: -24px;
        height: 24px;
        width: 24px;
      }
    `}</style>
  </a>
)
