import { FC } from "react"
import { Logo, Link, capitalize, pluralize } from "../../common/ui"

import { ButtonLink } from "./button"
import { formatHumanDate } from "../../common/ui/date"
import { Book } from "../data/books"
import { Content } from "../data/markdown"
import { Grid } from "./grid"
import { Post } from "../data/posts"
import css from "./post.module.css"

export const SiteTitle: FC = () => (
  <h2 className={css.siteTitle}>
    <Link href="/">
      <a>
        <Logo />
      </a>
    </Link>
  </h2>
)

interface MetaProps {
  content: Content
}
export const Meta: FC = ({ content }) => (
  <div className={css.meta}>
    <time
      pubdate="pubdate"
      dateTime={content.frontmatter.lastmod || content.frontmatter.date}
    >
      {formatHumanDate(content.frontmatter.date)}
      {content.frontmatter.lastmod &&
        ` | updated ${formatHumanDate(content.frontmatter.lastmod)}`}
    </time>
    <div>Read it, it'll be good</div>
    <div>By Jake Trent</div>
    <div>
      In{" "}
      <Link href={"/" + content.frontmatter.layout}>
        <a>{capitalize(pluralize(content.frontmatter.layout))}</a>
      </Link>
    </div>
    <div className={css.metaTags}>
      {content.frontmatter.tags && (
        <nav>
          {content.frontmatter.tags.map((tag, i, arr) => (
            <span key={tag}>
              <Link href={`/tags/${tag}`}>{tag}</Link>
              {i < arr.length - 1 ? ", " : ""}
            </span>
          ))}
        </nav>
      )}
    </div>
  </div>
)

interface ImageProps {
  post: Post
}
export const Image: FC = ({ post }) => (
  <div className={css.image}>
    {post.frontmatter.image && post.frontmatter.layout !== "talk" ? (
      <div className={css.imageContainer}>
        <img src={post.frontmatter.image} className={css.imageImg} />
      </div>
    ) : (
      <div className={css.imagePlaceholder}></div>
    )}
  </div>
)

interface ButtonsProps {
  content: Content
}
export const Buttons: FC = ({ content }) => {
  // TODO: permalink - attach to fetched Content
  const permalink = "https://jaketrent.com"
  return (
    <div className={css.markdownContainer}>
      <div>
        <ButtonLink
          vendor="twitter"
          href={`http://twitter.com/home?status=${content.frontmatter.title}%20${permalink}%20via%20@jaketrent`}
        >
          Share
        </ButtonLink>

        {content.frontmatter.affiliateUrl && (
          <ButtonLink vendor="amazon" href={content.frontmatter.affiliateUrl}>
            Buy
          </ButtonLink>
        )}

        {content.frontmatter.readUrl && (
          <ButtonLink href={content.frontmatter.readUrl}>Read</ButtonLink>
        )}
      </div>
    </div>
  )
}

interface FooterProps {
  content: Content
}
export const Footer: FC<FooterProps> = props => (
  <footer className={css.footer}>
    <div className={css.footerSky}></div>
    <Grid />
    <div className={css.footerContent}>
      <div id="disqus_thread"></div>

      <div className={css.footerDisclosures}>
        <Disclosures book={props.content} />
      </div>

      <ul className={css.footerList}>
        <li>
          {`if (!noted) { prose.licensed = '`}
          <a href="https://creativecommons.org/licenses/by/3.0/us/">
            CC 3.0 Attr
          </a>
          {`'; code.license = '`}
          <a href="https://opensource.org/licenses/MIT">MIT</a>
          {`'`}
        </li>
        <li>
          {`articles.map(a => ({ ...a, author: '`}
          <a href="https://keybase.io/jaketrent">Jake Trent</a>
          {`' }))`}
        </li>
        <li>
          {`on('contentLike', _ => `}
          <a href="http://twitter.com/jaketrent">Follow</a>
          {` || `}
          <a href="/index.xml">Feed</a>
          {`)`}
        </li>
        <li>
          {`on('bugFound', _ => `}
          <a href="https://github.com/jaketrent/jaketrent-blog/issues/new">
            Report
          </a>
          {`)`}
        </li>
        <li>
          {`if (agent.isRobot) follow(`}
          <a href="/sitemap.xml">Sitemap</a>
          {`)`}
        </li>
        <li>
          {`console.log(process.env.ENGINE) // "`}
          <a href="https://gatsbyjs.org">Gatsby</a>
          {`"`}
        </li>
      </ul>
    </div>
  </footer>
)

interface DisclosuresProps {
  book: Book
}
const Disclosures: FC<DisclosuresProps> = props => {
  if (!Array.isArray(props.book.frontmatter.disclosures)) return null

  return (
    <div className={css.footerDisclosures}>
      {props.disclosures.some(d => d === "no-connection") && (
        <p>
          Disclosure of Material Connection: I have not received any
          compensation for writing this post. I have no material connection to
          the brands, products, or services that I have mentioned. I am
          disclosing this in accordance with the Federal Trade Commission’s{" "}
          <a
            href="http://www.access.gpo.gov/nara/cfr/waisidx_03/16cfr255_03.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            16 CFR, Part 255
          </a>
          : “Guides Concerning the Use of Endorsements and Testimonials in
          Advertising.”
        </p>
      )}
      {props.disclosures.some(d => d === "affiliate") && (
        <p>
          Disclosure of Material Connection: Some of the links in the post above
          are “affiliate links.” This means if you click on the link and
          purchase the item, I will receive an affiliate commission. Regardless,
          I only recommend products or services I use personally and believe
          will add value to my readers. I am disclosing this in accordance with
          the Federal Trade Commission’s{" "}
          <a
            href="http://www.access.gpo.gov/nara/cfr/waisidx_03/16cfr255_03.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            16 CFR, Part 255
          </a>
          : “Guides Concerning the Use of Endorsements and Testimonials in
          Advertising.”
        </p>
      )}
      {props.disclosures.some(d => d === "free") && (
        <p>
          Disclosure of Material Connection: I received one or more of the
          products or services mentioned above for free in the hope that I would
          mention it on my blog. Regardless, I only recommend products or
          services I use personally and believe will be good for my readers. I
          am disclosing this in accordance with the Federal Trade Commission’s{" "}
          <a
            href="http://www.access.gpo.gov/nara/cfr/waisidx_03/16cfr255_03.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            16 CFR, Part 255
          </a>
          : “Guides Concerning the Use of Endorsements and Testimonials in
          Advertising.”
        </p>
      )}
      {props.disclosures.some(d => d === "sponsor") && (
        <p>
          Disclosure of Material Connection: This is a “sponsored post.” The
          company who sponsored it compensated me via a cash payment, gift, or
          something else of value to write it. Regardless, I only recommend
          products or services I use personally and believe will be good for my
          readers. I am disclosing this in accordance with the Federal Trade
          Commission’s{" "}
          <a
            href="http://www.access.gpo.gov/nara/cfr/waisidx_03/16cfr255_03.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            16 CFR, Part 255
          </a>
          : “Guides Concerning the Use of Endorsements and Testimonials in
          Advertising.”
        </p>
      )}
      {props.disclosures.some(d => d === "employee") && (
        <p>
          Disclosure of Material Connection: I am currently an employee of
          Pluralsight. Regardless, I only recommend books that I have personally
          read and believe will be good for my readers. I am disclosing this in
          accordance with the Federal Trade Commission’s{" "}
          <a
            href="http://www.access.gpo.gov/nara/cfr/waisidx_03/16cfr255_03.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            16 CFR, Part 255
          </a>
          : “Guides Concerning the Use of Endorsements and Testimonials in
          Advertising.”
        </p>
      )}
    </div>
  )
}
