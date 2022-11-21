import { useEffect } from "react";
import type { AppProps } from "next/app";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import type { Session } from "next-auth";

import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
