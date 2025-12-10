import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';

export const metadata = {
  title: 'プライバシーポリシー | SKY KIDS',
  description: 'SKY KIDSのプライバシーポリシーです。',
};

export default function PrivacyPage() {
  return (
    <PublicLayout>
      <div className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[var(--primary-color)]">ホーム</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">プライバシーポリシー</span>
          </nav>

          {/* タイトル */}
          <h1 className="text-3xl font-bold text-center mb-10">プライバシーポリシー</h1>

          {/* プライバシーポリシー本文 */}
          <div className="bg-white border rounded-lg p-8">
            <div className="text-sm text-gray-700 space-y-6 leading-relaxed">
              <p>
                児童クラブ SKY KIDS（以下「当施設」）は、お問い合わせいただいた際に取得する個人情報について、以下のとおり適切に取り扱います。
              </p>

              <section>
                <h2 className="font-bold text-base mb-2">1. 個人情報の利用目的</h2>
                <p>
                  お問い合わせへの回答、見学・入会に関するご連絡、当施設からのお知らせのために利用いたします。
                </p>
              </section>

              <section>
                <h2 className="font-bold text-base mb-2">2. 第三者への提供</h2>
                <p>
                  法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。
                </p>
              </section>

              <section>
                <h2 className="font-bold text-base mb-2">3. 個人情報の管理</h2>
                <p>
                  個人情報への不正アクセス、紛失、漏洩等を防止するため、適切な安全管理措置を講じます。
                </p>
              </section>

              <section>
                <h2 className="font-bold text-base mb-2">4. お問い合わせ</h2>
                <p>
                  個人情報の取り扱いに関するお問い合わせは、当施設までご連絡ください。
                </p>
              </section>
            </div>
          </div>

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
