import { FC } from "react"

import { Content, Course, Post, Talk, Book } from "../data"
import { Link } from "../../common/ui"
import css from "./index.module.css"

export const Main: FC = props => (
  <main className={css.main}>{props.children}</main>
)

export const Sky: FC = props => <div className={css.sky}>{props.children}</div>

interface ChannelStatics {
  Title: typeof ChannelTitle
}
export const Channel: FC & ChannelStatics = props => (
  <div className={css.channel}>{props.children}</div>
)

interface ChannelTitleProps {
  href: string
}
const ChannelTitle: FC<ChannelTitleProps> = props => (
  <h2 className={css.channelTitle}>
    <Link href={props.href}>
      <a>{props.children}</a>
    </Link>
  </h2>
)
Channel.Title = ChannelTitle

// TODO: use optimized image
export const Logo: FC = () => (
  <div className={css.logo}>
    <img src="/img/logo.svg" alt="Jake Trent" />
  </div>
)

export const GridContainer: FC = props => (
  <div className={css.grid}>{props.children}</div>
)

interface ItemProps {
  content: Course | Post | Talk | Book
}
// TODO: use optimized image
export const Item: FC<ItemProps> = props => (
  <span className={css.itemBorder}>
    <img
      alt={props.content.frontmatter.title}
      className={css.itemImg}
      src={props.content.frontmatter.image}
    />
  </span>
)

interface CourseLinkProps {
  course: Course
}
export const CourseLink: FC<CourseLinkProps> = props => (
  <a href={props.course.frontmatter.landingPage} className={css.itemLink}>
    {props.children}
  </a>
)

interface InternalLinkProps {
  content: Content
}
export const InternalLink: FC<ItemProps> = props => (
  <Link href={props.content.path}>
    <a className={css.itemLink}>{props.children}</a>
  </Link>
)
