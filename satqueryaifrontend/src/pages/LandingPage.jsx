import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, BarChart3, ShieldCheck, Database, Layers, Search, Code2, ChevronRight, Lock } from 'lucide-react';

const springTransition = { type: "spring", stiffness: 300, damping: 30 };

// Staggered Animation Variants
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
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: springTransition 
  }
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-blue-50 font-sans overflow-x-hidden selection:bg-blue-200 antialiased text-gray-800">
      
      {/* Top Navigation - Floating Glass Pill */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <motion.header 
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springTransition}
          className="w-full max-w-5xl bg-white/70 backdrop-blur-3xl border border-white/60 py-3 px-6 flex justify-between items-center rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.08)]"
        >
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_10px_rgba(37,99,235,0.3)]">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-900">SatQuery AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
            <a href="#features" className="hover:text-blue-600 transition-colors">Platform</a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">How it Works</a>
            <a href="#solutions" className="hover:text-blue-600 transition-colors">Solutions</a>
            <a href="#security" className="hover:text-blue-600 transition-colors">Security</a>
            <div className="flex items-center gap-4 ml-2 pl-6 border-l border-gray-200/50">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_15px_rgba(37,99,235,0.4)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_25px_rgba(37,99,235,0.6)] flex items-center gap-2 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                Sign In <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </nav>
        </motion.header>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 pt-40 pb-24 flex flex-col lg:flex-row items-center gap-16 relative">
        
        {/* Left Column: Copy & CTA */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-1 space-y-8 relative z-10"
        >
          <motion.h1 variants={itemVariants} className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
            Planetary scale <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 filter drop-shadow-sm">
              intelligence.
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-gray-500 max-w-xl leading-relaxed font-medium">
            The standard for enterprise geospatial analysis. Seamlessly query satellite imagery, automate object detection, and integrate predictive models directly into your workflows.
          </motion.p>
          <motion.div variants={itemVariants} className="pt-4 flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/login')}
              className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_40px_rgba(37,99,235,0.5)] transition-all flex items-center gap-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              Start Analyzing Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Column: Globe Graphic (Glassmorphic Container) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...springTransition, delay: 0.3 }}
          className="flex-1 w-full relative"
        >
          <div className="absolute -inset-10 bg-blue-400/20 rounded-full blur-[100px] opacity-50 mix-blend-multiply pointer-events-none" />
          <div className="aspect-[4/3] rounded-[2rem] border border-white/60 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_20px_50px_rgb(0,0,0,0.1)] bg-white/40 backdrop-blur-3xl overflow-hidden relative group p-2">
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
              alt="Satellite Earth" 
              className="w-full h-full object-cover rounded-[1.5rem] transform group-hover:scale-105 transition-transform duration-1000 ease-out shadow-inner"
            />
          </div>
        </motion.div>
      </section>

      {/* How it Works (Pipeline) */}
      <section id="how-it-works" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springTransition}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">From raw pixels to actionable intelligence.</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-medium">Our proprietary VLM architecture reduces analysis workflows from days to seconds.</p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8 relative"
          >
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent -z-10" />

            {[
              { step: "01", title: "Ingest Data", desc: "Connect your AWS S3, Google Cloud Storage, or upload local GeoTIFFs seamlessly.", icon: Database },
              { step: "02", title: "Query with AI", desc: "Use natural language to ask questions about your spatial data. No SQL or Python required.", icon: Search },
              { step: "03", title: "Export Insights", desc: "Push identified targets via webhook or download structural analysis reports instantly.", icon: Code2 },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="bg-white/60 backdrop-blur-3xl border border-white/60 p-8 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] relative group hover:bg-white/80 transition-colors"
              >
                <div className="absolute -top-6 left-8 bg-blue-600 rounded-2xl p-3 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_20px_rgba(37,99,235,0.3)] group-hover:-translate-y-2 transition-transform duration-300 ease-out">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-6xl font-black text-gray-100/50 absolute top-6 right-6 -z-10 select-none tracking-tighter">{feature.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springTransition}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">Designed for scale. Built for precision.</h2>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: "Zero-Shot Detection", desc: "Identify novel objects without retraining models. Simply describe what you are looking for.", icon: Layers },
              { title: "Temporal Analysis", desc: "Compare historical imagery automatically to highlight infrastructure changes over time.", icon: BarChart3 },
              { title: "Enterprise API", desc: "Integrate analysis results directly into your internal systems via robust GraphQL APIs.", icon: Code2 },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/70 backdrop-blur-3xl border border-white/60 p-8 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_20px_40px_rgb(0,0,0,0.08)] transition-all group"
              >
                <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors">
                  <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1"
            >
              <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">Solutions for every industry.</motion.h2>
              <motion.p variants={itemVariants} className="text-lg text-gray-500 mb-8 leading-relaxed font-medium">
                Whether you're monitoring global supply chains, assessing climate impact, or securing national borders, SatQuery AI adapts to your operational needs instantly.
              </motion.p>
              <motion.ul variants={containerVariants} className="space-y-4">
                {['Maritime & Port Monitoring', 'Agriculture & Crop Yields', 'Defense & Intelligence', 'Disaster Response'].map((item, i) => (
                  <motion.li key={i} variants={itemVariants} className="flex items-center gap-3 text-gray-800 font-bold">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 shadow-inner">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-sm" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={springTransition}
              className="flex-1 w-full relative"
            >
              <div className="absolute -inset-10 bg-indigo-400/20 rounded-full blur-[100px] opacity-50 mix-blend-multiply pointer-events-none" />
              <div className="aspect-video bg-white/60 backdrop-blur-3xl border border-white/60 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_20px_50px_rgb(0,0,0,0.1)] overflow-hidden relative group p-2">
                <img 
                  src="https://images.unsplash.com/photo-1498084991519-c4bef3d8cb73?q=80&w=2070&auto=format&fit=crop" 
                  alt="Data mapping" 
                  className="w-full h-full object-cover rounded-[1.5rem] transform group-hover:scale-105 transition-transform duration-1000 ease-out shadow-inner"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={springTransition}
            className="w-24 h-24 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white flex items-center justify-center mx-auto mb-8 shadow-[0_10px_30px_rgb(0,0,0,0.05)]"
          >
            <ShieldCheck className="w-12 h-12 text-blue-600" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6 text-gray-900 tracking-tight"
          >
            Military-grade security.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 font-medium"
          >
            Your data is your most valuable asset. We employ end-to-end encryption, strict access controls, and regular third-party audits to ensure total compliance.
          </motion.p>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-4 gap-6 text-left"
          >
            {['SOC 2 Type II', 'ISO 27001', 'GDPR Compliant', 'End-to-End Encryption'].map((cert, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white/70 backdrop-blur-3xl border border-white/60 p-6 rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <Lock className="w-6 h-6 text-blue-500 mb-4" />
                <h4 className="font-bold text-gray-900 tracking-tight">{cert}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* High-Contrast Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={springTransition}
          className="max-w-5xl mx-auto px-8 text-center relative z-10"
        >
          <div className="bg-blue-600 rounded-[3rem] p-16 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_20px_50px_rgba(37,99,235,0.3)] overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] opacity-10 bg-cover bg-center mix-blend-overlay" />
            
            <h2 className="text-5xl font-extrabold text-white mb-6 tracking-tight relative z-10">Ready to see the unseen?</h2>
            <p className="text-xl text-blue-100 mb-10 font-medium max-w-2xl mx-auto relative z-10">
              Join the enterprise teams using SatQuery AI to revolutionize their geospatial workflows today.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="bg-white text-blue-600 px-10 py-5 rounded-full text-xl font-bold shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center gap-2 mx-auto relative z-10 hover:bg-gray-50 transition-colors group"
            >
              Sign In to Platform <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
