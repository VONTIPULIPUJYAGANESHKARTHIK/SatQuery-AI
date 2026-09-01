import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';

const springTransition = { type: "spring", stiffness: 300, damping: 30 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: springTransition 
  }
};

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-blue-50 font-sans flex items-center justify-center p-6 selection:bg-blue-200 antialiased text-gray-800">
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={springTransition}
        className="w-full max-w-5xl bg-white/60 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_20px_50px_rgb(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Form Side */}
        <div className="w-full lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center bg-white/40">
          <div className="max-w-sm w-full mx-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, delay: 0.2 }}
              className="flex items-center gap-3 mb-10 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_10px_rgba(37,99,235,0.3)]">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">SatQuery AI</span>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-5">
              <div>
                <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Request Access</motion.h2>
                <motion.p variants={itemVariants} className="text-gray-500 mb-8 font-medium text-lg">Join the platform redefining spatial intelligence.</motion.p>
              </div>

              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane" 
                      className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-gray-900 placeholder-gray-400 font-medium"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Doe" 
                      className="w-full px-4 py-3.5 bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-gray-900 placeholder-gray-400 font-medium"
                    />
                  </motion.div>
                </div>
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full px-5 py-3.5 bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-gray-900 placeholder-gray-400 font-medium"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    placeholder="Stratos Corp" 
                    className="w-full px-5 py-3.5 bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-gray-900 placeholder-gray-400 font-medium"
                  />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full px-5 py-3.5 bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-gray-900 placeholder-gray-400 font-medium"
                  />
                </motion.div>

                <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 mt-6 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>

              <motion.p variants={itemVariants} className="mt-8 text-center text-gray-500 font-medium">
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                  Sign In
                </button>
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Visual Side */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gray-100 p-2">
          <div className="absolute inset-2 rounded-[2rem] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]">
            <img 
              src="https://images.unsplash.com/photo-1493606371202-6275828f90f3?q=80&w=2070&auto=format&fit=crop" 
              alt="Data Analysis" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.4 }}
              className="absolute top-12 left-12 right-12 p-8 bg-white/20 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_20px_50px_rgb(0,0,0,0.1)]"
            >
              <h3 className="text-3xl font-bold text-white mb-6 leading-tight drop-shadow-sm">
                Unlock planetary-scale insights in seconds.
              </h3>
              <ul className="space-y-4 text-white/90">
                {[
                  "Access 50+ petabytes of archived geospatial data",
                  "Deploy zero-shot anomaly detection models instantly",
                  "Integrate securely with existing enterprise workflows"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <div className="w-8 h-8 rounded-full bg-blue-500/30 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/30 shadow-inner">
                      <div className="w-2.5 h-2.5 rounded-full bg-white shadow-sm" />
                    </div>
                    <span className="drop-shadow-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
