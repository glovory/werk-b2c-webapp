import { type ReactNode, useContext } from "react";
import { type MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Refine } from "@pankod/refine-core";
import {
  AuthPage,
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  ThemeProvider,
} from "@pankod/refine-mui";

import routerProvider from "@pankod/refine-remix-router";
import { dataProvider, liveProvider } from "@pankod/refine-appwrite";
import { withEmotionCache } from "@emotion/react";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material";
import { authProvider } from "~/authProvider";
import { appwriteClient } from "~/utility";
import ClientStyleContext from "~/contexts/ClientStyleContext";

import { LightTheme } from './theme';
import { DATABASE_ID } from './config';
import tailwindcss from "./styles/app.css";
import ErrorComponent from '~/pages/error/ErrorComponent';
import WelcomePage from '~/pages/WelcomePage';
import SetUpProfile from '~/pages/SetupProfile';

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  title: "Werk",
});

interface DocumentProps {
  children: ReactNode;
  title?: string;
}

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = useContext(ClientStyleContext);
    useEnhancedEffect(() => {
      emotionCache.sheet.container = document.head;
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      clientStyleData.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          {title ? <title>{title}</title> : null}
          <Links />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/icon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta name="emotion-insertion-point" content="emotion-insertion-point" />
        </head>
        <body>
          <div id="werkPortalPrepend"></div>
          {children}
          <ScrollRestoration />
          <Scripts />
          <link rel="stylesheet" href={tailwindcss} />
          <LiveReload />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <ThemeProvider theme={LightTheme}>
        <CssBaseline enableColorScheme />
        <RefineSnackbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(appwriteClient, {
              databaseId: DATABASE_ID, // default
            })}
            liveProvider={liveProvider(appwriteClient, {
              databaseId: DATABASE_ID, // default
            })}
            options={{ liveMode: "auto" }} // liveMode="auto" // @deprecated — liveMode property is deprecated. Use it from within options instead.
            authProvider={authProvider}
            notificationProvider={notificationProvider}
            LoginPage={AuthPage}
            DashboardPage={WelcomePage}
            catchAll={<ErrorComponent />} // For 404 = https://refine.dev/docs/api-reference/core/components/refine-config/#catchall
            resources={[
              {
                name: "setup-profile",
                list: SetUpProfile,
              },
            ]}
          >
            <Outlet />
          </Refine>
        </RefineSnackbarProvider>
      </ThemeProvider>
    </Document>
  );
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css",
    },
  ];
}
