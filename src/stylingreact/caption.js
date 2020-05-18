import React from "react"

export default _ => (
  <div className="caption">
    <div className="tagline">
      Decide How You'll Style Your React Project
      <div className="updated">Updated for 2020!</div>
    </div>
    <style jsx>{`
      .caption {
        padding: 40px 0 15px 0;
        border-top: 1px solid #fff;
        text-transform: uppercase;
      }
      .updated {
        display: inline-block;
        background: #61dafb;
        margin-left: 2rem;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 3px;
        text-shadow: -1px -1px 0 rgba(0, 0, 255, 0.5);
        font-size: 0.7rem;
      }
      .tagline {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3em;
        letter-spacing: 1px;
      }
    `}</style>
  </div>
)
