import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { validateCsrfToken } from '@/lib/csrf';
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

async function requireCsrf(request: NextRequest) {
  const isValid = await validateCsrfToken(request);
  if (!isValid) {
    return NextResponse.json({ error: 'CSRFトークンが無効です' }, { status: 403 });
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

  const csrfError = await requireCsrf(request);
  if (csrfError) return csrfError;

  try {
    const data: Settings = await request.json();

    // Validate pricing
    if (!data.pricing) {
      return NextResponse.json({ error: '料金情報が必要です' }, { status: 400 });
    }

    // セキュリティ: 価格データの型・形式検証
    const pricingFields = ['enrollmentFee', 'insuranceFee', 'monthlyFee', 'singleParentFee', 'mealFee', 'extendedCare', 'longVacationFee'];
    for (const field of pricingFields) {
      const value = data.pricing[field as keyof typeof data.pricing];
      if (typeof value !== 'string' || value.length > 50) {
        return NextResponse.json({ error: `料金情報（${field}）が不正です` }, { status: 400 });
      }
    }

    // Validate availability
    if (!data.availability || !data.availability.asOfDate || !data.availability.classes) {
      return NextResponse.json({ error: '空き状況情報が必要です' }, { status: 400 });
    }

    // セキュリティ: 空き状況データの検証
    if (typeof data.availability.asOfDate !== 'string' || data.availability.asOfDate.length > 50) {
      return NextResponse.json({ error: '日付情報が不正です' }, { status: 400 });
    }
    if (!Array.isArray(data.availability.classes) || data.availability.classes.length > 20) {
      return NextResponse.json({ error: 'クラス情報が不正です' }, { status: 400 });
    }
    for (const cls of data.availability.classes) {
      if (typeof cls.name !== 'string' || cls.name.length > 50 ||
          typeof cls.status !== 'string' || cls.status.length > 20) {
        return NextResponse.json({ error: 'クラス情報の形式が不正です' }, { status: 400 });
      }
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
