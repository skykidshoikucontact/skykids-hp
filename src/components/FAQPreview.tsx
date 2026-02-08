'use client';

import { useState } from 'react';
import Link from 'next/link';

const previewFaqs = [
  {
    question: '対象年齢・学年は？',
    answer: '小学1年生から6年生までが対象です。お気軽にご相談ください。',
  },
  {
    question: '見学はできますか？',
    answer: 'はい、いつでもご見学可能です！お電話、お問い合わせフォーム、または画面右下のLINEボタンからお気軽にご連絡ください。',
  },
  {
    question: '土曜日も利用できますか？',
    answer: 'はい、土曜日は7:30〜18:30（延長19:00まで）で開所しています。第二土曜日の出校日など下校時にお迎えに行きます。',
  },
];

export default function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto space-y-4 mb-8">
        {previewFaqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#F7F7F7] rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full min-h-[70px] px-5 py-4 flex items-center gap-4 text-left hover:bg-gray-100 transition-colors"
            >
              <span className="text-[var(--primary-color)] font-bold text-xl shrink-0">Q.</span>
              <span className="text-base font-medium flex-grow">{faq.question}</span>
              <span className={`text-2xl text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <div className="px-5 pb-5 flex gap-4">
                <span className="text-pink-400 font-bold text-xl shrink-0">A.</span>
                <p className="text-base text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href="/faq" className="btn-primary inline-block">
          よくある質問をもっと見る
        </Link>
      </div>
    </div>
  );
}
