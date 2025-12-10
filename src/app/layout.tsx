import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SKY KIDS | スカイキッズ",
  description: "鹿児島県霧島市の児童クラブ SKY KIDS（スカイキッズ）。小学生を対象とした学童保育・一時預かりを行っています。忙しいお母さんお父さんの子育てを応援します。",
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
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
