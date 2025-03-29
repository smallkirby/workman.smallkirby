import { AppProps } from 'next/app';
import '@/styles/global.css';
import { ConfigProvider, theme } from 'antd';
import Head from 'next/head';
import AlertProvider from '@/components/providers/AlertProvider';
import HistoryProvider from '@/components/providers/HistoryProvider';
import { FirebaseAuthProvider } from '@/lib/firebase/auth';

const DOMAIN = 'workman.smallkirby.xyz';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <AlertProvider>
          <FirebaseAuthProvider>
            <HistoryProvider>
              <Head>
                <title>workman</title>
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1.0"
                />
                <meta
                  name="description"
                  content="smallkirby wants to use workman keyboard layout."
                />
                <meta property="og:url" content={`https://${DOMAIN}`} />
                <meta property="og:title" content="workman" />
                <meta
                  property="og:site_name"
                  content="workman.smallkirby.xyz"
                />
                <meta
                  property="og:description"
                  content="smallkirby wants to use workman keyboard layout."
                />
                <meta property="og:type" content="website" />
                <meta
                  property="og:image"
                  content={`https://${DOMAIN}/images/workman-layout.png`}
                />
                <link
                  rel="shortcut icon"
                  href={`https://${DOMAIN}/favicon.ico?`}
                  type="image/x-icon"
                />
              </Head>
              <Component {...pageProps} />
            </HistoryProvider>
          </FirebaseAuthProvider>
        </AlertProvider>
      </ConfigProvider>
    </main>
  );
}
