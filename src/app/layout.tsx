import { Box } from '@chakra-ui/react';
import Footer from 'lib/layout/Footer';
import Header from 'lib/layout/Header';
import Meta from 'lib/layout/Meta';
import type { Metadata, Viewport } from 'next';
import { Outfit as FontBody } from 'next/font/google';

import 'lib/styles/globals.css';
import { Provider } from 'lib/components/ui/provider';

const fontBody = FontBody({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'muvees',
  description: 'See your favorite movies',
  manifest: '/manifest.json',
  icons: {
    icon: '/popcorn.png',
  },
  metadataBase: new URL('https://muvees.sznm.dev'),
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
    siteName: 'muvees',
  },
  twitter: {
    creator: '@agstnsnathaniel',
    card: 'summary_large_image',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'muvees',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'format-detection': 'telephone=no',
  },
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  themeColor: '#FFFFFF',
  width: 'device-width, shrink-to-fit=no, viewport-fit=cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={fontBody.className} lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          data-domains="muvees.sznm.dev"
          data-website-id="0dfc9c1d-8a32-44d0-a5d8-1b4e0b1b3e91"
          defer
          src="https://umami.sznm.dev/script.js"
        />
      </head>
      <body>
        <Provider>
          <Box minHeight="100vh" transition="0.5s ease-out">
            <Meta />
            <Box margin="0 auto" maxWidth={1000}>
              <Header />
              <Box as="main" marginY={22}>
                {children}
              </Box>
              <Footer />
            </Box>
          </Box>
        </Provider>
      </body>
    </html>
  );
}
