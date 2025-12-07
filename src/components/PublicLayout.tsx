'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SK</span>
              </div>
              <span className="font-bold text-xl text-[var(--primary-dark)]">SKY KIDS</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="hover:text-[var(--primary-color)] transition-colors">
                ホーム
              </Link>
              <Link href="/#about" className="hover:text-[var(--primary-color)] transition-colors">
                園について
              </Link>
              <Link href="/news" className="hover:text-[var(--primary-color)] transition-colors">
                お知らせ
              </Link>
              <Link href="/staff" className="hover:text-[var(--primary-color)] transition-colors">
                スタッフ紹介
              </Link>
              <Link href="/#access" className="hover:text-[var(--primary-color)] transition-colors">
                アクセス
              </Link>
              <Link
                href="/#contact"
                className="btn-primary text-sm"
              >
                お問い合わせ
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <nav className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                className="block py-2 hover:text-[var(--primary-color)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                ホーム
              </Link>
              <Link
                href="/#about"
                className="block py-2 hover:text-[var(--primary-color)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                SKY KIDSについて
              </Link>
              <Link
                href="/news"
                className="block py-2 hover:text-[var(--primary-color)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                お知らせ
              </Link>
              <Link
                href="/staff"
                className="block py-2 hover:text-[var(--primary-color)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                スタッフ紹介
              </Link>
              <Link
                href="/#faq"
                className="block py-2 hover:text-[var(--primary-color)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                よくある質問
              </Link>
              <Link
                href="/#access"
                className="block py-2 hover:text-[var(--primary-color)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                アクセス
              </Link>
              <Link
                href="/#contact"
                className="block py-2 text-[var(--primary-color)] font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                お問い合わせ
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#F2F2F2] py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-sm leading-[1.6] text-gray-700">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">SK</span>
                </div>
                <span className="font-bold text-base">児童クラブ SKY KIDS</span>
              </div>
              <p className="text-xs text-gray-600">
                忙しいお母さんお父さんの<br />
                子育てを応援します！
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold text-sm mb-3">メニュー</h3>
              <ul className="space-y-1 text-xs text-gray-600">
                <li><Link href="/" className="hover:text-[var(--primary-color)]">ホーム</Link></li>
                <li><Link href="/#about" className="hover:text-[var(--primary-color)]">SKY KIDSについて</Link></li>
                <li><Link href="/#enrollment" className="hover:text-[var(--primary-color)]">入会案内</Link></li>
                <li><Link href="/news" className="hover:text-[var(--primary-color)]">お知らせ</Link></li>
                <li><Link href="/staff" className="hover:text-[var(--primary-color)]">スタッフ紹介</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-sm mb-3">お問い合わせ</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>〒899-XXXX</p>
                <p>鹿児島県霧島市国分○○町X-XX</p>
                <p className="font-bold text-sm text-gray-800 mt-2">TEL: 0995-XX-XXXX</p>
                <p>営業時間: 月〜金 11:00〜19:00 / 土 7:30〜19:00</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-300 flex justify-end">
            <p className="text-xs text-gray-500">&copy; 2025 SKY KIDS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
