
import React, { useState } from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { SearchFilters } from '../types';

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    type: 'All Types',
    budget: 'Any Budget'
  });

  const handleSearch = () => {
    onSearch(filters);
    const element = document.getElementById('properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern House" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl">
          <span className="inline-block bg-amber-100 text-[#1A2B4C] px-4 py-1 rounded-full text-sm font-bold tracking-wide uppercase mb-6 border border-amber-200">
            Premium Real Estate in Nigeria
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-[#1A2B4C] mb-6 leading-tight">
            The New Standard of <br />
            <span className="text-amber-500 underline decoration-amber-200 underline-offset-8">Property</span> Excellence
          </h1>
          <p className="text-lg text-slate-700 mb-10 max-w-lg leading-relaxed">
            From Banana Island mansions to Abuja's finest penthouses. Experience unparalleled luxury with AddyHolly Homes & Properties.
          </p>

          {/* Search Box */}
          <div className="bg-white p-2 rounded-3xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-5xl border border-slate-100">
            <div className="flex-1 flex items-center px-4 py-4 border-b md:border-b-0 md:border-r border-slate-100">
              <MapPin className="text-amber-500 mr-3 shrink-0" size={20} />
              <div className="flex flex-col flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Location</span>
                <input 
                  type="text" 
                  value={filters.location}
                  onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
                  placeholder="Lagos, Abuja, PH..." 
                  className="bg-transparent border-none focus:ring-0 text-slate-800 font-bold p-0 placeholder:text-slate-300 w-full" 
                />
              </div>
            </div>
            <div className="flex-1 flex items-center px-4 py-4 border-b md:border-b-0 md:border-r border-slate-100">
              <Home className="text-amber-500 mr-3 shrink-0" size={20} />
              <div className="flex flex-col flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Property Type</span>
                <select 
                  value={filters.type}
                  onChange={(e) => setFilters(f => ({ ...f, type: e.target.value }))}
                  className="bg-transparent border-none focus:ring-0 text-slate-800 font-bold p-0 outline-none cursor-pointer w-full"
                >
                  <option>All Types</option>
                  <option>Villa</option>
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Condo</option>
                </select>
              </div>
            </div>
            <div className="flex-1 flex items-center px-4 py-4">
              <DollarSign className="text-amber-500 mr-3 shrink-0" size={20} />
              <div className="flex flex-col flex-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Budget Range</span>
                <select 
                  value={filters.budget}
                  onChange={(e) => setFilters(f => ({ ...f, budget: e.target.value }))}
                  className="bg-transparent border-none focus:ring-0 text-slate-800 font-bold p-0 outline-none cursor-pointer w-full"
                >
                  <option>Any Budget</option>
                  <option value="luxury">High End (₦200M+ / $1M+)</option>
                  <option value="mid">Mid Range (₦100M - ₦200M)</option>
                  <option value="entry">Entry Luxury (Below ₦100M)</option>
                </select>
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="bg-[#1A2B4C] text-white px-10 py-5 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-navy/20"
            >
              <Search size={22} className="group-hover:scale-110 transition-transform" /> 
              <span>Find Properties</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
