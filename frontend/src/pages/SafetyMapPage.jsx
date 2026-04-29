import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Shield, Home, Coffee, LayoutDashboard, Map as MapIcon, Zap, PlusSquare, Utensils, Users, Calendar, AlertTriangle, LocateFixed } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Component to handle map re-centering
function MapController({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { animate: true, duration: 1.5 });
    }
  }, [center, map]);
  return null;
}

// Component for the Locate Me button
function LocateButton({ userLocation, onLocateUpdate }) {
  const map = useMap();
  
  const handleLocate = () => {
    // Fly to known location immediately for instant feedback if available
    if (userLocation) {
      map.flyTo(userLocation, 14, { animate: true, duration: 1.5 });
    }

    // Always fetch fresh GPS location to ensure accuracy
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        map.flyTo(coords, 14, { animate: true, duration: 1.5 });
        if (onLocateUpdate) onLocateUpdate(coords);
      });
    }
  };

  return (
    <div className="absolute right-6 top-32 z-[1000]">
      <button 
        onClick={handleLocate}
        className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-slate-200/50 hover:bg-slate-50 transition-all border border-slate-100 cursor-pointer group"
        title="Show My Location"
      >
        <LocateFixed size={26} className="text-slate-800 group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
}

// User location pulsing icon
const userLocationIcon = L.divIcon({
  className: 'custom-leaflet-icon',
  html: `
    <div class="relative flex items-center justify-center w-8 h-8">
      <div class="absolute w-full h-full bg-sky-500 rounded-full animate-ping opacity-60"></div>
      <div class="relative w-4 h-4 bg-sky-600 rounded-full border-2 border-white shadow-[0_0_10px_rgba(0,0,0,0.3)]"></div>
    </div>
  `,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

// Create custom icons for the map markers with raw SVGs for best rendering
const createCustomIcon = (color, iconSvg) => {
  return L.divIcon({
    className: 'custom-leaflet-icon',
    html: `
      <div style="background-color: ${color}; width: 36px; height: 36px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white;">
        ${iconSvg}
      </div>
      <div style="width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 8px solid ${color}; position: absolute; bottom: -7px; left: 50%; transform: translateX(-50%);"></div>
    `,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -44]
  });
};

const policeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`;
const havenSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`;
const cafeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" x2="6" y1="2" y2="4"/><line x1="10" x2="10" y1="2" y2="4"/><line x1="14" x2="14" y1="2" y2="4"/></svg>`;

const icons = {
  police: createCustomIcon('#10b981', policeSvg), // Emerald
  haven: createCustomIcon('#3b82f6', havenSvg), // Blue
  cafe: createCustomIcon('#f59e0b', cafeSvg), // Amber
};

// Dummy locations around a central point (London coordinates for demonstration)
const mapLocations = [
  { id: 1, type: 'police', name: 'Central Police Station', desc: 'Open 24/7. Tourist assistance available.', pos: [51.505, -0.09] },
  { id: 2, type: 'haven', name: 'Verified Safe Haven Hotel', desc: 'Secure entry, high safety rating.', pos: [51.51, -0.1] },
  { id: 3, type: 'cafe', name: 'Open Cafe (24/7)', desc: 'Well-lit area, free Wi-Fi, friendly staff.', pos: [51.515, -0.09] },
  { id: 4, type: 'police', name: 'Tourist Police Post', desc: 'Quick response unit.', pos: [51.508, -0.11] },
  { id: 5, type: 'haven', name: "Women's Shelter Center", desc: 'Safe space with dedicated support.', pos: [51.502, -0.08] },
  { id: 6, type: 'cafe', name: 'Late Night Coffee Shop', desc: 'Popular among remote workers.', pos: [51.512, -0.08] },
  { id: 7, type: 'police', name: 'City Security Hub', desc: 'Main monitoring center.', pos: [51.495, -0.09] },
];

function Sidebar() {
  const navigate = useNavigate();
  const links = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', to: '/dashboard' },
    { icon: <MapIcon size={20} />, label: 'Safety Map', to: '/safety-map', active: true },
    { icon: <Zap size={20} />, label: 'PowerSpot', to: '/powerspot' },
    { icon: <PlusSquare size={20} />, label: 'MediTrust', to: '/meditrust' },
    { icon: <Utensils size={20} />, label: 'MenuLens', to: '/menulens' },
    { icon: <Users size={20} />, label: 'LocalVibe', to: '/localvibe' },
    { icon: <Calendar size={20} />, label: 'Trip Planner', to: '/trip-planner' },
  ];

  const handleSOS = () => {
    const travelerType = localStorage.getItem('travelerType') || 'men';
    navigate(`/${travelerType === 'family' ? 'family' : travelerType === 'women' ? 'womens' : 'mens'}-hub?view=safety`);
  };

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
        {links.map((link) => {
          const Wrapper = link.to ? Link : 'button';
          return (
            <Wrapper 
              key={link.label}
              to={link.to}
              className={`flex items-center gap-3 px-4 py-3 transition-colors w-full cursor-pointer text-left
                ${link.active 
                  ? 'bg-emerald-500/10 text-emerald-500 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-emerald-500 before:rounded-r-md' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-xl'}`}
            >
              {link.icon}
              <span className="font-medium text-sm">{link.label}</span>
            </Wrapper>
          );
        })}
      </div>

      {/* SOS Button */}
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

export default function SafetyMapPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default fallback
  const [locations, setLocations] = useState(mapLocations);

  const handleLocationUpdate = (coords) => {
    const [latitude, longitude] = coords;
    setUserLocation(coords);
    setMapCenter(coords);

    // Dynamically generate mock safety locations around the user's actual location
    const dynamicLocations = [
      { id: 1, type: 'police', name: 'Central Police Station', desc: 'Open 24/7. Tourist assistance available.', pos: [latitude + 0.005, longitude - 0.005] },
      { id: 2, type: 'haven', name: 'Verified Safe Haven Hotel', desc: 'Secure entry, high safety rating.', pos: [latitude + 0.01, longitude + 0.002] },
      { id: 3, type: 'cafe', name: 'Open Cafe (24/7)', desc: 'Well-lit area, free Wi-Fi, friendly staff.', pos: [latitude + 0.003, longitude + 0.008] },
      { id: 4, type: 'police', name: 'Tourist Police Post', desc: 'Quick response unit.', pos: [latitude - 0.008, longitude - 0.003] },
      { id: 5, type: 'haven', name: "Women's Shelter Center", desc: 'Safe space with dedicated support.', pos: [latitude - 0.005, longitude + 0.01] },
      { id: 6, type: 'cafe', name: 'Late Night Coffee Shop', desc: 'Popular among remote workers.', pos: [latitude + 0.012, longitude - 0.008] },
      { id: 7, type: 'police', name: 'City Security Hub', desc: 'Main monitoring center.', pos: [latitude - 0.002, longitude - 0.012] },
    ];
    setLocations(dynamicLocations);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleLocationUpdate([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  const filteredLocations = locations.filter(loc => 
    activeFilter === 'all' || loc.type === activeFilter
  );

  return (
    <div className="min-h-screen flex bg-[#f8fafc] overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 ml-0 md:ml-64 relative pt-16 h-[100vh]">
        {/* Real Map Container */}
        <div className="absolute inset-0 z-0">
          <MapContainer 
            center={mapCenter} 
            zoom={13} 
            zoomControl={false}
            style={{ width: '100%', height: '100%', background: '#f8fafc', zIndex: 0 }}
          >
            <MapController center={mapCenter} />
            <LocateButton userLocation={userLocation} onLocateUpdate={handleLocationUpdate} />
            
            {/* Google Maps Style Tiles */}
            <TileLayer
              url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              attribution='&copy; Google Maps'
            />
            
            {/* Render User's Current Location */}
            {userLocation && (
              <Marker position={userLocation} icon={userLocationIcon}>
                <Popup className="custom-popup" closeButton={false}>
                  <div className="p-1 font-bold text-slate-800 text-sm">You are here</div>
                </Popup>
              </Marker>
            )}

            {filteredLocations.map(loc => (
              <Marker key={loc.id} position={loc.pos} icon={icons[loc.type]}>
                <Popup className="custom-popup" closeButton={false}>
                  <div className="p-1">
                    <div className="font-bold text-slate-800 text-sm mb-1">{loc.name}</div>
                    <div className="text-xs text-slate-500">{loc.desc}</div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Global styles for the leaflet popup to match our theme somewhat */}
          <style>{`
            .leaflet-popup-content-wrapper {
              border-radius: 12px;
              box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
            }
            .leaflet-popup-tip {
              box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
            }
            .leaflet-container {
              font-family: inherit;
            }
            .leaflet-control-container {
              display: none;
            }
          `}</style>
        </div>

        {/* Top Controls Overlay */}
        <div className="relative z-10 p-6 flex flex-col items-center pointer-events-none mt-4">
          {/* Safety Score Pill */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass border border-emerald-500/30 rounded-2xl p-4 md:p-6 flex items-center gap-4 md:gap-8 shadow-2xl shadow-emerald-500/10 pointer-events-auto backdrop-blur-xl bg-white/90 text-slate-800"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <ShieldCheck className="text-emerald-500 w-6 h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <div className="text-slate-500 text-xs font-semibold tracking-wider mb-1">LOCAL SAFETY SCORE</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl md:text-4xl font-bold text-slate-900">85</span>
                <span className="text-slate-500 text-sm">/100</span>
              </div>
            </div>
            <div className="ml-4 flex flex-col items-end border-l border-slate-200 pl-6">
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                High
              </span>
              <span className="text-slate-500 text-[10px] mt-2 whitespace-nowrap">Updated live</span>
            </div>
          </motion.div>

          {/* Filter Chips */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mt-6 pointer-events-auto"
          >
            <button 
              onClick={() => setActiveFilter(activeFilter === 'police' ? 'all' : 'police')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all cursor-pointer shadow-lg
                ${activeFilter === 'police' || activeFilter === 'all' 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-400' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <Shield size={16} /> Police Stations
            </button>
            <button 
              onClick={() => setActiveFilter(activeFilter === 'haven' ? 'all' : 'haven')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all cursor-pointer shadow-lg
                ${activeFilter === 'haven' || activeFilter === 'all' 
                  ? 'bg-blue-500 text-white shadow-blue-500/20 hover:bg-blue-400' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <Home size={16} /> Safe Havens
            </button>
            <button 
              onClick={() => setActiveFilter(activeFilter === 'cafe' ? 'all' : 'cafe')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all cursor-pointer shadow-lg
                ${activeFilter === 'cafe' || activeFilter === 'all' 
                  ? 'bg-amber-500 text-white shadow-amber-500/20 hover:bg-amber-400' 
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <Coffee size={16} /> Open Cafes
            </button>
          </motion.div>
        </div>

        {/* Floating SOS Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const travelerType = localStorage.getItem('travelerType') || 'men';
            navigate(`/${travelerType === 'family' ? 'family' : travelerType === 'women' ? 'womens' : 'mens'}-hub?view=safety`);
          }}
          className="absolute bottom-10 right-10 w-20 h-20 bg-rose-500 rounded-full shadow-[0_0_40px_rgba(244,63,94,0.5)] flex items-center justify-center text-white font-black text-xl border-4 border-rose-400/30 hover:bg-rose-600 transition-colors z-20 pointer-events-auto cursor-pointer tracking-wider"
        >
          SOS
        </motion.button>
      </div>
    </div>
  );
}
