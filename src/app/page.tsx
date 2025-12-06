import Link from 'next/link';
import { getNews, getStaff, getSettings } from '@/lib/dataFetcher';
import PublicLayout from '@/components/PublicLayout';
import HeroSlider from '@/components/HeroSlider';
import FAQSection from '@/components/FAQSection';

export default async function HomePage() {
  const news = await getNews();
  const staff = await getStaff();
  const settings = await getSettings();

  const latestNews = news.slice(0, 3);

  return (
    <PublicLayout>
      {/* Hero Slider */}
      <HeroSlider />

      {/* SKY KIDSについて */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">SKY KIDSについて</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-gray-200 aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500">
              園舎の写真
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[var(--primary-dark)]">
                一人ひとりに寄り添う<br />
                温かい保育
              </h3>
              <p className="text-base leading-[1.7] text-gray-700 mb-4">
                SKY KIDSは、少人数制の温かい環境で、お子様一人ひとりの個性を大切にした保育を行っています。
                経験豊富なスタッフが、お子様の成長段階に合わせたきめ細やかなケアを提供します。
              </p>
              <p className="text-base leading-[1.7] text-gray-700 mb-6">
                家庭的な雰囲気の中で、子どもたちが安心して過ごせる「第二のおうち」を目指しています。
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-[var(--primary-dark)] text-sm">✓</span>
                  <span className="text-base">定員12名の少人数制</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-[var(--primary-dark)] text-sm">✓</span>
                  <span className="text-base">経験豊富な保育スタッフ</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-[var(--primary-dark)] text-sm">✓</span>
                  <span className="text-base">安心の防犯・衛生管理</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ */}
      <section id="news" className="py-16 bg-[var(--accent-color)]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">お知らせ</h2>
          <div className="space-y-4 mb-8">
            {latestNews.map((item) => (
              <article key={item.id} className="bg-white rounded-2xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <time className="text-sm text-[var(--primary-dark)] font-medium">
                    {item.date}
                  </time>
                  <h3 className="font-bold text-base flex-grow">{item.title}</h3>
                </div>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">{item.body}</p>
              </article>
            ))}
          </div>
          <div className="text-center">
            <Link href="/news" className="btn-primary inline-block">
              お知らせ一覧へ
            </Link>
          </div>

          {/* Skykids Line Illustration */}
          <div className="overflow-hidden flex justify-center mt-6">
            <img
              src="/images/skykids_yellowline.png"
              alt=""
              className="w-[300%] max-w-none h-auto translate-x-4"
            />
          </div>
        </div>
      </section>

      {/* SKY KIDSの紹介 */}
      <section id="intro" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">SKY KIDSの紹介</h2>

          <div className="text-base leading-[1.7] text-gray-700 mb-10">
            <p className="mb-4">
              SKY KIDSは、子どもたち一人ひとりの個性を大切にし、温かい家庭的な雰囲気の中で保育を行う小さな託児所です。
            </p>
            <p className="mb-4">
              少人数制だからこそできる、きめ細やかなケアと愛情あふれる保育で、お子様の健やかな成長をサポートいたします。
              経験豊富なスタッフが、遊びや生活を通じて、子どもたちの「できた！」という喜びを一緒に分かち合います。
            </p>
            <p>
              保護者の皆様が安心してお子様を預けられる「第二のおうち」として、地域に根ざした保育を目指しています。
            </p>
          </div>

          {/* 写真グリッド 2列×3枚 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500 text-sm">
              園舎外観
            </div>
            <div className="bg-gray-200 aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500 text-sm">
              保育室
            </div>
            <div className="bg-gray-200 aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500 text-sm col-span-2 md:col-span-1">
              園庭
            </div>
            <div className="hidden md:flex bg-gray-200 aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] items-center justify-center text-gray-500 text-sm">
              給食室
            </div>
          </div>
        </div>
      </section>

      {/* 5. SKY KIDSでの生活（写真ギャラリー） */}
      <section id="life" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">SKY KIDSでの生活</h2>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="group">
              <div className="bg-gray-200 aspect-[3/2] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500 text-sm mb-3 group-hover:shadow-lg transition-shadow">
                600×400
              </div>
              <p className="text-center text-base font-medium">園庭</p>
            </div>
            <div className="group">
              <div className="bg-gray-200 aspect-[3/2] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500 text-sm mb-3 group-hover:shadow-lg transition-shadow">
                600×400
              </div>
              <p className="text-center text-base font-medium">保育室</p>
            </div>
            <div className="group">
              <div className="bg-gray-200 aspect-[3/2] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center text-gray-500 text-sm mb-3 group-hover:shadow-lg transition-shadow">
                600×400
              </div>
              <p className="text-center text-base font-medium">給食</p>
            </div>
          </div>

          <div className="text-center">
            <a
              href="https://drive.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              もっと写真を見る
            </a>
          </div>
        </div>
      </section>

      {/* 6. 入園案内（フロー＋料金表） */}
      <section id="enrollment" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">入園案内</h2>

          {/* 入園フロー */}
          <h3 className="text-lg font-bold mb-6 text-center">ご入園までの流れ</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 mb-12">
            {[
              { step: 1, icon: '📞', title: 'お問い合わせ', desc: 'お電話またはフォームから' },
              { step: 2, icon: '🏠', title: '見学', desc: '園内をご案内します' },
              { step: 3, icon: '📝', title: '申込み', desc: '必要書類をご提出' },
              { step: 4, icon: '🤝', title: '面談', desc: 'お子様について伺います' },
              { step: 5, icon: '🎉', title: '入園', desc: 'ようこそSKY KIDSへ!' },
            ].map((item) => (
              <div
                key={item.step}
                className="flex-shrink-0 w-[180px] h-[160px] bg-[#E6F9FF] rounded-3xl p-4 flex flex-col items-center justify-center text-center"
              >
                <span className="text-[48px] mb-2">{item.icon}</span>
                <span className="text-sm font-bold text-[var(--primary-dark)]">STEP {item.step}</span>
                <span className="text-sm font-bold mt-1">{item.title}</span>
                <span className="text-xs text-gray-600 mt-1">{item.desc}</span>
              </div>
            ))}
          </div>

          {/* 料金表 */}
          <h3 className="text-lg font-bold mb-6 text-center">料金案内</h3>
          <div className="max-w-lg mx-auto">
            <div className="border-2 border-[var(--primary-color)] rounded-2xl overflow-hidden">
              {[
                { label: '入園料', value: settings.pricing.enrollmentFee },
                { label: '月額保育料（0〜2歳）', value: settings.pricing.monthlyFee0to2 },
                { label: '月額保育料（3〜5歳）', value: settings.pricing.monthlyFee3to5 },
                { label: '給食費', value: settings.pricing.mealFee },
                { label: '延長保育', value: settings.pricing.extendedCare },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`flex items-center h-12 px-6 text-base ${
                    index !== 0 ? 'border-t border-gray-200' : ''
                  }`}
                >
                  <span className="flex-1 font-medium">{item.label}</span>
                  <span className="text-[var(--primary-dark)] font-bold">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">
              ※料金は税込みです。詳細はお問い合わせください。
            </p>
          </div>
        </div>
      </section>

      {/* 7. 空き状況 */}
      <section id="availability" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-4">空き状況</h2>
          <p className="text-base text-center text-gray-600 mb-8">
            {settings.availability.asOfDate}現在の空き状況です。最新情報はお問い合わせください。
          </p>

          <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--primary-color)] text-white">
                  <th className="h-10 px-4 text-left text-sm font-bold">クラス</th>
                  <th className="h-10 px-4 text-center text-sm font-bold">空き</th>
                </tr>
              </thead>
              <tbody>
                {settings.availability.classes.map((item, index) => (
                  <tr key={item.name} className={index !== 0 ? 'border-t border-gray-100' : ''}>
                    <td className="h-10 px-4 text-base">{item.name}</td>
                    <td className="h-10 px-4 text-center text-base font-medium">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-6">
            <a
              href="https://docs.google.com/spreadsheets/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary-dark)] underline text-sm hover:no-underline"
            >
              詳細な空き状況を見る →
            </a>
          </div>
        </div>
      </section>

      {/* 8. 年間行事 */}
      <section id="events" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">年間行事</h2>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* 春 */}
            <div className="flex items-start gap-4">
              <span className="text-3xl">🌸</span>
              <div>
                <h3 className="font-bold text-lg text-pink-500 mb-2">春（4月〜6月）</h3>
                <ul className="text-base text-gray-700 space-y-1">
                  <li>・入園式・進級式</li>
                  <li>・こどもの日の会</li>
                  <li>・親子遠足</li>
                  <li>・健康診断</li>
                </ul>
              </div>
            </div>

            {/* 夏 */}
            <div className="flex items-start gap-4">
              <span className="text-3xl">🌻</span>
              <div>
                <h3 className="font-bold text-lg text-yellow-500 mb-2">夏（7月〜9月）</h3>
                <ul className="text-base text-gray-700 space-y-1">
                  <li>・七夕会</li>
                  <li>・プール遊び・水遊び</li>
                  <li>・夏祭り</li>
                  <li>・お泊まり保育</li>
                </ul>
              </div>
            </div>

            {/* 秋 */}
            <div className="flex items-start gap-4">
              <span className="text-3xl">🍁</span>
              <div>
                <h3 className="font-bold text-lg text-orange-500 mb-2">秋（10月〜12月）</h3>
                <ul className="text-base text-gray-700 space-y-1">
                  <li>・運動会</li>
                  <li>・ハロウィン</li>
                  <li>・秋の遠足</li>
                  <li>・クリスマス会</li>
                </ul>
              </div>
            </div>

            {/* 冬 */}
            <div className="flex items-start gap-4">
              <span className="text-3xl">❄️</span>
              <div>
                <h3 className="font-bold text-lg text-blue-500 mb-2">冬（1月〜3月）</h3>
                <ul className="text-base text-gray-700 space-y-1">
                  <li>・お正月遊び</li>
                  <li>・節分・豆まき</li>
                  <li>・ひな祭り</li>
                  <li>・卒園式</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. スタッフ紹介 */}
      <section id="staff" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">スタッフ紹介</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {staff.slice(0, 3).map((member) => (
              <div key={member.id} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                  写真
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-sm text-[var(--primary-dark)] mb-2">経験{member.years}年</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.message}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/staff" className="btn-primary inline-block">
              スタッフ一覧へ
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">よくあるご質問</h2>
          <FAQSection />
        </div>
      </section>

      {/* 11. アクセス */}
      <section id="access" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">アクセス</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-200 aspect-video rounded-2xl flex items-center justify-center text-gray-500">
              Google Map 埋め込み
            </div>
            <div className="text-base leading-[1.7]">
              <h3 className="font-bold text-lg mb-4">SKY KIDS</h3>
              <dl className="space-y-3">
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">住所</dt>
                  <dd className="text-gray-700">
                    〒899-4332<br />
                    鹿児島県霧島市国分中央1-2-3
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">電話</dt>
                  <dd className="text-gray-700">0995-12-3456</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">保育時間</dt>
                  <dd className="text-gray-700">
                    月〜金 7:30〜19:00<br />
                    土 8:00〜17:00
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">休園日</dt>
                  <dd className="text-gray-700">日曜・祝日・年末年始</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">アクセス</dt>
                  <dd className="text-gray-700">○○線「△△駅」徒歩5分</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* 12. 見学申込み */}
      <section id="tour" className="py-16 bg-[var(--primary-color)]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">見学申込み</h2>
          <p className="text-white mb-8 text-base">
            見学は随時受け付けております。<br />
            お気軽にお申し込みください。
          </p>
          <a
            href="https://forms.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-[90%] max-w-md bg-white text-[var(--primary-dark)] font-bold py-4 rounded-full text-lg hover:bg-[var(--accent-color)] transition-colors shadow-lg"
          >
            見学を申し込む
          </a>
        </div>
      </section>
    </PublicLayout>
  );
}
