import React from "react"
import { graphql, Link } from "gatsby"

import BlogLayout from "../ui/blog-layout"
import MetaFacebook from "../ui/meta-facebook"
import MetaTwitter from "../ui/meta-twitter"
import Logo from "../ui/logo"

export default function PostPage(props) {
  const post = props.data.markdownRemark
  const permalink = props.data.site.siteMetadata.siteUrl + post.fields.slug

  React.useEffect(() => {
    setTimeout(() => {
      if (window && window.hljs) window.hljs.initHighlighting()
    }, 55)
  })

  const ad = null
  // (
  // <div className="single-article__ad">
  //   <iframe
  //     id="$iradid"
  //     src="//a.impactradius-go.com/gen-ad-code/1200557/871605/7490/"
  //     width="251"
  //     height="251"
  //     scrolling="no"
  //     frameborder="0"
  //     marginheight="0"
  //     marginwidth="0"
  //   ></iframe>
  // </div>
  // )

  return (
    <BlogLayout
      title={post.frontmatter.title + " | Jake Trent"}
      desciption={post.frontmatter.description}
      keywords={
        !!post.frontmatter.metaKeywords
          ? post.frontmatter.metaKeywords
          : Array.isArray(post.frontmatter.tags)
          ? post.frontmatter.tags.join(",")
          : ""
      }
      head={[
        ...MetaFacebook({
          description: post.frontmatter.description,
          image: post.frontmatter.image,
          title: post.frontmatter.title,
          url: permalink,
        }),
        ...MetaTwitter({
          description: post.frontmatter.description,
          image: post.frontmatter.image,
          title: post.frontmatter.title,
        }),

        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.9.0/highlight.min.js"
          key="hljs"
        ></script>,

        <script src="/js/disqusloader.js" key="discscript"></script>,
        <script key="discstart">
          {`setTimeout(() => { disqusLoader('#disqus_thread', { scriptUrl: '//jaketrent.disqus.com/embed.js' }) }, 55) `}
        </script>,
      ]}
    >
      <h2 className="single__header">
        <Link to="/">
          <Logo />
        </Link>
      </h2>

      <main>
        <article className="single-article">
          <header className="single-article__header">
            <h1 className="single-article__title">{post.frontmatter.title}</h1>
            <div className="single-article__meta">
              <time
                className="single-article__meta--date"
                pubdate="pubdate"
                dateTime="{{ default .Date .Lastmod }}"
              >
                {post.frontmatter.date}
                {post.frontmatter.lastmod &&
                  ` | updated ${post.frontmatter.lastmod}`}
              </time>
              <div>{post.timeToRead} min read</div>
              <div>By Jake Trent</div>
              <div>
                In{" "}
                <Link to={"/" + post.frontmatter.layout}>
                  {capitalize(pluralize(post.frontmatter.layout))}
                </Link>
              </div>
              <div className="single-article__meta--tags">
                {post.frontmatter.tags && (
                  <nav>
                    {post.frontmatter.tags.map((tag, i, arr) => (
                      <span key={tag}>
                        <Link to={`/tags/${tag}`}>{tag}</Link>
                        {i < arr.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </nav>
                )}
              </div>
            </div>
          </header>

          <div className="single-article__read">
            <div className="single-article__image">
              {post.frontmatter.image && post.frontmatter.layout !== "talk" ? (
                <div className="single-article__image__container">
                  <img
                    src={post.frontmatter.image}
                    className="single-article__image__img"
                  />
                </div>
              ) : (
                <div className="single-article__image__placeholder"></div>
              )}
            </div>
            <div className="single-article__content markdown-content">{ad}</div>

            <div
              className="single-article__content markdown-content"
              dangerouslySetInnerHTML={{ __html: post.html }}
            ></div>
            <div className="markdown-content">
              <div>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  className="btn btn--twitter"
                  href={`http://twitter.com/home?status=${post.frontmatter.title}%20${permalink}%20via%20@jaketrent`}
                >
                  <svg
                    className="btn__icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 300.00006 244.18703"
                  >
                    <g transform="translate(-539.18 -568.86)">
                      <path d="m633.9 812.04c112.46 0 173.96-93.168 173.96-173.96 0-2.6463-0.0539-5.2806-0.1726-7.903 11.938-8.6302 22.314-19.4 30.498-31.66-10.955 4.8694-22.744 8.1474-35.111 9.6255 12.623-7.5693 22.314-19.543 26.886-33.817-11.813 7.0031-24.895 12.093-38.824 14.841-11.157-11.884-27.041-19.317-44.629-19.317-33.764 0-61.144 27.381-61.144 61.132 0 4.7978 0.5364 9.4646 1.5854 13.941-50.815-2.5569-95.874-26.886-126.03-63.88-5.2508 9.0354-8.2785 19.531-8.2785 30.73 0 21.212 10.794 39.938 27.208 50.893-10.031-0.30992-19.454-3.0635-27.69-7.6468-0.009 0.25652-0.009 0.50661-0.009 0.78077 0 29.61 21.075 54.332 49.051 59.934-5.1376 1.4006-10.543 2.1516-16.122 2.1516-3.9336 0-7.766-0.38716-11.491-1.1026 7.7838 24.293 30.355 41.971 57.115 42.465-20.926 16.402-47.287 26.171-75.937 26.171-4.929 0-9.7983-0.28036-14.584-0.84634 27.059 17.344 59.189 27.464 93.722 27.464" />
                    </g>
                  </svg>
                  <span className="btn__label">Share</span>
                </a>

                {post.frontmatter.affiliateUrl && (
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    class="btn btn--amazon"
                    href={post.frontmatter.affiliateUrl}
                  >
                    <svg
                      class="btn__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 26.617 26.617"
                    >
                      <path d="M.148 19.79c-.1-.077-.148-.148-.148-.215 0-.043.015-.082.048-.115.055-.065.12-.1.197-.1.066 0 .14.024.215.07 1.847 1.046 3.88 1.865 6.11 2.456 2.225.592 4.532.887 6.915.887 1.516 0 3.06-.135 4.635-.405 1.574-.27 3.147-.684 4.715-1.244.11-.043.22-.083.33-.115.11-.04.23-.08.35-.14.11-.05.22-.06.33-.04.11.02.19.07.234.15.03.05.05.11.06.18 0 .13-.07.23-.2.31-.18.13-.37.25-.56.35-.2.1-.38.21-.56.32-1.42.76-2.99 1.34-4.69 1.72-1.71.38-3.36.57-4.96.57-2.54 0-4.92-.41-7.12-1.24-2.21-.83-4.18-1.97-5.92-3.43zM15.62 7.506c0-.324-.003-.657-.016-1.002-.012-.344-.115-.65-.312-.917-.18-.256-.41-.44-.698-.55-.288-.11-.572-.168-.86-.168h-.215c-.5.04-.95.19-1.35.45-.41.26-.67.65-.79 1.17-.02.11-.07.21-.15.31-.08.09-.18.16-.31.21l-2.71-.34c-.11-.03-.22-.08-.32-.15-.11-.08-.14-.2-.09-.38.15-.72.42-1.33.8-1.82.38-.49.84-.89 1.36-1.2.52-.31 1.1-.54 1.72-.69.61-.15 1.24-.24 1.86-.29h.58c.69 0 1.43.092 2.22.282.79.19 1.47.53 2.05 1.02.34.29.592.614.765.956.17.342.285.702.352 1.08.063.372.1.77.1 1.18v5.456c0 .633.11 1.12.324 1.47.22.342.464.67.73.98.085.106.13.22.13.34 0 .12-.056.22-.16.306-.275.24-.63.52-1.06.84-.433.32-.794.602-1.08.843-.2.125-.445.136-.73.03-.46-.365-.77-.65-.95-.85l-.68-.79c-.456.43-.895.78-1.326 1.035-.43.256-.875.45-1.33.576-.605.123-1.28.19-2.02.19-1.174 0-2.16-.334-2.95-.99-.793-.66-1.19-1.65-1.19-2.97 0-1.09.27-2 .816-2.73.543-.73 1.27-1.275 2.19-1.64.47-.2.97-.36 1.5-.46.533-.11 1.09-.197 1.667-.26.382-.047.746-.08 1.095-.1.35-.02.68-.06.984-.1V7.5h.003zm0 2.518c-.36 0-.725.01-1.083.032-.357.023-.697.068-1.018.135-.59.18-1.09.46-1.51.84-.42.38-.63.94-.63 1.67 0 .59.15 1.06.46 1.42.31.36.73.54 1.27.54.08 0 .16-.01.23-.02.06-.01.12-.02.16-.02.69-.15 1.22-.55 1.57-1.18.32-.48.48-.94.5-1.38.02-.44.02-.92.02-1.45v-.55zm9.125 13.31c-.115.11-.22.143-.316.1-.1-.045-.12-.133-.08-.264l.31-.758c.12-.31.23-.614.33-.916.1-.302.17-.576.2-.825.03-.24 0-.42-.09-.53-.13-.17-.43-.27-.89-.29h-.28c-.38 0-.75.02-1.13.05-.2.05-.39.07-.58.07-.183 0-.355.03-.51.07-.13 0-.207-.04-.23-.11-.02-.07.033-.16.166-.25.347-.22.73-.4 1.16-.54.39-.08.777-.14 1.16-.18.246-.02.47-.03.68-.03.15 0 .31.01.46.02.37.03.67.06.905.12.238.058.396.118.48.18.02.04.046.1.07.17s.04.168.04.27v.14c0 .22-.04.49-.13.806-.082.32-.2.64-.34.965-.14.33-.33.65-.563.97-.24.32-.52.59-.83.81z" />
                    </svg>
                    <span class="btn__label">Buy</span>
                  </a>
                )}

                {post.frontmatter.readUrl && (
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    class="btn btn--read"
                    href={post.frontmatter.readUrl}
                  >
                    <svg
                      class="btn__icon"
                      viewbox="0 0 48 48"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23 48.049a.996.996 0 0 1-.43-.097l-21-10a1 1 0 0 1-.57-.903v-31a1.002 1.002 0 0 1 1.43-.903L23 14.941l20.57-9.796a1 1 0 0 1 1.43.904v31a1 1 0 0 1-.57.903l-21 10a.996.996 0 0 1-.43.097zM3 36.417l20 9.524 20-9.524V7.633l-19.57 9.319a1.002 1.002 0 0 1-.859 0L3 7.633v28.784z" />
                      <path d="M23 12.204L5.567 3.903a1 1 0 0 1 .86-1.807L23 9.989l16.573-7.893a1 1 0 0 1 .86 1.807L23 12.204zM22 16.049h2v31h-2z" />
                    </svg>
                    <span class="btn__label">Read</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="single-footer">
        <div className="single-footer__sky"></div>
        <div className="grid" aria-hidden="true">
          <div className="grid__horizon"></div>
          <div className="grid__deck">
            <div className="grid__grid-plane">
              <div className="grid__grid">
                <div className="grid__grid--vertical">
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                </div>
                <div className="grid__grid--horizontal">
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                  <div className="grid__grid__line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="single-footer__content">
          <div id="disqus_thread"></div>

          <div className="single-footer__disclosures">
            <Disclosures disclosures={post.frontmatter.disclosures} />
          </div>

          <ul className="single-footer__list">
            <li className="single-footer__list__item">
              {`if (!noted) { prose.licensed = '`}
              <a href="https://creativecommons.org/licenses/by/3.0/us/">
                CC 3.0 Attr
              </a>
              {`'; code.license = '`}
              <a href="https://opensource.org/licenses/MIT">MIT</a>
              {`'`}
            </li>
            <li className="single-footer__list__item">
              {`articles.map(a => ({ ...a, author: '`}
              <a href="https://keybase.io/jaketrent">Jake Trent</a>
              {`' }))`}
            </li>
            <li className="single-footer__list__item">
              {`on('contentLike', _ => `}
              <a href="http://twitter.com/jaketrent">Follow</a>
              {` || `}
              <a href="/index.xml">Feed</a>
              {`)`}
            </li>
            <li className="single-footer__list__item">
              {`on('bugFound', _ => `}
              <a href="https://github.com/jaketrent/jaketrent-blog/issues/new">
                Report
              </a>
              {`)`}
            </li>
            <li className="single-footer__list__item">
              {`if (agent.isRobot) follow(`}
              <a href="/sitemap.xml">Sitemap</a>
              {`)`}
            </li>
            <li className="single-footer__list__item">
              {`console.log(process.env.ENGINE) // "`}
              <a href="https://gatsbyjs.org">Gatsby</a>
              {`"`}
            </li>
          </ul>
        </div>
      </footer>
    </BlogLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "D MMM YYYY")
        lastmod(formatString: "D MMM YYYY")
        image
        tags
        title
        description
        metaKeywords
        affiliateUrl
        readUrl
        disclosures
        layout
      }
      fields {
        slug
      }
      timeToRead
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

type DisclosureType =
  | "no-connection"
  | "affiliate"
  | "free"
  | "sponsor"
  | "employee"
interface DisclosuresProps {
  disclosures: DisclosureType[]
}
function Disclosures(props) {
  if (!Array.isArray(props.disclosures)) return null

  return (
    <div className="single-footer__disclosures">
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
        <p className="disclosures__notice">
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

function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1)
}

function pluralize(str: string): string {
  return str + "s"
}
