import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Settings, Shield, Bell, CreditCard, LogOut, 
  MapPin, Globe, Award, Heart, CheckCircle, ChevronRight,
  Camera, Mail, Phone, Lock, Eye, EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate();
  const travelerType = localStorage.getItem('travelerType') || 'men';
  const [showPassword, setShowPassword] = useState(false);

  const getProfileData = () => {
    if (travelerType === 'women') {
      return {
        name: "Elena Rostova",
        handle: "@elena_travels",
        tier: "Safe Traveler Gold",
        color: "text-pink-400",
        border: "border-pink-500/30",
        bg: "bg-pink-500/5"
      };
    } else if (travelerType === 'family') {
      return {
        name: "The Miller Family",
        handle: "@miller_adventures",
        tier: "Safe Family Platinum",
        color: "text-emerald-400",
        border: "border-emerald-500/30",
        bg: "bg-emerald-500/5"
      };
    } else {
      return {
        name: "Marcus Chen",
        handle: "@marcus_vibe",
        tier: "Safe Traveler Premium",
        color: "text-blue-400",
        border: "border-blue-500/30",
        bg: "bg-blue-500/5"
      };
    }
  };

  const profile = getProfileData();

  const stats = [
    { label: "Destinations", value: "12", icon: <Globe size={18} /> },
    { label: "Safety Points", value: "2,450", icon: <Shield size={18} /> },
    { label: "Vetted Spots", value: "48", icon: <MapPin size={18} /> },
    { label: "Rank", value: "Top 5%", icon: <Award size={18} /> },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 lg:px-8 bg-[#020817] text-slate-200 relative overflow-hidden">
      {/* Background Glows */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] ${profile.bg} blur-[120px] pointer-events-none rounded-full`} />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Left: Profile Summary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-[#151822] border border-slate-800 rounded-[2.5rem] p-8 text-center"
          >
            <div className="relative inline-block mb-6">
              <div className={`w-32 h-32 rounded-full border-4 ${profile.border} p-1`}>
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover shadow-2xl"
                />
              </div>
              <button className="absolute bottom-1 right-1 w-10 h-10 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-full flex items-center justify-center border-4 border-[#151822] transition-colors">
                <Camera size={18} />
              </button>
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-1">{profile.name}</h1>
            <p className="text-slate-500 text-sm mb-4">{profile.handle}</p>
            
            <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full ${profile.bg} ${profile.color} text-xs font-bold border ${profile.border} mb-8`}>
              <Award size={14} /> {profile.tier}
            </div>

            <div className="space-y-3">
              <button className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/10">
                Edit Profile
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full py-3 bg-transparent border border-slate-800 hover:border-slate-700 text-slate-400 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </motion.div>

          {/* Right: Stats & Overview */}
          <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-[#151822] border border-slate-800 rounded-3xl p-6 text-center hover:border-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 mx-auto mb-3 shadow-inner">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-black text-white mb-0.5">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions / Settings Tabs */}
            <div className="bg-[#151822] border border-slate-800 rounded-[2.5rem] overflow-hidden">
              <div className="flex border-b border-slate-800">
                <button className="flex-1 py-4 text-emerald-400 font-bold text-sm border-b-2 border-emerald-500">Security</button>
                <button className="flex-1 py-4 text-slate-500 font-bold text-sm hover:text-slate-300 transition-colors">Preferences</button>
                <button className="flex-1 py-4 text-slate-500 font-bold text-sm hover:text-slate-300 transition-colors">Emergency</button>
              </div>
              
              <div className="p-8 space-y-8">
                {/* Security Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Email Address</p>
                        <p className="text-slate-500 text-xs">m.chen@example.com</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-700 group-hover:text-white transition-all" />
                  </div>

                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                        <Lock size={18} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Password</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-slate-500 text-xs">{showPassword ? 'SafeTravel2024!' : '••••••••••••'}</p>
                          <button onClick={() => setShowPassword(!showPassword)} className="text-slate-600 hover:text-white transition-colors">
                            {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-700 group-hover:text-white transition-all" />
                  </div>

                  <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                        <Shield size={18} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Two-Factor Authentication</p>
                        <p className="text-emerald-500 text-[10px] font-black uppercase tracking-widest mt-0.5 flex items-center gap-1">
                          <CheckCircle size={10} /> Active & Secured
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-700 group-hover:text-white transition-all" />
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-800">
                  <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                    <CreditCard size={18} className="text-emerald-400" /> Subscription Plan
                  </h3>
                  <div className="bg-black/20 rounded-2xl p-6 border border-slate-800 flex items-center justify-between">
                    <div>
                      <p className="text-white font-bold">Traviora Premium Yearly</p>
                      <p className="text-slate-500 text-xs mt-1">Next billing date: Oct 12, 2024</p>
                    </div>
                    <button className="text-emerald-400 text-sm font-bold hover:underline">Manage Plan</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Recent Activity / Travel History */}
        <div className="bg-[#151822] border border-slate-800 rounded-[2.5rem] p-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Heart className="text-rose-500" /> Recent Travel Activity
            </h2>
            <button className="text-slate-500 hover:text-white text-sm font-bold transition-colors">View All History</button>
          </div>

          <div className="space-y-4">
            {[
              { loc: "Kyoto, Japan", date: "Oct 12, 2023", safety: "100%", vibe: "Relaxing" },
              { loc: "Paris, France", date: "Aug 24, 2023", safety: "94%", vibe: "Artistic" },
              { loc: "Seoul, S. Korea", date: "June 15, 2023", safety: "98%", vibe: "Energetic" }
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-black/20 hover:bg-black/30 rounded-2xl border border-slate-800/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-[#151822] border border-slate-700 rounded-xl flex items-center justify-center text-slate-500 group-hover:text-emerald-400 transition-colors">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{activity.loc}</h4>
                    <p className="text-slate-500 text-xs">{activity.date} • {activity.vibe} Vibe</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-0.5">SAFETY RATING</p>
                  <p className="text-emerald-400 font-black">{activity.safety}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
