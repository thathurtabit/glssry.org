import { type AppType } from "next/app";
import Script from "next/script";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { FooterStrip } from "~/components/molecules/footer-strip/footer-strip";
import { ModalsAndNotifications } from "~/components/molecules/modals-and-notifications/modals-and-notifications";
import { AppWrapper } from "~/components/templates/app-wrapper/app-wrapper";
import { GlssryAppProvider } from "~/context/context/context";
import { googleAnalyticsId } from "~/settings/constants";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProperties },
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
        <Component {...pageProperties} />
        <FooterStrip />
      </AppWrapper>
      <ModalsAndNotifications />
    </GlssryAppProvider>
  </SessionProvider>
);

export default api.withTRPC(MyApp);
