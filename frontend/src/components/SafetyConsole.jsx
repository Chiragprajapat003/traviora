import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Heart, Map as MapIcon, PhoneCall, 
  MessageSquare, Plus, Send, User, ChevronRight,
  AlertCircle, Activity, Lock
} from 'lucide-react';

export default function SafetyConsole({ themeColor = 'emerald' }) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  // Colors based on theme
  const colors = {
    emerald: { text: 'text-emerald-500', bg: 'bg-emerald-500', shadow: 'shadow-emerald-500/20', border: 'border-emerald-500/20' },
    pink: { text: 'text-pink-500', bg: 'bg-pink-500', shadow: 'shadow-pink-500/20', border: 'border-pink-500/20' },
    blue: { text: 'text-blue-500', bg: 'bg-blue-500', shadow: 'shadow-blue-500/20', border: 'border-blue-500/20' },
  };

  const theme = colors[themeColor] || colors.emerald;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Main Center Console */}
      <div className="lg:col-span-2 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Safety Console</h1>
            <p className="text-slate-400">Monitoring real-time environment & contacts.</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
            <span className="text-emerald-500 text-sm font-bold tracking-tight">You are safe</span>
          </div>
        </header>

        {/* SOS Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0c121d] border border-slate-800 rounded-[32px] p-12 flex flex-col items-center justify-center relative overflow-hidden h-[400px]"
        >
          {/* Background subtle pulses */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-64 h-64 border border-rose-500/30 rounded-full animate-[ping_3s_infinite]" />
            <div className="w-96 h-96 border border-rose-500/10 rounded-full animate-[ping_4s_infinite]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <button 
              className="w-40 h-40 bg-rose-500 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(244,63,94,0.4)] hover:scale-105 transition-transform active:scale-95 group mb-8"
              onMouseDown={() => setIsHolding(true)}
              onMouseUp={() => setIsHolding(false)}
              onMouseLeave={() => setIsHolding(false)}
            >
              <span className="text-4xl font-bold text-white mb-1">*</span>
              <span className="text-2xl font-black text-white tracking-widest">SOS</span>
            </button>
            
            <p className="text-slate-300 max-w-sm leading-relaxed">
              Hold for 3 seconds to instantly alert emergency services and trusted contacts.
            </p>
          </div>
        </motion.div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Police', icon: <Shield size={22} />, color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
            { label: 'Hospital', icon: <Activity size={22} />, color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
            { label: 'Safe Path', icon: <Lock size={22} />, color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
            { label: 'Fake Call', icon: <PhoneCall size={22} />, color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' }
          ].map((action, i) => (
            <motion.button 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border ${action.color} hover:bg-white/5 transition-all active:scale-95`}
            >
              {action.icon}
              <span className="text-sm font-bold">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sidebar - Trusted Contacts */}
      <div className="space-y-6">
        <div className="bg-[#0c121d] border border-slate-800 rounded-[32px] p-6 h-full flex flex-col shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white">Trusted Contacts</h3>
            <button className="w-8 h-8 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded-full hover:bg-blue-500/30 transition-colors">
              <Plus size={18} />
            </button>
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
            {[
              { name: 'Sarah C.', relation: 'Sister', status: 'Shared Location', online: true, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' },
              { name: 'Mark R.', relation: 'Partner', status: 'Offline', online: false, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop' }
            ].map((contact, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={contact.img} alt={contact.name} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0c121d] ${contact.online ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{contact.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                      {contact.relation} • <span className={contact.online ? 'text-emerald-400' : ''}>{contact.status}</span>
                    </p>
                  </div>
                </div>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <MessageSquare size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-800 mt-6">
            <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-800/50 hover:bg-slate-800 text-slate-200 font-bold rounded-xl border border-slate-700 transition-all text-sm">
              <Activity size={18} /> Broadcast Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
