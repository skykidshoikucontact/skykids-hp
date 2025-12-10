'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    bgColor: 'from-[#7FE7FF] via-[#00CFFF] to-[#0099CC]',
    title: '空色の放課後が、\n子供を育てる。',
    subtitle: '',
  },
  {
    id: 2,
    bgColor: 'from-[#FFD89B] via-[#FFB347] to-[#FF8C00]',
    title: '',
    subtitle: '',
  },
  {
    id: 3,
    bgColor: 'from-[#B8E6D8] via-[#98D8C8] to-[#4CAF50]',
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
          {/* Background with gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor}`}>
            {/* Placeholder for real image - shows image number */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/10 text-[20rem] font-bold select-none">
                {slide.id}
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute top-[10%] left-[5%] w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-[30%] right-[10%] w-60 h-60 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[20%] left-[15%] w-32 h-32 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-[30%] right-[20%] w-48 h-48 bg-white/5 rounded-full blur-3xl" />

            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px',
              }}
            />
          </div>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/10" />
        </div>
      ))}

      {/* Now Enrolling Badge - Left Bottom */}
      <Link
        href="/recruit"
        className="absolute bottom-0 left-0 z-30 hover:scale-105 transition-transform animate-float"
      >
        <img
          src="/images/now_enrolling.png"
          alt="児童募集中"
          className="w-72 md:w-96 h-auto"
        />
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
