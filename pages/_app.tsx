import '../styles/globals.css'
import '../modules/_metronic/assets/sass/plugins.scss'
import '../modules/_metronic/assets/sass/style.scss'
import '../modules/_metronic/assets/sass/style.react.scss'
import '../styles/Main.module.scss'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
