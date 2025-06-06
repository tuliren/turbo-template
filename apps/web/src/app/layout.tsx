import { ClerkProvider } from '@clerk/nextjs';
import { MantineProvider } from '@mantine/core';
import { clsx } from 'clsx';
import { type Metadata } from 'next';
import PlausibleProvider from 'next-plausible';
import { Inter, Lexend } from 'next/font/google';
import { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { DESCRIPTION, DOMAIN, DOMAIN_URL, MAIN_COLOR, TITLE } from '@/constants';
import '@/styles/globals.css';
import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  icons: [
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon-16x16.png' },
    { rel: 'manifest', url: '/site.webmanifest' },
  ],
  robots: 'index, follow',
  openGraph: {
    title: `Home | ${TITLE}`,
    description: DESCRIPTION,
    url: DOMAIN_URL,
    type: 'website',
  },
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  const enableAnalytics = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-transparent antialiased',
        inter.variable,
        lexend.variable
      )}
    >
      <body className="flex h-full flex-col">
        <main>
          <Header />

          <PlausibleProvider domain={DOMAIN} enabled={enableAnalytics} />
          <ClerkProvider
            appearance={{
              layout: {
                privacyPageUrl: '/privacy',
                termsPageUrl: '/terms',
              },
            }}
          >
            <MantineProvider
              theme={{
                colors: {
                  // generate from https://mantine.dev/colors-generator/?color=0b5394
                  blue: [
                    '#ecf5fe',
                    '#d8e8f6',
                    '#abcff0',
                    '#7cb4eb',
                    '#589ee7',
                    '#4390e5',
                    '#3889e5',
                    '#2c76cc',
                    '#2269b7',
                    '#0c5ba1',
                  ],
                },
                primaryColor: 'blue',
              }}
            >
              {children}
            </MantineProvider>
          </ClerkProvider>
        </main>

        <Footer />
      </body>
    </html>
  );
}
