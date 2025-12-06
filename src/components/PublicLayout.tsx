import Link from 'next/link';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Fixed Tour Button */}
      <a
        href="https://forms.google.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[var(--primary-color)] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-[var(--primary-dark)] transition-colors z-50"
      >
        見学申込み
      </a>

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
                <span className="font-bold text-base">SKY KIDS</span>
              </div>
              <p className="text-xs text-gray-600">
                子どもたち一人ひとりの個性を大切に、<br />
                温かい保育を提供しています。
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold text-sm mb-3">メニュー</h3>
              <ul className="space-y-1 text-xs text-gray-600">
                <li><Link href="/" className="hover:text-[var(--primary-color)]">ホーム</Link></li>
                <li><Link href="/#about" className="hover:text-[var(--primary-color)]">園の紹介</Link></li>
                <li><Link href="/#enrollment" className="hover:text-[var(--primary-color)]">入園案内</Link></li>
                <li><Link href="/news" className="hover:text-[var(--primary-color)]">お知らせ</Link></li>
                <li><Link href="/staff" className="hover:text-[var(--primary-color)]">スタッフ紹介</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-bold text-sm mb-3">お問い合わせ</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <p>〒899-4332</p>
                <p>鹿児島県霧島市国分中央1-2-3</p>
                <p className="font-bold text-sm text-gray-800 mt-2">TEL: 0995-12-3456</p>
                <p>受付時間: 9:00〜18:00（平日）</p>
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
