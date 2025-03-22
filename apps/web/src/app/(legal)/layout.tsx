import type { Metadata } from 'next';
import { ReactNode } from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { TITLE } from '@/constants';

export const metadata: Metadata = {
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE,
  },
  icons: [{ rel: 'icon', url: '/logo.svg' }],
};

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
