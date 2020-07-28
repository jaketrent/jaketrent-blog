import React from "react"

import vars from "./vars"

export default _ => (
  <style global jsx>{`
    * {
      box-sizing: border-box;
    }
    html,
    body {
      margin: 0;
      padding: 0;
      font-family: "Faustina", serif;
      background-color: #fff;
      color: ${vars.colors.blue};
      font-size: ${vars.type.fontSizeSmall};
      line-height: ${vars.type.lineHeightTight};
    }
    h1,
    h2,
    h3 {
      font-family: "Fjalla One", sans-serif;
      font-weight: 400;
      margin: 0;
    }
    a {
      display: inline-block;
      color: ${vars.colors.white};
      text-decoration: underline;
      text-decoration-style: wavy;
      cursor: pointer;
    }
    a:hover {
      color: ${vars.colors.yellow};
      text-decoration-style: solid;
    }
    svg {
      fill: currentColor;
    }
    ol {
      margin: 0;
      padding: 0;
    }
    p {
      line-height: 30px;
    }
    iframe {
      max-width: 100%;
    }
    @media screen and (min-width: 426px) {
    }
    @media screen and (min-width: 769px) {
      html,
      body {
        font-size: ${vars.type.fontSizeMedium};
        line-height: ${vars.type.lineHeightStandard};
      }
    }
    @media screen and (min-width: 1441px) {
      html,
      body {
        font-size: ${vars.type.fontSizeLarge};
        line-height: ${vars.type.lineHeightStandard};
      }
    }
  `}</style>
)
