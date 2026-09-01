import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, BarChart3, ShieldCheck, Database, Layers, Search, Zap, Code2, Map as MapIcon, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mesh font-sans overflow-x-hidden selection:bg-secondary/30">
      
      {/* Top Navigation */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-surface/70 backdrop-blur-xl border-b border-white/50 py-4 px-8 flex justify-between items-center sticky top-0 z-50"
      >
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Globe className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl tracking-tight text-primary">SatQuery AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral">
          <a href="#features" className="hover:text-primary transition-colors">Platform</a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it Works</a>
          <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
          <a href="#security" className="hover:text-primary transition-colors">Security</a>
          <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border">
            <button 
              onClick={() => navigate('/login')}
              className="bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
            >
              Sign In <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-20 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Column: Copy & CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex-1 space-y-8 relative z-10"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold text-primary leading-[1.1] tracking-tight">
            Planetary scale <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-blue-400">
              intelligence.
            </span>
          </h1>
          <p className="text-xl text-neutral max-w-xl leading-relaxed font-medium">
            The standard for enterprise geospatial analysis. Seamlessly query satellite imagery, automate object detection, and integrate predictive models directly into your workflows.
          </p>
          <div className="pt-4 flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login')}
              className="bg-primary text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary/90 transition-colors shadow-xl shadow-primary/20 flex items-center gap-2"
            >
              Start Analyzing Now <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column: Globe Graphic */}
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
          </div>
        </motion.div>
      </section>

      {/* How it Works (Pipeline) */}
      <section id="how-it-works" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-primary mb-6">From raw pixels to actionable intelligence.</h2>
            <p className="text-lg text-neutral max-w-2xl mx-auto">Our proprietary VLM architecture reduces analysis workflows from days to seconds.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

            {[
              { step: "01", title: "Ingest Data", desc: "Connect your AWS S3, Google Cloud Storage, or upload local GeoTIFFs seamlessly.", icon: Database },
              { step: "02", title: "Query with AI", desc: "Use natural language to ask questions about your spatial data. No SQL or Python required.", icon: Search },
              { step: "03", title: "Export Insights", desc: "Push identified targets via webhook or download structural analysis reports instantly.", icon: Code2 },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-surface border border-border p-8 rounded-2xl shadow-sm relative group"
              >
                <div className="absolute -top-6 left-8 bg-white border border-border rounded-xl p-3 shadow-md group-hover:-translate-y-1 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-5xl font-black text-gray-100 absolute top-6 right-6 -z-10">{feature.step}</div>
                <h3 className="text-xl font-bold text-primary mt-6 mb-3">{feature.title}</h3>
                <p className="text-neutral leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white border-t border-border py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-primary mb-6">Designed for scale. Built for precision.</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Zero-Shot Detection", desc: "Identify novel objects without retraining models. Simply describe what you are looking for.", icon: Layers },
              { title: "Temporal Analysis", desc: "Compare historical imagery automatically to highlight infrastructure changes over time.", icon: BarChart3 },
              { title: "Enterprise API", desc: "Integrate analysis results directly into your internal systems via robust GraphQL APIs.", icon: Code2 },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-surface border border-border p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all group"
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

      {/* Solutions Section */}
      <section id="solutions" className="bg-mesh border-t border-border py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-primary mb-6">Solutions for every industry.</h2>
              <p className="text-lg text-neutral mb-8 leading-relaxed">
                Whether you're monitoring global supply chains, assessing climate impact, or securing national borders, SatQuery AI adapts to your operational needs instantly.
              </p>
              <ul className="space-y-4">
                {['Maritime & Port Monitoring', 'Agriculture & Crop Yields', 'Defense & Intelligence', 'Disaster Response'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-primary font-semibold">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-secondary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full">
              <div className="aspect-video bg-white border border-white/60 rounded-2xl shadow-2xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1498084991519-c4bef3d8cb73?q=80&w=2070&auto=format&fit=crop" 
                  alt="Data mapping" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="bg-primary text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <ShieldCheck className="w-16 h-16 text-secondary mx-auto mb-8" />
          <h2 className="text-4xl font-bold mb-6">Military-grade security.</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-12">
            Your data is your most valuable asset. We employ end-to-end encryption, strict access controls, and regular third-party audits to ensure total compliance.
          </p>
          <div className="grid md:grid-cols-4 gap-6 text-left">
            {['SOC 2 Type II', 'ISO 27001', 'GDPR Compliant', 'End-to-End Encryption'].map((cert, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-xl hover:bg-white/20 transition-colors">
                <ShieldCheck className="w-6 h-6 text-secondary mb-4" />
                <h4 className="font-bold text-white">{cert}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Contrast Final CTA */}
      <section className="bg-primary py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <h2 className="text-5xl font-black text-white mb-8 tracking-tight">Ready to see the unseen?</h2>
          <p className="text-xl text-white/70 mb-10">
            Join the enterprise teams using SatQuery AI to revolutionize their geospatial workflows today.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/login')}
            className="bg-white text-primary px-10 py-5 rounded-xl text-xl font-black shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all flex items-center gap-2 mx-auto"
          >
            Sign In to Platform <ArrowRight className="w-6 h-6" />
          </motion.button>
        </div>
      </section>

    </div>
  );
}
