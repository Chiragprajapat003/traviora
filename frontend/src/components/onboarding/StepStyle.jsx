import { motion } from 'framer-motion';
import { travelStyles } from '../../data/onboardingData';

export default function StepStyle({ selected, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-5 sm:gap-6"
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
        Travel Style ✈️
      </h2>
      <p className="text-slate-300 text-base max-w-md mx-auto">
        Pick the styles that match you best. We'll curate destinations, community groups, and features around what you love.
        <span className="text-slate-500"> (Select all that apply)</span>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {travelStyles.map(({ id, label, icon: Icon, color, border }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onToggle(id)}
            className={`relative flex flex-col items-center justify-center py-5 rounded-2xl border transition-all duration-300 ${
              selected.includes(id)
                ? `border-emerald-500/60 bg-gradient-to-b ${color} shadow-lg`
                : `border-white/10 bg-white/5 ${border} hover:bg-white/8`
            }`}
          >
            {selected.includes(id) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 flex items-center justify-center"
              >
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
            <Icon className="mb-2 h-7 w-7 text-sky-300" />
            <span className="font-semibold text-sm text-center {selected.includes(id) ? 'text-white' : 'text-slate-300'}">{label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
