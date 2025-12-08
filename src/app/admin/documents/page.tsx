import { requireAdminAuth } from '@/lib/authGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import DocumentsManager from './DocumentsManager';

export const dynamic = 'force-dynamic';

export default async function AdminDocumentsPage() {
  await requireAdminAuth();

  return (
    <>
      <AdminHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">書類ダウンロード管理</h1>
        <DocumentsManager />
      </main>
    </>
  );
}
