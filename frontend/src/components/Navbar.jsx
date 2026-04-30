import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Menu, X, Bell, Shield } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const navLinks = [
  { label: 'Dashboards', to: '/dashboard' },
  { label: 'Safety', to: '/safety' },
  { label: 'Community', to: '/community' },
  { label: 'Pricing', to: '/pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  if (location.pathname === '/mens-hub' || location.pathname === '/womens-hub' || location.pathname === '/family-hub' || location.pathname === '/safety-map' || location.pathname === '/powerspot' || location.pathname === '/meditrust' || location.pathname.startsWith('/meditrust/doctor/')) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050b14] border-b border-slate-800/60 h-16 flex items-center justify-between px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-6 text-slate-400">
          <button className="hover:text-white transition-colors cursor-pointer">
            <Bell size={20} />
          </button>
          <button 
            onClick={() => {
              const travelerType = localStorage.getItem('travelerType') || 'men';
              const hubPath = travelerType === 'family' ? 'family-hub' : travelerType === 'women' ? 'womens-hub' : 'mens-hub';
              navigate(`/${hubPath}?view=safety`);
            }}
            className="hover:text-rose-500 transition-colors cursor-pointer flex items-center gap-1 group"
            title="Emergency SOS"
          >
            <Shield size={20} className="group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">SOS</span>
          </button>
          <Link to="/profile" className="rounded-full overflow-hidden ring-2 ring-transparent hover:ring-slate-700 transition-all w-8 h-8 cursor-pointer bg-slate-800 flex items-center justify-center">
            {(() => {
              try {
                const userRaw = localStorage.getItem('user');
                if (!userRaw) return <User size={14} className="text-slate-400" />;
                
                const user = JSON.parse(userRaw);
                if (typeof user === 'object' && user?.profilePicture) {
                  return <img src={user.profilePicture} alt="User Avatar" className="w-full h-full object-cover" />;
                }
                return <User size={14} className="text-slate-400" />;
              } catch (e) {
                return <User size={14} className="text-slate-400" />;
              }
            })()}
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Logo />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink key={link.label} link={link} currentPath={location.pathname} />
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {!localStorage.getItem('token') ? (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/get-started')}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 cursor-pointer"
              >
                Start Adventure
              </motion.button>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-slate-400 text-sm font-medium">
                  Hi, {(() => {
                    try {
                      const user = localStorage.getItem('user');
                      if (!user) return 'Explorer';
                      const parsed = JSON.parse(user);
                      const name = typeof parsed === 'object' ? parsed.name : parsed;
                      return name.split(' ')[0];
                    } catch (e) {
                      return (localStorage.getItem('user') || 'Explorer').split(' ')[0];
                    }
                  })()}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/profile')}
                  className="w-9 h-9 rounded-full overflow-hidden border border-white/10 hover:border-sky-500/50 transition-all cursor-pointer"
                >
                  {(() => {
                    try {
                      const userRaw = localStorage.getItem('user');
                      if (!userRaw) return <div className="w-full h-full glass flex items-center justify-center text-slate-400"><User size={16} /></div>;
                      
                      const user = JSON.parse(userRaw);
                      if (typeof user === 'object' && user?.profilePicture) {
                        return <img src={user.profilePicture} alt="User" className="w-full h-full object-cover" />;
                      }
                      return <div className="w-full h-full glass flex items-center justify-center text-slate-400"><User size={16} /></div>;
                    } catch (e) {
                      return <div className="w-full h-full glass flex items-center justify-center text-slate-400"><User size={16} /></div>;
                    }
                  })()}
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-emerald-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { navigate('/get-started'); setMobileOpen(false); }}
                className="w-full px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-sm font-semibold"
              >
                Start Adventure
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function NavLink({ link, currentPath }) {
  const isActive = currentPath === link.to;
  return (
    <Link
      to={link.to}
      className={`relative text-sm font-medium transition-colors group ${
        isActive ? 'text-white' : 'text-slate-400 hover:text-white'
      }`}
    >
      {link.label}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-300 ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
    </Link>
  );
}
