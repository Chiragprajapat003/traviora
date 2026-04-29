import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Users, Compass, Bookmark, Star, Info, MessageSquare, ArrowRight, LayoutDashboard, Map, Zap, PlusSquare, Utensils, Calendar, AlertTriangle } from 'lucide-react';

function Sidebar({ hubColor = 'emerald' }) {
  const links = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <Compass size={20} />, label: 'Trips', to: '#' },
    { icon: <ShieldCheck size={20} />, label: 'Safety', to: '#', active: true },
    { icon: <Zap size={20} />, label: 'AI Insights', to: '#' },
    { icon: <Bookmark size={20} />, label: 'Archive', to: '#' },
    { icon: <PlusSquare size={20} />, label: 'MediTrust', to: '/meditrust' },
    { icon: <Compass size={20} />, label: 'PowerSpot', to: '/powerspot' },
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
    <div className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-64 bg-[#050b14] border-r border-slate-800/60 z-40 overflow-y-auto">
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
        {links.map((link) => (
          <Link 
            key={link.label}
            to={link.to || '#'}
            className={`flex items-center gap-3 px-4 py-3 transition-all w-full cursor-pointer rounded-xl
              ${link.active 
                ? `${activeColors[hubColor]} relative` 
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
          >
            {link.icon}
            <span className="font-bold text-sm">{link.label}</span>
            {link.active && <div className={`absolute right-0 top-2 bottom-2 w-1 ${indicatorColors[hubColor]} rounded-l-full`}></div>}
          </Link>
        ))}
      </div>

      <div className="p-4 mt-auto border-t border-slate-800/50">
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

import SafetyConsole from '../components/SafetyConsole';

export default function WomenPage() {
  return (
    <div className="min-h-screen flex bg-[#050b14]">
      <Sidebar hubColor="pink" />
      <div className="flex-1 ml-0 md:ml-64 pt-10 px-6 lg:px-10 pb-12">
        <SafetyConsole themeColor="pink" />
      </div>
    </div>
  );
}
