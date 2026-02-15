import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://skykids-hp.vercel.app"),
  title: "SKY KIDS | スカイキッズ",
  description: "鹿児島県霧島市の児童クラブ SKY KIDS（スカイキッズ）。小学生を対象とした学童保育・一時預かりを行っています。忙しいお母さんお父さんの子育てを応援しています！",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "SKY KIDS | スカイキッズ",
    description: "鹿児島県霧島市の児童クラブ SKY KIDS（スカイキッズ）。忙しいお母さんお父さんの子育てを応援しています！",
    url: "https://skykids-hp.vercel.app",
    siteName: "SKY KIDS",
    locale: "ja_JP",
    type: "website",
    images: ["/images/hero_1.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SKY KIDS | スカイキッズ",
    description: "鹿児島県霧島市の児童クラブ SKY KIDS（スカイキッズ）。忙しいお母さんお父さんの子育てを応援しています！",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@700;900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ChildCare",
              "name": "SKY KIDS（スカイキッズ）",
              "description": "鹿児島県霧島市の児童クラブ。小学生を対象とした学童保育・一時預かりを行っています。",
              "url": "https://skykids-hp.vercel.app",
              "telephone": "0995-73-3756",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "鹿児島県",
                "addressLocality": "霧島市",
                "addressCountry": "JP"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 31.7406,
                "longitude": 130.7631
              },
              "areaServed": "霧島市",
              "serviceType": "学童保育・一時預かり"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SKY KIDS",
              "alternateName": "スカイキッズ",
              "url": "https://skykids-hp.vercel.app"
            })
          }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
