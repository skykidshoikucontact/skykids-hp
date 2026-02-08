import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';

export const metadata = {
  title: '一日の流れ | SKY KIDS',
  description: 'SKY KIDSでの一日の過ごし方をご紹介します。',
};

const weekdaySchedule = [
  { time: '下校時', activity: 'お迎え・来所', icon: '🏫', description: '学校までお迎えに行きます' },
  { time: '〜15:30', activity: '宿題タイム', icon: '📚', description: 'スタッフがサポートします' },
  { time: '15:30', activity: 'おやつ', icon: '🍪', description: 'おやつをみんなで' },
  { time: '16:00', activity: '自由遊び', icon: '⚽', description: '外遊びや室内遊び' },
  { time: '17:00', activity: '室内活動', icon: '🎨', description: '読書や工作など' },
  { time: '〜19:00', activity: 'お迎え・帰宅', icon: '👋', description: '保護者のお迎え' },
];

const saturdaySchedule = [
  { time: '7:30', activity: '開所・受入れ', icon: '🌅', description: '順次登所' },
  { time: '9:00', activity: '朝の会', icon: '☀️', description: '今日の予定を確認' },
  { time: '9:30', activity: '午前の活動', icon: '🎯', description: '外遊びやイベント' },
  { time: '12:00', activity: '昼食', icon: '🍱', description: '調理師による手作り給食' },
  { time: '13:00', activity: '休憩・自由時間', icon: '😴', description: 'ゆっくり過ごします' },
  { time: '14:00', activity: '午後の活動', icon: '🎪', description: '工作や集団遊び' },
  { time: '15:30', activity: 'おやつ', icon: '🍪', description: 'おやつ' },
  { time: '16:00', activity: '自由遊び', icon: '🎲', description: '好きな遊びを' },
  { time: '〜19:00', activity: 'お迎え・帰宅', icon: '👋', description: '保護者のお迎え' },
];

export default function SchedulePage() {
  return (
    <PublicLayout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[var(--primary-color)]">ホーム</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">一日の流れ</span>
          </nav>

          <h1 className="text-3xl font-bold mb-8 text-center">一日の流れ</h1>

          <p className="text-center text-gray-600 mb-10">
            SKY KIDSでの一日の過ごし方をご紹介します。<br />
            お子様が安心して楽しく過ごせる環境を整えています。
          </p>

          {/* 平日スケジュール */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
              <span className="text-3xl">📅</span>
              平日のスケジュール
            </h2>
            <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="relative">
                {weekdaySchedule.map((item, index) => (
                  <div key={index} className="flex gap-4 mb-6 last:mb-0">
                    {/* タイムライン */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                      {index < weekdaySchedule.length - 1 && (
                        <div className="w-0.5 h-full bg-[var(--primary-light)] mt-2 min-h-[20px]"></div>
                      )}
                    </div>
                    {/* コンテンツ */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-bold text-[var(--primary-dark)] bg-[var(--accent-color)] px-3 py-1 rounded-full">
                          {item.time}
                        </span>
                        <span className="font-bold text-lg">{item.activity}</span>
                      </div>
                      <p className="text-gray-600 text-sm ml-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 土曜日・長期休暇スケジュール */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
              <span className="text-3xl">🌈</span>
              土曜日・長期休暇のスケジュール
            </h2>
            <div className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="relative">
                {saturdaySchedule.map((item, index) => (
                  <div key={index} className="flex gap-4 mb-6 last:mb-0">
                    {/* タイムライン */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-2xl">
                        {item.icon}
                      </div>
                      {index < saturdaySchedule.length - 1 && (
                        <div className="w-0.5 h-full bg-[var(--accent-color)] mt-2 min-h-[20px]"></div>
                      )}
                    </div>
                    {/* コンテンツ */}
                    <div className="flex-1 pb-4">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-sm font-bold text-[var(--primary-dark)] bg-gray-100 px-3 py-1 rounded-full">
                          {item.time}
                        </span>
                        <span className="font-bold text-lg">{item.activity}</span>
                      </div>
                      <p className="text-gray-600 text-sm ml-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 補足情報 */}
          <section className="bg-[var(--accent-color)] rounded-lg p-6 mb-10">
            <h3 className="font-bold text-lg mb-3">ご案内</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• スケジュールは目安です。活動内容により変更になる場合があります。</li>
              <li>• 習い事への送迎も行っています。お気軽にご相談ください。</li>
              <li>• 長期休暇中は特別イベントを実施することがあります。</li>
            </ul>
          </section>

          {/* CTA */}
          <div className="text-center">
            <p className="text-gray-600 mb-4">見学のお申し込みはこちらから</p>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdjMbznJ6oPyulEHHs92ZslfFip8T--3h4BuOqm2UFdeI3uwQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--primary-color)] text-white font-bold py-4 px-8 rounded-full text-lg hover:bg-[var(--primary-dark)] transition-colors shadow-lg"
            >
              見学を申し込む
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
