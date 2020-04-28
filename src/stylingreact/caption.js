import React from "react"

export default _ => (
  <div className="caption">
    <p>A comparison of CSS approaches in React</p>
    <style jsx>{`
      .caption {
        text-align: center;
        font-size: 1.3em;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 40px 0 15px 0;
        border-top: 1px solid #fff;
      }
      p {
        margin: 0;
      }
    `}</style>
  </div>
)
