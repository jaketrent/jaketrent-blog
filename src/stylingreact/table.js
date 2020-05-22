import React from "react"

import ListItem from "./list-item"

export default _ => (
  <div className="table">
    <ListItem
      name="What React Has Done for Styling"
      time="8m"
      link="https://bit.ly/jaketrent-react-styling-toc3"
    />
    <ListItem
      name="A Catalogue of Styling Techniques"
      time="12m"
      link="https://bit.ly/jaketrent-react-styling-toc3"
    />
    <ListItem
      name="Comparing Styling with Examples"
      time="30m"
      link="https://bit.ly/jaketrent-react-styling-toc3"
    />
    <ListItem
      name="Potential Project Configurations for CSS in React"
      time="16m"
      link="https://bit.ly/jaketrent-react-styling-toc3"
    />
    <div className="totalContainer">
      <p className="total">Total Time</p>
      <p className="time">66m</p>
    </div>
    <style jsx>{`
      .totalContainer {
        display: flex;
        justify-content: flex-end;
        margin: 2em 0 0 0;
      }
      .total {
        margin: 0 1em 0 0;
      }
      .time {
        margin: 0 0 0 2em;
      }
    `}</style>
  </div>
)
