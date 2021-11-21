import '../../styles/globals.scss'
import type { AppProps } from 'next/app'
import StoreProvider from '../components/Store/Provider';
import router from 'next/router';
import { useContext } from 'react';
import StoreContext from '../components/Store/Context';

// if (process.env.NODE_ENV === "development") {
//   makeServer()
// }

function MyApp({ Component, pageProps }: AppProps) {
  const {userData} = useContext(StoreContext);
  
  return (
    <StoreProvider>
      <meta name="viewport" content=
            "width=device-width, user-scalable=no" />
      <Component {...pageProps} />
    </StoreProvider>
  )
}
export default MyApp;
