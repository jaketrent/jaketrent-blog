import { useEffect } from "react"

import { ButtonLink } from "../../blog/ui/button"
import { Grid } from "../../blog/ui/grid"
import { BlogLayout } from "../../blog/ui/layout"
import { fetchPost, fetchAllPosts } from "../../blog/data/posts"
import { Image, Meta, SiteTitle } from "../../blog/ui/post"
import {
  Link,
  Logo,
  MetaFacebook,
  MetaTwitter,
  capitalize,
  pluralize,
} from "../../common/ui"
import css from "../../blog/ui/post.module.css"

// TODO: type
export const getStaticProps = async context => {
  const slug = context.params.slug
  const post = await fetchPost(slug)

  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths = () => {
  let posts = fetchAllPosts()
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false,
  }
}

const PostPage: FC = ({ post }) => {
  // TODO: fix
  // const permalink = props.data.site.siteMetadata.siteUrl + post.fields.slug
  const permalink = "jakepermalink"

  useEffect(() => {
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
      <SiteTitle />

      <main>
        <article>
          <header className={css.header}>
            <h1 className={css.title}>{post.frontmatter.title}</h1>
            <Meta content={post} />
          </header>

          <div className={css.striped}>
            <Image post={post} />

            <div className={`${css.contentContainer} ${css.markdownContainer}`}>
              {ad}
            </div>

            <div
              className={`${css.contentContainer} ${css.markdownContainer}`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>

            <div className={css.markdownContainer}>
              <div>
                <ButtonLink
                  vendor="twitter"
                  href={`http://twitter.com/home?status=${post.frontmatter.title}%20${permalink}%20via%20@jaketrent`}
                >
                  Share
                </ButtonLink>

                {post.frontmatter.affiliateUrl && (
                  <ButtonLink
                    vendor="amazon"
                    href={post.frontmatter.affiliateUrl}
                  >
                    Buy
                  </ButtonLink>
                )}

                {post.frontmatter.readUrl && (
                  <ButtonLink href={post.frontmatter.readUrl}>Read</ButtonLink>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="single-footer">
        <div className="single-footer__sky"></div>
        <Grid />
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

// TODO: extract
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

export default PostPage
