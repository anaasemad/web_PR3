import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export default function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setDirection('right');
      setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIdx, images]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video w-full bg-slate-100 flex items-center justify-center text-slate-400 text-xs">
        No hay imágenes disponibles
      </div>
    );
  }

  const handlePrev = () => {
    setDirection('left');
    setCurrentIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection('right');
    setCurrentIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? 80 : -80,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.35,
        ease: 'easeOut',
      },
    },
    exit: (dir: 'left' | 'right') => ({
      opacity: 0,
      x: dir === 'right' ? -80 : 80,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    }),
  };

  return (
    <div className="relative aspect-video w-full bg-slate-50 overflow-hidden border border-slate-100 group">
      {/* Slider */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={currentIdx}
            src={images[currentIdx]}
            alt={`${title} - Visual ${currentIdx + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full object-cover select-none"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 text-slate-900 border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
            aria-label="Anterior imagen"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 text-slate-900 border border-slate-100 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
            aria-label="Siguiente imagen"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Floating Counter in corner */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 border border-slate-100 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-900 z-10">
        {String(currentIdx + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Progress Bars (Bottom Indicators) */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-4 right-4 flex gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIdx ? 'right' : 'left');
                setCurrentIdx(idx);
              }}
              className="flex-1 h-1 relative overflow-hidden bg-slate-200/40 hover:bg-slate-200/60 transition-colors focus:outline-none"
              aria-label={`Ir a imagen ${idx + 1}`}
            >
              <div 
                className={`absolute inset-y-0 left-0 bg-slate-900 transition-all duration-300 ${
                  idx === currentIdx ? 'w-full' : 'w-0'
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
