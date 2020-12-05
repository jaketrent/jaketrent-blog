import { Global, css } from "@emotion/core"

import React from "react"

export default () => (
  <Global
    styles={css`
      @font-face {
        font-family: "Artega Sans Condensed SC Thin";
        src: url("/christmas/Artegra_Sans-Condensed-SC-100-Thin.woff")
          format("woff");
      }
      @font-face {
        font-family: "Bourton Hand Drop Stripes B";
        src: url("/christmas/Bourton-Hand-Drop-Stripes-B.woff") format("woff");
      }
      :root {
        --colorsGreen: 119, 160, 71;
        --colorsRed: 212, 45, 47;
        --colorsPink: 199, 55, 95;
        --colorsTeal: 112, 143, 148;
        --colorsBlue: 174, 209, 217;
        --typeRegular: Artega Sans Condensed SC Thin, system-ui, sans-serif;
        --typeBold: Bourton Hand Drop Stripes B, system-ui, sans-serif;
      }
      * {
        box-sizing: border-box;
      }
      html,
      body {
        margin: 0;
        padding: 0;
        font-family: var(--typeRegular), sans-serif;
        background: #fff;
        color: #000;
        font-size: 16px;
      }
      h1,
      h2,
      h3 {
        margin: 0;
      }
      a {
        display: inline-block;
        text-decoration: none;
        cursor: pointer;
        transition: color 250ms;
      }
      a:hover {
        color: #61dafb;
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
          font-size: 18px;
        }
      }
      @media screen and (min-width: 1441px) {
        html,
        body {
          font-size: 24px;
        }
      }
    `}
  />
)
