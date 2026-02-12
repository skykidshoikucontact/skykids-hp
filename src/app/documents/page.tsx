import Link from 'next/link';
import PublicLayout from '@/components/PublicLayout';
import { getFileContent } from '@/lib/githubClient';
import type { Document } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: '書類ダウンロード | SKY KIDS',
  description: 'SKY KIDSの各種書類をダウンロードできます。',
};

async function getDocuments(): Promise<Document[]> {
  try {
    const result = await getFileContent('src/data/documents.json');
    if (!result) return [];
    const data = JSON.parse(result.content);
    return data.documents || [];
  } catch {
    return [];
  }
}

export default async function DocumentsPage() {
  const documents = await getDocuments();

  // Group by category
  const groupedDocuments = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  // Sort each category by order
  Object.values(groupedDocuments).forEach(docs => {
    docs.sort((a, b) => a.order - b.order);
  });

  return (
    <PublicLayout>
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[var(--primary-color)]">ホーム</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">書類ダウンロード</span>
          </nav>

          <h1 className="text-3xl font-bold mb-8 text-center">書類ダウンロード</h1>

          <p className="text-center text-gray-600 mb-10">
            各種書類をダウンロードしてご利用ください。<br />
            ご不明な点はお気軽にお問い合わせください。
          </p>

          {/* Documents List */}
          {Object.entries(groupedDocuments).map(([category, docs]) => (
            <section key={category} className="mb-8">
              <h2 className="text-xl font-bold text-[var(--primary-dark)] mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-[var(--accent-color)] rounded-full flex items-center justify-center text-sm">📄</span>
                {category}
              </h2>
              <div className="bg-white border rounded-lg overflow-hidden">
                {docs.filter(doc => doc.url).map((doc, docIndex) => (
                  <div
                    key={doc.id}
                    className={`flex items-center justify-between gap-4 px-5 py-4 hover:bg-gray-50 transition-colors ${
                      docIndex < docs.filter(d => d.url).length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="font-medium">{doc.name}</p>
                      {doc.description && (
                        <p className="text-sm text-gray-500 mt-0.5">{doc.description}</p>
                      )}
                    </div>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-[var(--primary-color)] hover:text-[var(--primary-dark)] transition-colors p-2"
                      aria-label={`${doc.name}をダウンロード`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" />
                      </svg>
                    </a>
                  </div>
                ))}
                {docs.filter(doc => doc.url).length === 0 && (
                  <p className="text-center text-gray-500 py-4">現在ダウンロード可能な書類はありません</p>
                )}
              </div>
            </section>
          ))}

          {documents.length === 0 && (
            <p className="text-center text-gray-500 py-8">現在ダウンロード可能な書類はありません</p>
          )}

          {/* Note */}
          <div className="bg-[var(--accent-color)] rounded-lg p-6 mb-10">
            <h3 className="font-bold text-lg mb-3">ご注意</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>• 書類はPDF形式です。閲覧にはAdobe Readerなどが必要です。</li>
              <li>• 記入方法がわからない場合はお気軽にお問い合わせください。</li>
            </ul>
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
