import type { Metadata, Viewport } from 'next';
import { Outfit as FontBody } from 'next/font/google';
import Script from 'next/script';

import 'lib/styles/globals.css';
import { Provider } from 'lib/components/ui/provider';
import { UMAMI_SRC, UMAMI_WEBSITE_ID } from 'lib/constants/umami';
import Layout from 'lib/layout';

const fontBody = FontBody({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'muvees',
  },
  description: 'See your favorite movies',
  icons: {
    icon: '/popcorn.png',
  },
  manifest: '/manifest.json',
  metadataBase: new URL('https://muvees.sznm.dev'),
  openGraph: {
    description: 'See your favorite movies',
    images: [
      {
        alt: 'muvees.sznm.dev og-image',
        url: 'https://og-image.sznm.dev/**muvees**.sznm.dev.png?theme=dark&md=1&fontSize=125px&images=https%3A%2F%2Fsznm.dev%2Favataaars.svg&widths=250',
      },
    ],
    siteName: 'muvees',
    title: 'muvees',
    url: 'https://muvees.sznm.dev',
  },
  other: {
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
  },
  title: 'muvees',
  twitter: {
    card: 'summary_large_image',
    creator: '@agstnsnathaniel',
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  minimumScale: 1,
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
        {/* umami self-hosted analytics */}
        <Script
          async
          data-domains="muvees.sznm.dev"
          data-website-id={UMAMI_WEBSITE_ID}
          defer
          src={UMAMI_SRC}
        />
      </head>
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
