import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getFileContent, updateFile } from '@/lib/githubClient';
import type { NewsItem } from '@/types';

const DATA_PATH = 'src/data/news.json';

async function requireAuth() {
  const session = await getSession();
  if (!session || session.sub !== 'admin') {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
  }
  return null;
}

function validateNewsItem(data: Partial<NewsItem>): { valid: boolean; error?: string } {
  if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    return { valid: false, error: '正しい日付形式（YYYY-MM-DD）を入力してください' };
  }
  if (!data.title || data.title.length < 1 || data.title.length > 50) {
    return { valid: false, error: 'タイトルは1〜50文字で入力してください' };
  }
  if (data.body && data.body.length > 1000) {
    return { valid: false, error: '本文は1000文字以内で入力してください' };
  }
  return { valid: true };
}

export async function GET() {
  try {
    // For GET, we allow public access to read news
    // In production, you might want to add caching headers
    const result = await getFileContent(DATA_PATH);

    if (!result) {
      return NextResponse.json([]);
    }

    const news: NewsItem[] = JSON.parse(result.content);
    // Sort by date descending
    news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'お知らせの取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const data = await request.json();
    const validation = validateNewsItem(data);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = await getFileContent(DATA_PATH);
    const news: NewsItem[] = result ? JSON.parse(result.content) : [];
    const sha = result?.sha;

    const newItem: NewsItem = {
      id: `${data.date}-${Date.now().toString(36)}`,
      date: data.date,
      title: data.title,
      body: data.body || '',
    };

    news.unshift(newItem);

    await updateFile(
      DATA_PATH,
      JSON.stringify(news, null, 2),
      `Add news: ${newItem.title}`,
      sha
    );

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ error: 'お知らせの作成に失敗しました' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ error: 'IDが必要です' }, { status: 400 });
    }

    const validation = validateNewsItem(data);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = await getFileContent(DATA_PATH);
    if (!result) {
      return NextResponse.json({ error: 'データが見つかりません' }, { status: 404 });
    }

    const news: NewsItem[] = JSON.parse(result.content);
    const index = news.findIndex((item) => item.id === data.id);

    if (index === -1) {
      return NextResponse.json({ error: 'お知らせが見つかりません' }, { status: 404 });
    }

    news[index] = {
      ...news[index],
      date: data.date,
      title: data.title,
      body: data.body || '',
    };

    await updateFile(
      DATA_PATH,
      JSON.stringify(news, null, 2),
      `Update news: ${news[index].title}`,
      result.sha
    );

    return NextResponse.json(news[index]);
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json({ error: 'お知らせの更新に失敗しました' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ error: 'IDが必要です' }, { status: 400 });
    }

    const result = await getFileContent(DATA_PATH);
    if (!result) {
      return NextResponse.json({ error: 'データが見つかりません' }, { status: 404 });
    }

    const news: NewsItem[] = JSON.parse(result.content);
    const index = news.findIndex((item) => item.id === data.id);

    if (index === -1) {
      return NextResponse.json({ error: 'お知らせが見つかりません' }, { status: 404 });
    }

    const deletedItem = news[index];
    news.splice(index, 1);

    await updateFile(
      DATA_PATH,
      JSON.stringify(news, null, 2),
      `Delete news: ${deletedItem.title}`,
      result.sha
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json({ error: 'お知らせの削除に失敗しました' }, { status: 500 });
  }
}
