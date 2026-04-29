import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, LayoutDashboard, Map as MapIcon, Zap, PlusSquare, 
  Utensils, Users, Calendar, AlertTriangle, Star, MapPin, 
  Clock, Filter, Search, MessageSquare, Heart, Share2, 
  ChevronRight, Music, Coffee, Ticket, Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const links = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <MapIcon size={20} />, label: 'Safety Map', to: '/safety-map' },
    { icon: <Zap size={20} />, label: 'PowerSpot', to: '/powerspot' },
    { icon: <PlusSquare size={20} />, label: 'MediTrust', to: '/meditrust' },
    { icon: <Utensils size={20} />, label: 'MenuLens', to: '/menulens' },
    { icon: <Users size={20} />, label: 'LocalVibe', to: '/localvibe', active: true },
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

      <div className="flex-1 py-6 flex flex-col gap-1 px-3">
        {links.map((link) => (
          <Link 
            key={link.label}
            to={link.to || '#'}
            className={`flex items-center gap-3 px-4 py-3 transition-colors w-full cursor-pointer text-left
              ${link.active 
                ? 'bg-emerald-500/10 text-emerald-500 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-emerald-500 before:rounded-r-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl'}`}
          >
            {link.icon}
            <span className="font-medium text-sm">{link.label}</span>
          </Link>
        ))}
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

const initialSpots = [
  {
    id: 1,
    name: "Neon Nights Jazz Club",
    location: "District 4, Urban Center",
    rating: 4.9,
    vibe: "Sophisticated",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80",
    safetyScore: 98,
    category: "Music",
    tags: ["Live Music", "Safe Parking"],
    crowdLevel: "Moderate",
    type: "spot"
  },
  {
    id: 2,
    name: "The Green Canopy Park",
    location: "Westside Greenway",
    rating: 4.7,
    vibe: "Relaxing",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80",
    safetyScore: 95,
    category: "Nature",
    tags: ["Kid-Friendly", "Pet-Friendly"],
    crowdLevel: "Low",
    type: "spot"
  },
  {
    id: 3,
    name: "Community Yoga Mixer",
    location: "Sunrise Studio",
    rating: 4.8,
    vibe: "Active",
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&w=800&q=80",
    safetyScore: 100,
    category: "Events",
    tags: ["Social", "Wellness"],
    crowdLevel: "Private",
    type: "event",
    date: "Tomorrow, 8:00 AM"
  },
  {
    id: 4,
    name: "Vintage Vinyl Expo",
    location: "Heritage Hall",
    rating: 4.6,
    vibe: "Artistic",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
    safetyScore: 92,
    category: "Events",
    tags: ["Hobbyists", "Indoor"],
    crowdLevel: "High",
    type: "event",
    date: "Sat, 2:00 PM"
  }
];

export default function LocalVibePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const travelerType = localStorage.getItem('travelerType') || 'men';

  const categories = ['All', 'Spots', 'Events', 'Music', 'Nature', 'Social'];

  const filteredSpots = initialSpots.filter(spot => {
    const matchesCategory = activeCategory === 'All' || spot.category === activeCategory || (activeCategory === 'Spots' && spot.type === 'spot') || (activeCategory === 'Events' && spot.type === 'event');
    const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) || spot.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getPersonalizedHeader = () => {
    if (travelerType === 'women') {
      return {
        title: "Women-Safe Social Hub",
        desc: "Discover highly-rated spots and female-led community events vetted for safety and inclusivity.",
        accent: "text-pink-400",
        glow: "bg-pink-500/10"
      };
    } else if (travelerType === 'family') {
      return {
        title: "Family Adventure Guide",
        desc: "Find the best kid-friendly events, playgrounds, and family-vetted social spaces in the city.",
        accent: "text-emerald-400",
        glow: "bg-emerald-500/10"
      };
    } else {
      return {
        title: "Men's Exploration Hub",
        desc: "Connect with local adventure groups, trending social spots, and high-vibe events for men.",
        accent: "text-blue-400",
        glow: "bg-blue-500/10"
      };
    }
  };

  const header = getPersonalizedHeader();

  return (
    <div className="min-h-screen flex bg-[#0f111a] text-slate-200">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64 pt-20 px-6 lg:px-10 pb-12 relative overflow-hidden">
        {/* Background Glow */}
        <div className={`absolute top-0 right-0 w-full h-[500px] ${header.glow} blur-[120px] pointer-events-none rounded-full`} />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-12">
            <div className={`flex items-center gap-2 ${header.accent} font-semibold tracking-wide text-sm mb-3 uppercase`}>
              <Users size={18} /> Community & Discovery
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {header.title}
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
              {header.desc}
            </p>
          </div>

          {/* Search & Categories */}
          <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                    activeCategory === cat 
                      ? `${header.glow} ${header.accent} border-${header.accent}/30 shadow-lg shadow-black/20` 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input 
                type="text" 
                placeholder="Search spots or vibes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#151822] border border-slate-800 text-slate-200 text-sm rounded-2xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Spots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredSpots.map((spot, index) => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#151822] border border-slate-800 rounded-[2rem] overflow-hidden hover:border-slate-700 transition-all shadow-xl"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img src={spot.image} alt={spot.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151822] via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-6 left-6 flex gap-2">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/10">
                      <ShieldCheck size={14} className="text-emerald-400" /> {spot.safetyScore}% Safe
                    </span>
                    {spot.type === 'event' && (
                      <span className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-500 text-white text-xs font-bold rounded-full shadow-lg shadow-violet-500/20">
                        <Ticket size={14} /> LIVE EVENT
                      </span>
                    )}
                  </div>

                  <button className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-rose-500 transition-colors border border-white/10">
                    <Heart size={20} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-slate-500 text-xs font-bold tracking-widest uppercase">
                      {spot.type === 'spot' ? <Coffee size={14} /> : <Music size={14} />} {spot.category}
                    </div>
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={16} fill="currentColor" /> <span className="text-white font-bold">{spot.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{spot.name}</h3>
                  <div className="flex items-center gap-1.5 text-slate-400 text-sm mb-6">
                    <MapPin size={14} /> {spot.location}
                  </div>

                  {/* Vibe Check Panel */}
                  <div className="bg-[#1a1d27] rounded-2xl p-5 border border-slate-800/50 mb-8 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">CROWD STATUS</p>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${spot.crowdLevel === 'High' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                        <span className="text-white font-bold text-sm">{spot.crowdLevel} Density</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">VIBE CHECK</p>
                      <span className="text-white font-bold text-sm italic">{spot.vibe}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    {spot.type === 'event' ? (
                      <div className="flex items-center gap-2 text-violet-400 text-sm font-bold">
                        <Clock size={16} /> {spot.date}
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        {spot.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-400">
                            #{tag.toUpperCase()}
                          </span>
                        ))}
                      </div>
                    )}

                    <button className="flex items-center gap-2 text-white font-bold text-sm group/btn">
                      Explore <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Community Feed Section */}
          <div className="mt-20">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <Sparkles className="text-amber-400" /> Trending Vibes
              </h2>
              <button className="text-emerald-400 font-bold text-sm hover:underline">View Community Map</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-[#151822] border border-slate-800 rounded-3xl p-6 relative overflow-hidden group">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 rounded-full border border-slate-700" alt="User" />
                    <div>
                      <p className="text-white font-bold text-sm">Traveler_{i}52</p>
                      <p className="text-slate-500 text-[10px]">2 hours ago • Verified Traveler</p>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                    "Just discovered this hidden gem! Super safe for solo travelers and the coffee is actually amazing. ☕️✨"
                  </p>
                  <div className="flex items-center gap-4 text-slate-500">
                    <button className="flex items-center gap-1.5 text-xs hover:text-rose-500 transition-colors">
                      <Heart size={14} /> 24
                    </button>
                    <button className="flex items-center gap-1.5 text-xs hover:text-white transition-colors">
                      <MessageSquare size={14} /> 8
                    </button>
                    <button className="ml-auto text-slate-600 hover:text-white transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
