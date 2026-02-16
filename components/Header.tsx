
import React, { useState, useEffect } from 'react';
import { Logo } from '../constants';
import { Menu, X, Search, Heart, User, Globe } from 'lucide-react';

interface HeaderProps {
  currency: 'NGN' | 'USD';
  setCurrency: (currency: 'NGN' | 'USD') => void;
}

export const Header: React.FC<HeaderProps> = ({ currency, setCurrency }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Intersection Observer for active section highlighting
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Sections to observe
    const sections = ['properties', 'services', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleCurrency = () => {
    const next = currency === 'NGN' ? 'USD' : 'NGN';
    setCurrency(next);
  };

  const menuItems = [
    { label: 'Properties', href: '#properties', id: 'properties' },
    { label: 'About Us', href: '#services', id: 'services' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        <a href="#" className="flex-shrink-0">
          <Logo className="h-10 md:h-12" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item, idx) => (
            <a 
              key={`${item.label}-${idx}`} 
              href={item.href} 
              className={`font-bold text-sm uppercase tracking-widest transition-all relative group ${
                isScrolled ? 'text-slate-700' : 'text-[#1A2B4C]'
              } ${activeSection === item.id ? 'text-amber-500' : 'hover:text-amber-500'}`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-400 transition-all ${
                activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={toggleCurrency}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all font-bold text-xs ${
              isScrolled 
                ? 'border-slate-200 text-slate-600 hover:border-amber-400' 
                : 'border-navy/20 text-[#1A2B4C] hover:bg-white/10'
            }`}
          >
            <Globe size={14} className="text-amber-500" />
            <span>{currency}</span>
          </button>

          <button className="text-[#1A2B4C] hover:text-amber-500 transition-colors"><Search size={20} /></button>
          <button className="text-[#1A2B4C] hover:text-amber-500 transition-colors"><Heart size={20} /></button>
          <button className="bg-[#1A2B4C] text-white px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-slate-800 transition-all flex items-center gap-2 shadow-lg shadow-navy/10">
            <User size={18} /> Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
           <button 
            onClick={toggleCurrency}
            className="flex items-center gap-1 px-3 py-1 rounded-full border border-slate-200 text-slate-800 font-bold text-xs"
          >
            <span>{currency}</span>
          </button>
          <button className="text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-t p-6 shadow-xl animate-in slide-in-from-top">
          <nav className="flex flex-col gap-4">
            {menuItems.map((item, idx) => (
              <a 
                key={`${item.label}-${idx}`} 
                href={item.href} 
                className={`text-lg font-black uppercase tracking-tighter transition-colors ${
                  activeSection === item.id ? 'text-amber-500' : 'text-[#1A2B4C]'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t flex flex-col gap-4">
              <button className="bg-[#1A2B4C] text-white px-6 py-4 rounded-2xl font-black uppercase text-sm tracking-widest w-full">Login</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
