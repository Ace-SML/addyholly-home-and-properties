
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Property } from '../types';
import { Bed, Bath, Square, MapPin, Heart, ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  displayCurrency: 'NGN' | 'USD';
}

const NGN_USD_RATE = 1600;

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, displayCurrency }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Modal Zoom/Pan State
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const getConvertedPrice = () => {
    if (property.currency === displayCurrency) return property.price;
    if (property.currency === 'NGN' && displayCurrency === 'USD') return property.price / NGN_USD_RATE;
    if (property.currency === 'USD' && displayCurrency === 'NGN') return property.price * NGN_USD_RATE;
    return property.price;
  };

  const formatPrice = (price: number, currency: string) => {
    const locale = currency === 'NGN' ? 'en-NG' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % property.images.length);
    resetZoom();
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length);
    resetZoom();
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(prev + delta, 1), 4));
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const onMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') setIsModalOpen(false);
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const convertedPrice = getConvertedPrice();

  return (
    <>
      <div className="group bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
        <div 
          className="relative h-72 overflow-hidden cursor-zoom-in"
          onClick={() => setIsModalOpen(true)}
        >
          <img 
            src={property.images[currentImage]} 
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {property.images.length > 1 && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={prevImage} className="bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-white text-slate-800 transition-all shadow-lg">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextImage} className="bg-white/80 backdrop-blur-md p-2 rounded-full hover:bg-white text-slate-800 transition-all shadow-lg">
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          <div className="absolute top-6 left-6 flex gap-2">
            {property.featured && (
              <span className="bg-amber-400 text-[#1A2B4C] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">Featured</span>
            )}
            <span className="bg-[#1A2B4C]/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em]">{property.type}</span>
          </div>
          
          <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5">
            <Maximize2 size={10} /> {property.images.length} Photos
          </div>
        </div>

        <div className="p-8 flex flex-col flex-1">
          <div className="mb-4">
            <div className="flex items-center text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
              <MapPin size={12} className="mr-1" />
              {property.location}
            </div>
            <h3 className="text-2xl font-bold text-[#1A2B4C] leading-tight mb-2 group-hover:text-amber-500 transition-colors">{property.title}</h3>
            <span className="text-3xl font-black text-[#1A2B4C]">{formatPrice(convertedPrice, displayCurrency)}</span>
          </div>
          
          <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-5 text-slate-500">
              <div className="flex items-center gap-1.5">
                <Bed size={18} className="text-slate-300" />
                <span className="text-sm font-bold">{property.beds}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath size={18} className="text-slate-300" />
                <span className="text-sm font-bold">{property.baths}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Square size={18} className="text-slate-300" />
                <span className="text-sm font-bold">{property.sqft}</span>
              </div>
            </div>
            <button className="bg-slate-50 p-3 rounded-2xl text-[#1A2B4C] hover:bg-amber-400 hover:text-[#1A2B4C] transition-all">
              <ArrowIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-2xl flex flex-col animate-in fade-in duration-300">
          {/* Modal Header */}
          <div className="p-6 flex items-center justify-between text-white border-b border-white/10">
            <div>
              <h4 className="text-xl font-bold">{property.title}</h4>
              <p className="text-xs text-slate-400 uppercase tracking-widest">{property.location}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-white/10 rounded-xl overflow-hidden p-1">
                <button onClick={() => handleZoom(0.5)} className="p-2 hover:bg-white/10 transition-colors" title="Zoom In"><ZoomIn size={20}/></button>
                <button onClick={() => handleZoom(-0.5)} className="p-2 hover:bg-white/10 transition-colors" title="Zoom Out"><ZoomOut size={20}/></button>
                <button onClick={resetZoom} className="p-2 hover:bg-white/10 transition-colors text-[10px] font-bold">1:1</button>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-white/10 hover:bg-red-500 p-2.5 rounded-full transition-all"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          {/* Viewport */}
          <div 
            ref={containerRef}
            className="flex-1 relative overflow-hidden flex items-center justify-center cursor-move"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
          >
            <img 
              src={property.images[currentImage]} 
              alt="Full view"
              className="max-h-full max-w-full transition-transform duration-200 select-none pointer-events-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              }}
            />

            {/* Nav Controls */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button 
                onClick={prevImage} 
                className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all pointer-events-auto"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={nextImage} 
                className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-all pointer-events-auto"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="p-8 bg-black/40 border-t border-white/10">
            <div className="flex justify-center gap-4 overflow-x-auto pb-2">
              {property.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => { setCurrentImage(i); resetZoom(); }}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    i === currentImage ? 'border-amber-400 scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);
