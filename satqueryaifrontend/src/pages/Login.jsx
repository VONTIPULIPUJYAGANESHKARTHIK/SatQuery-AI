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
      staggerChildren: 0.1,
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

export default function Login() {
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
              className="flex items-center gap-3 mb-12 cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_10px_rgba(37,99,235,0.3)]">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">SatQuery AI</span>
            </motion.div>

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <div>
                <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Welcome back</motion.h2>
                <motion.p variants={itemVariants} className="text-gray-500 mb-10 font-medium text-lg">Sign in to your enterprise account.</motion.p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Work Email</label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="w-full px-5 py-4 bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-gray-900 placeholder-gray-400 font-medium"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-gray-700">Password</label>
                    <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-bold transition-colors">Forgot password?</a>
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••" 
                    className="w-full px-5 py-4 bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] text-gray-900 placeholder-gray-400 font-medium"
                  />
                </motion.div>

                <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_30px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-2 mt-2 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.div variants={itemVariants} className="pt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-transparent text-gray-400 font-bold uppercase tracking-wider text-xs">Or</span>
                    </div>
                  </div>
                </motion.div>

                <motion.button 
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-white border border-gray-200 py-4 rounded-2xl text-lg font-bold text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  Quick Demo Login
                </motion.button>
              </form>

              <motion.p variants={itemVariants} className="mt-10 text-center text-gray-500 font-medium">
                Don't have an account?{' '}
                <button onClick={() => navigate('/register')} className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                  Request Access
                </button>
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Visual Side */}
        <div className="hidden lg:block lg:w-1/2 relative bg-gray-100 p-2">
          <div className="absolute inset-2 rounded-[2rem] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]">
            <img 
              src="https://images.unsplash.com/photo-1541888062835-2d10331bc40c?q=80&w=2074&auto=format&fit=crop" 
              alt="Satellite View" 
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springTransition, delay: 0.4 }}
              className="absolute bottom-12 left-12 right-12 p-8 bg-white/20 backdrop-blur-3xl border border-white/40 rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_20px_50px_rgb(0,0,0,0.1)]"
            >
              <p className="text-xl text-white font-medium leading-relaxed mb-6 drop-shadow-sm">
                "SatQuery AI has fundamentally transformed how our analyst teams approach spatial data. The zero-shot capabilities are simply unparalleled in the industry."
              </p>
              <div>
                <p className="text-white font-bold drop-shadow-sm">Sarah Jenkins</p>
                <p className="text-white/80 text-sm font-medium">Director of Global Intelligence, Stratos Corp</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
