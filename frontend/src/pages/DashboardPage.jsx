import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Users, Shield, ArrowRight } from 'lucide-react';

const dashboards = [
  {
    id: 'mens',
    title: "Men's Hub",
    description: "Tailored adventures, solo travel tips, and a community of explorers.",
    icon: User,
    color: "from-sky-500 to-blue-600",
    bgLight: "bg-sky-500/10",
    borderLight: "border-sky-500/20",
    link: "/mens-hub"
  },
  {
    id: 'womens',
    title: "Women's Hub",
    description: "Safe travel guides, verified destinations, and an empowering network.",
    icon: Shield,
    color: "from-fuchsia-500 to-pink-600",
    bgLight: "bg-fuchsia-500/10",
    borderLight: "border-fuchsia-500/20",
    link: "/womens-hub"
  },
  {
    id: 'family',
    title: "Family Hub",
    description: "Kid-friendly spots, family itineraries, and stress-free planning.",
    icon: Users,
    color: "from-emerald-500 to-teal-600",
    bgLight: "bg-emerald-500/10",
    borderLight: "border-emerald-500/20",
    link: "/family-hub"
  }
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">Dashboard</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Choose the hub that best fits your travel style. Each dashboard is customized with curated content, safety tools, and community features designed just for you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dashboards.map((dash, index) => {
            const Icon = dash.icon;
            return (
              <motion.div
                key={dash.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={dash.link} className="block group h-full">
                  <div className={`h-full p-8 rounded-3xl glass border ${dash.borderLight} hover:border-slate-600 transition-all duration-300 relative overflow-hidden`}>
                    
                    {/* Hover Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${dash.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className={`w-16 h-16 rounded-2xl ${dash.bgLight} border ${dash.borderLight} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="text-white w-8 h-8" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                      {dash.title}
                    </h2>
                    
                    <p className="text-slate-400 mb-8 line-clamp-3">
                      {dash.description}
                    </p>
                    
                    <div className="mt-auto flex items-center text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                      Enter Hub
                      <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
