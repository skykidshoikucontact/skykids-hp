'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import type { StaffMember } from '@/types';

export default function StaffManager() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState<StaffMember | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchStaff = async () => {
    try {
      const response = await fetch('/api/staff');
      if (!response.ok) throw new Error('Failed to fetch staff');
      const data = await response.json();
      setStaffList(data);
    } catch (err) {
      setError('スタッフ情報の取得に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('このスタッフを削除しますか？')) return;

    try {
      const response = await fetch('/api/staff', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete');
      }

      await fetchStaff();
    } catch (err) {
      setError('削除に失敗しました');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  return (
    <div>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
          <button onClick={() => setError('')} className="ml-4 underline">閉じる</button>
        </div>
      )}

      {/* Create/Edit Form */}
      {(isCreating || editingItem) && (
        <StaffForm
          item={editingItem}
          onClose={() => {
            setIsCreating(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            setIsCreating(false);
            setEditingItem(null);
            fetchStaff();
          }}
          onError={setError}
        />
      )}

      {/* Add Button */}
      {!isCreating && !editingItem && (
        <button
          onClick={() => setIsCreating(true)}
          className="mb-6 bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
        >
          新規追加
        </button>
      )}

      {/* Staff List */}
      <div className="grid gap-4">
        {staffList.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden relative shrink-0">
              {item.photo && item.photo !== '/images/staff/placeholder.jpg' ? (
                <Image
                  src={item.photo}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  写真
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-600">経験年数: {item.years}年</p>
              <p className="text-sm text-gray-500 line-clamp-1">{item.message}</p>
            </div>
            <div className="shrink-0">
              <button
                onClick={() => setEditingItem(item)}
                className="text-sm text-[var(--primary-color)] hover:underline mr-4"
              >
                編集
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-sm text-red-600 hover:underline"
              >
                削除
              </button>
            </div>
          </div>
        ))}
        {staffList.length === 0 && (
          <p className="text-center text-gray-500 py-8 bg-white rounded-lg shadow">
            スタッフが登録されていません
          </p>
        )}
      </div>
    </div>
  );
}

function StaffForm({
  item,
  onClose,
  onSuccess,
  onError,
}: {
  item: StaffMember | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  const [name, setName] = useState(item?.name || '');
  const [years, setYears] = useState(item?.years?.toString() || '0');
  const [message, setMessage] = useState(item?.message || '');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; years?: string; message?: string; photo?: string }>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(item?.photo || null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name || name.length < 1 || name.length > 50) {
      newErrors.name = '氏名は1〜50文字で入力してください';
    }
    const yearsNum = parseInt(years, 10);
    if (isNaN(yearsNum) || yearsNum < 0 || yearsNum > 60) {
      newErrors.years = '経験年数は0〜60の整数で入力してください';
    }
    if (message.length > 300) {
      newErrors.message = 'メッセージは300文字以内で入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setErrors((prev) => ({ ...prev, photo: 'JPGまたはPNG形式の画像を選択してください' }));
      return;
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, photo: '画像サイズは2MB以下にしてください' }));
      return;
    }

    setErrors((prev) => ({ ...prev, photo: undefined }));
    setPhotoFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('years', years);
      formData.append('message', message);

      if (item) {
        formData.append('id', item.id);
        formData.append('currentPhoto', item.photo || '');
      }

      if (photoFile) {
        formData.append('photo', photoFile);
      }

      const method = item ? 'PUT' : 'POST';
      const response = await fetch('/api/staff', {
        method,
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save');
      }

      onSuccess();
    } catch (err) {
      onError(item ? '更新に失敗しました' : '作成に失敗しました');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-bold mb-4">
        {item ? 'スタッフを編集' : '新規スタッフ'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            写真
          </label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden relative">
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="プレビュー"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  写真
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                画像を選択
              </button>
              <p className="text-gray-500 text-xs mt-1">
                JPG/PNG形式、2MB以下
              </p>
              {errors.photo && (
                <p className="text-red-600 text-sm mt-1">{errors.photo}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            氏名（1〜50文字）
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            経験年数（0〜60年）
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            min={0}
            max={60}
            className="w-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
          />
          <span className="ml-2 text-gray-600">年</span>
          {errors.years && (
            <p className="text-red-600 text-sm mt-1">{errors.years}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            メッセージ（〜300文字）
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={300}
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none resize-none"
          />
          <p className="text-gray-500 text-sm mt-1">{message.length}/300文字</p>
          {errors.message && (
            <p className="text-red-600 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-[var(--primary-color)] text-white px-6 py-2 rounded-lg hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50"
          >
            {saving ? '保存中...' : item ? '更新する' : '追加する'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
          >
            キャンセル
          </button>
        </div>
      </form>
    </div>
  );
}
