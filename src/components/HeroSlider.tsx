import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Crown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  MessageCircle,
  Heart,
} from 'lucide-react';
import {
  HeroSlide,
  HeroSettings,
  CategoryHighlight,
  StoreSettings,
} from '../types';
import {
  defaultHeroSlides,
  defaultHeroSettings,
  defaultCategoryHighlights,
  defaultStoreSettings,
} from '../data/initialData';

interface HeroSliderProps {
  slides?: HeroSlide[];
  heroSettings?: HeroSettings;
  categoryHighlights?: CategoryHighlight[];
  storeSettings?: StoreSettings;
  onExploreClick: () => void;
  onQuickOrderHero: () => void;
  onSelectCategory?: (category: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  slides = defaultHeroSlides,
  heroSettings = defaultHeroSettings,
  categoryHighlights = defaultCategoryHighlights,
  storeSettings = defaultStoreSettings,
  onExploreClick,
  onQuickOrderHero,
  onSelectCategory,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const activeSlides = slides && slides.length > 0 ? slides : defaultHeroSlides;
  const settings = heroSettings || defaultHeroSettings;
  const highlights =
    categoryHighlights && categoryHighlights.length > 0
      ? categoryHighlights
      : defaultCategoryHighlights;

  // Auto-play effect
  useEffect(() => {
    if (isHovered || activeSlides.length <= 1) return;
    const intervalTime = (settings.autoPlayInterval || 5) * 1000;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isHovered, activeSlides.length, settings.autoPlayInterval]);

  useEffect(() => {
    if (currentSlideIndex >= activeSlides.length) {
      setCurrentSlideIndex(0);
    }
  }, [activeSlides.length, currentSlideIndex]);

  const prevSlide = () => {
    setCurrentSlideIndex(
      (prev) => (prev - 1 + activeSlides.length) % activeSlides.length,
    );
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    if (deltaX > 50) nextSlide();
    if (deltaX < -50) prevSlide();
    touchStartX.current = null;
  };

  const currentSlide = activeSlides[currentSlideIndex] || activeSlides[0];
  const overlayMode = settings.overlayMode || 'minimal';

  return (
    <section className="w-full bg-[#0e0407]">
      <div className="w-full max-w-[1536px] mx-auto sm:px-4 lg:px-6 sm:pt-3">
        {/* Main Carousel Banner Frame */}
        <div
          className="relative w-full overflow-hidden sm:rounded-2xl lg:rounded-3xl border-b sm:border border-rose-900/40 shadow-2xl bg-[#140308] select-none group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full aspect-[16/9] sm:aspect-[1376/768] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide?.id || currentSlideIndex}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden"
              >
                <img
                  src={currentSlide?.bgImage}
                  alt={currentSlide?.title || 'গার্লস ফ্যাশন শাড়ি ব্যানার'}
                  className={`w-full h-full object-center block ${
                    (currentSlide?.imageFit || settings?.fitMode) === 'contain'
                      ? 'object-contain'
                      : 'object-cover'
                  }`}
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Overlays */}
                <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none z-[2]" />
                <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-[2]" />

                {/* Slide Count Indicator Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-5 z-10 pointer-events-none">
                  <div className="px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-[10px] sm:text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>
                      {currentSlideIndex + 1} / {activeSlides.length}
                    </span>
                  </div>
                </div>

                {/* Header Badge */}
                {currentSlide?.badge && (
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-5 z-10 pointer-events-none">
                    <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-amber-400/50 text-[10px] sm:text-xs font-bold text-amber-200 flex items-center gap-1.5 shadow-lg">
                      <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{currentSlide.badge}</span>
                    </div>
                  </div>
                )}

                {/* Minimal Overlay Action Panel */}
                {overlayMode === 'minimal' && (
                  <div className="absolute bottom-4 sm:bottom-6 inset-x-0 z-10 px-4 flex items-center justify-center sm:justify-end sm:pr-8 pointer-events-none">
                    <div className="inline-flex items-center gap-2 p-1 sm:p-1.5 bg-[#120509]/85 backdrop-blur-md border border-rose-600/60 rounded-full shadow-2xl pointer-events-auto">
                      <button
                        onClick={() => {
                          if (
                            currentSlide?.category &&
                            currentSlide.category !== 'all' &&
                            onSelectCategory
                          ) {
                            onSelectCategory(currentSlide.category);
                          }
                          onQuickOrderHero();
                        }}
                        className="px-4 sm:px-5 py-1.5 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-600 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-lg transition-all active:scale-95 cursor-pointer border border-rose-400/80 flex items-center gap-1.5"
                      >
                        <span>{currentSlide?.actionText || 'এখনই অর্ডার করুন'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            currentSlide?.category &&
                            currentSlide.category !== 'all' &&
                            onSelectCategory
                          ) {
                            onSelectCategory(currentSlide.category);
                          }
                          onExploreClick();
                        }}
                        className="px-3.5 sm:px-4 py-1.5 bg-[#220712]/90 hover:bg-[#2f0c1c] text-rose-200 hover:text-white font-bold text-xs sm:text-sm rounded-full border border-rose-800/80 transition-all active:scale-95 cursor-pointer"
                      >
                        {currentSlide?.secondaryActionText || 'কালেকশন দেখুন'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Full Overlay Action Panel */}
                {overlayMode === 'full' && (
                  <div className="absolute inset-0 z-10 px-4 sm:px-6 py-4 flex flex-col items-center justify-center text-center pointer-events-none">
                    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-[#120509]/80 backdrop-blur-md rounded-2xl border border-rose-900/60 shadow-2xl pointer-events-auto">
                      {currentSlide?.title && (
                        <h1 className="font-sans font-black text-xl sm:text-3xl uppercase text-white drop-shadow-md mb-1">
                          {currentSlide.title}
                        </h1>
                      )}
                      {currentSlide?.subtitle && (
                        <p className="text-xs sm:text-sm text-rose-100 font-medium max-w-lg mx-auto drop-shadow-md mb-2">
                          {currentSlide.subtitle}
                        </p>
                      )}
                      {currentSlide?.slogan && (
                        <div className="inline-flex items-center justify-center gap-1.5 text-white my-1 px-3 py-0.5 bg-black/40 rounded-full border border-rose-500/30">
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500 shrink-0" />
                          <span className="font-['Anek_Bangla'] text-xs sm:text-sm font-extrabold text-amber-300">
                            {currentSlide.slogan}
                          </span>
                          <Heart className="w-3 h-3 fill-rose-500 text-rose-500 shrink-0" />
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-2 pt-2">
                        <button
                          onClick={() => {
                            if (
                              currentSlide?.category &&
                              currentSlide.category !== 'all' &&
                              onSelectCategory
                            ) {
                              onSelectCategory(currentSlide.category);
                            }
                            onQuickOrderHero();
                          }}
                          className="px-5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                        >
                          <span>{currentSlide?.actionText || 'এখনই অর্ডার করুন'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (
                              currentSlide?.category &&
                              currentSlide.category !== 'all' &&
                              onSelectCategory
                            ) {
                              onSelectCategory(currentSlide.category);
                            }
                            onExploreClick();
                          }}
                          className="px-4 py-1.5 bg-[#200812] text-rose-200 font-bold text-xs sm:text-sm rounded-full border border-rose-800"
                        >
                          {currentSlide?.secondaryActionText || 'কালেকশন দেখুন'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Carousel Navigation Arrows */}
            {activeSlides.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#8b1528] text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/40 hover:bg-[#8b1528] text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-xl"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </>
            )}

            {/* Slide Indicator Dots */}
            {activeSlides.length > 1 && (
              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-8 z-20 flex items-center gap-1.5">
                {activeSlides.map((slide, index) => (
                  <button
                    key={slide.id || index}
                    onClick={() => setCurrentSlideIndex(index)}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      currentSlideIndex === index
                        ? 'w-7 sm:w-9 h-2 bg-gradient-to-r from-amber-400 to-rose-500 shadow-md ring-1 ring-amber-300/60'
                        : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/90'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sub-bar below Hero Banner with ticker and website text */}
          <div className="relative z-20 bg-[#120307] border-t border-rose-950 px-3 sm:px-6 py-2.5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 bg-[#200710] border border-rose-900/60 px-3 py-1 rounded-full shadow-xs">
                <Globe className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] sm:text-[11px] font-mono text-amber-200 font-bold tracking-wider uppercase">
                  {settings.websiteText || 'WEBSITE: girlsfashiontangail.com'}
                </span>
              </div>
              <div className="text-center font-medium text-rose-200/90 text-[11px] sm:text-xs px-2">
                <span>
                  {settings.tickerText ||
                    'তাঁত শাড়ি ✦ জামদানি ✦ ল্যামা সিল্ক ✦ কাতান ✦ কটন সেট ✦ হাফ সিল্ক'}
                </span>
              </div>
              <a
                href={`https://wa.me/${storeSettings.whatsapp || '8801796962283'}?text=${encodeURIComponent('হ্যালো, আমি গার্লস ফ্যাশন শাড়ি অর্ডার করতে চাই।')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-[#25d366] hover:bg-[#20ba5a] text-white px-3.5 py-1 rounded-full font-bold shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-mono tracking-wider font-extrabold">
                  WhatsApp {storeSettings.phone || '01796962283'}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Circular Category Highlights Row */}
      <div className="w-full bg-[#110408] border-b border-rose-950/70 py-4 sm:py-6 mt-1 sm:mt-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-12 overflow-x-auto no-scrollbar py-2">
            {highlights.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectCategory?.(item.category)}
                className="group flex flex-col items-center cursor-pointer transition-transform hover:-translate-y-1 focus:outline-hidden shrink-0"
              >
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-400 shadow-lg group-hover:shadow-rose-600/40 group-hover:scale-105 transition-all">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#16060c] bg-stone-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                    <span className="bg-[#1a070f] text-rose-100 border border-rose-800/80 text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 rounded-full shadow-md whitespace-nowrap group-hover:border-rose-400 group-hover:text-amber-300 transition-colors">
                      {item.title}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
