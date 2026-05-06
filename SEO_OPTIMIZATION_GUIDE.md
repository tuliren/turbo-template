# SEO Optimization Guide for Next.js Marketing Pages

A practical recipe for taking a Next.js App Router marketing site from
"missing metadata" to "passes a real SEO audit." Based on the same set
of changes shipped to two sibling projects (marauder-bot, readtube).

The four pieces:

1. Full root-layout `metadata` (Open Graph, Twitter card, robots, canonical).
2. A dynamic 1200×630 OG image via `app/opengraph-image.tsx`.
3. JSON-LD structured data on the home page (`SoftwareApplication`,
   `Organization`, `WebSite`).
4. Make the OG image route public if you have auth middleware.

## Prerequisites

- Next.js App Router (`app/` directory, not `pages/`).
- A `constants.ts` (or similar) with the website URL, title, and a
  short marketing description. The examples below assume:
  ```ts
  export const TITLE = 'YourApp';
  export const DESCRIPTION = 'One-sentence elevator pitch.';
  export const FULL_WEBSITE_URL = 'https://www.yourapp.com';
  ```

## 1. Root layout metadata

Replace any minimal `metadata` block in `apps/web/src/app/layout.tsx`
with the full version. Every page inherits this, so new routes pick
up correct social cards automatically.

```tsx
import { type Metadata } from 'next';
import { DESCRIPTION, FULL_WEBSITE_URL, TITLE } from '@/constants';

export const metadata: Metadata = {
  metadataBase: new URL(FULL_WEBSITE_URL),
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  applicationName: TITLE,
  keywords: [
    // Pick 5–8 phrases a user would actually search for. Avoid stuffing.
    'keyword one',
    'keyword two',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: TITLE,
    title: TITLE,
    description: DESCRIPTION,
    url: FULL_WEBSITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: [
    /* keep existing favicon / apple-touch-icon list */
  ],
};
```

Notes:

- `metadataBase` is required as soon as anything in `metadata` uses a
  relative URL — without it Next.js logs a warning and OG `images`
  may resolve to `localhost`.
- Don't repeat per-page `<Head>` tags. With the App Router that's a
  no-op; export a `metadata` object from each route's `page.tsx`
  instead, and only override what differs from the root.
- The structured `robots` object replaces the legacy
  `robots: 'index, follow'` string and emits both the standard meta
  tag and the `googlebot`-specific one.

## 2. Dynamic Open Graph image

Create `apps/web/src/app/opengraph-image.tsx`. Next.js picks this up
by filename convention — no route handler, no static asset. Edge
runtime, regenerated on demand, cached by the framework.

```tsx
import { ImageResponse } from 'next/og';

import { Logo } from '@/components/Logo';
import { FULL_WEBSITE_URL, TITLE } from '@/constants';

export const runtime = 'edge';
export const alt = `${TITLE} — short tagline`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const HEADLINE = 'A short, declarative product promise';
const SUBTITLE = 'One sentence that expands on the headline.';

async function loadGoogleFont(family: string, weight: number, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${family.replaceAll(
    ' ',
    '+'
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await fetch(url, {
    headers: {
      // Force a TTF response so Satori can parse it — without a UA,
      // Google Fonts returns a woff2 URL Satori cannot read.
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
  }).then((res) => res.text());
  const match = css.match(/src: url\((https:\/\/[^)]+)\) format/);
  if (!match) {
    throw new Error(`Could not extract font URL for ${family} ${weight}`);
  }
  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export default async function OpengraphImage() {
  // Subset the font to glyphs actually used — much smaller download.
  const glyphs = `${HEADLINE}${SUBTITLE}${TITLE}${FULL_WEBSITE_URL}`;
  const [interBold, interRegular] = await Promise.all([
    loadGoogleFont('Inter', 700, glyphs),
    loadGoogleFont('Inter', 400, glyphs),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'white',
          backgroundImage:
            'linear-gradient(148deg, rgba(0, 0, 0, 0.06) 12%, rgba(0, 0, 0, 0.02) 90%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo
            weight="font-bold"
            style={{ fontSize: '70px', fontWeight: 700, letterSpacing: '-0.02em' }}
          />
        </div>

        <div style={{ fontSize: '72px', fontWeight: 700, lineHeight: 1.1, color: '#334155' }}>
          {HEADLINE}
        </div>

        <div style={{ fontSize: '32px', lineHeight: 1.3, color: '#343d46' }}>
          {SUBTITLE}
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '24px',
            color: '#64748b',
          }}
        >
          <div>{FULL_WEBSITE_URL}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      ],
    }
  );
}
```

### Logo / Satori gotchas

`ImageResponse` is rendered by Satori, which has a different feature
set from a real browser:

- Tailwind `className` only works through the experimental `tw` prop.
  Don't depend on `className` for layout — use inline `style`.
- For gradient text (`background-clip: text`), include both standard
  and WebKit-prefixed properties:
  ```tsx
  style={{
    background: 'linear-gradient(...)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: 'transparent',
  }}
  ```
  Without the WebKit prefixes the gradient renders as solid text.
- If your `Logo` component is shared with the app, give it `weight`
  and `style` props that merge into its own styles, so the OG image
  can override font size/weight without forking the component.
- Always subset Google Fonts (`&text=...`) — the 1200×630 image is
  worthless if the font fetch times out.
- The Edge runtime has no Node APIs. Fonts must be fetched, not read
  from disk.

### Verifying the OG image

After deploy:
- Hit `https://www.yourapp.com/opengraph-image` directly — confirm it
  returns a 1200×630 PNG.
- Run the URL through opengraph.xyz and the Twitter Card validator.
- Inspect the home page HTML for `<meta property="og:image">` —
  Next.js auto-generates this from the file's existence.

## 3. JSON-LD structured data

In the home page's `page.tsx`:

```tsx
import { DESCRIPTION, FULL_WEBSITE_URL, TITLE } from '@/constants';

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': `${FULL_WEBSITE_URL}/#software`,
      name: TITLE,
      url: FULL_WEBSITE_URL,
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web',
      description: DESCRIPTION,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${FULL_WEBSITE_URL}/#organization`,
      name: TITLE,
      url: FULL_WEBSITE_URL,
      logo: `${FULL_WEBSITE_URL}/android-chrome-512x512.png`,
    },
    {
      '@type': 'WebSite',
      '@id': `${FULL_WEBSITE_URL}/#website`,
      url: FULL_WEBSITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      publisher: { '@id': `${FULL_WEBSITE_URL}/#organization` },
      inLanguage: 'en-US',
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* … rest of the page … */}
    </>
  );
}
```

Tips:

- Use `applicationCategory` values from schema.org's enumerated list
  (`DeveloperApplication`, `ProductivityApplication`, etc.).
- The `@id` URLs are arbitrary fragments — they exist so the entities
  can reference each other (`publisher: { '@id': ... }`).
- Embed the script on the home page only, not the root layout — each
  page gets its own structured-data envelope appropriate to its
  content type. Inner pages might emit `Article`, `BreadcrumbList`,
  or `FAQPage`.
- Validate with Google's Rich Results Test
  (https://search.google.com/test/rich-results) after deploy.
- Don't put it inside a `'use client'` component if you can avoid it
  — server-rendered JSON-LD is what crawlers see first.

## 4. Make the OG image public if you have auth middleware

If you use Clerk (or any middleware that protects routes by default),
add `/opengraph-image` to the allow-list:

```ts
// apps/web/src/proxy.ts (or middleware.ts)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/p/(.*)',
  '/api(.*)',
  '/opengraph-image',
]);
```

Otherwise social card scrapers hit a sign-in redirect and the preview
silently fails.

## 5. `robots.ts` and `sitemap.ts` (if you have them)

Replace any hardcoded host with `FULL_WEBSITE_URL` so a domain change
doesn't require chasing literals across the codebase:

```ts
// apps/web/src/app/robots.ts
import { MetadataRoute } from 'next';
import { FULL_WEBSITE_URL } from '@/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    host: FULL_WEBSITE_URL,
    sitemap: `${FULL_WEBSITE_URL}/sitemap.xml`,
  };
}
```

## Verification checklist

- [ ] `yarn lint` and `yarn typecheck` pass.
- [ ] Visit `/opengraph-image` after deploy — returns a 1200×630 PNG.
- [ ] Page source has `<meta property="og:*">`, `<meta name="twitter:*">`,
      and `<script type="application/ld+json">` blocks.
- [ ] Social card validators (opengraph.xyz, Twitter card validator)
      render a real preview.
- [ ] Google Rich Results Test detects the `SoftwareApplication`
      (or whichever) entity.
- [ ] If using auth middleware, confirm `/opengraph-image` returns
      the PNG without redirecting to sign-in.

## What this is _not_

- Not a content-SEO guide (keyword research, page copy, internal
  linking).
- Not a performance guide (Core Web Vitals, image optimization).
- Not a sitemap-generation guide beyond the URL-cleanup note above.
- Not a substitute for actually getting links and being useful — it
  just stops mechanical mistakes from costing you preview cards and
  rich results.
