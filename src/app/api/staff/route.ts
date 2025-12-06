import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getFileContent, updateFile, uploadImage, getImageSha, deleteFile } from '@/lib/githubClient';
import type { StaffMember } from '@/types';

const DATA_PATH = 'src/data/staff.json';
const IMAGE_PATH_PREFIX = 'public/images/staff';

async function requireAuth() {
  const session = await getSession();
  if (!session || session.sub !== 'admin') {
    return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
  }
  return null;
}

function validateStaffMember(data: {
  name?: string;
  years?: string;
  message?: string;
}): { valid: boolean; error?: string } {
  if (!data.name || data.name.length < 1 || data.name.length > 50) {
    return { valid: false, error: '氏名は1〜50文字で入力してください' };
  }

  const yearsNum = parseInt(data.years || '0', 10);
  if (isNaN(yearsNum) || yearsNum < 0 || yearsNum > 60) {
    return { valid: false, error: '経験年数は0〜60の整数で入力してください' };
  }

  if (data.message && data.message.length > 300) {
    return { valid: false, error: 'メッセージは300文字以内で入力してください' };
  }

  return { valid: true };
}

export async function GET() {
  try {
    const result = await getFileContent(DATA_PATH);

    if (!result) {
      return NextResponse.json([]);
    }

    const staff: StaffMember[] = JSON.parse(result.content);
    return NextResponse.json(staff);
  } catch (error) {
    console.error('Error fetching staff:', error);
    return NextResponse.json({ error: 'スタッフ情報の取得に失敗しました' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const years = formData.get('years') as string;
    const message = formData.get('message') as string;
    const photoFile = formData.get('photo') as File | null;

    const validation = validateStaffMember({ name, years, message });
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = await getFileContent(DATA_PATH);
    const staff: StaffMember[] = result ? JSON.parse(result.content) : [];
    const sha = result?.sha;

    const id = `staff-${Date.now().toString(36)}`;
    let photoPath = '/images/staff/placeholder.jpg';

    // Upload photo if provided
    if (photoFile && photoFile.size > 0) {
      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(photoFile.type)) {
        return NextResponse.json({ error: 'JPGまたはPNG形式の画像を選択してください' }, { status: 400 });
      }

      // Validate file size (2MB)
      if (photoFile.size > 2 * 1024 * 1024) {
        return NextResponse.json({ error: '画像サイズは2MB以下にしてください' }, { status: 400 });
      }

      const ext = photoFile.type === 'image/png' ? 'png' : 'jpg';
      const fileName = `${id}.${ext}`;
      const imagePath = `${IMAGE_PATH_PREFIX}/${fileName}`;

      const arrayBuffer = await photoFile.arrayBuffer();
      const base64Content = Buffer.from(arrayBuffer).toString('base64');

      await uploadImage(imagePath, base64Content, `Add staff photo: ${name}`);
      photoPath = `/images/staff/${fileName}`;
    }

    const newItem: StaffMember = {
      id,
      name,
      years: parseInt(years, 10),
      message: message || '',
      photo: photoPath,
    };

    staff.push(newItem);

    await updateFile(
      DATA_PATH,
      JSON.stringify(staff, null, 2),
      `Add staff: ${name}`,
      sha
    );

    return NextResponse.json(newItem);
  } catch (error) {
    console.error('Error creating staff:', error);
    return NextResponse.json({ error: 'スタッフの作成に失敗しました' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const years = formData.get('years') as string;
    const message = formData.get('message') as string;
    const currentPhoto = formData.get('currentPhoto') as string;
    const photoFile = formData.get('photo') as File | null;

    if (!id) {
      return NextResponse.json({ error: 'IDが必要です' }, { status: 400 });
    }

    const validation = validateStaffMember({ name, years, message });
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const result = await getFileContent(DATA_PATH);
    if (!result) {
      return NextResponse.json({ error: 'データが見つかりません' }, { status: 404 });
    }

    const staff: StaffMember[] = JSON.parse(result.content);
    const index = staff.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'スタッフが見つかりません' }, { status: 404 });
    }

    let photoPath = currentPhoto || staff[index].photo;

    // Upload new photo if provided
    if (photoFile && photoFile.size > 0) {
      // Validate file type
      if (!['image/jpeg', 'image/png'].includes(photoFile.type)) {
        return NextResponse.json({ error: 'JPGまたはPNG形式の画像を選択してください' }, { status: 400 });
      }

      // Validate file size (2MB)
      if (photoFile.size > 2 * 1024 * 1024) {
        return NextResponse.json({ error: '画像サイズは2MB以下にしてください' }, { status: 400 });
      }

      const ext = photoFile.type === 'image/png' ? 'png' : 'jpg';
      const fileName = `${id}.${ext}`;
      const imagePath = `${IMAGE_PATH_PREFIX}/${fileName}`;

      const arrayBuffer = await photoFile.arrayBuffer();
      const base64Content = Buffer.from(arrayBuffer).toString('base64');

      // Check if old image exists and get its sha
      const existingSha = await getImageSha(imagePath);

      await uploadImage(
        imagePath,
        base64Content,
        `Update staff photo: ${name}`,
        existingSha || undefined
      );
      photoPath = `/images/staff/${fileName}`;
    }

    staff[index] = {
      ...staff[index],
      name,
      years: parseInt(years, 10),
      message: message || '',
      photo: photoPath,
    };

    await updateFile(
      DATA_PATH,
      JSON.stringify(staff, null, 2),
      `Update staff: ${name}`,
      result.sha
    );

    return NextResponse.json(staff[index]);
  } catch (error) {
    console.error('Error updating staff:', error);
    return NextResponse.json({ error: 'スタッフの更新に失敗しました' }, { status: 500 });
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

    const staff: StaffMember[] = JSON.parse(result.content);
    const index = staff.findIndex((item) => item.id === data.id);

    if (index === -1) {
      return NextResponse.json({ error: 'スタッフが見つかりません' }, { status: 404 });
    }

    const deletedItem = staff[index];
    staff.splice(index, 1);

    // Try to delete the associated photo if it exists
    if (deletedItem.photo && !deletedItem.photo.includes('placeholder')) {
      try {
        const photoFileName = deletedItem.photo.split('/').pop();
        if (photoFileName) {
          const imagePath = `${IMAGE_PATH_PREFIX}/${photoFileName}`;
          const imageSha = await getImageSha(imagePath);
          if (imageSha) {
            await deleteFile(imagePath, `Delete staff photo: ${deletedItem.name}`, imageSha);
          }
        }
      } catch (photoError) {
        console.error('Error deleting photo:', photoError);
        // Continue even if photo deletion fails
      }
    }

    await updateFile(
      DATA_PATH,
      JSON.stringify(staff, null, 2),
      `Delete staff: ${deletedItem.name}`,
      result.sha
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting staff:', error);
    return NextResponse.json({ error: 'スタッフの削除に失敗しました' }, { status: 500 });
  }
}
