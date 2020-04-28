import React from "react"

export default _ => (
  <div className="trial">
    <div className="container">
      <a className="link" href="http://bit.ly/pluralsight-trial">
        Try Pluralsight
      </a>
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
      .link {
        text-overflow: hidden;
        border-bottom: none;
        border-radius: 3px;
        background-color: #61dafb;
        padding: 1em 1.75em;
        width: 100%;
        font-size: 1.25em;
        text-transform: uppercase;
        text-shadow: -1px -1px 0 blue;
        font-family: 'Libre Franklin', sans-serif;
        margin: 0 auto;
        white-space: nowrap;
      }
      .link:hover {
        background-color: #4ed6fb;
        color: #f5f5f5;
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
