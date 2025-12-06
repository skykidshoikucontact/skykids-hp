import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SKY KIDS | 小さな託児所",
  description: "SKY KIDSは、子どもたち一人ひとりに寄り添う温かい保育を提供する小さな託児所です。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
