import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';

export const metadata = {
  title: 'お問い合わせ | SKY KIDS',
  description: 'SKY KIDSへのお問い合わせページです。',
};

export default function ContactPage() {
  return (
    <PublicLayout>
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[var(--primary-color)]">ホーム</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">お問い合わせ</span>
          </nav>

          {/* タイトル */}
          <h1 className="text-3xl font-bold text-center mb-6">お問い合わせ</h1>

          {/* 説明文言 */}
          <div className="text-center mb-8">
            <p className="text-gray-700 text-base leading-relaxed">
              見学や入会に関するご質問、その他ご不明な点がございましたら<br className="hidden sm:inline" />
              お気軽にお問い合わせください。
            </p>
          </div>

          {/* 電話番号 */}
          <article className="bg-white border rounded-lg p-6 mb-8 text-center hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm mb-2">お急ぎの方はお電話ください</p>
            <a
              href="tel:0995-70-6623"
              className="text-2xl font-bold text-[var(--primary-dark)] hover:text-[var(--primary-color)] transition-colors"
            >
              TEL: 0995-70-6623
            </a>
            <p className="text-gray-500 text-sm mt-2">
              受付時間: 月〜金 11:00〜18:30 / 土 7:30〜18:30
            </p>
          </article>

          {/* Google Form ボタン */}
          <article className="bg-white border rounded-lg p-6 text-center hover:shadow-md transition-shadow">
            <p className="text-gray-600 text-sm mb-4">フォームからのお問い合わせ</p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdjMbznJ6oPyulEHHs92ZslfFip8T--3h4BuOqm2UFdeI3uwQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full max-w-md bg-[var(--primary-color)] text-white font-bold py-4 rounded-full text-lg hover:bg-[var(--primary-dark)] transition-colors shadow-lg"
            >
              お問い合わせフォームへ
            </a>
          </article>

          {/* プライバシーポリシーへのリンク */}
          <p className="mt-6 text-center text-sm text-gray-600">
            お問い合わせの際は<Link href="/privacy" className="text-[var(--primary-color)] font-bold underline hover:bg-[var(--primary-color)] hover:text-white px-1 rounded transition-colors">プライバシーポリシー</Link>をご確認ください。
          </p>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--primary-dark)] hover:underline"
            >
              ← ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
