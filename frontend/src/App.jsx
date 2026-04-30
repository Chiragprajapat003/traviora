import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Trust from './components/Trust';
import CTA from './components/CTA';
import Footer from './components/Footer';
import SEO from './components/SEO';
import PlaceholderPage from './pages/PlaceholderPage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import FamilyPage from './pages/FamilyPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import SafetyMapPage from './pages/SafetyMapPage';
import PowerSpotPage from './pages/PowerSpotPage';
import MediTrustPage from './pages/MediTrustPage';
import DoctorProfilePage from './pages/DoctorProfilePage';
import MenuLensPage from './pages/MenuLensPage';
import LocalVibePage from './pages/LocalVibePage';
import TripPlannerPage from './pages/TripPlannerPage';
import ProfilePage from './pages/ProfilePage';

// Landing page (Home)
function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <SEO 
        title="Safe Solo Travel Reimagined" 
        description="Connect with safe communities, discover vetted destinations, and travel with peace of mind. The ultimate companion for solo travelers."
        keywords="solo travel, safe travel, travel community, traviora, travel safety"
        url="/"
      />
      <Hero />
      <Features />
      <Trust />
      <CTA />
    </motion.div>
  );
}

// Individual route pages
function DestinationsPage() {
  return (
    <>
      <SEO 
        title="Curated Destinations" 
        description="Explore destinations handpicked by our community. Detailed guides, safety scores, and local tips."
        keywords="safe destinations, travel guides, solo traveler tips"
        url="/destinations"
      />
      <PlaceholderPage
        title="Destinations"
        description="Explore curated destinations handpicked by our community of 50,000+ solo travelers. Detailed guides, safety scores, and local tips — all in one place."
        icon="🌍"
        color="bg-sky-500"
      />
    </>
  );
}

function SafetyPage() {
  return (
    <>
      <SEO 
        title="Safety Hub" 
        description="Real-time safety data, AI-powered route planning, and emergency resources."
        keywords="travel safety, emergency resources, route planning"
        url="/safety"
      />
      <PlaceholderPage
        title="Safety Hub"
        description="Real-time safety data, AI-powered route planning, and emergency resources for every destination on the planet."
        icon="🛡️"
        color="bg-emerald-500"
      />
    </>
  );
}

function CommunityPage() {
  return (
    <>
      <SEO 
        title="Community Connect" 
        description="Connect with like-minded travelers. Share experiences and find travel buddies."
        keywords="travel community, travel buddies, share experiences"
        url="/community"
      />
      <PlaceholderPage
        title="Community"
        description="Connect with thousands of like-minded travelers. Share experiences, find travel buddies, and get insider tips from locals."
        icon="🤝"
        color="bg-violet-500"
      />
    </>
  );
}

function PricingPage() {
  return (
    <>
      <SEO 
        title="Simple Pricing" 
        description="Transparent pricing for every traveler. Start free and upgrade when you're ready."
        keywords="pricing, subscription, traviora premium"
        url="/pricing"
      />
      <PlaceholderPage
        title="Pricing"
        description="Simple, transparent pricing. Start free and upgrade when you're ready. No hidden fees, cancel anytime."
        icon="💎"
        color="bg-amber-500"
      />
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#020817] text-slate-200">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/get-started" element={<AuthPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/safety-map" element={<SafetyMapPage />} />
              <Route path="/powerspot" element={<PowerSpotPage />} />
              <Route path="/meditrust" element={<MediTrustPage />} />
              <Route path="/meditrust/doctor/:id" element={<DoctorProfilePage />} />
              <Route path="/menulens" element={<MenuLensPage />} />
              <Route path="/localvibe" element={<LocalVibePage />} />
              <Route path="/trip-planner" element={<TripPlannerPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/mens-hub" element={<MenPage />} />
              <Route path="/womens-hub" element={<WomenPage />} />
              <Route path="/family-hub" element={<FamilyPage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/pricing" element={<PricingPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
