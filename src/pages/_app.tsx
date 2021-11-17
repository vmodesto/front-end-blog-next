import '../../styles/globals.scss'
import type { AppProps } from 'next/app'
import StoreProvider from '../components/Store/Provider';

// if (process.env.NODE_ENV === "development") {
//   makeServer()
// }

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )
}
export default MyApp;
