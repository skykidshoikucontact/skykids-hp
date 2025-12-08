'use client';

import { useState, useEffect } from 'react';
import { useCsrf } from '@/hooks/useCsrf';
import type { Document } from '@/types';

export default function DocumentsManager() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState<Document | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { fetchWithCsrf } = useCsrf();

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/documents');
      if (!response.ok) throw new Error('Failed to fetch documents');
      const data = await response.json();
      setDocuments(data);
    } catch (err) {
      setError('書類の取得に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('この書類を削除しますか？')) return;

    try {
      const response = await fetchWithCsrf('/api/documents', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete');
      }

      await fetchDocuments();
    } catch (err) {
      setError('削除に失敗しました');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  // Group documents by category
  const groupedDocuments = documents.reduce((acc, doc) => {
    if (!acc[doc.category]) {
      acc[doc.category] = [];
    }
    acc[doc.category].push(doc);
    return acc;
  }, {} as Record<string, Document[]>);

  return (
    <div>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
          <button onClick={() => setError('')} className="ml-4 underline">閉じる</button>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-blue-800 mb-2">Google Driveの共有リンクについて</h3>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Google DriveでPDFファイルを右クリック</li>
          <li>「共有」→「リンクをコピー」をクリック</li>
          <li>「リンクを知っている全員」に変更</li>
          <li>コピーしたリンクをURL欄に貼り付け</li>
        </ol>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingItem) && (
        <DocumentForm
          item={editingItem}
          onClose={() => {
            setIsCreating(false);
            setEditingItem(null);
          }}
          onSuccess={() => {
            setIsCreating(false);
            setEditingItem(null);
            fetchDocuments();
          }}
          onError={setError}
          fetchWithCsrf={fetchWithCsrf}
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

      {/* Documents List */}
      <div className="space-y-6">
        {Object.entries(groupedDocuments).map(([category, docs]) => (
          <div key={category} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b">
              <h3 className="font-bold text-gray-700">{category}</h3>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">書類名</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">URL</th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {docs.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <div>{item.name}</div>
                      {item.description && (
                        <div className="text-gray-500 text-xs mt-1">{item.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate block max-w-[200px]"
                        >
                          {item.url.substring(0, 30)}...
                        </a>
                      ) : (
                        <span className="text-gray-400">未設定</span>
                      )}
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
          </div>
        ))}
        {documents.length === 0 && (
          <p className="text-center text-gray-500 py-8">書類がありません</p>
        )}
      </div>
    </div>
  );
}

function DocumentForm({
  item,
  onClose,
  onSuccess,
  onError,
  fetchWithCsrf,
}: {
  item: Document | null;
  onClose: () => void;
  onSuccess: () => void;
  onError: (error: string) => void;
  fetchWithCsrf: (url: string, options?: RequestInit) => Promise<Response>;
}) {
  const [category, setCategory] = useState(item?.category || '');
  const [name, setName] = useState(item?.name || '');
  const [description, setDescription] = useState(item?.description || '');
  const [url, setUrl] = useState(item?.url || '');
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<{ category?: string; name?: string; description?: string; url?: string }>({});

  const categories = ['入会関連', '届出関連', 'その他'];

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!name || name.length < 1 || name.length > 100) {
      newErrors.name = '書類名は1〜100文字で入力してください';
    }
    if (!category || category.length < 1 || category.length > 50) {
      newErrors.category = 'カテゴリを選択してください';
    }
    if (description.length > 200) {
      newErrors.description = '説明は200文字以内で入力してください';
    }
    if (url.length > 500) {
      newErrors.url = 'URLは500文字以内で入力してください';
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
        ? { id: item.id, category, name, description, url }
        : { category, name, description, url };

      const response = await fetchWithCsrf('/api/documents', {
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
        {item ? '書類を編集' : '新規書類'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            カテゴリ
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
          >
            <option value="">選択してください</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            書類名（1〜100文字）
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            placeholder="例：入会申込書"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            説明（〜200文字）
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={200}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            placeholder="例：入会時に必要な申込書です"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Drive 共有リンク
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            maxLength={500}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            placeholder="https://drive.google.com/file/d/..."
          />
          {errors.url && (
            <p className="text-red-600 text-sm mt-1">{errors.url}</p>
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
