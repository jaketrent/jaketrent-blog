import type { AppProps } from 'next/app'

import "../common/ui/global.css"

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default App

