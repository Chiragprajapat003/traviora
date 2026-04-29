import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Settings, Shield, Bell, CreditCard, LogOut, 
  MapPin, Globe, Award, Heart, CheckCircle, ChevronRight,
  Camera, Mail, Phone, Lock, Eye, EyeOff, Loader2, Upload
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', profilePicture: '' });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image is too large! Please choose a file smaller than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm({ ...editForm, profilePicture: reader.result });
        setIsEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await API.get('/auth/profile');
        setUserData(data);
        setEditForm({ name: data.name, profilePicture: data.profilePicture });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        if (error.response?.status === 401) {
          navigate('/get-started');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data } = await API.put('/auth/profile', {
        name: editForm.name,
        profilePicture: editForm.profilePicture
      });
      setUserData(data);
      // Update local storage name too
      const user = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem('user', JSON.stringify({ ...user, name: data.name, profilePicture: data.profilePicture }));
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading && !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020817]">
        <Loader2 className="text-emerald-500 animate-spin" size={40} />
      </div>
    );
  }

  const profile = {
    name: userData?.name || "Guest Traveler",
    email: userData?.email || "No email provided",
    photo: userData?.profilePicture || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    handle: `@${userData?.name?.toLowerCase().replace(/\s/g, '_') || 'traveler'}`,
    type: userData?.profile?.travelerType || 'Solo',
    tier: "Safe Traveler Gold", // Can be dynamic later
    color: userData?.profile?.travelerType === 'women' ? "text-pink-400" : userData?.profile?.travelerType === 'family' ? "text-emerald-400" : "text-blue-400",
    border: userData?.profile?.travelerType === 'women' ? "border-pink-500/30" : userData?.profile?.travelerType === 'family' ? "border-emerald-500/30" : "border-blue-500/30",
    bg: userData?.profile?.travelerType === 'women' ? "bg-pink-500/5" : userData?.profile?.travelerType === 'family' ? "bg-emerald-500/5" : "bg-blue-500/5"
  };

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
            {/* Avatar Section */}
            <div className="relative mx-auto w-32 h-32 mb-8 group">
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className={`w-full h-full rounded-full border-2 ${profile.border} p-1 overflow-hidden bg-slate-900/50 flex items-center justify-center transition-all duration-500 group-hover:border-emerald-500/50`}>
                <img 
                  src={isEditing ? editForm.profilePicture : profile.photo} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-full shadow-inner"
                />
              </div>
              <button 
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-1 right-1 w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white border-4 border-[#151822] hover:scale-110 hover:bg-emerald-400 transition-all cursor-pointer shadow-lg z-20"
                title="Upload from computer"
              >
                <Camera size={18} />
              </button>
            </div>

            {/* Name & Title */}
            <div className="text-center mb-10">
              {isEditing ? (
                <div className="flex flex-col gap-4 max-w-[280px] mx-auto">
                  <div className="relative">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-center font-bold text-lg outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all"
                      placeholder="Your Name"
                    />
                    <div className="absolute -top-2 left-4 px-2 bg-[#151822] text-[10px] text-slate-500 font-bold uppercase tracking-wider">Name</div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => fileInputRef.current.click()}
                      className="w-full py-2 bg-white/5 border border-white/10 rounded-xl text-slate-300 text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                    >
                      <Upload size={14} /> Upload from PC
                    </button>
                    <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">— OR —</div>
                    <div className="relative">
                      <input
                        type="text"
                        value={editForm.profilePicture}
                        onChange={(e) => setEditForm({ ...editForm, profilePicture: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-slate-400 text-center text-[10px] outline-none focus:border-emerald-500/50 focus:bg-white/[0.08] transition-all"
                        placeholder="Paste Image URL"
                      />
                      <div className="absolute -top-2 left-4 px-2 bg-[#151822] text-[10px] text-slate-500 font-bold uppercase tracking-wider">Photo URL</div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-3xl font-bold text-white mb-1 tracking-tight">{profile.name}</h2>
                  <p className="text-slate-500 text-sm font-medium mb-5">{profile.handle}</p>
                </>
              )}
              
              {!isEditing && (
                <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border ${profile.border} ${profile.bg} ${profile.color} text-[11px] font-bold uppercase tracking-wider shadow-sm`}>
                  <Award size={14} /> {profile.tier}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4">
              {isEditing ? (
                <div className="flex gap-3">
                  <button 
                    onClick={handleSave}
                    disabled={loading}
                    className="flex-[2] py-4 bg-emerald-500 hover:bg-emerald-400 text-[#020817] font-bold rounded-2xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="animate-spin" size={20} /> : 'Save Changes'}
                  </button>
                  <button 
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm({ name: userData.name, profilePicture: userData.profilePicture });
                    }}
                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-slate-400 font-bold rounded-2xl transition-all border border-white/5"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-[#020817] font-bold rounded-2xl transition-all shadow-xl shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-2"
                >
                  Edit Profile
                </button>
              )}
              <button 
                onClick={handleLogout}
                className="w-full py-4 bg-transparent border border-slate-800 hover:border-slate-700 hover:bg-white/[0.02] text-slate-500 font-bold rounded-2xl transition-all flex items-center justify-center gap-2 group"
              >
                <LogOut size={18} className="group-hover:text-rose-500 transition-colors" /> Logout
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
                        <p className="text-slate-500 text-xs">{profile.email}</p>
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
