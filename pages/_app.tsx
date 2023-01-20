import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import Head from "next/head";

import "../styles/globals.scss";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Head>
        <meta name="application-name" content="IPEHR App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="IPEHR App" />
        <meta name="description" content="IPEHR Access control application" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#fffff" />

        <link rel="apple-touch-icon" href="/ipehr-icon.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/ipehr-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/ipehr-icon.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/ipehr-icon.png" />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/ipehr-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/ipehr-icon.png"
        />
        <link rel="manifest" href="/manifest.json" />

        <link rel="shortcut icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="IPEHR App" />
        <meta
          property="og:description"
          content="IPEHR Access control application"
        />
        <meta property="og:site_name" content="IPEHR App" />
        {/* <meta property="og:url" content="https://yourdomain.com" /> */}
        {/* <meta
          property="og:image"
          content="https://yourdomain.com/icons/apple-touch-icon.png"
        /> */}
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
