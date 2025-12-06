import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getFileContent, updateFile } from '@/lib/githubClient';
import type { Settings } from '@/types';

const DATA_PATH = 'src/data/settings.json';

async function requireAuth() {
  const session = await getSession();
  if (!session || session.sub !== 'admin') {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  try {
    const result = await getFileContent(DATA_PATH);

    if (!result) {
      return NextResponse.json({ error: '設定が見つかりません' }, { status: 404 });
    }

    const settings: Settings = JSON.parse(result.content);
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: '設定の取得に失敗しました' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const data: Settings = await request.json();

    // Validate pricing
    if (!data.pricing) {
      return NextResponse.json({ error: '料金情報が必要です' }, { status: 400 });
    }

    // Validate availability
    if (!data.availability || !data.availability.asOfDate || !data.availability.classes) {
      return NextResponse.json({ error: '空き状況情報が必要です' }, { status: 400 });
    }

    const result = await getFileContent(DATA_PATH);
    const sha = result?.sha;

    await updateFile(
      DATA_PATH,
      JSON.stringify(data, null, 2),
      'Update settings',
      sha
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: '設定の更新に失敗しました' }, { status: 500 });
  }
}
