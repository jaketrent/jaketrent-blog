import { css } from "astroturf"
import { graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"
import React from "react"

export const query = graphql`
  query {
    course: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: "Course" } } }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            image
            landingPage
          }
        }
      }
    }
    post: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { layout: { eq: "post" } } }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            image
          }
          fields {
            slug
          }
        }
      }
    }
    talk: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: "Talk" } } }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            image
          }
          fields {
            slug
          }
        }
      }
    }
    book: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: "Book" } } }
      limit: 3
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
            image
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
export default function IndexPage(props) {
  return (
    <>
      <Helmet>
        <meta charset="utf-8" />
        <title>Jake Trent</title>
        <meta
          name="description"
          content="Jibber jabber on tech topics around code, productivity, &amp; leadership."
        />
        <meta
          name="keywords"
          content="Jake Trent, jaketrent, tech, code, leadership"
        />
        <meta
          name="author"
          content="https://plus.google.com/115032056022257436849"
        />
        <meta
          name="copyright"
          content="http://creativecommons.org/licenses/by/3.0/us/"
        />
        <meta
          name="google-site-verification"
          content="uvx7BhaUTNz29nQgydsFPRsErfqYBhPEV_svnHvW7H0"
        />

        <meta name="HandheldFriendly" content="True" />
        <meta name="MobileOptimized" content="320" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
        <link
          href="/index.xml"
          rel="alternate"
          title="Jake Trent"
          type="application/rss+xml"
        />

        <link rel="preload" href="/type/gobold-regular.otf" as="font" />
      </Helmet>

      <main class="home-main">
        <div class="home-sky">
          <div class="home-channel home-channel--first">
            <TopThreeCourses {...props} />
          </div>
          <div class="home-channel home-channel--second">
            <TopThreePosts {...props} />
          </div>
          <div class="home-channel home-channel--third">
            <TopThreeTalks {...props} />
          </div>
          <div class="home-channel home-channel--fourth">
            <TopThreeBooks {...props} />
          </div>
          <div class="home-logo">
            <img src="/img/logo.svg" alt="Jake Trent" />
          </div>
        </div>
        <div class="home-grid">
          <GridAnimated />
        </div>
      </main>
    </>
  )
}

function TopThreeCourses(props) {
  return (
    <>
      <h2 className="home-channel__title">
        <Link to="/course">Courses</Link>
        {props.data.course.edges.map(({ node }) => (
          <a href={node.frontmatter.landingPage} className="home-item__link">
            <span className="home-item__border">
              <img
                alt={node.frontmatter.title}
                class="home-item__img"
                src={node.frontmatter.image}
              />
            </span>
          </a>
        ))}
      </h2>
    </>
  )
}

function TopThreePosts(props) {
  return (
    <>
      <h2 className="home-channel__title">
        <Link to="/post">Posts</Link>
        {props.data.post.edges.map(({ node }) => (
          <Link to={node.fields.slug} className="home-item__link">
            <span className="home-item__border">
              <img
                alt={node.frontmatter.title}
                class="home-item__img"
                src={node.frontmatter.image}
              />
            </span>
          </Link>
        ))}
      </h2>
    </>
  )
}

function TopThreeTalks(props) {
  return (
    <>
      <h2 className="home-channel__title">
        <Link to="/talk">Talks</Link>
        {props.data.talk.edges.map(({ node }) => (
          <Link to={node.fields.slug} className="home-item__link">
            <span className="home-item__border">
              <img
                alt={node.frontmatter.title}
                class="home-item__img"
                src={node.frontmatter.image}
              />
            </span>
          </Link>
        ))}
      </h2>
    </>
  )
}

function TopThreeBooks(props) {
  return (
    <>
      <h2 className="home-channel__title">
        <Link to="/book">Reading</Link>
        {props.data.book.edges.map(({ node }) => (
          <Link to={node.fields.slug} className="home-item__link">
            <span className="home-item__border">
              <img
                alt={node.frontmatter.title}
                class="home-item__img"
                src={node.frontmatter.image}
              />
            </span>
          </Link>
        ))}
      </h2>
    </>
  )
}

function GridAnimated() {
  return (
    <div class="grid" aria-hidden="true">
      <div class="grid__horizon"></div>
      <div class="grid__deck">
        <div class="grid__grid-plane">
          <div class="grid__grid">
            <div class="grid__grid--vertical">
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
            </div>
            <div class="grid__dots">
              <div class="grid__dots__dot"></div>
              <div class="grid__dots__dot"></div>
              <div class="grid__dots__dot"></div>
              <div class="grid__dots__dot"></div>
              <div class="grid__dots__dot"></div>
              <div class="grid__dots__dot"></div>
              <div class="grid__dots__dot"></div>
            </div>
            <div class="grid__grid--horizontal">
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
              <div class="grid__grid__line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

