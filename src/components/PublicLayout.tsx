'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        <div className="flex justify-between items-center h-16 px-0">
          {/* Logo */}
          <Link href="/" className="relative h-16 w-[180px] ml-2">
            <Image
              src="/images/Logo.png"
              alt="SKY KIDS"
              fill
              sizes="180px"
              className="object-contain scale-x-[1.08]"
              priority
            />
          </Link>

          <div className="flex items-center gap-8 pr-4">

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/recruit" className="hover:text-[var(--primary-color)] transition-colors text-sm">
                児童募集
              </Link>
              <Link href="/schedule" className="hover:text-[var(--primary-color)] transition-colors text-sm">
                一日の流れ
              </Link>
              <Link href="/news" className="hover:text-[var(--primary-color)] transition-colors text-sm">
                お知らせ
              </Link>
              <Link href="/faq" className="hover:text-[var(--primary-color)] transition-colors text-sm">
                よくある質問
              </Link>
              <Link href="/documents" className="hover:text-[var(--primary-color)] transition-colors text-sm">
                書類
              </Link>
              <Link href="/#access" className="hover:text-[var(--primary-color)] transition-colors text-sm">
                アクセス
              </Link>
              <Link
                href="/contact"
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
                href="/recruit"
                className="block py-2 hover:text-[var(--primary-color)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                児童募集
              </Link>
              <Link
                href="/schedule"
                className="block py-2 hover:text-[var(--primary-color)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                一日の流れ
              </Link>
              <Link
                href="/news"
                className="block py-2 hover:text-[var(--primary-color)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                お知らせ
              </Link>
              <Link
                href="/faq"
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
                href="/documents"
                className="block py-2 hover:text-[var(--primary-color)] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                書類ダウンロード
              </Link>
              <Link
                href="/contact"
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
            {/* Description */}
            <div>
              <p className="font-bold text-base mb-3">児童クラブ SKY KIDS</p>
              <p className="text-xs text-gray-600">
                忙しいお母さんお父さんの<br />
                子育てを応援しています！
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold text-sm mb-3">メニュー</h3>
              <ul className="space-y-1 text-xs text-gray-600">
                <li><Link href="/" className="hover:text-[var(--primary-color)]">ホーム</Link></li>
                <li><Link href="/#about" className="hover:text-[var(--primary-color)]">SKY KIDSについて</Link></li>
                <li><Link href="/recruit" className="hover:text-[var(--primary-color)]">児童募集</Link></li>
                <li><Link href="/schedule" className="hover:text-[var(--primary-color)]">一日の流れ</Link></li>
                <li><Link href="/news" className="hover:text-[var(--primary-color)]">お知らせ</Link></li>
                <li><Link href="/documents" className="hover:text-[var(--primary-color)]">書類ダウンロード</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-sm mb-3">お問い合わせ</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>〒899-4353</p>
                <p>鹿児島県霧島市国分向花町8-48</p>
                <p className="font-bold text-sm text-gray-800 mt-2">TEL: 0995-70-6623</p>
                <p>営業時間: 月〜金 11:00〜19:00 / 土 7:30〜19:00</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-300 flex justify-between items-center">
            {/* SNS Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/skykids25"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-500">&copy; 2025 SKY KIDS</p>
          </div>
        </div>
      </footer>

      {/* LINE Floating Button */}
      <a
        href="https://lin.ee/I6BARCb"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#06C755] rounded-full flex items-center justify-center shadow-lg hover:bg-[#05b04c] transition-colors hover:scale-110 transition-transform"
        aria-label="LINE"
      >
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
        </svg>
      </a>
    </div>
  );
}
