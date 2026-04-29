import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, LayoutDashboard, Map as MapIcon, Zap, PlusSquare, 
  Utensils, Users, Calendar, AlertTriangle, Scan, Languages, 
  Info, CheckCircle, AlertCircle, Camera, X, ChevronRight, 
  Sparkles, HeartPulse, Search, Menu as MenuIcon
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

function Sidebar() {
  const links = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <MapIcon size={20} />, label: 'Safety Map', to: '/safety-map' },
    { icon: <Zap size={20} />, label: 'PowerSpot', to: '/powerspot' },
    { icon: <PlusSquare size={20} />, label: 'MediTrust', to: '/meditrust' },
    { icon: <Utensils size={20} />, label: 'MenuLens', to: '/menulens', active: true },
    { icon: <Users size={20} />, label: 'LocalVibe', to: '/localvibe' },
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

export default function MenuLensPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const travelerType = localStorage.getItem('travelerType') || 'men';

  const startScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(true);
    }, 2500);
  };

  const getHealthInsight = () => {
    if (travelerType === 'women') {
      return {
        title: "Women's Health Insight",
        message: "This dish is high in iron and folic acid, excellent for energy levels during active travel.",
        color: "text-pink-400",
        bg: "bg-pink-500/10"
      };
    } else if (travelerType === 'family') {
      return {
        title: "Family Safety Alert",
        message: "Nut-free kitchen. Recommended for children. Contains moderate sugar levels.",
        color: "text-emerald-400",
        bg: "bg-emerald-500/10"
      };
    } else {
      return {
        title: "Men's Health Insight",
        message: "High protein content (34g). Great for post-hike recovery. Contains heart-healthy fats.",
        color: "text-blue-400",
        bg: "bg-blue-500/10"
      };
    }
  };

  const insight = getHealthInsight();

  return (
    <div className="min-h-screen flex bg-[#0f111a] text-slate-200">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64 pt-20 px-6 lg:px-10 pb-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-96 bg-violet-500/5 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-violet-400 font-semibold tracking-wide text-sm mb-3">
              <Scan size={18} /> REAL-TIME TRANSLATION & ANALYSIS
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              MenuLens AI
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg">
              Point your camera at any menu to instantly translate, identify allergens, and get personalized health insights based on your profile.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left Column: Camera / Scanner */}
            <div className="relative group">
              <div className="aspect-[3/4] bg-slate-900 rounded-[2.5rem] border-8 border-slate-800 overflow-hidden relative shadow-2xl">
                {/* Camera View Mockup */}
                <img 
                  src="https://images.unsplash.com/photo-1550966841-391ad55a0006?auto=format&fit=crop&w=800&q=80" 
                  alt="Menu Mockup" 
                  className={`w-full h-full object-cover transition-all duration-700 ${isScanning ? 'brightness-50 grayscale' : 'brightness-75'}`}
                />

                {/* Scanning Animation */}
                <AnimatePresence>
                  {isScanning && (
                    <motion.div 
                      initial={{ top: '0%' }}
                      animate={{ top: '100%' }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-1 bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.8)] z-20"
                    />
                  )}
                </AnimatePresence>

                {/* Scanner UI Overlay */}
                <div className="absolute inset-0 border-[20px] border-black/20 pointer-events-none" />
                <div className="absolute top-10 left-10 w-12 h-12 border-t-4 border-l-4 border-white/40 rounded-tl-xl" />
                <div className="absolute top-10 right-10 w-12 h-12 border-t-4 border-r-4 border-white/40 rounded-tr-xl" />
                <div className="absolute bottom-10 left-10 w-12 h-12 border-b-4 border-l-4 border-white/40 rounded-bl-xl" />
                <div className="absolute bottom-10 right-10 w-12 h-12 border-b-4 border-r-4 border-white/40 rounded-br-xl" />

                {/* Scan Button Overlay */}
                {!isScanning && !scanResult && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={startScan}
                      className="w-24 h-24 rounded-full bg-violet-500/90 flex items-center justify-center text-white shadow-2xl shadow-violet-500/40 backdrop-blur-sm cursor-pointer"
                    >
                      <Camera size={40} />
                    </motion.button>
                  </div>
                )}

                {/* Scanning Text */}
                {isScanning && (
                  <div className="absolute inset-0 flex items-center justify-center z-30">
                    <div className="px-6 py-3 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-3">
                      <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                      <span className="text-white font-bold tracking-widest text-sm">ANALYZING MENU...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 flex gap-4 items-start">
                <div className="p-2 bg-violet-500/20 text-violet-400 rounded-lg shrink-0">
                  <Info size={18} />
                </div>
                <p className="text-slate-400 text-sm">
                  <span className="text-white font-semibold">Pro Tip:</span> Hold the device steady and ensure good lighting for the most accurate allergen detection.
                </p>
              </div>
            </div>

            {/* Right Column: Analysis Results */}
            <div className="space-y-6">
              <AnimatePresence mode="wait">
                {!scanResult ? (
                  <motion.div
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex flex-col items-center justify-center py-20 text-center bg-[#151822] rounded-[2rem] border border-slate-800 border-dashed"
                  >
                    <MenuIcon size={64} className="text-slate-700 mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Scan</h3>
                    <p className="text-slate-400 max-w-xs">
                      Start the scan to translate the menu and identify potential health risks.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    {/* Identification Result */}
                    <div className="bg-[#151822] border border-slate-800 rounded-3xl p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">DISH DETECTED</p>
                          <h2 className="text-3xl font-bold text-white">Ratatouille Niçoise</h2>
                        </div>
                        <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                          <CheckCircle size={28} />
                        </div>
                      </div>

                      <div className="flex gap-3 mb-8">
                        <span className="px-4 py-2 bg-violet-500/10 text-violet-400 rounded-xl text-sm font-bold border border-violet-500/20 flex items-center gap-2">
                          <Languages size={16} /> Translated from French
                        </span>
                        <span className="px-4 py-2 bg-white/5 text-slate-300 rounded-xl text-sm font-bold border border-white/10">
                          Vegetarian
                        </span>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-bold text-lg flex items-center gap-2">
                          <Sparkles size={18} className="text-amber-400" /> Description
                        </h4>
                        <p className="text-slate-400 leading-relaxed italic">
                          "A classic French stew of eggplant, zucchini, bell peppers, and onions, simmered with fresh herbs and olive oil."
                        </p>
                      </div>
                    </div>

                    {/* Health Insights - Customized by Traveler Type */}
                    <div className={`${insight.bg} border border-slate-800 rounded-3xl p-8 relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                        <HeartPulse size={120} className={insight.color} />
                      </div>
                      <h3 className={`text-xl font-extrabold ${insight.color} mb-4 flex items-center gap-2`}>
                        <HeartPulse size={24} /> {insight.title}
                      </h3>
                      <p className="text-slate-200 text-lg leading-relaxed relative z-10">
                        "{insight.message}"
                      </p>
                      
                      <div className="mt-8 grid grid-cols-3 gap-4">
                        <div className="p-4 bg-black/20 rounded-2xl">
                          <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-tighter">CALORIES</div>
                          <div className="text-xl font-black text-white">280</div>
                        </div>
                        <div className="p-4 bg-black/20 rounded-2xl">
                          <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-tighter">PROTEIN</div>
                          <div className="text-xl font-black text-white">6g</div>
                        </div>
                        <div className="p-4 bg-black/20 rounded-2xl">
                          <div className="text-xs text-slate-500 font-bold mb-1 uppercase tracking-tighter">CARBS</div>
                          <div className="text-xl font-black text-white">24g</div>
                        </div>
                      </div>
                    </div>

                    {/* Allergen Alerts */}
                    <div className="bg-rose-500/5 border border-rose-500/20 rounded-3xl p-8">
                      <h3 className="text-rose-500 font-extrabold text-xl mb-6 flex items-center gap-2">
                        <AlertCircle size={24} /> Safety Warnings
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-rose-500/10 rounded-2xl border border-rose-500/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center">
                              <span className="font-bold">!!</span>
                            </div>
                            <span className="text-white font-bold">Allium Alert</span>
                          </div>
                          <span className="text-rose-400 text-xs font-bold px-2 py-1 bg-rose-500/10 rounded">HIGH RISK</span>
                        </div>
                        <p className="text-slate-400 text-sm italic">
                          "Contains onions and garlic. If you have an allium sensitivity, please notify the server before ordering."
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setScanResult(null)}
                      className="w-full py-4 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-2xl shadow-xl shadow-violet-600/20 transition-all active:scale-95 flex items-center justify-center gap-3"
                    >
                      <Camera size={20} /> NEW SCAN
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
