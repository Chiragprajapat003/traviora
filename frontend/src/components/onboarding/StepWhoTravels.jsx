import { motion } from 'framer-motion';
import { travelerTypes } from '../../data/onboardingData';

export default function StepWhoTravels({ selected, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5 sm:gap-6"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
        Who is traveling? 🧳
      </h2>
      <p className="text-slate-300 text-base max-w-md mx-auto">
        Choose the traveler type to personalize safety tips and community matches.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {travelerTypes.map(({ id, label, desc, emoji, active, glow }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(id)}
            className={`relative flex flex-col items-center justify-center py-6 rounded-2xl border transition-all duration-300 ${
              selected === id
                ? `${active} shadow-lg`
                : `border-white/15 bg-white/5 ${glow} hover:bg-white/8 hover:shadow-xl`
            }`}
          >
            {/* check badge */}
            {selected === id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-colors ${selected === id ? 'bg-white/15' : 'bg-white/8'}`}>
              {emoji}
            </div>
            <div className="mt-2 text-center">
              <div className={`text-base font-semibold ${selected === id ? 'text-white' : 'text-slate-300'}`}>
                {label}
              </div>
              <div className="text-xs text-slate-500 mt-1 leading-snug">{desc}</div>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
