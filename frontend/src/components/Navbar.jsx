import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Menu, X, Bell, Shield,
  LayoutDashboard, ShieldCheck, Users, Tag, LogIn, Compass,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';

const navLinks = [
  { label: 'Dashboards', to: '/dashboard',  Icon: LayoutDashboard },
  { label: 'Safety',     to: '/safety',     Icon: ShieldCheck      },
  { label: 'Community',  to: '/community',  Icon: Users            },
  { label: 'Pricing',    to: '/pricing',    Icon: Tag              },
];

/* ─── helpers ─────────────────────────────────────────── */
function getUserAvatar(size = 14) {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return <User size={size} className="text-slate-400" />;
    const user = JSON.parse(raw);
    if (typeof user === 'object' && user?.profilePicture)
      return <img src={user.profilePicture} alt="Avatar" className="w-full h-full object-cover" />;
  } catch (_) { /* noop */ }
  return <User size={size} className="text-slate-400" />;
}

function getUserFirstName() {
  try {
    const raw = localStorage.getItem('user');
    if (!raw) return 'Explorer';
    const parsed = JSON.parse(raw);
    const name = typeof parsed === 'object' ? parsed.name : parsed;
    return name?.split(' ')[0] || 'Explorer';
  } catch (_) { return 'Explorer'; }
}

/* ─── Hub Navbar (minimal) ─────────────────────────────── */
function HubNavbar() {
  const navigate = useNavigate();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050b14] border-b border-slate-800/60 h-16 flex items-center justify-between px-5 lg:px-8">
      <Logo />
      <div className="flex items-center gap-5 text-slate-400">
        <button className="hover:text-white transition-colors cursor-pointer p-1.5">
          <Bell size={19} />
        </button>
        <button
          onClick={() => {
            const t = localStorage.getItem('travelerType') || 'men';
            const hub = t === 'family' ? 'family-hub' : t === 'women' ? 'womens-hub' : 'mens-hub';
            navigate(`/${hub}?view=safety`);
          }}
          className="hover:text-rose-500 transition-colors cursor-pointer flex items-center gap-1 group p-1.5"
          title="Emergency SOS"
        >
          <Shield size={19} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">SOS</span>
        </button>
        <Link
          to="/profile"
          className="rounded-full overflow-hidden ring-2 ring-transparent hover:ring-sky-500/50 transition-all w-8 h-8 cursor-pointer bg-slate-800 flex items-center justify-center"
        >
          {getUserAvatar(14)}
        </Link>
      </div>
    </nav>
  );
}

/* ─── Main Navbar ─────────────────────────────────────── */
export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  /* scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close menu on route change */
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  /* lock body scroll when drawer open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  /* route-based rendering */
  if (location.pathname === '/get-started') return null;

  const hubRoutes = ['/mens-hub', '/womens-hub', '/family-hub', '/safety-map', '/powerspot', '/meditrust'];
  if (hubRoutes.includes(location.pathname) || location.pathname.startsWith('/meditrust/doctor/'))
    return <HubNavbar />;

  /* ── stagger variants for mobile links ── */
  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit:   { x: '100%', transition: { duration: 0.25, ease: 'easeIn' } },
  };
  const linkVariants = {
    hidden:  { opacity: 0, x: 30 },
    visible: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.07, duration: 0.35, ease: 'easeOut' } }),
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass border-b border-white/10 shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Logo />

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <DesktopNavLink key={link.label} link={link} currentPath={location.pathname} />
              ))}
            </div>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-3">
              {!isLoggedIn ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/get-started')}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all duration-300 cursor-pointer"
                >
                  Start Adventure
                </motion.button>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-sm font-medium">
                    Hi, <span className="text-white">{getUserFirstName()}</span>
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/profile')}
                    className="w-9 h-9 rounded-full overflow-hidden border border-white/10 hover:border-sky-500/50 transition-all cursor-pointer bg-slate-800 flex items-center justify-center"
                  >
                    {getUserAvatar(16)}
                  </motion.button>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-toggle"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              className="md:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-200 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate:  90,  opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={closeMobile}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-[85vw] max-w-xs bg-[#050d1a] border-l border-white/10 shadow-2xl flex flex-col md:hidden overflow-y-auto"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/8 flex-shrink-0">
                <Logo />
                <button
                  aria-label="Close menu"
                  onClick={closeMobile}
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-white hover:bg-white/8 transition-all cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* User greeting (if logged in) */}
              {isLoggedIn && (
                <motion.div
                  custom={0}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  className="mx-5 mt-5 flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/8"
                >
                  <div
                    className="w-10 h-10 rounded-full overflow-hidden border border-sky-500/30 flex-shrink-0 bg-slate-800 flex items-center justify-center cursor-pointer"
                    onClick={() => { navigate('/profile'); closeMobile(); }}
                  >
                    {getUserAvatar(18)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-tight">{getUserFirstName()}</p>
                    <p className="text-slate-500 text-xs">View Profile →</p>
                  </div>
                </motion.div>
              )}

              {/* Nav links */}
              <div className="flex flex-col px-4 mt-5 gap-1 flex-1">
                {navLinks.map(({ label, to, Icon }, i) => {
                  const isActive = location.pathname === to;
                  return (
                    <motion.div
                      key={label}
                      custom={isLoggedIn ? i + 1 : i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        to={to}
                        onClick={closeMobile}
                        className={`flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? 'bg-gradient-to-r from-sky-500/15 to-emerald-500/10 text-white border border-sky-500/20'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <Icon
                          size={18}
                          className={isActive ? 'text-sky-400' : 'text-slate-500'}
                        />
                        {label}
                        {isActive && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-400" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom CTA */}
              <motion.div
                custom={navLinks.length + 1}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
                className="p-5 border-t border-white/8 flex-shrink-0"
              >
                {!isLoggedIn ? (
                  <button
                    onClick={() => { navigate('/get-started'); closeMobile(); }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-emerald-500 text-white text-sm font-bold shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <Compass size={17} />
                    Start Adventure
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      navigate('/');
                      closeMobile();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm font-medium active:scale-95 transition-all duration-200 cursor-pointer"
                  >
                    <LogIn size={16} className="rotate-180" />
                    Sign Out
                  </button>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Desktop NavLink ── */
function DesktopNavLink({ link, currentPath }) {
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
