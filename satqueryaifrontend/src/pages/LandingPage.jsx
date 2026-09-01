import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, BarChart3, Activity, ShieldCheck, Database, Layers } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mesh font-sans overflow-x-hidden">
      {/* Top Navigation */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-surface/80 backdrop-blur-xl border-b border-white/50 py-4 px-8 flex justify-between items-center sticky top-0 z-50 shadow-sm"
      >
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Globe className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl tracking-tight text-primary">SatQuery AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral">
          <a href="#features" className="hover:text-primary transition-colors">Platform</a>
          <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
          <a href="#security" className="hover:text-primary transition-colors">Security</a>
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
            <button 
              onClick={() => navigate('/login')}
              className="text-primary hover:text-secondary transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-primary/90 transition-shadow shadow-md hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-32 flex flex-col lg:flex-row items-center gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 space-y-8"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-primary leading-[1.1] tracking-tight">
            Planetary scale <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400">
              intelligence.
            </span>
          </h1>
          <p className="text-xl text-neutral max-w-xl leading-relaxed">
            The standard for enterprise geospatial analysis. Seamlessly query satellite imagery, automate object detection, and integrate predictive models directly into your workflows.
          </p>
          <div className="pt-4 flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/register')}
              className="bg-primary text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-primary/90 transition-colors shadow-xl shadow-primary/20 flex items-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-primary border border-border px-8 py-4 rounded-xl text-base font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              Contact Sales
            </motion.button>
          </div>
          
          <div className="pt-8 flex items-center gap-6 text-sm text-neutral font-medium">
            <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-green-500"/> SOC2 Certified</span>
            <span className="flex items-center gap-2"><Database className="w-4 h-4 text-secondary"/> 50+ PB Data</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 w-full relative"
        >
          {/* Floating UI Elements */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000" />
          
          <div className="aspect-[4/3] rounded-2xl border border-white/60 shadow-2xl bg-white overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
              alt="Satellite Earth" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 via-transparent to-transparent opacity-80" />
            
            {/* Glassmorphism overlays */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl shadow-2xl flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Activity className="text-white w-6 h-6" />
                </div>
                <div>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wider">Analysis Complete</p>
                  <p className="text-white font-bold text-lg">14 Targets Detected</p>
                </div>
              </div>
              <div className="px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-300 text-xs font-semibold">
                99.8% Confidence
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-surface border-t border-border py-32 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-primary mb-6">Designed for scale. Built for precision.</h2>
            <p className="text-lg text-neutral max-w-2xl mx-auto">Replace fragmented workflows with a single, unified platform capable of processing planetary-scale data in milliseconds.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Zero-Shot Detection", desc: "Identify novel objects without retraining models. Simply describe what you are looking for.", icon: Layers },
              { title: "Temporal Analysis", desc: "Compare historical imagery automatically to highlight infrastructure changes over time.", icon: BarChart3 },
              { title: "Enterprise API", desc: "Integrate analysis results directly into your internal systems via robust GraphQL APIs.", icon: Database },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white border border-border p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary transition-colors">
                  <feature.icon className="w-7 h-7 text-secondary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-neutral leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
