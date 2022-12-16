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
// import { Layout } from "~/components/layout"; // Title, Sider, Layout, Header
// import AppleIcon from '@mui/icons-material/Apple';

import { light } from './theme';
import WelcomePage from '~/components/WelcomePage';
import SetUpProfile from '~/pages/SetupProfile';
import tailwindcss from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Werk",
  viewport: "width=device-width,initial-scale=1",
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
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          <link rel="icon" href="/image/werk-logo-symbol-space.svg" />
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
              databaseId: "default",
            })}
            liveProvider={liveProvider(appwriteClient, {
              databaseId: "default",
            })}
            // liveMode="auto" // @deprecated — liveMode property is deprecated. Use it from within options instead.
            options={{ liveMode: "auto" }}
            authProvider={authProvider}
            notificationProvider={notificationProvider}
            LoginPage={AuthPage}
            // LoginPage={() => (
            //   <AuthPage
            //     contentProps={{
            //       title: "Login",
            //     }}
            //     providers={[
            //       {
            //         name: "google",
            //         icon: <img width={18} height={18} alt="Google" src="/image/brand/google.svg" />,
            //         label: "Sign in with Google",
            //       },
            //       {
            //         name: "apple",
            //         icon: <AppleIcon sx={{ mb: '4px' }} />,
            //         label: "Sign in with Apple",
            //       },
            //     ]}
            //   />
            // )}
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
  ];
}
