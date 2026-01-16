import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';
import { getSettings } from '@/lib/dataFetcher';

export const metadata = {
  title: '児童募集 | SKY KIDS',
  description: 'SKY KIDSの児童募集要項です。',
};

export default async function RecruitPage() {
  const settings = await getSettings();

  return (
    <PublicLayout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[var(--primary-color)]">ホーム</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">児童募集</span>
          </nav>

          <h1 className="text-3xl font-bold mb-8 text-center">児童募集</h1>

          <p className="text-center text-gray-600 mb-10">
            SKY KIDSでは、以下の要項で児童を募集しています。<br />
            ご不明な点はお気軽にお問い合わせください。
          </p>

          {/* 募集要項 */}
          <section className="bg-white border rounded-lg p-6 mb-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-[var(--primary-dark)] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-sm">📋</span>
              募集要項
            </h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">対象年齢</p>
                  <p className="font-bold">小学1年生〜6年生</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">定員</p>
                  <p className="font-bold">20名程度</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500 mb-1">募集時期</p>
                  <p className="font-bold">随時受付中</p>
                </div>
              </div>
            </div>
          </section>

          {/* 開所時間 */}
          <section className="bg-white border rounded-lg p-6 mb-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-[var(--primary-dark)] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-sm">🕐</span>
              開所時間
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-medium w-32">平日（月〜金）</td>
                    <td className="py-3">下校時〜19:00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">土曜日</td>
                    <td className="py-3">7:30〜19:00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">長期休暇</td>
                    <td className="py-3">7:30〜19:00（春・夏・冬休み）</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">休所日</td>
                    <td className="py-3">日曜日・祝日・年末年始</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 料金 */}
          <section className="bg-white border rounded-lg p-6 mb-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-[var(--primary-dark)] mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-sm">💰</span>
              料金案内
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 font-medium w-40">入会金</td>
                    <td className="py-3">{settings.pricing.enrollmentFee}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">年間保険料</td>
                    <td className="py-3">{settings.pricing.insuranceFee}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">月額利用料</td>
                    <td className="py-3">{settings.pricing.monthlyFee}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">ひとり親世帯</td>
                    <td className="py-3">{settings.pricing.singleParentFee}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">おやつ代</td>
                    <td className="py-3">{settings.pricing.mealFee}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 font-medium">延長料金</td>
                    <td className="py-3">{settings.pricing.extendedCare}</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">長期休暇期間</td>
                    <td className="py-3">{settings.pricing.longVacationFee}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              ※ 兄弟・姉妹割引あり。詳細はお問い合わせください。
            </p>
          </section>

          {/* 入会の流れ */}
          <section className="bg-white border rounded-lg p-6 mb-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-bold text-[var(--primary-dark)] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-sm">✨</span>
              入会までの流れ
            </h2>
            <div className="space-y-6">
              {/* STEP 1 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                    1
                  </div>
                  <div className="w-0.5 h-full bg-[var(--primary-light)] mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <h3 className="font-bold text-lg mb-2">お問い合わせ</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    お電話またはフォームからご連絡ください。<br />
                    見学のご予約もこちらから承ります。
                  </p>
                </div>
              </div>

              {/* STEP 2 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                    2
                  </div>
                  <div className="w-0.5 h-full bg-[var(--primary-light)] mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <h3 className="font-bold text-lg mb-2">施設見学</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    実際に施設をご覧いただきます。<br />
                    お子様と一緒のご見学も大歓迎です。
                  </p>
                </div>
              </div>

              {/* STEP 3 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                    3
                  </div>
                  <div className="w-0.5 h-full bg-[var(--primary-light)] mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <h3 className="font-bold text-lg mb-2">入会申込み</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    入会をご希望の場合は、必要書類をご提出ください。<br />
                    ご不明な点はスタッフがサポートいたします。
                  </p>
                </div>
              </div>

              {/* STEP 4 */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">入会・ご利用開始</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    ようこそSKY KIDSへ！
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">まずはお気軽にお問い合わせください</p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdjMbznJ6oPyulEHHs92ZslfFip8T--3h4BuOqm2UFdeI3uwQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--primary-color)] text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-[var(--primary-dark)] transition-colors shadow-lg"
            >
              お問い合わせはこちら
            </a>
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
