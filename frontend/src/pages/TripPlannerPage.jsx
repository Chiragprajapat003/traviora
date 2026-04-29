import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, LayoutDashboard, Map as MapIcon, Zap, PlusSquare, 
  Utensils, Users, Calendar, AlertTriangle, Plus, Trash2, 
  Clock, MapPin, ChevronRight, Save, Download, Sparkles,
  Plane, Hotel, Camera, Coffee, Heart
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const links = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <MapIcon size={20} />, label: 'Safety Map', to: '/safety-map' },
    { icon: <Zap size={20} />, label: 'PowerSpot', to: '/powerspot' },
    { icon: <PlusSquare size={20} />, label: 'MediTrust', to: '/meditrust' },
    { icon: <Utensils size={20} />, label: 'MenuLens', to: '/menulens' },
    { icon: <Users size={20} />, label: 'LocalVibe', to: '/localvibe' },
    { icon: <Calendar size={20} />, label: 'Trip Planner', to: '/trip-planner', active: true },
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

export default function TripPlannerPage() {
  const [itinerary, setItinerary] = useState([
    { id: 1, time: "09:00 AM", activity: "Arrival & Hotel Check-in", type: "hotel", location: "Grand Plaza Hotel", safety: "Verified" },
    { id: 2, time: "11:30 AM", activity: "Local Coffee Exploration", type: "food", location: "The Canvas Cafe", safety: "High" },
    { id: 3, time: "02:00 PM", activity: "Historical Museum Visit", type: "culture", location: "Heritage District", safety: "Verified" },
  ]);

  const [newActivity, setNewActivity] = useState('');
  const travelerType = localStorage.getItem('travelerType') || 'men';

  const addActivity = () => {
    if (!newActivity) return;
    const item = {
      id: Date.now(),
      time: "12:00 PM",
      activity: newActivity,
      type: "general",
      location: "City Center",
      safety: "Scanning..."
    };
    setItinerary([...itinerary, item]);
    setNewActivity('');
  };

  const removeActivity = (id) => {
    setItinerary(itinerary.filter(item => item.id !== id));
  };

  const getPersonalizedSuggestion = () => {
    if (travelerType === 'women') {
      return {
        title: "Solo Female Tip",
        message: "Consider the 'Women-Only' evening walking tour starting at 6 PM. It follows our AI-optimized well-lit path.",
        color: "text-pink-400",
        bg: "bg-pink-500/10"
      };
    } else if (travelerType === 'family') {
      return {
        title: "Family Planning Tip",
        message: "Add the 'Interactive Science Park' for the afternoon. It has a high family-vibe score and a dedicated kids' safe-zone.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10"
      };
    } else {
      return {
        title: "Men's Adventure Tip",
        message: "The local 'Summit Hike Group' departs at 7 AM. It's a great way to meet fellow solo travelers with similar interests.",
        color: "text-blue-400",
        bg: "bg-blue-500/10"
      };
    }
  };

  const suggestion = getPersonalizedSuggestion();

  const getIcon = (type) => {
    switch(type) {
      case 'hotel': return <Hotel size={18} />;
      case 'food': return <Coffee size={18} />;
      case 'culture': return <Camera size={18} />;
      case 'transport': return <Plane size={18} />;
      default: return <Sparkles size={18} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0f111a] text-slate-200">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64 pt-20 px-6 lg:px-10 pb-12 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-full h-[600px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-semibold tracking-wide text-sm mb-3 uppercase">
                <Calendar size={18} /> SMART TRIP ORGANIZER
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Trip <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Planner</span>
              </h1>
              <p className="text-slate-400 max-w-xl text-lg">
                Craft your perfect journey with safety-first itineraries, AI-vetted spots, and real-time transit updates.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all">
                <Save size={16} /> Save Plan
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all">
                <Download size={16} /> Export PDF
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left/Center: Itinerary Builder */}
            <div className="lg:col-span-2 space-y-6">
              {/* Add Activity Bar */}
              <div className="p-4 bg-[#151822] border border-slate-800 rounded-2xl flex gap-4 shadow-xl">
                <input 
                  type="text" 
                  placeholder="Where to next? (e.g., Dinner at SkyBar)" 
                  value={newActivity}
                  onChange={(e) => setNewActivity(e.target.value)}
                  className="flex-1 bg-transparent border-none text-slate-200 placeholder:text-slate-600 focus:ring-0 text-sm font-medium"
                />
                <button 
                  onClick={addActivity}
                  className="w-10 h-10 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-xl flex items-center justify-center transition-all active:scale-90"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Itinerary List */}
              <div className="space-y-4">
                <AnimatePresence>
                  {itinerary.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: index * 0.1 }}
                      className="group flex gap-6 items-start"
                    >
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center gap-2 pt-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <div className="w-0.5 h-20 bg-gradient-to-b from-emerald-500/50 to-transparent group-last:hidden" />
                      </div>

                      {/* Card */}
                      <div className="flex-1 bg-[#151822] border border-slate-800 hover:border-slate-700 rounded-2xl p-6 transition-all shadow-lg group-hover:translate-x-1">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3 text-slate-500 font-bold text-xs uppercase tracking-widest">
                            <Clock size={14} /> {item.time}
                          </div>
                          <button 
                            onClick={() => removeActivity(item.id)}
                            className="p-2 text-slate-600 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-emerald-400 shadow-inner">
                            {getIcon(item.type)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{item.activity}</h3>
                            <div className="flex items-center gap-2 text-slate-500 text-sm">
                              <MapPin size={14} /> {item.location}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${item.safety === 'Verified' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                            <span className="text-slate-400 text-xs font-bold uppercase tracking-tight">Safety: {item.safety}</span>
                          </div>
                          <button className="text-emerald-400 font-bold text-xs flex items-center gap-1 group/link">
                            View Details <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: AI Insights & Quick Stats */}
            <div className="space-y-6">
              {/* Personalized Suggestion */}
              <div className={`${suggestion.bg} border border-slate-800 rounded-3xl p-8 relative overflow-hidden`}>
                <div className="absolute -top-4 -right-4 p-6 opacity-10">
                  <Sparkles size={80} className={suggestion.color} />
                </div>
                <h3 className={`text-xl font-extrabold ${suggestion.color} mb-4 flex items-center gap-2 relative z-10`}>
                  <Sparkles size={20} /> {suggestion.title}
                </h3>
                <p className="text-slate-200 text-md leading-relaxed relative z-10 mb-6 font-medium">
                  "{suggestion.message}"
                </p>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-bold transition-all relative z-10">
                  Add to Itinerary
                </button>
              </div>

              {/* Trip Stats */}
              <div className="bg-[#151822] border border-slate-800 rounded-3xl p-8">
                <h3 className="text-white font-bold text-lg mb-6">Trip Overview</h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm font-medium">Safety Score</span>
                    <span className="text-emerald-400 font-bold">98/100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-[98%] h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-tighter">TOTAL COST</div>
                      <div className="text-lg font-black text-white">$145</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-tighter">WALK TIME</div>
                      <div className="text-lg font-black text-white">24m</div>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
                    <Heart size={18} /> Add to Favorites
                  </button>
                </div>
              </div>

              {/* Transit Update */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6">
                <div className="flex items-center gap-3 text-amber-500 font-bold text-sm mb-4">
                  <AlertTriangle size={18} /> Transit Alert
                </div>
                <p className="text-slate-400 text-xs leading-relaxed italic">
                  "Line 4 Subway is experiencing minor delays. Consider the bus route for your 11:30 AM activity."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
