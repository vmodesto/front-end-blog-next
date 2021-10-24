import '../../styles/globals.scss'
import type { AppProps } from 'next/app'
import { makeServer } from '../api/miraje'

if (process.env.NODE_ENV === "development") {
  makeServer()
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
