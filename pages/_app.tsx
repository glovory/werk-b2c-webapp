import '../styles/globals.scss'
import '../modules/_metronic/assets/sass/plugins.scss'
import '../modules/_metronic/assets/sass/style.scss'
import '../modules/_metronic/assets/sass/style.react.scss'

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Component {...pageProps} />
  )
}
