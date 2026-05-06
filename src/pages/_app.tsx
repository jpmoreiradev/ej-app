import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Oportuniza</title>
        <meta name="description" content="Portal de Editais do Governo" />
        <link rel="icon" href="/favicon.ico?v=3" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
