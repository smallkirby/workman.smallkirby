import { AppProps } from "next/app";
import "@/styles/global.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <Head>
        <title>workman</title>
        <link rel="shortcut icon" href="/favicon.ico?" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}
