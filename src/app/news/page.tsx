import Link from 'next/link';
import { getNews } from '@/lib/dataFetcher';
import PublicLayout from '@/components/PublicLayout';

export const metadata = {
  title: 'お知らせ | SKY KIDS',
  description: 'SKY KIDSからのお知らせ一覧ページです。',
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <PublicLayout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[var(--primary-color)]">ホーム</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">お知らせ</span>
          </nav>

          <h1 className="text-3xl font-bold mb-8 text-center">お知らせ</h1>

          <div className="space-y-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <time className="text-sm text-[var(--primary-dark)] font-medium bg-[var(--primary-light)] bg-opacity-30 px-3 py-1 rounded-full w-fit shrink-0">
                    {item.date}
                  </time>
                  <div className="flex-grow">
                    <h2 className="font-bold text-lg mb-3">{item.title}</h2>
                    <p className="text-gray-600 whitespace-pre-wrap">{item.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {news.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              現在、お知らせはありません。
            </p>
          )}

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
