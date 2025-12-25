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
                src="/images/skykids_view.webp"
                alt="SKY KIDS 施設の様子"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-[var(--primary-dark)]">
                忙しいお母さんお父さんの<br />
                子育てを応援しています！
              </h3>
              <p className="text-sm text-emerald-500 font-medium mb-6">
                実家に頼れない日も、安心して預けられる場所
              </p>
              <p className="text-base leading-[1.7] text-gray-700 mb-6">
                「預け先がなくて、仕事を調整するしかない」<br />
                「頼れる人が近くにいない」<br />
                そんな毎日の悩みに寄り添い、<br />
                保護者の皆さまの子育てを支えたいと考えています。
              </p>
              <p className="text-base leading-[1.7] text-gray-700 mb-6">
                小規模な施設だからこそ、<br />
                お子さま一人ひとりと向き合い、<br />
                その子のペースを大切にしたサポートを行っています。
              </p>
              <p className="text-base leading-[1.7] text-gray-700">
                スタッフ・看護師が在籍しているため、<br />
                小さなお子さまも安心。<br />
                初めての預け先としてもご利用いただけます。
              </p>
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
              src="/images/skykids_yellowline.webp"
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
            <p className="mb-6">
              心配ごとや小さな不安も、どうぞ気軽にご相談ください。<br />
              私たちは、忙しい保護者の皆さまと一緒に、<br />
              お子さまの成長を見守る児童クラブです。
            </p>
            <p className="mb-6">
              宿題は、スタッフが声かけをしながら帰宅前に取り組む習慣づくりをサポート。<br />
              「帰ってから宿題を見る余裕がない…」そんな日でも、<br />
              ご家庭の時間をゆったり過ごせるようお手伝いします。
            </p>
            <p>
              晴れた日は公園で思いきり体を動かし、<br />
              雨の日も室内での遊びや学びを工夫して過ごします。<br />
              毎日が安心で、ちょっと楽しみになる場所を目指しています。
            </p>
          </div>

          {/* 写真グリッド 2列 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden">
              <img src="/images/indoor_playground_01.webp" alt="室内遊び場" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden">
              <img src="/images/desks.webp" alt="学習スペース" className="w-full h-full object-cover" />
            </div>
            <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden col-span-2">
              <img src="/images/children_playtime_06.webp" alt="遊びの様子" className="w-full h-full object-cover object-bottom" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. SKY KIDSでの生活（写真ギャラリー） */}
      <section id="life" className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">SKY KIDSでの生活</h2>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="group">
              <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                <img src="/images/children_playtime_01.webp" alt="生活の様子1" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-base font-medium">今日もひとつできた！</p>
            </div>
            <div className="group">
              <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                <img src="/images/children_playtime_02.webp" alt="生活の様子2" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-base font-medium">楽しさが学びになる</p>
            </div>
            <div className="group">
              <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                <img src="/images/children_playtime_03.webp" alt="生活の様子3" className="w-full h-full object-cover object-top" />
              </div>
              <p className="text-center text-base font-medium">やさしさがあつまる放課後</p>
            </div>
            <div className="group">
              <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden mb-3 group-hover:shadow-lg transition-shadow">
                <img src="/images/children_playtime_07.webp" alt="食育の様子" className="w-full h-full object-cover" />
              </div>
              <p className="text-center text-base font-medium">育てる心を育む</p>
            </div>
          </div>

        </div>
      </section>

      {/* 食事のご紹介 */}
      <section id="meals" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10">食事のご紹介</h2>
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
                { label: '月額利用料（0〜2歳）', value: settings.pricing.monthlyFee0to2 },
                { label: '月額利用料（3歳以上）', value: settings.pricing.monthlyFee3to5 },
                { label: 'おやつ代', value: settings.pricing.mealFee },
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
                <div className="mt-3 w-48 h-32 rounded-lg overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400&q=80" alt="桜" className="w-full h-full object-cover" />
                </div>
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
                <div className="mt-3 w-48 h-32 rounded-lg overflow-hidden">
                  <img src="/images/harvest_experience.webp" alt="収穫体験" className="w-full h-full object-cover" />
                </div>
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
                <div className="mt-3 w-48 h-32 rounded-lg overflow-hidden">
                  <img src="/images/Halloween_pumpkins.webp" alt="ハロウィンかぼちゃ" className="w-full h-full object-cover" />
                </div>
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
                <div className="mt-3 w-48 h-32 rounded-lg overflow-hidden">
                  <img src="/images/hina_matsuri.webp" alt="ひな祭り" className="w-full h-full object-cover" />
                </div>
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
            href="https://docs.google.com/forms/d/e/1FAIpQLSdjMbznJ6oPyulEHHs92ZslfFip8T--3h4BuOqm2UFdeI3uwQ/viewform"
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
            <div className="aspect-video rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3352.8!2d130.7658!3d31.7480!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDQ0JzUyLjciTiAxMzDCsDQ1JzU2LjkiRQ!5e0!3m2!1sja!2sjp!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="text-base leading-[1.7]">
              <h3 className="font-bold text-lg mb-4">児童クラブ SKY KIDS</h3>
              <dl className="space-y-3">
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">住所</dt>
                  <dd className="text-gray-700">
                    〒899-4353<br />
                    鹿児島県霧島市国分向花町8-48
                  </dd>
                </div>
                <div className="flex gap-3">
                  <dt className="font-bold w-20 shrink-0">電話</dt>
                  <dd className="text-gray-700">0995-70-6623</dd>
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
                  <dd className="text-gray-700">向花五叉路（ファミリーマート）近く</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
