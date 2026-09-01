import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mesh flex">
      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="flex items-center gap-2 mb-12 cursor-pointer" onClick={() => navigate('/')}>
            <Globe className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl tracking-tight text-primary">SatQuery AI</span>
          </div>

          <h2 className="text-3xl font-bold text-primary mb-2 tracking-tight">Welcome back</h2>
          <p className="text-neutral mb-8">Sign in to your enterprise account to continue.</p>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Work Email</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-sm"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-primary">Password</label>
                <a href="#" className="text-xs text-secondary hover:underline font-medium">Forgot password?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-sm"
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral">
            Don't have an account?{' '}
            <button onClick={() => navigate('/register')} className="text-secondary font-semibold hover:underline">
              Request Access
            </button>
          </p>
        </motion.div>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 relative bg-primary overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1541888062835-2d10331bc40c?q=80&w=2074&auto=format&fit=crop" 
            alt="Satellite View" 
            className="w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-lg p-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl"
        >
          <div className="flex gap-2 mb-6">
            {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/50" />)}
          </div>
          <p className="text-2xl text-white font-medium leading-relaxed mb-6">
            "SatQuery AI has fundamentally transformed how our analyst teams approach spatial data. The zero-shot capabilities are simply unparalleled in the industry."
          </p>
          <div>
            <p className="text-white font-bold">Sarah Jenkins</p>
            <p className="text-white/70 text-sm">Director of Global Intelligence, Stratos Corp</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
