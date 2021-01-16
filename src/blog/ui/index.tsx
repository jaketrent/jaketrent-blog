import { FC } from "react"

import { Content, Course, Post, Talk, Book } from "../data"
import { Link } from "../../common/ui"
import css from "./index.module.css"

export const Sky: FC = props => <div className={css.sky}>{props.children}</div>

export const Header: FC = props => (
  <header className={css.header}>{props.children}</header>
)

interface ChannelStatics {
  Title: typeof ChannelTitle
}
export const Channel: FC & ChannelStatics = props => (
  <div className={css.channel}>{props.children}</div>
)

// TODO: use optimized image
export const Logo: FC = () => (
  <h1 className={css.logo}>
    <img src="/img/logo.svg" alt="Jake Trent" />
  </h1>
)

export const GridContainer: FC = props => (
  <div className={css.grid}>{props.children}</div>
)

export const Tagline: FC = props => (
  <div className={css.tagline}>
    LEARN AND GROW <span className={css.taglineWith}>WITH</span>
  </div>
)
