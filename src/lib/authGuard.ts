import { redirect } from 'next/navigation';
import { getSession } from './auth';

export async function requireAdminAuth(): Promise<void> {
  const session = await getSession();

  if (!session || session.sub !== 'admin') {
    redirect('/admin/login');
  }
}
