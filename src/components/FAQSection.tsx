'use client';

import { useState } from 'react';

const faqs = [
  {
    question: '何歳から預けられますか？',
    answer: '生後3ヶ月からお預かりしています。お子様の発達段階に合わせた保育を行いますので、安心してお任せください。',
  },
  {
    question: '見学はできますか？',
    answer: 'はい、随時見学を受け付けております。お電話またはお問い合わせフォームからご予約ください。実際の保育の様子をご覧いただけます。',
  },
  {
    question: '慣らし保育はありますか？',
    answer: 'はい、お子様が園生活にスムーズに慣れるよう、1〜2週間程度の慣らし保育期間を設けています。お子様の様子に合わせて調整いたします。',
  },
  {
    question: 'アレルギー対応はしていますか？',
    answer: 'はい、食物アレルギーのあるお子様には、除去食や代替食で対応いたします。入園時に詳しくお聞かせください。',
  },
  {
    question: '急な延長保育は可能ですか？',
    answer: 'はい、当日のご連絡でも可能な限り対応いたします。延長保育は30分500円となります。',
  },
  {
    question: '持ち物は何が必要ですか？',
    answer: 'おむつ、着替え、お昼寝用バスタオルなどが必要です。詳しい持ち物リストは入園時にお渡しします。',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
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
  );
}
