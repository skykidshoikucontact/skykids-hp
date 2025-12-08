'use client';

import { useState, useEffect, useCallback } from 'react';

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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

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
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 drop-shadow-2xl whitespace-pre-line leading-tight tracking-tight">
                      {slide.title}
                    </h1>
                  )}
                  {slide.subtitle && (
                    <p className="text-xl md:text-2xl lg:text-3xl mb-10 drop-shadow-lg font-light tracking-wide">
                      {slide.subtitle}
                    </p>
                  )}
                  <a
                    href="https://forms.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto inline-block bg-[var(--primary-color)] text-white font-bold py-4 px-10 rounded-full text-lg md:text-xl hover:bg-[var(--primary-dark)] hover:scale-105 transition-all duration-300 shadow-2xl"
                  >
                    見学のお申し込み
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows and Dots */}
      <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
        <button
          onClick={() => {
            prevSlide();
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), 8000);
          }}
          className="w-8 h-8 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm hover:scale-110"
          aria-label="前のスライド"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex gap-3 md:gap-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentSlide
                  ? 'bg-white w-8 h-3 md:w-12 md:h-4'
                  : 'bg-white/50 hover:bg-white/70 w-3 h-3 md:w-4 md:h-4'
              }`}
              aria-label={`スライド ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            nextSlide();
            setIsAutoPlaying(false);
            setTimeout(() => setIsAutoPlaying(true), 8000);
          }}
          className="w-8 h-8 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm hover:scale-110"
          aria-label="次のスライド"
        >
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
