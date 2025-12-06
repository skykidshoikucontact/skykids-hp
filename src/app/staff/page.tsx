import Link from 'next/link';
import Image from 'next/image';
import { getStaff } from '@/lib/dataFetcher';
import PublicLayout from '@/components/PublicLayout';

export const metadata = {
  title: 'スタッフ紹介 | SKY KIDS',
  description: 'SKY KIDSのスタッフ紹介ページです。',
};

export default async function StaffPage() {
  const staff = await getStaff();

  return (
    <PublicLayout>
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-[var(--primary-color)]">ホーム</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">スタッフ紹介</span>
          </nav>

          <h1 className="text-3xl font-bold mb-4 text-center">スタッフ紹介</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            SKY KIDSでは、経験豊富で愛情あふれるスタッフが、<br className="hidden md:block" />
            お子様一人ひとりに寄り添った保育を行っています。
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member) => (
              <div
                key={member.id}
                className="bg-white border rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden relative">
                  {member.photo && member.photo !== '/images/staff/placeholder.jpg' ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      写真
                    </div>
                  )}
                </div>
                <h2 className="font-bold text-xl mb-2">{member.name}</h2>
                <p className="text-sm text-[var(--primary-dark)] mb-4 inline-block bg-[var(--primary-light)] bg-opacity-30 px-3 py-1 rounded-full">
                  経験年数: {member.years}年
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.message}</p>
              </div>
            ))}
          </div>

          {staff.length === 0 && (
            <p className="text-center text-gray-500 py-12">
              スタッフ情報は準備中です。
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
