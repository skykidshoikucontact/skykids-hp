import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { validateCsrfToken } from '@/lib/csrf';
import { getFileContent, updateFile } from '@/lib/githubClient';
import type { Document } from '@/types';

const DATA_PATH = 'src/data/documents.json';

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

function validateDocument(data: Partial<Document>): { valid: boolean; error?: string } {
  if (!data.name || data.name.length < 1 || data.name.length > 100) {
    return { valid: false, error: '書類名は1〜100文字で入力してください' };
  }
  if (!data.category || data.category.length < 1 || data.category.length > 50) {
    return { valid: false, error: 'カテゴリは1〜50文字で入力してください' };
  }
  if (data.description && data.description.length > 200) {
    return { valid: false, error: '説明は200文字以内で入力してください' };
  }
  if (data.url && data.url.length > 500) {
    return { valid: false, error: 'URLは500文字以内で入力してください' };
  }
  return { valid: true };
}

export async function GET() {
  try {
    const result = await getFileContent(DATA_PATH);

    if (!result) {
      return NextResponse.json([]);
    }

    const data = JSON.parse(result.content);
    const documents: Document[] = data.documents || [];
    // Sort by order
    documents.sort((a, b) => a.order - b.order);

    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: '書類の取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const csrfError = await requireCsrf(request);
  if (csrfError) return csrfError;

  try {
    const data = await request.json();
    const validation = validateDocument(data);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = await getFileContent(DATA_PATH);
    const fileData = result ? JSON.parse(result.content) : { documents: [] };
    const documents: Document[] = fileData.documents || [];
    const sha = result?.sha;

    const maxOrder = documents.reduce((max, doc) => Math.max(max, doc.order), 0);

    const newItem: Document = {
      id: Date.now().toString(36),
      category: data.category,
      name: data.name,
      description: data.description || '',
      url: data.url || '',
      order: maxOrder + 1,
    };

    documents.push(newItem);

    await updateFile(
      DATA_PATH,
      JSON.stringify({ documents }, null, 2),
      `Add document: ${newItem.name}`,
      sha
    );

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json({ error: '書類の作成に失敗しました' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const csrfError = await requireCsrf(request);
  if (csrfError) return csrfError;

  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ error: 'IDが必要です' }, { status: 400 });
    }

    const validation = validateDocument(data);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = await getFileContent(DATA_PATH);
    if (!result) {
      return NextResponse.json({ error: 'データが見つかりません' }, { status: 404 });
    }

    const fileData = JSON.parse(result.content);
    const documents: Document[] = fileData.documents || [];
    const index = documents.findIndex((item) => item.id === data.id);

    if (index === -1) {
      return NextResponse.json({ error: '書類が見つかりません' }, { status: 404 });
    }

    documents[index] = {
      ...documents[index],
      category: data.category,
      name: data.name,
      description: data.description || '',
      url: data.url || '',
    };

    await updateFile(
      DATA_PATH,
      JSON.stringify({ documents }, null, 2),
      `Update document: ${documents[index].name}`,
      result.sha
    );

    return NextResponse.json(documents[index]);
  } catch (error) {
    console.error('Error updating document:', error);
    return NextResponse.json({ error: '書類の更新に失敗しました' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const csrfError = await requireCsrf(request);
  if (csrfError) return csrfError;

  try {
    const data = await request.json();

    if (!data.id) {
      return NextResponse.json({ error: 'IDが必要です' }, { status: 400 });
    }

    const result = await getFileContent(DATA_PATH);
    if (!result) {
      return NextResponse.json({ error: 'データが見つかりません' }, { status: 404 });
    }

    const fileData = JSON.parse(result.content);
    const documents: Document[] = fileData.documents || [];
    const index = documents.findIndex((item) => item.id === data.id);

    if (index === -1) {
      return NextResponse.json({ error: '書類が見つかりません' }, { status: 404 });
    }

    const deletedItem = documents[index];
    documents.splice(index, 1);

    await updateFile(
      DATA_PATH,
      JSON.stringify({ documents }, null, 2),
      `Delete document: ${deletedItem.name}`,
      result.sha
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting document:', error);
    return NextResponse.json({ error: '書類の削除に失敗しました' }, { status: 500 });
  }
}
