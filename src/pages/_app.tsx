import { AppProps } from 'next/app';
import '@/src/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
