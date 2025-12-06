'use client';

import { useState, useEffect } from 'react';
import type { NewsItem } from '@/types';

export default function NewsManager() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState<NewsItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setNewsList(data);
    } catch (err) {
      setError('お知らせの取得に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('このお知らせを削除しますか？')) return;

    try {
      const response = await fetch('/api/news', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete');
      }

      await fetchNews();
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
        <NewsForm
          item={editingItem}
          onClose={() => {
            setIsCreating(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            setIsCreating(false);
            setEditingItem(null);
            fetchNews();
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

      {/* News List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">日付</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">タイトル</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {newsList.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                  {item.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-right">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {newsList.length === 0 && (
          <p className="text-center text-gray-500 py-8">お知らせがありません</p>
        )}
      </div>
    </div>
  );
}

function NewsForm({
  item,
  onClose,
  onSuccess,
  onError,
}: {
  item: NewsItem | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  const [date, setDate] = useState(item?.date || new Date().toISOString().split('T')[0]);
  const [title, setTitle] = useState(item?.title || '');
  const [body, setBody] = useState(item?.body || '');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ date?: string; title?: string; body?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      newErrors.date = '正しい日付形式（YYYY-MM-DD）を入力してください';
    }
    if (!title || title.length < 1 || title.length > 50) {
      newErrors.title = 'タイトルは1〜50文字で入力してください';
    }
    if (body.length > 1000) {
      newErrors.body = '本文は1000文字以内で入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSaving(true);

    try {
      const method = item ? 'PUT' : 'POST';
      const payload = item
        ? { id: item.id, date, title, body }
        : { date, title, body };

      const response = await fetch('/api/news', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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
        {item ? 'お知らせを編集' : '新規お知らせ'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            日付
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
          />
          {errors.date && (
            <p className="text-red-600 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            タイトル（1〜50文字）
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
          />
          <p className="text-gray-500 text-sm mt-1">{title.length}/50文字</p>
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            本文（〜1000文字）
          </label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={1000}
            rows={6}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none resize-none"
          />
          <p className="text-gray-500 text-sm mt-1">{body.length}/1000文字</p>
          {errors.body && (
            <p className="text-red-600 text-sm mt-1">{errors.body}</p>
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
