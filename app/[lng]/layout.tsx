import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Rahmat Waisi — Senior Back-End Engineer',
  description:
    'Senior Back-End Engineer specializing in PHP, Go, Laravel, and distributed systems architecture.',
  keywords: ['Back-End Engineer', 'PHP', 'Go', 'Laravel', 'Microservices', 'Portfolio'],
  openGraph: {
    title: 'Rahmat Waisi — Senior Back-End Engineer',
    description: 'Building scalable systems that power millions of interactions.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

// Languages supported by this app
const RTL_LANGS = new Set(['fa', 'ar', 'ku']);

interface LngLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}

export async function generateStaticParams() {
  return [
    { lng: 'en' },
    { lng: 'ku' },
    { lng: 'fa' },
    { lng: 'ar' },
  ];
}

export default async function LngLayout({ children, params }: LngLayoutProps) {
  const { lng } = await params;
  const dir = RTL_LANGS.has(lng) ? 'rtl' : 'ltr';

  return (
    <html lang={lng} dir={dir}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
