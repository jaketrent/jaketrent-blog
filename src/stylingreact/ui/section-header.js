import React from "react"

const renderIcon = props =>
  props.icon ? (
    <div className="icon">
      {props.icon}
      <style jsx>{`
        .icon {
          width: 80px;
          padding-right: 20px;
        }
        .icon :global(svg) {
          fill: #61dafb;
        }
      `}</style>
    </div>
  ) : null

export default props => (
  <div className="header">
    {renderIcon(props)}
    <h2 className="title">{props.children}</h2>
    <style jsx>{`
      .header {
        display: flex;
        align-items: center;
        font-size: 1.5em;
      }
      .title {
        text-transform: uppercase;
      }
      @media screen and (min-width: 769px) {
        .header {
          font-size: 1.125em;
        }
      }
    `}</style>
  </div>
)
