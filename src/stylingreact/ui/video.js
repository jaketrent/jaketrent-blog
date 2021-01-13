import React from "react"

export default props => (
  <div className="video">
    <iframe
      title={props.title}
      width={props.width}
      height={props.height}
      src={props.src}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="frame"
    ></iframe>
    <style jsx>{`
      .video {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
      }
      .frame {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      }
    `}</style>
  </div>
)
