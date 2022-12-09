// import '../styles/globals.scss';
import '../modules/_metronic/assets/sass/plugins.scss';
import '../modules/_metronic/assets/sass/style.scss';
import '../modules/_metronic/assets/sass/style.react.scss';

import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { IntlProvider } from 'react-intl';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <IntlProvider locale="en-GB" defaultLocale="en">
      <Component {...pageProps} />
    </IntlProvider>
  );
}
