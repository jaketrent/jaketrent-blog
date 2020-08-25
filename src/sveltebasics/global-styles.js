import React from "react"

export default _ => (
  <style global jsx>{`
    * {
      box-sizing: border-box;
    }
    html,
    body {
      margin: 0;
      padding: 0;
      font-family: "Nunito Sans", sans-serif;
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
        font-size: 22px;
      }
    }
    @media screen and (min-width: 1441px) {
      html,
      body {
        font-size: 24px;
      }
    }
  `}</style>
)
