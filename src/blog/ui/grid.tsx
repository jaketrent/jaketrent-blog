import { FC } from "react"

import css from "./grid.module.css"

interface GridProps {
  animated?: boolean
}
export const Grid: FC<GridProps> = props => {
  return (
    <div className={css.grid} aria-hidden="true">
      <div className={css.horizon}></div>
      <div className={css.deck}>
        <div className={css.plane}>
          <div className={css.lines}>
            <div className={css.linesVertical}>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
            </div>
            {props.animated && (
              <div>
                <div className={css.dot}></div>
                <div className={css.dot}></div>
                <div className={css.dot}></div>
                <div className={css.dot}></div>
                <div className={css.dot}></div>
                <div className={css.dot}></div>
                <div className={css.dot}></div>
              </div>
            )}
            <div className={css.linesHorizontal}>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
              <div className={css.line}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
