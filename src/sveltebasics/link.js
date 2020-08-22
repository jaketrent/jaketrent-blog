import React from "react"

export default props => (
  <a className="link" {...props}>
    {props.children}
    <style jsx>{`
      .link {
        text-overflow: clip;
        border-bottom: none;
        border-radius: 3px;
        background-color: #61dafb;
        padding: 1em 1.75em;
        width: 100%;
        font-size: 1.25em;
        text-align: center;
        text-transform: uppercase;
        text-shadow: -1px -1px 0 blue;
        font-family: "Libre Franklin", sans-serif;
        margin: 0 auto;
        white-space: nowrap;
        transition: all 200ms;
      }
      .link:hover {
        background-color: #4ed6fb;
        color: #f5f5f5;
        transform: scale(0.99);
      }
    `}</style>
  </a>
)
