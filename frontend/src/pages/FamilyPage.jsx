import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Users, Compass, Bookmark, Star, Info, MessageSquare, ArrowRight, LayoutDashboard, Map, Zap, PlusSquare, Utensils, Calendar, AlertTriangle } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import SafetyConsole from '../components/SafetyConsole';

function Sidebar({ hubColor = 'emerald', activeView, setActiveView }) {
  const links = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'trips', icon: <Compass size={20} />, label: 'Trips' },
    { id: 'map', icon: <Map size={20} />, label: 'Safety Map', to: '/safety-map' },
    { id: 'menulens', icon: <Utensils size={20} />, label: 'MenuLens', to: '/menulens' },
    { id: 'localvibe', icon: <Users size={20} />, label: 'LocalVibe', to: '/localvibe' },
    { id: 'safety', icon: <ShieldCheck size={20} />, label: 'Safety' },
    { id: 'insights', icon: <Zap size={20} />, label: 'AI Insights' },
    { id: 'archive', icon: <Bookmark size={20} />, label: 'Archive' },
    { id: 'meditrust', icon: <PlusSquare size={20} />, label: 'MediTrust', to: '/meditrust' },
    { id: 'powerspot', icon: <Compass size={20} />, label: 'PowerSpot', to: '/powerspot' },
    { id: 'planner', icon: <Calendar size={20} />, label: 'Trip Planner', to: '/trip-planner' },
  ];

  const activeColors = {
    emerald: 'bg-emerald-500/10 text-emerald-500',
    blue: 'bg-blue-500/10 text-blue-500',
    pink: 'bg-pink-500/10 text-pink-500',
    violet: 'bg-violet-500/10 text-violet-500',
  };

  const indicatorColors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    pink: 'bg-pink-500',
    violet: 'bg-violet-500',
  };

  return (
    <div className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 w-64 bg-[#050b14] border-r border-slate-800/60 z-40 overflow-y-auto">
      <div className="p-6 mb-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck size={24} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-lg tracking-tight">AURA AI</div>
            <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Systems Nominal
            </div>
          </div>
        </div>

        <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 text-sm">
          New Trip
        </button>
      </div>

      <div className="flex-1 px-3 flex flex-col gap-1">
        {links.map((link) => {
          const isActive = activeView === link.id;
          const content = (
            <>
              {link.icon}
              <span className="font-bold text-sm">{link.label}</span>
              {isActive && <div className={`absolute right-0 top-2 bottom-2 w-1 ${indicatorColors[hubColor]} rounded-l-full`}></div>}
            </>
          );

          if (link.to) {
            return (
              <Link 
                key={link.id}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 transition-all w-full cursor-pointer rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5`}
              >
                {content}
              </Link>
            );
          }

          return (
            <button 
              key={link.id}
              onClick={() => setActiveView(link.id)}
              className={`flex items-center gap-3 px-4 py-3 transition-all w-full cursor-pointer rounded-xl
                ${isActive 
                  ? `${activeColors[hubColor]} relative` 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
            >
              {content}
            </button>
          );
        })}
      </div>

      <div className="p-4 mt-auto border-t border-slate-800/50">
        <button 
          onClick={() => setActiveView('safety')}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 font-bold text-sm hover:bg-rose-500/20 transition-all active:scale-95 mb-4 shadow-lg shadow-rose-500/5 cursor-pointer"
        >
          <AlertTriangle size={18} /> SOS EMERGENCY
        </button>
        <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-300 transition-colors w-full text-sm font-bold">
          <Info size={18} /> Help
        </button>
        <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-rose-500 transition-colors w-full text-sm font-bold">
          <ArrowRight size={18} /> Logout
        </button>
      </div>
    </div>
  );
}



function FamilyDashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-violet-500 mb-3 tracking-tight">Family Hub</h1>
        <p className="text-slate-400 text-lg max-w-3xl">
          Multi-generational travel vetted for group safety, kid-friendly amenities, and accessibility. Travel together, safely.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Featured Destination */}
          <div className="relative rounded-2xl overflow-hidden group border border-slate-800 bg-slate-900 h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=2070&auto=format&fit=crop" 
              alt="Interlaken Valley" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-violet-500/20 text-violet-400 text-sm font-medium rounded-full backdrop-blur-md border border-violet-500/20">
                  <ShieldCheck size={16} /> 99% Safety Score
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/10 text-slate-200 text-sm font-medium rounded-full backdrop-blur-md border border-white/10">
                  <Users size={16} /> Kid-Friendly
                </span>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-3">Interlaken Valley, Switzerland</h2>
              <p className="text-slate-300 max-w-2xl mb-6 text-lg">
                The gold standard for family travel. Impeccable public transport, safe public spaces, and endless activities for all ages.
              </p>
              
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-xl transition-colors">
                  <Compass size={18} /> Explore Area
                </button>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md text-white font-medium rounded-xl border border-slate-700 transition-colors">
                  <Bookmark size={18} /> Save
                </button>
              </div>
            </div>
          </div>

          {/* Grid of smaller destinations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl border border-slate-800 bg-[#0f172a] overflow-hidden group cursor-pointer hover:border-slate-700 transition-colors flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop" 
                  alt="Paris Gardens" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 bg-slate-900/80 text-white text-xs font-medium rounded-md backdrop-blur-md border border-white/10">
                  <Star size={12} className="text-amber-400 fill-amber-400" /> Top Rated
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">Luxembourg Gardens, Paris</h3>
                <p className="text-slate-400 text-sm mb-4 flex-1">
                  Secure, enclosed playgrounds, abundant seating, and high visibility. Perfect for multi-gen relaxing.
                </p>
                <div className="flex gap-2 mb-6">
                  <span className="px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 text-xs">Park</span>
                  <span className="px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 text-xs">Accessibility</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="flex items-center gap-1.5 text-violet-400 font-semibold text-sm">
                    <ShieldCheck size={16} /> 94%
                  </span>
                  <ArrowRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-800 bg-[#0f172a] overflow-hidden group cursor-pointer hover:border-slate-700 transition-colors flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=2070&auto=format&fit=crop" 
                  alt="Resort" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">Coastal Family Resort, Spain</h3>
                <p className="text-slate-400 text-sm mb-4 flex-1">
                  Private security, gated access, and verified kid-watch programs. Maximum safety for peace of mind.
                </p>
                <div className="flex gap-2 mb-6">
                  <span className="px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 text-xs">Resort</span>
                  <span className="px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 text-xs">Private</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="flex items-center gap-1.5 text-violet-400 font-semibold text-sm">
                    <ShieldCheck size={16} /> 98%
                  </span>
                  <ArrowRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Region Metrics */}
          <div className="rounded-2xl border border-slate-800 bg-[#0f172a] p-6">
            <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
              <span className="p-1 bg-violet-500/20 text-violet-500 rounded"><ShieldCheck size={18} /></span>
              Region Metrics
            </h3>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Public Safety</span>
                  <span className="text-violet-400 font-medium">Excellent</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 w-[98%] rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Transit Safety</span>
                  <span className="text-violet-400 font-medium">High</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 w-[92%] rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Kid Security</span>
                  <span className="text-violet-400 font-medium">Exceptional</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 w-[95%] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-slate-800/50 flex gap-3 text-sm text-slate-400 border border-slate-800">
              <Info size={16} className="text-slate-500 shrink-0 mt-0.5" />
              <p>Family safety metrics are weighted heavily towards public area visibility and quick medical access.</p>
            </div>
          </div>

          {/* Traveler Insight */}
          <div className="rounded-2xl border border-violet-500/30 bg-[#141216] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <MessageSquare size={100} />
            </div>
            
            <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-6 relative z-10">
              <span className="text-violet-500"><MessageSquare size={20} /></span>
              Family Insight
            </h3>

            <div className="flex items-center gap-3 mb-5 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop" 
                alt="Elena R." 
                className="w-12 h-12 rounded-full border border-slate-700 object-cover"
              />
              <div>
                <div className="text-white font-medium">Elena R.</div>
                <div className="text-slate-500 text-xs">Verified Family Traveler</div>
              </div>
            </div>

            <p className="text-slate-300 italic mb-6 relative z-10 leading-relaxed">
              "We never had to worry about the kids' safety. The public zones are clearly marked, and help is always just a few steps away if needed."
            </p>

            <button className="text-violet-500 text-sm font-medium hover:text-violet-400 transition-colors w-full text-right relative z-10">
              Read More Reviews
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function FamilyPage() {
  const location = useLocation();
  const [view, setView] = useState('dashboard');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('view') === 'safety') {
      setView('safety');
    }
  }, [location]);

  return (
    <div className="min-h-screen flex bg-[#050b14]">
      <Sidebar hubColor="violet" activeView={view} setActiveView={setView} />
      <div className="flex-1 ml-0 md:ml-64 pt-24 px-8 lg:px-12 pb-16 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {view === 'dashboard' && <FamilyDashboard />}
            {view === 'safety' && <SafetyConsole themeColor="emerald" />}
            {view !== 'dashboard' && view !== 'safety' && (
              <div className="flex items-center justify-center h-[60vh] text-slate-500">
                Coming Soon: {view}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
