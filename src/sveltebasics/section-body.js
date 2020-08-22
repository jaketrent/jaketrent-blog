import React from "react"

import Video from "./video"

const PreviewVideo = props => (
  <Video width="560" height="315" src={props.src} title={props.title} />
)

export default props => (
  <div className="sectionBody">
    <p>{props.children}</p>
    {props.src && <PreviewVideo {...props} />}
    <style jsx>{`
      .sectionPicture {
        width: 100%;
        height: 100%;
      }
      @media screen and (min-width: 769px) {
        .sectionBody {
          padding-left: 80px;
        }
      }
    `}</style>
  </div>
)
