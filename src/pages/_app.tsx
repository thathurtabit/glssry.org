import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { GlssryAppProvider } from "~/context/context/context";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <GlssryAppProvider>
      <Component {...pageProps} />
    </GlssryAppProvider>
  </SessionProvider>
);

export default api.withTRPC(MyApp);
