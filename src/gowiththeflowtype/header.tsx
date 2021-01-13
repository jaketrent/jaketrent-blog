import React from "react"

import { transparentize } from "polished"

import vars from "./vars"

const Curl = _ => (
  <svg
    aria-hidden={true}
    viewBox="0 0 100 60"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.65 54.28h79.293S73.816 7.797 8.374 6.574c0 0 55.213 24.826 4.277 47.704z"
      fill="#99cfda"
    />
    <path
      d="M12.65 54.28H96S81.873 9.566 17.415 7.055c0 0 46.172 24.345-4.764 47.223z"
      fill="#379fb7"
    />
    <style jsx>{`
      position: relative;
      bottom: -6px;
      height: 2em;
    `}</style>
  </svg>
)

const HeaderWaves = _ => (
  <svg viewBox="0 0 1764 299" xmlns="http://www.w3.org/2000/svg">
    <path
      className="curve1"
      d="M0 138.658s125.34 31.224 288.654 35.36c213.266 5.402 485.238-88.05 761.856-86.417C1327.13 89.233 1764 252.162 1764 252.162V299H0V138.658z"
    />
    <path
      className="curve2"
      d="M0 140.484S206.655 17.802 369.421 22.696c298.776 8.983 562.612 257.006 894.319 255.28 331.7-1.727 494.34-139.224 500.26-139.224 5.92 0 0 160.248 0 160.248H0V140.484z"
    />
    <style jsx>{`
      position: relative;
      bottom: -6px;
      width: 100%;
      .curve1 {
        fill: ${transparentize(0.5, vars.colors.green)};
      }
      .curve2 {
        fill: ${transparentize(0.5, vars.colors.blue)};
      }
    `}</style>
  </svg>
)

const Trial = _ => (
  <div>
    <div className="banner">
      <a className="btn" href="http://bit.ly/jaketrent-flowtype-course">
        <svg
          role="img"
          aria-label="play icon"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="icon"
        >
          <path d="M6 21l14-9L6 3" />
        </svg>
        Watch the Course
      </a>
      <div className="trial">with a free 10-day Pluralsight trial</div>
    </div>
    <style jsx>{`
      .banner {
        display: flex;
        align-items: center;
        margin-top: ${vars.layout.spacingLarge};
      }
      .icon {
        height: 16px;
        margin-right: ${vars.layout.spacingXXSmall};
      }
      .btn {
        display: inline-flex;
        align-items: center;
        margin-right: ${vars.layout.spacingSmall};
        padding: ${vars.layout.spacingXXSmall} ${vars.layout.spacingSmall};
        border-radius: 4px;
        background: ${vars.colors.blue};
        color: ${vars.colors.white}
        text-shadow: 1px 1px 0 ${vars.colors.grayDark};
        text-decoration: none;
        line-height: ${vars.type.lineHeightStandard};
        white-space: nowrap;
      }
      .btn:hover {
        background: ${vars.colors.blueDark};
      }
      .trial {
        display: inline-block;
      }
      @media screen and (min-width: 769px) {
        .banner {
          display: block;
        }
      }
      @media screen and (min-width: 1024px) {
        .banner {
          display: flex;
        }
      }
    `}</style>
  </div>
)

export default _ => (
  <header>
    <div className="grid">
      <Trial />
      <h1 className="title">
        <a className="title-link" href="/gowiththeflowtype/">
          Go with the
          <Curl />
          <div className="big">FlowType</div>{" "}
        </a>
      </h1>
    </div>
    <HeaderWaves />
    <style jsx>{`
      .grid {
        display: grid;
        grid-template-columns: 1fr;
        padding: 0 ${vars.layout.spacingLarge};
        max-width: 1200px;
        margin: 0 auto;
      }
      .title {
        margin-top: ${vars.layout.spacingLarge};
        font-size: 1.5rem;
        line-height: 1.5rem;
        text-transform: uppercase;
      }
      .title-link {
        color: inherit;
        text-decoration: none;
      }
      .big {
        font-size: 2.5em;
        line-height: 1.25em;
      }
      @media screen and (min-width: 769px) {
        .grid {
          grid-template-columns: 1fr 1fr;
          gap: ${vars.layout.spacingXLarge};
        }
        .title {
          margin-top: ${vars.layout.spacingXXLarge};
          font-size: 2rem;
          line-height: 2rem;
        }
      }
      @media screen and (min-width: 1441px) {
        .title {
          margin-top: calc(2 * ${vars.layout.spacingXXLarge});
          font-size: 1.75rem;
          line-height: 1.75rem;
        }
      }
    `}</style>
  </header>
)
