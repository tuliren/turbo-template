import { ClerkProvider } from '@clerk/nextjs';
import { clsx } from 'clsx';
import { type Metadata } from 'next';
import PlausibleProvider from 'next-plausible';
import { Inter, Lexend } from 'next/font/google';
import { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { DESCRIPTION, DOMAIN, DOMAIN_URL, TITLE } from '@/constants';
import '@/styles/globals.css';
import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  icons: [
    { rel: 'icon', type: 'image/svg', url: '/logo.svg' },
    { rel: 'icon', type: 'image/png', url: '/logo.png' },
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
            {children}
          </ClerkProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
