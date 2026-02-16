
import React from 'react';
import { Property } from './types';

export const COLORS = {
  navy: '#1A2B4C',
  gold: '#FBBF24',
  white: '#FFFFFF',
  slate: '#64748b'
};

export const Logo: React.FC<{ className?: string }> = ({ className = "h-12" }) => (
  <div className={`flex items-center gap-4 ${className}`}>
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Yellow Roof Accent */}
        <path 
          d="M10 45 L50 15 L90 45" 
          fill="none" 
          stroke="#FBBF24" 
          strokeWidth="6" 
          strokeLinecap="round"
        />
        {/* Navy House Outline */}
        <path 
          d="M20 90 L20 45 L50 22 L80 45 L80 90 Z" 
          fill="none" 
          stroke="#1A2B4C" 
          strokeWidth="6" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="text-3xl font-extrabold text-[#1A2B4C] leading-none tracking-tight font-sans">Addyholly</span>
      <span className="text-[10px] font-bold text-[#1A2B4C] tracking-[0.25em] uppercase mt-1">Homes & Properties</span>
    </div>
    <div className="ml-1">
      {/* 4-pointed yellow star */}
      <svg viewBox="0 0 100 100" className="w-7 h-7 fill-[#FBBF24]">
        <path d="M50 0 C52 40 60 48 100 50 C60 52 52 60 50 100 C48 60 40 52 0 50 C40 48 48 40 50 0 Z" />
      </svg>
    </div>
  </div>
);

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Banana Island Mansion',
    price: 850000000,
    currency: 'NGN',
    location: 'Ikoyi, Lagos',
    city: 'Lagos',
    beds: 6,
    baths: 7,
    sqft: 8500,
    type: 'Villa',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: true
  },
  {
    id: '2',
    title: 'Eko Atlantic Penthouse',
    price: 1500000,
    currency: 'USD',
    location: 'VI, Lagos',
    city: 'Lagos',
    beds: 4,
    baths: 4,
    sqft: 4200,
    type: 'Apartment',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: true
  },
  {
    id: '3',
    title: 'Maitama Luxury Heights',
    price: 450000000,
    currency: 'NGN',
    location: 'Maitama, Abuja',
    city: 'Abuja',
    beds: 5,
    baths: 5,
    sqft: 5200,
    type: 'House',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: false
  },
  {
    id: '4',
    title: 'Lekki Phase 1 Smart Home',
    price: 180000000,
    currency: 'NGN',
    location: 'Lekki, Lagos',
    city: 'Lagos',
    beds: 4,
    baths: 4,
    sqft: 3800,
    type: 'House',
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: false
  },
  {
    id: '5',
    title: 'Abuja Waterfront Condo',
    price: 750000,
    currency: 'USD',
    location: 'Jabi, Abuja',
    city: 'Abuja',
    beds: 3,
    baths: 3,
    sqft: 2800,
    type: 'Condo',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: true
  },
  {
    id: '6',
    title: 'Port Harcourt Executive Villa',
    price: 250000000,
    currency: 'NGN',
    location: 'GRA, Port Harcourt',
    city: 'Port Harcourt',
    beds: 5,
    baths: 6,
    sqft: 6000,
    type: 'Villa',
    images: [
      'https://images.unsplash.com/photo-1512915922686-57c11f9ad6b3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&q=80&w=1200'
    ],
    featured: false
  }
];
