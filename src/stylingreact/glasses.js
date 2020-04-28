import React from "react"

export default _ => (
  <div className="glasses">
    <img className="glassesImg" src="/stylingreact/img/glasses.png" />
    <style jsx>{`
      .glasses {
        position: absolute;
        z-index: 1;
        margin: 34% auto;
      }
      .glassesImg {
        width: 100%;
        animation: fall 5s 0.5s forwards;
        transform: translate3d(0, -500px, 0);
      }
      @keyframes fall {
        100% {
          transform: translate3d(0, 0, 0);
        }
      }
    `}</style>
  </div>
)
