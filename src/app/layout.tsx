import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ------------------------------------------------------------------ */
/*  SEO: Metadata + Open Graph + Twitter Cards                         */
/* ------------------------------------------------------------------ */

const SITE_URL = "https://primboodigital.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Primboo Digital Media | Soluções Estratégicas no Mundo Físico e Digital em Caxias do Sul",
    template: "%s | Primboo Digital Media",
  },
  description:
    "A Primboo Digital Media é referência em soluções estratégicas no mundo físico e digital em Caxias do Sul. Painéis corporativos, totens, painéis de LED e muito mais.",
  keywords: [
    "mídia digital",
    "digital signage",
    "Caxias do Sul",
    "painel corporativo",
    "painéis LED",
    "Primboo Digital",
    "totem digital",
    "veiculação de mídia",
    "DOOH",
    "mídia digital",
  ],
  authors: [{ name: "Primboo Digital Media" }],
  creator: "Primboo Digital Media",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "Primboo Digital Media",
    title: "Primboo Digital Media | Soluções Estratégicas no Mundo Físico e Digital em Caxias do Sul",
    description:
      "Soluções estratégicas no mundo físico e digital. Painéis corporativos, totens, painéis de LED e veiculação de mídia em Caxias do Sul.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Primboo Digital Media – Soluções Estratégicas em Caxias do Sul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Primboo Digital Media | Soluções Estratégicas em Caxias do Sul",
    description:
      "Soluções estratégicas no mundo físico e digital: painéis, totens e veiculação em Caxias do Sul.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

/* ------------------------------------------------------------------ */
/*  Tracking IDs – substituir quando o cliente fornecer                */
/* ------------------------------------------------------------------ */

const META_PIXEL_ID = ""; // Ex: "123456789012345"
const GTM_ID = "";        // Ex: "GTM-XXXXXXX"

/* ------------------------------------------------------------------ */
/*  JSON-LD: LocalBusiness schema                                      */
/* ------------------------------------------------------------------ */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Primboo Digital Media",
  description:
    "Soluções estratégicas no mundo físico e digital: painéis corporativos, totens digitais, painéis de LED e veiculação de mídia.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo_vetor.svg`,
  image: `${SITE_URL}/og-image.png`,
  telephone: "+55-54-999999999",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Caxias do Sul",
    addressRegion: "RS",
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: -29.1681,
      longitude: -51.1794,
    },
    geoRadius: "100000",
  },
  sameAs: ["https://www.instagram.com/primboodigital/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#FF6B00" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Google Tag Manager */}
        {GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}

        {/* Meta Pixel */}
        {META_PIXEL_ID && (
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
            }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
