import { ClerkProvider } from '@clerk/nextjs';
import { clsx } from 'clsx';
import { type Metadata } from 'next';
import PlausibleProvider from 'next-plausible';
import { Inter, Lexend } from 'next/font/google';
import { ReactNode } from 'react';

import { DESCRIPTION, DOMAIN, TITLE } from '@/constants';
import '@/styles/globals.css';
import '@/styles/tailwind.css';

export const metadata: Metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  icons: [{ rel: 'icon', url: '/logo.svg' }],
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
      </body>
    </html>
  );
}
