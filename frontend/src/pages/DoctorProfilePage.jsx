import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Map as MapIcon, Zap, PlusSquare, 
  Utensils, Users, Calendar, AlertTriangle, ArrowLeft, 
  Heart, MapPin, Globe, Star, Pill, Syringe, Video, 
  Accessibility, MessageSquare, Phone, Mail, ChevronRight, 
  ShieldCheck, Clock
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

function Sidebar() {
  const links = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <MapIcon size={20} />, label: 'Safety Map', to: '/safety-map' },
    { icon: <Zap size={20} />, label: 'PowerSpot', to: '/powerspot' },
    { icon: <PlusSquare size={20} />, label: 'MediTrust', to: '/meditrust', active: true },
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

import { medicalProviders } from '../data/medicalData';

export default function DoctorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the doctor in our shared data
  const doctor = medicalProviders.find(p => p.id === parseInt(id)) || medicalProviders[0];

  const getServiceIcon = (title) => {
    if (title.includes('Prescription')) return <Pill />;
    if (title.includes('Vaccination')) return <Syringe />;
    if (title.includes('Telehealth')) return <Video />;
    if (title.includes('Accessibility')) return <Accessibility />;
    if (title.includes('Emergency')) return <Zap size={20} />;
    if (title.includes('Cleaning')) return <ShieldCheck size={20} />;
    return <ShieldCheck />;
  };

  return (
    <div className="min-h-screen flex bg-[#0f111a] text-slate-200">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64 pt-20 px-6 lg:px-10 pb-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Back Navigation */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Search <span className="text-slate-600 px-2">/</span> <span className="text-slate-300">MediTrust Profile</span>
          </button>

          {/* Profile Header Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#151822] border border-slate-800 rounded-3xl overflow-hidden mb-8 shadow-2xl"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Left: Clinic Image */}
              <div className="lg:w-[45%] h-64 lg:h-auto relative">
                <img src={doctor.clinicImage} alt="Clinic" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-md rounded-full text-xs font-bold">
                    <ShieldCheck size={14} /> TripSync Vetted
                  </span>
                </div>
              </div>

              {/* Right: Doctor Info */}
              <div className="flex-1 p-8 lg:p-10">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{doctor.name}</h1>
                    <p className="text-emerald-400 font-semibold text-lg">{doctor.specialty}</p>
                  </div>
                  <button className="w-11 h-11 flex items-center justify-center bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-full text-slate-400 hover:text-rose-500 transition-all">
                    <Heart size={20} />
                  </button>
                </div>

                {/* Info Chips */}
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <MapPin size={16} className="text-emerald-500" /> {doctor.location}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Globe size={16} className="text-emerald-500" /> {doctor.languages}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Star size={16} className="text-amber-500 fill-amber-500" /> <span className="text-slate-200 font-bold">{doctor.rating}</span> ({doctor.reviews} Reviews)
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed mb-8">
                  {doctor.description}
                </p>

                <div className="flex gap-6 border-t border-slate-800 pt-8">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">AVAILABILITY</p>
                    <p className="text-emerald-400 font-bold">{doctor.availability}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 tracking-wider uppercase mb-1">CONSULTATION</p>
                    <p className="text-white font-bold">From {doctor.priceFrom}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Grid: Left Column & Right Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Content (2/3) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Verified Services */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Verified Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctor.services?.map((service, i) => (
                    <div key={i} className="flex gap-4 p-5 bg-[#151822] border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors">
                      <div className="w-12 h-12 flex items-center justify-center bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0">
                        {getServiceIcon(service.title)}
                      </div>
                      <div>
                        <h3 className="font-bold text-white mb-1">{service.title}</h3>
                        <p className="text-slate-500 text-sm leading-snug">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Transparent Pricing */}
              <section>
                <h2 className="text-2xl font-bold text-white mb-6">Transparent Pricing</h2>
                <div className="bg-[#151822] border border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-slate-800/50">
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Duration</th>
                        <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Est. Cost (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50 text-sm">
                      {doctor.pricing?.map((item, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 text-slate-200 font-medium">{item.name}</td>
                          <td className="px-6 py-4 text-slate-400">{item.time}</td>
                          <td className="px-6 py-4 text-white font-bold text-right">{item.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-4 bg-slate-900/40 text-center">
                    <p className="text-[10px] text-slate-500">Prices are estimates and may vary slightly based on specific medical needs. Insurance receipts provided.</p>
                  </div>
                </div>
              </section>

              {/* Traveler Reviews */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Traveler Reviews</h2>
                  <button className="text-emerald-400 font-medium text-sm hover:underline">View All (128)</button>
                </div>
                <div className="space-y-4">
                  {doctor.reviewsData?.map((review, i) => (
                    <div key={i} className="bg-[#151822] border border-slate-800 rounded-2xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${review.color}`}>
                            {review.name.split(' ')[0][0]}{review.name.split(' ')[1]?.[0] || ''}
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">{review.name}</h4>
                            <p className="text-[10px] text-slate-500">{review.tag} • {review.time}</p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={14} className={j < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-700"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed italic">
                        {review.text}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* Right Sidebar (1/3) */}
            <div className="space-y-6">
              
              {/* Booking Card */}
              <div className="bg-[#151822] border border-emerald-500/20 rounded-3xl p-6 shadow-2xl sticky top-24">
                <h3 className="text-xl font-bold text-white mb-2">Secure a Booking</h3>
                <p className="text-slate-500 text-sm mb-6">TripSync verification ensures priority scheduling and upfront pricing.</p>
                
                <div className="space-y-3 mb-6">
                  <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20">
                    <Calendar size={18} /> Book Appointment
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-transparent border border-slate-700 hover:border-slate-500 text-slate-300 font-bold rounded-xl transition-all">
                    <MessageSquare size={18} /> Message Clinic
                  </button>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-800">
                  <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-[10px] text-slate-400">Free cancellation up to 3 hours before visit via TripSync.</p>
                </div>
              </div>

              {/* Location & Contact */}
              <div className="bg-[#151822] border border-slate-800 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Location & Contact</h3>
                
                {/* Mock Map */}
                <div className="w-full h-40 bg-[#1a1d27] rounded-xl mb-6 relative overflow-hidden border border-slate-800">
                   <div className="absolute inset-0 bg-[#0f111a]" />
                   <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <div className="w-full h-full border border-slate-700 grid grid-cols-8 grid-rows-8">
                        {[...Array(64)].map((_, i) => <div key={i} className="border-[0.5px] border-slate-800/50" />)}
                      </div>
                   </div>
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full animate-ping absolute -top-3 -left-3" />
                        <MapPin size={32} className="text-emerald-500 fill-emerald-500/20 relative z-10" />
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-slate-500 shrink-0" />
                    <div>
                      <p className="text-sm font-bold text-white">{doctor.address.split(',')[0]}</p>
                      <p className="text-xs text-slate-500">{doctor.address.split(',').slice(1).join(',')}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-slate-500 shrink-0" />
                    <p className="text-sm text-slate-300 font-medium">{doctor.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-slate-500 shrink-0" />
                    <p className="text-sm text-slate-300 font-medium truncate">{doctor.email}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
