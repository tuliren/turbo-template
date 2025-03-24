'use client';

import Head from 'next/head';

import CallToAction from '@/components/CallToAction';
import Faqs from '@/components/Faqs';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Pricing from '@/components/Pricing';
import PrimaryFeatures from '@/components/PrimaryFeatures';
import SecondaryFeatures from '@/components/SecondaryFeatures';
import WaitingList from '@/components/WaitingList';
import { DESCRIPTION, DOMAIN_URL, TITLE } from '@/constants';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | {TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`Home | ${TITLE}`} />
        <meta property="og:description" content="Run anything with one command." />
        <meta property="og:url" content={DOMAIN_URL} />
        <meta property="og:type" content="website" />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  );
}
