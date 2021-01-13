import React from "react"

export default props => (
  <div className="section">
    {props.children}
    <style jsx>{`
      .section {
        padding: 35px 10px 30px 10px;
        width: 100%;
      }
      @media screen and (min-width: 769px) {
        .section {
          flex: 1;
          min-width: 50%;
        }
      }
    `}</style>
  </div>
)
