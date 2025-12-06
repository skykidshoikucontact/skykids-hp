import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';

export default async function AdminIndexPage() {
  const session = await getSession();

  if (session && session.sub === 'admin') {
    redirect('/admin/news');
  } else {
    redirect('/admin/login');
  }
}
