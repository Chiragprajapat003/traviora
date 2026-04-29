import { motion } from 'framer-motion';

export default function MenPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-900 via-indigo-900 to-purple-900 text-white p-6"
    >
      <div className="relative max-w-3xl w-full glass p-4 rounded-3xl border border-white/20 bg-white/5 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop" alt="Men page mockup" className="w-full h-auto object-cover rounded-2xl" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 p-4">
          <h1 className="text-4xl font-extrabold mb-4 text-white">Welcome, Adventurous Man!</h1>
          <p className="text-lg mb-6 text-white">
            Your journey is tailored for solo male travelers. Explore curated destinations, safety tips, and community groups built just for you.
          </p>
          <button className="mt-4 px-6 py-3 bg-gradient-to-r from-sky-500 to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            Browse Destinations
          </button>
        </div>
      </div>
    </motion.div>
  );
}
