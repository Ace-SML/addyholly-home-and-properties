
import React from 'react';
import { Property } from './types';
import logo from "./assets/logo-removebg-preview.png";



export const COLORS = {
  navy: '#1A2B4C',
  gold: '#FBBF24',
  white: '#FFFFFF',
  slate: '#64748b'
};

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <img 
    src={logo} 
    alt="Addyholly Homes & Properties Logo" 
    className={`w-auto ${className}`}
  />
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
