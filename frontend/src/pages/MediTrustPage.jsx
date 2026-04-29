import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, LayoutDashboard, Map as MapIcon, Zap, PlusSquare, 
  Utensils, Users, Calendar, AlertTriangle, Search, Filter, 
  MapPin, Star, ChevronDown, Clock, ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const links = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <MapIcon size={20} />, label: 'Safety Map', to: '/safety-map' },
    { icon: <Zap size={20} />, label: 'PowerSpot', to: '/powerspot' },
    { icon: <PlusSquare size={20} />, label: 'MediTrust', to: '/meditrust', active: true },
    { icon: <Utensils size={20} />, label: 'MenuLens', to: '/menulens' },
    { icon: <Users size={20} />, label: 'LocalVibe', to: '/localvibe' },
    { icon: <Calendar size={20} />, label: 'Trip Planner', to: '/trip-planner' },
  ];

  const navigate = useNavigate();
  const handleSOS = () => {
    const travelerType = localStorage.getItem('travelerType') || 'men';
    const hubPath = travelerType === 'family' ? 'family-hub' : travelerType === 'women' ? 'womens-hub' : 'mens-hub';
    navigate(`/${hubPath}?view=safety`);
  };

  return (
    <div className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 w-64 bg-[#050b14] border-r border-slate-800/60 z-40 overflow-y-auto">
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" 
            alt="Profile" 
            className="w-10 h-10 rounded-full border border-slate-700 object-cover"
          />
          <div>
            <div className="text-emerald-500 font-semibold text-sm">Traviora Premium</div>
            <div className="text-slate-400 text-xs flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div> 
              Safe & Connected
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 py-6 flex flex-col gap-1 px-3">
        {links.map((link) => {
          const Wrapper = link.to ? Link : 'button';
          return (
            <Wrapper 
              key={link.label}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 transition-colors w-full cursor-pointer text-left
                ${link.active 
                  ? 'bg-emerald-500/10 text-emerald-500 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-emerald-500 before:rounded-r-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl'}`}
            >
              {link.icon}
              <span className="font-medium text-sm">{link.label}</span>
            </Wrapper>
          );
        })}
      </div>

      <div className="p-6">
        <button 
          onClick={handleSOS}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-500 font-semibold text-sm hover:bg-rose-500/20 transition-colors cursor-pointer"
        >
          <AlertTriangle size={18} /> SOS EMERGENCY
        </button>
      </div>
    </div>
  );
}

import { medicalProviders } from '../data/medicalData';

export default function MediTrustPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [maxPriceFilter, setMaxPriceFilter] = useState(100);
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const specialties = ['All', 'General Practitioner', 'Dentist', 'Walk-in Clinic', 'Pediatrician', 'Optometrist'];
  const prices = [50, 75, 100, 150];

  const filteredProviders = medicalProviders.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'All' || p.specialty === specialtyFilter;
    const matchesPrice = p.price <= maxPriceFilter;
    return matchesSearch && matchesSpecialty && matchesPrice;
  });

  return (
    <div className="min-h-screen flex bg-[#0f111a] text-slate-200">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64 pt-20 px-6 lg:px-10 pb-12 relative overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-0 w-full h-96 bg-emerald-500/5 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold tracking-wide text-sm mb-3">
              <ShieldCheck size={18} /> VERIFIED NETWORK
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              MediTrust Directory
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg">
              Connect with English-speaking, internationally certified medical professionals. 
              Transparent pricing, no surprises.
            </p>
          </div>

          {/* Search & Filters Bar */}
          <div className="bg-[#151822] border border-slate-800 rounded-2xl p-2 mb-10 flex flex-col md:flex-row gap-2 relative">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="text" 
                placeholder="Search conditions or doctor names..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-slate-200 text-base placeholder-slate-500 pl-12 pr-4 py-3.5 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="flex gap-2 p-1 relative">
              {/* Specialty Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
                  className="flex items-center justify-between gap-3 px-5 py-2.5 bg-[#1a1d27] border border-slate-700/50 hover:bg-slate-800 rounded-xl text-sm font-medium text-slate-300 transition-colors min-w-[160px]"
                >
                  <span className="truncate">Specialty: {specialtyFilter}</span> <ChevronDown size={16} className={`text-slate-500 transition-transform ${isSpecialtyOpen ? 'rotate-180' : ''}`} />
                </button>
                {isSpecialtyOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1d27] border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                    {specialties.map(s => (
                      <button 
                        key={s}
                        onClick={() => { setSpecialtyFilter(s); setIsSpecialtyOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors ${specialtyFilter === s ? 'text-emerald-400 bg-emerald-500/5' : 'text-slate-400'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
                  className="flex items-center justify-between gap-3 px-5 py-2.5 bg-[#1a1d27] border border-slate-700/50 hover:bg-slate-800 rounded-xl text-sm font-medium text-slate-300 transition-colors min-w-[140px]"
                >
                  <span>Max Price: ${maxPriceFilter}</span> <ChevronDown size={16} className={`text-slate-500 transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
                </button>
                {isPriceOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1d27] border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                    {prices.map(p => (
                      <button 
                        key={p}
                        onClick={() => { setMaxPriceFilter(p); setIsPriceOpen(false); }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors ${maxPriceFilter === p ? 'text-emerald-400 bg-emerald-500/5' : 'text-slate-400'}`}
                      >
                        Under ${p}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button className="flex items-center justify-center w-11 h-11 bg-[#1a1d27] border border-slate-700/50 hover:bg-slate-800 rounded-xl text-slate-300 transition-colors shrink-0">
                <Filter size={18} />
              </button>
            </div>
          </div>

          {/* Empty State */}
          {filteredProviders.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-[#151822] rounded-3xl border border-slate-800 border-dashed">
              <PlusSquare size={48} className="text-slate-600 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No medical professionals found</h3>
              <p className="text-slate-400 max-w-md text-center">Try adjusting your filters or search query to find more results.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSpecialtyFilter('All'); setMaxPriceFilter(100); }}
                className="mt-6 px-6 py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-400 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Doctor Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProviders.map((provider, index) => (
              <motion.div 
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#151822] border border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col relative transition-all"
              >
                
                {/* Top Tags */}
                <div className="absolute top-0 right-6 -translate-y-1/2 flex gap-2">
                  {provider.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border shadow-xl ${
                        tag.type === 'success' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-md' 
                          : 'bg-slate-800/80 text-slate-300 border-slate-700 backdrop-blur-md'
                      }`}
                    >
                      {tag.type === 'success' ? <ShieldCheck size={12} /> : <ShieldCheck size={12} className="text-slate-400" />}
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* Profile Header */}
                <div className="flex gap-4 mb-6 pt-2">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-slate-700 shadow-lg">
                    <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">{provider.name}</h3>
                    <p className="text-emerald-400 font-medium text-sm mb-1">{provider.specialty}</p>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-slate-200 font-bold">{provider.rating}</span>
                      <span>({provider.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Info Sections */}
                <div className="flex flex-col gap-5 flex-1 mb-6">
                  
                  {/* Languages */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2">
                      {provider.type === 'clinic' ? 'Languages Available' : 'Languages'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {provider.languagesList?.map((lang, i) => (
                        <span key={i} className="px-3 py-1 bg-transparent border border-slate-700/60 rounded-lg text-xs font-medium text-slate-300">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Location or Wait Time */}
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-2">
                      {provider.type === 'clinic' ? 'Wait Time' : 'Location'}
                    </p>
                    {provider.type === 'clinic' ? (
                      <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
                        <Clock size={16} /> {provider.waitTime}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-slate-300">
                        <MapPin size={16} className="text-slate-500" /> {provider.location}
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-5" />

                {/* Footer / Pricing */}
                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 tracking-wider mb-1">
                      {provider.type === 'clinic' ? 'Base Consultation' : 'Transparent Price'}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">${provider.price}</span>
                      {provider.type !== 'clinic' && <span className="text-sm text-slate-400">/ {provider.priceUnit}</span>}
                    </div>
                  </div>
                  
                  <Link 
                    to={`/meditrust/doctor/${provider.id}`}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${
                      provider.primary 
                        ? 'bg-emerald-400 text-slate-900 shadow-emerald-400/20 hover:bg-emerald-300' 
                        : 'bg-[#1a1d27] border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    {provider.actionText}
                    {provider.primary && <ArrowRight size={16} />}
                  </Link>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
