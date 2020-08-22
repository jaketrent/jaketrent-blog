import React from "react"

export default props => (
  <div className="listItem">
    <a className="link" href={props.link}>
      {props.name}
    </a>
    <p className="time">{props.time}</p>
    <style jsx>{`
      .listItem {
        display: flex;
        justify-content: space-between;
        margin: .8em 0;
      }
      .time {
        margin: 0;
      }
      .link:hover {
        background: #61dafb;
        color: #fff;
        text-shadow: -1px -1px 0 blue;
      }
    }
    `}</style>
  </div>
)
