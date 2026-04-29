import { motion } from 'framer-motion';
import { ShieldCheck, Users, Compass, Bookmark, Star, Info, MessageSquare, ArrowRight, LayoutDashboard, Map, Zap, PlusSquare, Utensils, Calendar, AlertTriangle } from 'lucide-react';

function Sidebar() {
  const links = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { icon: <Map size={20} />, label: 'Safety Map' },
    { icon: <Zap size={20} />, label: 'PowerSpot' },
    { icon: <PlusSquare size={20} />, label: 'MediTrust' },
    { icon: <Utensils size={20} />, label: 'MenuLens' },
    { icon: <Users size={20} />, label: 'LocalVibe' },
    { icon: <Calendar size={20} />, label: 'Trip Planner', active: true },
  ];

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
        {links.map((link) => (
          <button 
            key={link.label}
            className={`flex items-center gap-3 px-4 py-3 transition-colors w-full cursor-pointer
              ${link.active 
                ? 'bg-emerald-500/10 text-emerald-500 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-emerald-500 before:rounded-r-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl'}`}
          >
            {link.icon}
            <span className="font-medium text-sm">{link.label}</span>
          </button>
        ))}
      </div>

      {/* SOS Button */}
      <div className="p-6">
        <button className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-500 font-semibold text-sm hover:bg-rose-500/20 transition-colors cursor-pointer">
          <AlertTriangle size={18} /> SOS EMERGENCY
        </button>
      </div>
    </div>
  );
}

export default function MenPage() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1 ml-0 md:ml-64 pt-24 lg:pt-28 pb-12 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-emerald-500 mb-3 tracking-tight">Men's Safe Travel Hub</h1>
        <p className="text-slate-400 text-lg max-w-3xl">
          Curated destinations vetted for safety, community, and peace of mind for the solo male traveler. Explore with confidence.
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
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" 
              alt="Alpine Trailhead" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full backdrop-blur-md border border-emerald-500/20">
                  <ShieldCheck size={16} /> 98% Safety Score
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white/10 text-slate-200 text-sm font-medium rounded-full backdrop-blur-md border border-white/10">
                  <Users size={16} /> Solo-Friendly
                </span>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-3">Alpine Trailhead, Switzerland</h2>
              <p className="text-slate-300 max-w-2xl mb-6 text-lg">
                A highly rated destination with excellent emergency infrastructure, clear signage, and a welcoming community of hikers.
              </p>
              
              <div className="flex gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-colors">
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
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop" 
                  alt="Kyoto" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 bg-slate-900/80 text-white text-xs font-medium rounded-md backdrop-blur-md border border-white/10">
                  <Star size={12} className="text-amber-400 fill-amber-400" /> Top Rated
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">Vibrant Old Town, Kyoto</h3>
                <p className="text-slate-400 text-sm mb-4 flex-1">
                  Rich culture with exceptionally low crime rates. Well-lit streets and strong community presence.
                </p>
                <div className="flex gap-2 mb-6">
                  <span className="px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 text-xs">Nightlife</span>
                  <span className="px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 text-xs">Well-lit</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-sm">
                    <ShieldCheck size={16} /> 95%
                  </span>
                  <ArrowRight size={18} className="text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-800 bg-[#0f172a] overflow-hidden group cursor-pointer hover:border-slate-700 transition-colors flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1513519107127-1ede270f28fb?q=80&w=2073&auto=format&fit=crop" 
                  alt="Norway Fjord" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2">Fjord Gateway, Norway</h3>
                <p className="text-slate-400 text-sm mb-4 flex-1">
                  Quiet, structurally sound environments with easy access to emergency services even in remote areas.
                </p>
                <div className="flex gap-2 mb-6">
                  <span className="px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 text-xs">Remote</span>
                  <span className="px-2.5 py-1 rounded-md border border-slate-700 text-slate-300 text-xs">Low Traffic</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-sm">
                    <ShieldCheck size={16} /> 99%
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
              <span className="p-1 bg-emerald-500/20 text-emerald-500 rounded"><ShieldCheck size={18} /></span>
              Region Metrics
            </h3>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Night Safety</span>
                  <span className="text-emerald-400 font-medium">Excellent</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[95%] rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Crowd Density</span>
                  <span className="text-amber-400 font-medium">Moderate</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 w-[45%] rounded-full"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-300">Emergency Access</span>
                  <span className="text-emerald-400 font-medium">High</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[85%] rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-slate-800/50 flex gap-3 text-sm text-slate-400 border border-slate-800">
              <Info size={16} className="text-slate-500 shrink-0 mt-0.5" />
              <p>Data aggregated from local authorities and verified solo travelers within the last 30 days.</p>
            </div>
          </div>

          {/* Traveler Insight */}
          <div className="rounded-2xl border border-amber-500/30 bg-[#161312] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <MessageSquare size={100} />
            </div>
            
            <h3 className="flex items-center gap-2 text-xl font-bold text-white mb-6 relative z-10">
              <span className="text-amber-500"><MessageSquare size={20} /></span>
              Traveler Insight
            </h3>

            <div className="flex items-center gap-3 mb-5 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                alt="Alex M." 
                className="w-12 h-12 rounded-full border border-slate-700 object-cover"
              />
              <div>
                <div className="text-white font-medium">Alex M.</div>
                <div className="text-slate-500 text-xs">Verified Solo Traveler</div>
              </div>
            </div>

            <p className="text-slate-300 italic mb-6 relative z-10 leading-relaxed">
              "The local authorities in the Old Town area are very responsive. I felt completely at ease walking back to my accommodation after midnight."
            </p>

            <button className="text-amber-500 text-sm font-medium hover:text-amber-400 transition-colors w-full text-right relative z-10">
              Read More Reviews
            </button>
          </div>
        </motion.div>
      </div>
        </div>
      </div>
    </div>
  );
}
