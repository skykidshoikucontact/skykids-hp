'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1600&q=80',
    title: '空色の放課後が、\n子供を育てる。',
    subtitle: '',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=1600&q=80',
    title: '',
    subtitle: '',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=1600&q=80',
    title: '',
    subtitle: '',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[60vh] min-h-[400px] md:h-screen md:min-h-[600px] md:max-h-[1000px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background with image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}

      {/* Now Enrolling Badge - Left Bottom */}
      <Link
        href="/recruit"
        className="absolute bottom-8 left-4 z-30 hover:scale-105 transition-transform animate-float"
      >
        <div className="relative w-36 md:w-48">
          <img
            src="/images/now_enrolling.png"
            alt=""
            className="w-full h-auto"
          />
          <span
            className="absolute inset-0 flex items-center justify-center text-[#00CFFF] text-lg md:text-xl"
            style={{ fontFamily: '"Zen Maru Gothic", sans-serif', fontWeight: 900 }}
          >
            児童募集中
          </span>
        </div>
      </Link>

      {/* Content - always on top */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div className="max-w-5xl mx-auto px-6 text-center text-white">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 absolute inset-0 flex items-center justify-center'
              }`}
            >
              {index === currentSlide && (
                <>
                  {slide.title && (
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 drop-shadow-2xl whitespace-pre-line leading-tight tracking-tight">
                      {slide.title}
                    </h1>
                  )}
                  {slide.subtitle && (
                    <p className="text-xl md:text-2xl lg:text-3xl mb-10 drop-shadow-lg font-light tracking-wide">
                      {slide.subtitle}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
