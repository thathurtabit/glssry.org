import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { GlssryAppProvider } from "~/context/context/context";
import { AppWrapper } from "~/components/templates/app-wrapper/app-wrapper";
import { ModalsAndNotifications } from "~/components/molecules/modals-and-notifications/modals-and-notifications";
import Script from "next/script";
import { googleAnalyticsId } from "~/settings/constants";
import { FooterStrip } from "~/components/molecules/footer-strip/footer-strip";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <SessionProvider session={session}>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
    />
    <Script id="google-analytics">
      {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${googleAnalyticsId}');
        `}
    </Script>
    <GlssryAppProvider>
      <AppWrapper>
        <Component {...pageProps} />
        <FooterStrip />
      </AppWrapper>
      <ModalsAndNotifications />
    </GlssryAppProvider>
  </SessionProvider>
);

export default api.withTRPC(MyApp);
