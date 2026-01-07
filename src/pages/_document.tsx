import { ColorModeScript } from '@chakra-ui/react';
import { UMAMI_SRC, UMAMI_WEBSITE_ID } from 'lib/constants/umami';
import customTheme from 'lib/styles/theme';
import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export const APP_NAME = 'muvees';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta content={APP_NAME} name="application-name" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta
            content="default"
            name="apple-mobile-web-app-status-bar-style"
          />
          <meta content={APP_NAME} name="apple-mobile-web-app-title" />
          <meta content="telephone=no" name="format-detection" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="#FFFFFF" name="theme-color" />

          {/* add your own app-icon */}
          {/* <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          /> */}
          <link href="/popcorn.png" rel="icon" />
          <link href="/manifest.json" rel="manifest" />

          {/* umami self-hosted analytics */}
          <script
            async
            data-domains="muvees.sznm.dev"
            data-website-id={UMAMI_WEBSITE_ID}
            defer
            src={UMAMI_SRC}
          />
        </Head>
        <body>
          <ColorModeScript
            initialColorMode={customTheme.config?.intialColorMode}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
