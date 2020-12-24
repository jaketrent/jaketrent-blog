import React from "react"

export default props => (
  <div className="main">
    {props.children}
    <style jsx>{`
      .main {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
      }
    `}</style>
  </div>
)
