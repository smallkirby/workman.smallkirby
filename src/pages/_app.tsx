import { AppProps } from 'next/app';
import '@/styles/global.css';
import Head from 'next/head';
import { FirebaseAuthProvider } from '@/lib/firebase/auth';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <FirebaseAuthProvider>
        <Head>
          <title>workman</title>
          <link rel="shortcut icon" href="/favicon.ico?" type="image/x-icon" />
        </Head>
        <Component {...pageProps} />
      </FirebaseAuthProvider>
    </main>
  );
}
