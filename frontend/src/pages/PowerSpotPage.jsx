import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, LayoutDashboard, Map as MapIcon, Zap, PlusSquare, 
  Utensils, Users, Calendar, AlertTriangle, List, Map, Filter, 
  CheckCircle, DollarSign, Wifi, Navigation, Bookmark, Shield, Search 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const links = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <MapIcon size={20} />, label: 'Safety Map', to: '/safety-map' },
    { icon: <Zap size={20} />, label: 'PowerSpot', to: '/powerspot', active: true },
    { icon: <PlusSquare size={20} />, label: 'MediTrust', to: '/meditrust' },
    { icon: <Utensils size={20} />, label: 'MenuLens', to: '/menulens' },
    { icon: <Users size={20} />, label: 'LocalVibe', to: '/localvibe' },
    { icon: <Calendar size={20} />, label: 'Trip Planner' },
  ];

  const navigate = useNavigate();
  const handleSOS = () => {
    const travelerType = localStorage.getItem('travelerType') || 'men';
    const hubPath = travelerType === 'family' ? 'family-hub' : travelerType === 'women' ? 'womens-hub' : 'mens-hub';
    navigate(`/${hubPath}?view=safety`);
  };

  return (
    <div className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 w-64 bg-[#050b14] border-r border-slate-800/60 z-40 overflow-y-auto">
      {/* Profile Block */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
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

      {/* Nav Links */}
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

      {/* SOS Button */}
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

const initialWorkspaces = [
  {
    id: 1,
    name: 'The Canvas Cafe',
    distance: '0.2 mi',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop',
    tags: [{ label: 'Top Rated', icon: <CheckCircle size={14} className="text-emerald-400" /> }],
    price: '$$',
    reliability: 98,
    reliabilityStatus: 'high', // high, medium
    wifi: 120,
    safety: 4.9,
    theme: 'emerald'
  },
  {
    id: 2,
    name: 'Roasters Hub',
    distance: '0.5 mi',
    image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?q=80&w=2070&auto=format&fit=crop',
    tags: [{ label: 'Very Crowded', icon: <Users size={14} className="text-amber-400" />, type: 'warning' }],
    price: '$',
    reliability: 75,
    reliabilityStatus: 'medium',
    wifi: 45,
    safety: 4.2,
    theme: 'amber'
  },
  {
    id: 3,
    name: 'Nexus Work Lounge',
    distance: '1.2 mi',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    tags: [],
    price: '$$$',
    reliability: 100,
    reliabilityStatus: 'high',
    wifi: 300,
    safety: 5.0,
    theme: 'emerald'
  },
  {
    id: 4,
    name: 'TechHub Downtown',
    distance: '0.8 mi',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=2070&auto=format&fit=crop',
    tags: [{ label: 'High Speed', icon: <Wifi size={14} className="text-purple-400" /> }],
    price: '$$',
    reliability: 92,
    reliabilityStatus: 'high',
    wifi: 400,
    safety: 4.8,
    theme: 'emerald'
  },
  {
    id: 5,
    name: 'CoWork Station 9',
    distance: '1.5 mi',
    image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5d1?q=80&w=2070&auto=format&fit=crop',
    tags: [{ label: 'Budget Friendly', icon: <DollarSign size={14} className="text-blue-400" /> }],
    price: '$',
    reliability: 85,
    reliabilityStatus: 'medium',
    wifi: 80,
    safety: 4.5,
    theme: 'blue'
  },
  {
    id: 6,
    name: 'The Quiet Corner',
    distance: '2.1 mi',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1974&auto=format&fit=crop',
    tags: [{ label: 'Quiet Zone', icon: <ShieldCheck size={14} className="text-emerald-400" /> }],
    price: '$$$',
    reliability: 99,
    reliabilityStatus: 'high',
    wifi: 150,
    safety: 5.0,
    theme: 'emerald'
  }
];

export default function PowerSpotPage() {
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [highReliability, setHighReliability] = useState(false);
  const [premiumPrice, setPremiumPrice] = useState(false);
  const [fastWifi, setFastWifi] = useState(false);

  const workspaces = initialWorkspaces.filter(ws => {
    // Search query
    if (searchQuery && !ws.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    // Filters
    if (highReliability && ws.reliability < 95) return false;
    if (premiumPrice && ws.price === '$') return false; // Keeps $$ and $$$
    if (fastWifi && ws.wifi < 100) return false;
    
    return true;
  });

  return (
    <div className="min-h-screen flex bg-[#0f111a] text-slate-200">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64 pt-20 px-6 lg:px-10 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white flex items-center gap-3 tracking-tight mb-2">
                <Zap className="text-emerald-400 fill-emerald-400" size={32} /> PowerSpot
              </h1>
              <p className="text-slate-400">Directory of crowdsourced power outlets and workspaces.</p>
            </div>
            
            {/* View Toggles */}
            <div className="flex bg-[#1a1d27] p-1 rounded-xl border border-slate-800">
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'list' ? 'bg-[#2a2d3a] text-white shadow-md' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <List size={16} /> List
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  viewMode === 'map' ? 'bg-[#2a2d3a] text-white shadow-md' : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <Map size={16} /> Map
              </button>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-transparent border border-slate-700 text-slate-300 rounded-full text-sm hover:bg-slate-800 transition-colors">
                <Filter size={16} /> All Filters
              </button>
              <button 
                onClick={() => setHighReliability(!highReliability)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all shadow-lg ${
                  highReliability 
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-emerald-500/20' 
                    : 'bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <CheckCircle size={16} /> High Reliability
              </button>
              <button 
                onClick={() => setPremiumPrice(!premiumPrice)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all shadow-lg ${
                  premiumPrice 
                    ? 'bg-blue-500 text-white border-blue-400 shadow-blue-500/20' 
                    : 'bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <DollarSign size={16} /> $$ - $$$
              </button>
              <button 
                onClick={() => setFastWifi(!fastWifi)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all shadow-lg ${
                  fastWifi 
                    ? 'bg-purple-500 text-white border-purple-400 shadow-purple-500/20' 
                    : 'bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Wifi size={16} /> Fast WiFi
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search workspaces..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#1a1d27] border border-slate-800 text-slate-200 text-sm rounded-xl focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 block w-full md:min-w-[280px] pl-10 p-2.5 transition-all outline-none placeholder-slate-500 shadow-inner"
              />
            </div>
          </div>

          {/* Empty State */}
          {workspaces.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-[#151822] rounded-2xl border border-slate-800 border-dashed">
              <Filter size={48} className="text-slate-600 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No workspaces found</h3>
              <p className="text-slate-400 max-w-md text-center">We couldn't find any locations matching your current filters. Try adjusting them or clearing your search.</p>
              <button 
                onClick={() => { setSearchQuery(''); setHighReliability(false); setPremiumPrice(false); setFastWifi(false); }}
                className="mt-6 px-6 py-2.5 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-400 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {workspaces.map((workspace, index) => (
              <motion.div 
                key={workspace.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#151822] rounded-2xl border border-slate-800 overflow-hidden hover:border-slate-700 transition-all flex flex-col"
              >
                {/* Card Image Header */}
                <div className="relative h-48 w-full">
                  <img src={workspace.image} alt={workspace.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151822] via-transparent to-transparent opacity-80" />
                  
                  {/* Top Tags */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                      {workspace.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md backdrop-blur-md border ${
                            tag.type === 'warning' 
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/20' 
                              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
                          }`}
                        >
                          {tag.icon} {tag.label}
                        </span>
                      ))}
                    </div>
                    <span className="px-2.5 py-1 bg-slate-900/60 text-slate-300 text-xs font-medium rounded-md backdrop-blur-md border border-slate-700">
                      {workspace.price}
                    </span>
                  </div>

                  {/* Distance */}
                  <div className="absolute bottom-4 right-4 text-xs font-medium text-slate-300 bg-slate-900/60 px-2 py-1 rounded backdrop-blur-md">
                    {workspace.distance}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white mb-6">{workspace.name}</h3>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1a1d27] border border-slate-800/80">
                      <Zap size={18} className={`mb-2 ${workspace.theme === 'amber' ? 'text-amber-500' : 'text-emerald-500'}`} />
                      <span className="text-lg font-bold text-white">{workspace.reliability}%</span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">RELIABILITY</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1a1d27] border border-slate-800/80">
                      <Wifi size={18} className="mb-2 text-slate-400" />
                      <span className="text-lg font-bold text-white">{workspace.wifi}</span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">MBPS</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#1a1d27] border border-slate-800/80">
                      <Shield size={18} className="mb-2 text-slate-400" />
                      <span className="text-lg font-bold text-white">{workspace.safety}</span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 mt-1">SAFETY</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-auto">
                    <button className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-colors ${
                      workspace.theme === 'amber'
                        ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                        : 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:bg-emerald-400'
                    }`}>
                      <Navigation size={16} className={workspace.theme === 'amber' ? 'text-slate-400' : 'text-white'} />
                      Navigate
                    </button>
                    <button className="w-12 flex items-center justify-center rounded-xl bg-transparent border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                      <Bookmark size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
