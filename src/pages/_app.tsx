import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { type DefaultSeoProps, generateDefaultSeo } from 'next-seo/pages';
import NextNprogress from 'nextjs-progressbar';
import '@fontsource/outfit/latin.css';

import Layout from 'lib/layout';
import customTheme from 'lib/styles/theme';

import 'lib/styles/globals.css';

const defaultSEOConfig: DefaultSeoProps = {
  title: 'muvees',
  titleTemplate: '%s | muvees',
  defaultTitle: 'muvees',
  description: 'See your favorite movies',
  canonical: 'https://muvees.sznm.dev',
  openGraph: {
    url: 'https://muvees.sznm.dev',
    title: 'muvees',
    description: 'See your favorite movies',
    images: [
      {
        url: 'https://og-image.sznm.dev/**muvees**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
        alt: 'muvees.sznm.dev og-image',
      },
    ],
    site_name: 'muvees',
  },
  twitter: {
    handle: '@agstnsnathaniel',
    cardType: 'summary_large_image',
  },
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
          name="viewport"
        />
        {generateDefaultSeo(defaultSEOConfig)}
      </Head>
      <NextNprogress />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default MyApp;
