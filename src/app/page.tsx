import Link from 'next/link';
import { getNews, getSettings } from '@/lib/dataFetcher';
import PublicLayout from '@/components/PublicLayout';
import HeroSlider from '@/components/HeroSlider';
import FAQPreview from '@/components/FAQPreview';
import MealsCarousel from '@/components/MealsCarousel';

export default async function HomePage() {
  const news = await getNews();
  const settings = await getSettings();

  const latestNews = news.slice(0, 3);

  return (
    <PublicLayout>
      {/* 工事中バナー */}
      <div className="bg-yellow-400 text-center py-3 px-4">
        <p className="text-sm font-bold text-yellow-900">
          🚧 このサイトは現在準備中です 🚧
        </p>
      </div>

      {/* Hero Slider */}
      <HeroSlider />

      {/* SKY KIDSについて */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">SKY KIDSについて</h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden">
              <img
                src="/images/skykids_view.jpg"
                alt="SKY KIDS 施設の様子"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4 text-[var(--primary-dark)]">
                忙しいお母さんお父さんの<br />
                子育てを応援！
              </h3>
              <p className="text-base leading-[1.7] text-gray-700 mb-4">
                仕事をする上でどうしても子供を預けないといけない時ってありますよね。
                実家に預けるにも毎日は難しかったり、預けにくかったり。
                そんな体験から、安心してもっと気兼ねなく子どもを預けられるようになればと思い開所しました。
              </p>
              <p className="text-base leading-[1.7] text-gray-700 mb-6">
                小規模な学童保育だからこそ、アットホームな雰囲気の中でお子様一人一人の成長を見守り、学習支援を行っております。
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-[var(--primary-dark)] text-sm">✓</span>
                  <span className="text-base">児童クラブ・一時預かり対応</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-[var(--primary-dark)] text-sm">✓</span>
                  <span className="text-base">経験豊富な保育士・看護師在籍</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-7 h-7 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-[var(--primary-dark)] text-sm">✓</span>
                  <span className="text-base">0歳から一時預かり可能</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ */}
      <section id="news" className="pt-16 pb-8 bg-[var(--accent-color)]">
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
              className="w-[300%] max-w-none h-auto translate-x-7"
            />
          </div>
        </div>
      </section>

      {/* 施設の紹介 */}
      <section id="intro" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">施設の紹介</h2>

          <div className="text-base leading-[1.7] text-gray-700 mb-10">
            <p className="mb-4">
              心配事や不安など、一人で悩まず何でも気軽に話して安心して預けられるように保護者に寄り添いお子様を全力でサポート致します。
            </p>
            <p className="mb-4">
              まず「宿題を終わらせること」を習慣づけられるようにサポートを行っております。
              帰宅後に宿題をする負担が減り、保護者や子どもの時間を充実させることもできます。
            </p>
            <p>
              室内遊びだけでなく、お天気のいい日は公園に出かけます。室内遊びも充実していますよ！
            </p>
          </div>

          {/* 写真グリッド 2列×3枚 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden">
              <img src="/images/skykids_view.jpg" alt="施設外観" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden">
              <img src="/images/desks.jpg" alt="学習スペース" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden col-span-2 md:col-span-1">
              <img src="/images/children_playtime_03.jpg" alt="遊びスペース" className="w-full h-full object-cover" />
            </div>
            <div className="hidden md:block aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden">
              <img src="/images/children_playtime_01.jpg" alt="室内遊び" className="w-full h-full object-cover" />
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
              <div className="aspect-[3/2] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                <img src="/images/children_playtime_01.jpg" alt="生活の様子1" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-base font-medium">みんなで遊ぶ時間</p>
            </div>
            <div className="group">
              <div className="aspect-[3/2] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                <img src="/images/children_playtime_02.jpg" alt="生活の様子2" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-base font-medium">楽しい活動</p>
            </div>
            <div className="group">
              <div className="aspect-[3/2] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                <img src="/images/children_playtime_03.jpg" alt="生活の様子3" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-base font-medium">のびのび過ごす</p>
            </div>
          </div>

        </div>
      </section>

      {/* 給食のご紹介 */}
      <section id="meals" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">給食のご紹介</h2>
          <MealsCarousel />
        </div>
      </section>

      {/* 6. 入会案内（フロー＋料金表） */}
      <section id="enrollment" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">入会案内</h2>

          {/* 入会フロー */}
          <h3 className="text-lg font-bold mb-6 text-center">ご入会までの流れ</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 mb-12">
            {[
              { step: 1, icon: '📞', title: 'お問い合わせ', desc: 'お電話またはフォームから' },
              { step: 2, icon: '🏠', title: '見学', desc: '施設内をご案内します' },
              { step: 3, icon: '📝', title: '申込み', desc: '必要書類をご提出' },
              { step: 4, icon: '🤝', title: '面談', desc: 'お子様について伺います' },
              { step: 5, icon: '🎉', title: '入会', desc: 'ようこそSKY KIDSへ!' },
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
                { label: '入会金', value: settings.pricing.enrollmentFee },
                { label: '月額利用料', value: settings.pricing.monthlyFee0to2 },
                { label: '延長料金', value: settings.pricing.extendedCare },
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
              ※1人親世帯割引、兄弟・姉妹割引あり。詳細はお問い合わせください。
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
                  <li>・新年度スタート</li>
                  <li>・こどもの日イベント</li>
                  <li>・野菜の苗植え（食育）</li>
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
                  <li>・水遊び</li>
                  <li>・夏休み特別プログラム</li>
                  <li>・野菜の収穫</li>
                </ul>
              </div>
            </div>

            {/* 秋 */}
            <div className="flex items-start gap-4">
              <span className="text-3xl">🍁</span>
              <div>
                <h3 className="font-bold text-lg text-orange-500 mb-2">秋（10月〜12月）</h3>
                <ul className="text-base text-gray-700 space-y-1">
                  <li>・ハロウィンイベント</li>
                  <li>・公園遊び・秋の自然観察</li>
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
                  <li>・進級・卒業お祝い</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">よくあるご質問</h2>
          <FAQPreview />
        </div>
      </section>

      {/* 11. 見学申込み */}
      <section id="tour" className="py-16 bg-[var(--accent-color)]">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">見学申込み</h2>
          <p className="text-gray-700 mb-8 text-base">
            見学は随時受け付けております。<br />
            お気軽にお申し込みください。
          </p>
          <a
            href="https://forms.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-[90%] max-w-md bg-[var(--primary-color)] text-white font-bold py-4 rounded-full text-lg hover:bg-[var(--primary-dark)] transition-colors shadow-lg"
          >
            見学を申し込む
          </a>
        </div>
      </section>

      {/* 12. アクセス */}
      <section id="access" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">アクセス</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-200 aspect-video rounded-2xl flex items-center justify-center text-gray-500">
              Google Map 埋め込み
            </div>
            <div className="text-base leading-[1.7]">
              <h3 className="font-bold text-lg mb-4">児童クラブ SKY KIDS</h3>
              <dl className="space-y-3">
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">住所</dt>
                  <dd className="text-gray-700">
                    〒899-XXXX<br />
                    鹿児島県霧島市国分○○町X-XX
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">電話</dt>
                  <dd className="text-gray-700">0995-XX-XXXX</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">営業時間</dt>
                  <dd className="text-gray-700">
                    月〜金 11:00〜19:00<br />
                    土 7:30〜19:00
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">定休日</dt>
                  <dd className="text-gray-700">日曜日</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">アクセス</dt>
                  <dd className="text-gray-700">○○近く</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
