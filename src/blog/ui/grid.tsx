import css from "./grid.module.css"

export function GridAnimated() {
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
            <div>
              <div className={css.dot}></div>
              <div className={css.dot}></div>
              <div className={css.dot}></div>
              <div className={css.dot}></div>
              <div className={css.dot}></div>
              <div className={css.dot}></div>
              <div className={css.dot}></div>
            </div>
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
