import { requireAdminAuth } from '@/lib/authGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import SettingsManager from './SettingsManager';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  await requireAdminAuth();

  return (
    <>
      <AdminHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">設定管理</h1>
        <SettingsManager />
      </main>
    </>
  );
}
