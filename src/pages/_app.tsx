import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { GlssryAppProvider } from "~/context/context/context";
import { AppWrapper } from "~/components/templates/app-wrapper/app-wrapper";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <GlssryAppProvider>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </GlssryAppProvider>
  </SessionProvider>
);

export default api.withTRPC(MyApp);
