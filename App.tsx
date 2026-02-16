import React, { useState, useMemo, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PropertyCard } from "./components/PropertyCard";
import { AIAssistant } from "./components/AIAssistant";
import { Footer } from "./components/Footer";
import { MOCK_PROPERTIES } from "./constants";
import { SearchFilters } from "./types";
import { ArrowRight, CheckCircle2, SearchX } from "lucide-react";

const App: React.FC = () => {
  const [currency, setCurrency] = useState<"NGN" | "USD">(() => {
    const saved = localStorage.getItem("addyholly_currency");
    return saved === "NGN" || saved === "USD" ? saved : "NGN";
  });

  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    type: "All Types",
    budget: "Any Budget",
  });

  useEffect(() => {
    localStorage.setItem("addyholly_currency", currency);
  }, [currency]);

  const filteredProperties = useMemo(() => {
    return MOCK_PROPERTIES.filter((prop) => {
      // Location Filter
      const matchesLocation =
        !filters.location ||
        prop.location.toLowerCase().includes(filters.location.toLowerCase()) ||
        prop.city.toLowerCase().includes(filters.location.toLowerCase());

      // Type Filter
      const matchesType =
        filters.type === "All Types" || prop.type === filters.type;

      // Budget Filter (Rough logic)
      let matchesBudget = true;
      if (filters.budget !== "Any Budget") {
        const isNgn = prop.currency === "NGN";
        const price = prop.price;

        if (filters.budget === "luxury") {
          matchesBudget = isNgn ? price >= 200000000 : price >= 1000000;
        } else if (filters.budget === "mid") {
          matchesBudget = isNgn
            ? price >= 100000000 && price < 200000000
            : price >= 500000 && price < 1000000;
        } else if (filters.budget === "entry") {
          matchesBudget = isNgn ? price < 100000000 : price < 500000;
        }
      }

      return matchesLocation && matchesType && matchesBudget;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-white">
      <Header currency={currency} setCurrency={setCurrency} />

      <main>
        <Hero onSearch={setFilters} />

        {/* Stats Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  label: "Properties in Portfolio",
                  val: currency === "NGN" ? "₦12B+" : "$7.5M+",
                },
                { label: "Nigerian Cities", val: "12" },
                { label: "VVIP Clients", val: "450+" },
                { label: "Success Rate", val: "98%" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100 group hover:border-amber-400 transition-all duration-300"
                >
                  <div className="text-4xl font-black text-[#1A2B4C] mb-2 group-hover:scale-110 transition-transform">
                    {stat.val}
                  </div>
                  <div className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Properties Section */}
        <section id="properties" className="py-24 scroll-mt-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-xl">
                <span className="text-amber-500 font-black uppercase tracking-[0.3em] text-xs mb-3 block">
                  Exclusive Listings
                </span>
                <h2 className="text-5xl font-black text-[#1A2B4C] mb-6">
                  Our Premium Properties
                </h2>
                <div className="flex flex-wrap gap-2">
                  {filters.location && (
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">
                      "{filters.location}"
                    </span>
                  )}
                  {filters.type !== "All Types" && (
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-600">
                      {filters.type}
                    </span>
                  )}
                  {(filters.location ||
                    filters.type !== "All Types" ||
                    filters.budget !== "Any Budget") && (
                    <button
                      onClick={() =>
                        setFilters({
                          location: "",
                          type: "All Types",
                          budget: "Any Budget",
                        })
                      }
                      className="text-xs font-bold text-amber-600 hover:underline"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Showing
                  </p>
                  <p className="text-2xl font-black text-[#1A2B4C]">
                    {filteredProperties.length} Results
                  </p>
                </div>
                <button className="flex items-center gap-3 bg-[#1A2B4C] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-navy/10">
                  Filter View
                </button>
              </div>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    displayCurrency={currency}
                  />
                ))}
              </div>
            ) : (
              <div className="py-32 flex flex-col items-center justify-center text-center max-w-md mx-auto">
                <div className="bg-slate-50 p-8 rounded-full mb-8">
                  <SearchX size={64} className="text-slate-300" />
                </div>
                <h3 className="text-3xl font-bold text-[#1A2B4C] mb-4">
                  No Properties Found
                </h3>
                <p className="text-slate-500 mb-8">
                  We couldn't find any properties matching your current filters.
                  Try adjusting your search criteria or clear filters to see all
                  listings.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      location: "",
                      type: "All Types",
                      budget: "Any Budget",
                    })
                  }
                  className="bg-amber-400 text-[#1A2B4C] px-10 py-4 rounded-2xl font-bold hover:bg-amber-500 transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Services / About Section */}
        <section
          id="services"
          className="py-32 bg-[#1A2B4C] text-white overflow-hidden relative"
        >
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-400/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <span className="text-amber-400 font-black uppercase tracking-[0.3em] text-xs mb-4 block">
                  The AddyHolly Way
                </span>
                <h2 className="text-6xl font-black mb-10 leading-tight">
                  Creating wealth in Real Estate
                </h2>
                <p className="text-slate-300 mb-12 text-xl leading-relaxed font-light">
                  We specialize in the luxury segment of the Nigerian market,
                  providing bespoke property solutions for high-net-worth
                  individuals and corporate entities.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Market Integrity",
                      desc: "Transparent dealings across all Lagos & Abuja assets.",
                    },
                    {
                      title: "Global Network",
                      desc: "Connecting Nigerian elite to international investments.",
                    },
                    {
                      title: "Expert Valuation",
                      desc: "Precise appraisals in a dynamic economic climate.",
                    },
                    {
                      title: "Legal Security",
                      desc: "Watertight documentation for peace of mind.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={24} className="text-amber-400" />
                        <h4 className="text-lg font-bold">{item.title}</h4>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
                <button className="mt-16 bg-white text-[#1A2B4C] px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-amber-400 transition-all shadow-2xl">
                  Contact Our Advisors
                </button>
              </div>
              <div className="relative">
                <div className="absolute -inset-10 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-3xl"></div>
                <div className="relative rounded-[60px] overflow-hidden border-8 border-white/5 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1600607687940-4e524cb35797?auto=format&fit=crop&q=80&w=1200"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                  />
                </div>
                <div className="absolute -bottom-12 -left-12 bg-amber-400 text-[#1A2B4C] p-10 rounded-[40px] shadow-2xl hidden md:block">
                  <p className="text-5xl font-black mb-1">12+</p>
                  <p className="text-xs font-black uppercase tracking-widest opacity-80">
                    Years of Luxury
                    <br />
                    Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-32">
          <div className="container mx-auto px-4 md:px-8">
            <div className="bg-slate-900 rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent"></div>
              <div className="relative z-10">
                <h2 className="text-5xl md:text-7xl font-black text-white mb-10">
                  Own Your Piece of
                  <br />
                  <span className="text-amber-400">Paradise</span>
                </h2>
                <p className="text-slate-400 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                  The Nigerian property market moves fast. Partner with
                  AddyHolly to ensure you never miss an elite opportunity.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button className="bg-amber-400 text-[#1A2B4C] px-14 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-xl shadow-amber-400/10">
                    Get an Offer
                  </button>
                  <button className="border-2 border-white/20 text-white px-14 py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-white hover:text-black transition-all">
                    View Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AIAssistant />
    </div>
  );
};

export default App;
