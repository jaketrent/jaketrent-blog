import React from "react"

import Link from "./link"

export default _ => (
  <div className="trial">
    <div className="container">
      <Link href="http://bit.ly/pluralsight-trial">Try Pluralsight</Link>
      <p className="caption">free for 10 days</p>
    </div>
    <style jsx>{`
      .container {
        display: inline-block;
        overflow: hidden;
        max-width: 100%;
        margin: auto;
      }
      .trial {
        text-align: center;
      }
      .caption {
        margin: 0.675em;
        text-align: center;
        font-size: 0.675em;
      }
      @media screen and (min-width: 426px) {
      }
      @media screen and (min-width: 769px) {
        .trial {
          text-align: left;
          margin: 25% 0;
        }
      }
      @media screen and (min-width: 1441px) {
        
    `}</style>
  </div>
)
