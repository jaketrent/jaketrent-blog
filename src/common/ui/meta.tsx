import { FC } from "react"

interface MetaCommonProps {
  copyright?: string
  description?: string
  keywords?: string
  title?: string
}

export const MetaCommon: FC<MetaCommonProps> = props => {
  return (
    <>
      <meta charSet="utf-8" />
      <title>{props.title || "Jake Trent"}</title>
      <meta
        name="description"
        content={
          props.description ||
          "Jibber jabber on tech topics around code, productivity, &amp; leadership."
        }
      />
      <meta
        name="keywords"
        content={
          props.keywords || "Jake Trent, jaketrent, tech, code, leadership"
        }
      />
      <meta
        name="author"
        content="https://plus.google.com/115032056022257436849"
      />
      <meta
        name="copyright"
        content={
          props.copyright || "http://creativecommons.org/licenses/by/3.0/us/"
        }
      />
      <meta
        name="google-site-verification"
        content="uvx7BhaUTNz29nQgydsFPRsErfqYBhPEV_svnHvW7H0"
      />

      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  )
}

interface MetaTwitterProps {
  description: string
  image?: string
  title: string
}

export const MetaTwitter: FC<MetaTwitterProps> = (props: MetaTwitterProps) => {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:site" content="@jaketrent" />
      <meta name="twitter:creator" content="@jaketrent" />
      {props.image && <meta name="twitter:image" content={props.image} />}
    </>
  )
}

interface MetaFacebookProps {
  description: string
  image?: string
  title: string
  url: string
}

export const MetaFacebook: FC<MetaFacebookProps> = props => {
  return (
    <>
      <meta property="og:title" content={props.title} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content={props.url} />
      <meta property="og:description" content={props.description} />
      {props.image && <meta property="og:image" content={props.image} />}
    </>
  )
}
