'use client';

import { useState, useEffect } from 'react';

const meals = [
  { id: 1, src: '/images/lunch_3.jpg', label: '食事1' },
  { id: 2, src: '/images/lunch_2.jpg', label: '食事2' },
  { id: 3, src: '/images/lunch_1.jpg', label: '食事3' },
];

export default function MealsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % meals.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isMobile]);

  // Desktop: 3列表示
  if (!isMobile) {
    return (
      <div className="grid md:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <div key={meal.id} className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden">
            <img src={meal.src} alt={meal.label} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    );
  }

  // Mobile: 自動カルーセル
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {meals.map((meal) => (
          <div key={meal.id} className="flex-shrink-0 w-full px-4">
            <div className="aspect-[4/3] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden">
              <img src={meal.src} alt={meal.label} className="w-full h-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      {/* ドットインジケーター */}
      <div className="flex justify-center gap-2 mt-4">
        {meals.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-[var(--primary-color)] w-4' : 'bg-gray-300'
            }`}
            aria-label={`スライド ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
