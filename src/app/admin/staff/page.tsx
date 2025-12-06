import { requireAdminAuth } from '@/lib/authGuard';
import AdminHeader from '@/components/admin/AdminHeader';
import StaffManager from './StaffManager';

export const dynamic = 'force-dynamic';

export default async function AdminStaffPage() {
  await requireAdminAuth();

  return (
    <>
      <AdminHeader />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">スタッフ管理</h1>
        <StaffManager />
      </main>
    </>
  );
}
