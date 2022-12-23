import React from "react";
import type { MetaFunction } from "@remix-run/node";
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
  // GlobalStyles,
  ThemeProvider,
  // LightTheme,
  // ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import routerProvider from "@pankod/refine-remix-router";

import { dataProvider, liveProvider } from "@pankod/refine-appwrite";
import { withEmotionCache } from "@emotion/react";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material";
import { authProvider } from "~/authProvider";
import { appwriteClient } from "~/utility";
import ClientStyleContext from "~/contexts/ClientStyleContext";
// import { Title, Sider, Layout, Header } from "~/components/layout";
// import remixImageStyles from "remix-image/remix-image.css";

import { light } from './theme';
import WelcomePage from '~/components/WelcomePage';
import SetUpProfile from '~/pages/SetupProfile';
import tailwindcss from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
  title: "Werk",
});

interface DocumentProps {
  children: React.ReactNode;
  title?: string;
}

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const clientStyleData = React.useContext(ClientStyleContext);
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
          <link rel="icon" href="/image/werk.svg" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <meta name="emotion-insertion-point" content="emotion-insertion-point" />
        </head>
        <body>
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
      <ThemeProvider theme={light}>
        <CssBaseline enableColorScheme />
        {/* <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} /> */}
        <RefineSnackbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider(appwriteClient, {
              databaseId: "639a8d312f727df9c1f5", // default
            })}
            liveProvider={liveProvider(appwriteClient, {
              databaseId: "639a8d312f727df9c1f5", // default
            })}
            options={{ liveMode: "auto" }} // liveMode="auto" // @deprecated — liveMode property is deprecated. Use it from within options instead.
            authProvider={authProvider}
            notificationProvider={notificationProvider}
            LoginPage={AuthPage}
            // ReadyPage={ReadyPage}
            DashboardPage={WelcomePage}
            catchAll={<ErrorComponent />}
            // Title={Title}
            // Sider={Sider}
            // Layout={Layout}
            // Header={Header}
            resources={[
              {
                name: "setup-profile",
                list: SetUpProfile,
                // options: {
                //   label: "setup-profile",
                // },
              }
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
    // { rel: "stylesheet", href: remixImageStyles },
  ];
}
