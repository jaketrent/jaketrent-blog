import React from "react"

import { currentYear } from "../common/ui/date"
import vars from "./vars"

const Bubbles = _ => (
  <svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
    <circle cx="61.548" cy="102.061" r="18.94" />
    <circle cx="34.916" cy="161.062" r="11.062" />
    <circle
      cx="65.152"
      cy="200.855"
      r="3.604"
      transform="translate(-6.956 -6.12)"
    />
    <circle cx="36.845" cy="183.733" r="1.929" />
    <circle cx="67.933" cy="134.298" r="6.386" />
    <circle cx="61.588" cy="156.345" r="6.345" />
    <circle cx="35.006" cy="175.204" r="6.6" />
    <circle cx="56.956" cy="132.833" r="10.977" />
    <circle
      cx="59.252"
      cy="187.958"
      r="2.296"
      transform="translate(-6.956 -6.12)"
    />
    <circle
      cx="71.126"
      cy="188.855"
      r="3.193"
      transform="translate(-13.342 -3.825)"
    />
    <circle
      cx="71.126"
      cy="188.855"
      r="3.193"
      transform="translate(-19.26 19.76)"
    />
    <circle
      cx="71.126"
      cy="188.855"
      r="3.193"
      transform="matrix(.82692 0 0 .82692 -4.309 62.306)"
    />
    <circle cx="45.803" cy="114.601" r="4.197" />
    <circle cx="38.306" cy="136.133" r="3.3" />
    <circle cx="51.867" cy="145.678" r="1.867" />
    <style jsx>{`
      position: absolute;
      bottom: -150px;
      right: 0;
      height: 500px;
      fill: ${vars.colors.blueGreen};
    `}</style>
  </svg>
)
const Footer = () => (
  <div>
    <svg
      className="curve"
      viewBox="0 0 1200 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 57.756c229.371-16.442 349.236 15.983 435.531 14.827 65.209-.874 394.428-47.929 529.092-36.359C1099.29 47.794 1200 75.38 1200 75.38V100H0" />
    </svg>
    <footer className="footer">
      <Bubbles />
      <div className="footer-body">
        <div>
          <p className="footer-invite">
            Check out some of my other tech shenanigans by visiting my{" "}
            <a href="https://github.com/jaketrent">Github</a> or by going to:{" "}
          </p>
          <a className="footer-invite-link" href="/">
            jaketrent.com
          </a>
        </div>
        <div>
          <div className="copyright">
            Course &copy; {currentYear()} Pluralsight; this page &copy;{" "}
            {currentYear()} Jake Trent <br />
            This content uses affiliate links.
          </div>
        </div>
      </div>
    </footer>
    <style jsx>{`
      a:hover {
        color: ${vars.colors.yellow};
      }
      .footer {
        position: relative;
        z-index: 1;
        overflow: hidden;
        background: ${vars.colors.blue};
        color: ${vars.colors.white};
      }
      .curve {
        width: 100%;
        fill: ${vars.colors.blue};
        background: ${vars.colors.blueGreen};
        margin-bottom: -8px;
      }
      .footer-body {
        position: relative;
        width: 1200px;
        max-width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: ${vars.layout.spacingLarge};
        margin: 0 auto;
        padding: ${vars.layout.spacingLarge};
      }
      .footer-invite-link {
        font: 0/0 a;
        text-shadow: none;
        color: transparent;
        background: url(/gowiththeflowtype/img/jaketrent-logo-white.png) center
          no-repeat;
        background-size: cover;
        height: 69.375px;
        width: 250px;
        border: 1px solid transparent;
        margin-bottom: ${vars.layout.spacingLarge};
      }
      .copyright {
        font-size: 0.75rem;
        line-height: 1.125rem;
      }
      @media screen and (min-width: 769px) {
        .footer-body {
          grid-template-columns: 1fr 1fr;
        }
        .copyright {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          height: 100%;
          text-align: right;
        }
      }
      @media screen and (min-width: 1261px) {
        .footer-body {
          padding: ${vars.layout.spacingLarge} 0;
        }
      }
    `}</style>
  </div>
)
export default Footer
