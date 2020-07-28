import React from "react"

import ArrowLink from "../../gowiththeflowtype/arrow-link"
import BlurbHeader from "../../gowiththeflowtype/blurb-header"
import ContentGrid from "../../gowiththeflowtype/content-grid"
import Footer from "../../gowiththeflowtype/footer"
import GlobalStyles from "../../gowiththeflowtype/global-styles"
import Head from "../../gowiththeflowtype/head"
import Header from "../../gowiththeflowtype/header"
import vars from "../../gowiththeflowtype/vars"

const Blurb = props => (
  <article>
    <BlurbHeader>{props.title}</BlurbHeader>
    <p>{props.children}</p>
    {props.footer}
  </article>
)

const Editor = props => (
  <article>
    <div className="grid">
      <a href={props.href}>
        <img alt={props.title + " logo"} className="img" src={props.img} />
      </a>
      <div>
        <BlurbHeader>
          <a href={props.href}>{props.title}</a>
        </BlurbHeader>
        <p>{props.children}</p>
        <div>
          {props.instructions ? (
            props.instructions.map((inst, i) => (
              <ArrowLink key={inst} href={inst}>
                Notes #{i}
              </ArrowLink>
            ))
          ) : (
            <a href="https://github.com/jaketrent/gowiththeflowtype-site/issues/new">
              Notes needed
            </a>
          )}
        </div>
      </div>
    </div>
    <style jsx>{`
      article {
        padding-bottom: ${vars.layout.spacingLarge};
      }
      .grid {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: ${vars.layout.spacingLarge};
        padding: ${vars.layout.spacingLarge} 0;
      }
      .img {
        width: 200px;
      }
    `}</style>
  </article>
)

export default _ => (
  <div>
    <Head />
    <GlobalStyles />
    <Header />
    <ContentGrid>
      <Blurb title="Many Editors">
        <p>
          Everyone has their own favorite editor. Flow works in many of them.
          But Flow doesn't seem to work wonderfully in any of them. Flow is
          optimized for use as a{" "}
          <a href="https://www.npmjs.com/package/flow-bin">CLI</a>.
        </p>
        <p>
          If, however, you'd like to setup some editor integration with Flow,
          please check here for some of the latest tips and setups for editors
          that you maybe using.
        </p>
        <p>
          If you come up with a good setup yourself, please{" "}
          <a href="https://github.com/jaketrent/gowiththeflowtype-site/issues/new">
            share
          </a>{" "}
          a link to your content or the steps themselves, and we'll try to get
          them added.
        </p>
      </Blurb>
      <div>
        <Editor
          title="Spacemacs"
          img="/gowiththeflowtype/img/editors/spacemacs.png"
          href="http://spacemacs.org/"
          instructions={[
            "https://jaketrent.com/post/spacemacs-flowtype-integration/",
            "https://gist.github.com/jaketrent/c86eaba383e1bef31c5cca7ad07343e9",
          ]}
        >
          <p>
            My personal favorite for JavaScript-Flow projects. Used in the
            <a href="http://bit.ly/jaketrent-flowtype-course">course</a>.
          </p>
        </Editor>
        <Editor
          title="VS Code"
          img="/gowiththeflowtype/img/editors/vscode.png"
          href="https://code.visualstudio.com/"
          instructions={["https://github.com/flowtype/flow-for-vscode"]}
        >
          <p>
            Some intellisense, go to def, type info on hover. Plugin currently
            being revamped.
          </p>
        </Editor>
        <Editor
          title="vim"
          img="/gowiththeflowtype/img/editors/vim.png"
          href="https://www.vim.org/"
          instructions={["https://github.com/flowtype/vim-flow"]}
        >
          <p>The editor that's everywhere, now with Flow.</p>
        </Editor>
        <Editor
          title="Webstorm"
          img="/gowiththeflowtype/img/editors/webstorm.png"
          href="https://www.jetbrains.com/webstorm/"
          instructions={[
            "https://www.jetbrains.com/help/webstorm/2017.1/flow-type-checker.html",
          ]}
        >
          <p>Not free, but a nice IDE.</p>
        </Editor>
        <Editor
          title="Atom"
          img="/gowiththeflowtype/img/editors/atom.png"
          href="https://atom.io/"
          instructions={["https://atom.io/packages/ide-flowtype"]}
        >
          <p>
            Plugin should be promising, written by Facebook. I'm interested in
            your mileage with this one.
          </p>
        </Editor>
      </div>
    </ContentGrid>
    <Footer />
  </div>
)
