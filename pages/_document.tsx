import { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export default function Document() {
  return (
    <Html>
      <Head>
      <script
                        dangerouslySetInnerHTML={{
                            __html: `
        var _rollbarConfig = {
            accessToken: "${publicRuntimeConfig.rollbarClientToken}",
            captureUncaught: true,
            captureUnhandledRejections: true,
            payload: {
                environment: "production"
            }
        };
        `
                                }}
                    />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}