'use client';

import { useState, useEffect } from 'react';
import { useCsrf } from '@/hooks/useCsrf';
import type { Settings, AvailabilityClass } from '@/types';

export default function SettingsManager() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { fetchWithCsrf } = useCsrf();

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (!response.ok) throw new Error('Failed to fetch settings');
      const data = await response.json();
      setSettings(data);
    } catch (err) {
      setError('設定の取得に失敗しました');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetchWithCsrf('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save');
      }

      setSuccess('設定を保存しました');
    } catch (err) {
      setError('設定の保存に失敗しました');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const updatePricing = (key: keyof Settings['pricing'], value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      pricing: {
        ...settings.pricing,
        [key]: value,
      },
    });
  };

  const updateAvailabilityDate = (value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      availability: {
        ...settings.availability,
        asOfDate: value,
      },
    });
  };

  const updateClass = (index: number, field: keyof AvailabilityClass, value: string) => {
    if (!settings) return;
    const newClasses = [...settings.availability.classes];
    newClasses[index] = { ...newClasses[index], [field]: value };
    setSettings({
      ...settings,
      availability: {
        ...settings.availability,
        classes: newClasses,
      },
    });
  };

  const addClass = () => {
    if (!settings) return;
    setSettings({
      ...settings,
      availability: {
        ...settings.availability,
        classes: [...settings.availability.classes, { name: '', status: '' }],
      },
    });
  };

  const removeClass = (index: number) => {
    if (!settings) return;
    const newClasses = settings.availability.classes.filter((_, i) => i !== index);
    setSettings({
      ...settings,
      availability: {
        ...settings.availability,
        classes: newClasses,
      },
    });
  };

  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  if (!settings) {
    return <div className="text-center py-8 text-red-600">設定の読み込みに失敗しました</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
          <button type="button" onClick={() => setError('')} className="ml-4 underline">閉じる</button>
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">
          {success}
          <button type="button" onClick={() => setSuccess('')} className="ml-4 underline">閉じる</button>
        </div>
      )}

      {/* 料金設定 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">料金案内</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">入会金</label>
            <input
              type="text"
              value={settings.pricing.enrollmentFee}
              onChange={(e) => updatePricing('enrollmentFee', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">年間保険料</label>
            <input
              type="text"
              value={settings.pricing.insuranceFee}
              onChange={(e) => updatePricing('insuranceFee', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">月額利用料</label>
            <input
              type="text"
              value={settings.pricing.monthlyFee}
              onChange={(e) => updatePricing('monthlyFee', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ひとり親世帯</label>
            <input
              type="text"
              value={settings.pricing.singleParentFee}
              onChange={(e) => updatePricing('singleParentFee', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">おやつ代</label>
            <input
              type="text"
              value={settings.pricing.mealFee}
              onChange={(e) => updatePricing('mealFee', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">延長料金</label>
            <input
              type="text"
              value={settings.pricing.extendedCare}
              onChange={(e) => updatePricing('extendedCare', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">長期休暇期間</label>
            <input
              type="text"
              value={settings.pricing.longVacationFee}
              onChange={(e) => updatePricing('longVacationFee', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      {/* 空き状況 */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-bold mb-4">空き状況</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">基準日（例: 2025年1月）</label>
          <input
            type="text"
            value={settings.availability.asOfDate}
            onChange={(e) => updateAvailabilityDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
          />
        </div>

        <div className="space-y-3">
          {settings.availability.classes.map((cls, index) => (
            <div key={index} className="flex gap-3 items-center">
              <input
                type="text"
                value={cls.name}
                onChange={(e) => updateClass(index, 'name', e.target.value)}
                placeholder="クラス名（例: 0歳児）"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
              />
              <input
                type="text"
                value={cls.status}
                onChange={(e) => updateClass(index, 'status', e.target.value)}
                placeholder="状況（例: ○ 空きあり）"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={() => removeClass(index)}
                className="text-red-600 hover:text-red-800 px-2"
              >
                削除
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addClass}
          className="mt-4 text-[var(--primary-color)] hover:underline text-sm"
        >
          + クラスを追加
        </button>
      </div>

      {/* 保存ボタン */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-lg hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50 font-medium"
        >
          {saving ? '保存中...' : '設定を保存'}
        </button>
      </div>
    </form>
  );
}
