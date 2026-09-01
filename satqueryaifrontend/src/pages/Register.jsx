import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, ArrowRight } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mesh flex">
      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative z-10 py-12">
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

          <h2 className="text-3xl font-bold text-primary mb-2 tracking-tight">Request Access</h2>
          <p className="text-neutral mb-8">Join the platform redefining spatial intelligence.</p>

          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">First Name</label>
                <input 
                  type="text" 
                  placeholder="Jane" 
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-1.5">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Work Email</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Company Name</label>
              <input 
                type="text" 
                placeholder="Stratos Corp" 
                className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-primary mb-1.5">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-4 py-2.5 bg-surface border border-border rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-sm"
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md flex items-center justify-center gap-2 mt-4"
            >
              Create Account <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-secondary font-semibold hover:underline">
              Sign In
            </button>
          </p>
        </motion.div>
      </div>

      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 overflow-hidden items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1493606371202-6275828f90f3?q=80&w=2070&auto=format&fit=crop" 
            alt="Data Analysis" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-primary/90" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-lg w-full px-12"
        >
          <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
            Unlock planetary-scale insights in seconds.
          </h3>
          <ul className="space-y-4 text-white/80">
            {[
              "Access 50+ petabytes of archived geospatial data",
              "Deploy zero-shot anomaly detection models instantly",
              "Integrate securely with existing enterprise workflows"
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
