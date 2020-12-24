import { FC } from "react"

interface MetaCommonProps {
  copyright?: string
  description?: string
  keywords?: string
  title?: string
}

export const MetaCommon: FC<MetaCommonProps> = props => {
  return [
    <meta charSet="utf-8" key="char" />,
    <title key="title">{props.title || "Jake Trent"}</title>,
    <meta
      key="desc"
      name="description"
      content={
        props.description ||
        "Jibber jabber on tech topics around code, productivity, &amp; leadership."
      }
    />,
    <meta
      key="keywords"
      name="keywords"
      content={
        props.keywords || "Jake Trent, jaketrent, tech, code, leadership"
      }
    />,
    <meta
      key="author"
      name="author"
      content="https://plus.google.com/115032056022257436849"
    />,
    <meta
      key="copyright"
      name="copyright"
      content={
        props.copyright || "http://creativecommons.org/licenses/by/3.0/us/"
      }
    />,
    <meta
      key="verify"
      name="google-site-verification"
      content="uvx7BhaUTNz29nQgydsFPRsErfqYBhPEV_svnHvW7H0"
    />,

    <meta key="handheld" name="HandheldFriendly" content="True" />,
    <meta key="mobile" name="MobileOptimized" content="320" />,
    <meta
      key="viewport"
      name="viewport"
      content="width=device-width, initial-scale=1"
    />,
  ]
}

interface MetaTwitterProps {
  description: string
  image?: string
  title: string
}

export const MetaTwitter: FC<MetaTwitterProps> = (props: MetaTwitterProps) => {
  return [
    <meta name="twitter:card" content="summary_large_image" key="twitcard" />,
    <meta name="twitter:title" content={props.title} key="twittitle" />,
    <meta
      name="twitter:description"
      content={props.description}
      key="twitdesc"
    />,
    <meta name="twitter:site" content="@jaketrent" key="twitsite" />,
    <meta name="twitter:creator" content="@jaketrent" key="twitcreator" />,
    props.image && (
      <meta name="twitter:image" content={props.image} key="twitimg" />
    ),
  ]
}

interface MetaFacebookProps {
  description: string
  image?: string
  title: string
  url: string
}

export const MetaFacebook: FC<MetaFacebookProps> = props => {
  return [
    <meta property="og:title" content={props.title} key="ogtitle" />,
    <meta property="og:type" content="article" key="ogtype" />,
    <meta property="og:url" content={props.url} key="ogurl" />,
    <meta property="og:description" content={props.description} key="ogdesc" />,
    props.image && (
      <meta property="og:image" content={props.image} key="ogimg" />
    ),
  ]
}
