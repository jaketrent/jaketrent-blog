import React from "react"

export default _ => (
  <div className="buffer">
    <style jsx>{`
      .buffer {
        display: block;
        flex: none;
        height: 0;
        width: 100%;
        margin-top: 80px;
        padding-top: 80px;
        border-top: 1px solid white;
      }
      @media (min-width: 769px) {
        .buffer {
          height: 80px;
        }
      }
    `}</style>
  </div>
)
