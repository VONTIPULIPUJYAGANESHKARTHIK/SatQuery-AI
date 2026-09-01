import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, BarChart3, Activity } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <header className="w-full bg-surface border-b border-border py-4 px-8 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Globe className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl tracking-tight text-primary">SatQuery AI</span>
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium text-neutral">
          <a href="#features" className="hover:text-primary transition-colors">Features</a>
          <a href="#solutions" className="hover:text-primary transition-colors">Solutions</a>
          <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-white px-5 py-2.5 rounded hover:bg-primary/90 transition-colors"
          >
            Launch Platform
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-8 py-24 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-secondary border border-blue-100 rounded-full text-xs font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            VLM Model 3.1 Now Live
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-primary leading-tight tracking-tight">
            Intelligence from <br /> <span className="text-secondary">Above.</span>
          </h1>
          <p className="text-lg text-neutral max-w-xl leading-relaxed">
            Automate spatial analysis with our enterprise-grade Vision-Language Model. 
            Instantly query satellite imagery, detect anomalies, and transform geospatial data into actionable insights.
          </p>
          <div className="pt-4 flex gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-primary text-white px-6 py-3 rounded text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              Start Analyzing <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-surface text-primary border border-border px-6 py-3 rounded text-sm font-semibold hover:bg-gray-50 transition-colors">
              Book a Demo
            </button>
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <div className="aspect-square md:aspect-[4/3] rounded-lg border border-border shadow-2xl bg-white overflow-hidden relative">
            {/* Mock Image/Graphic for Hero */}
            <img 
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
              alt="Satellite Earth" 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent" />
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm border border-border p-4 rounded shadow-lg">
              <div className="flex items-center gap-3">
                <Activity className="text-secondary w-5 h-5" />
                <div>
                  <p className="text-xs text-neutral font-semibold uppercase tracking-wider">System Status</p>
                  <p className="text-sm text-primary font-bold">14 Targets Detected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-surface border-t border-border py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Enterprise Capabilities</h2>
            <p className="text-neutral max-w-2xl mx-auto">Built for high-stakes environments where clarity and data-driven precision are paramount.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Real-time Monitoring", desc: "Connect directly to live satellite feeds for instant analysis.", icon: Globe },
              { title: "Automated Detection", desc: "Identify vessels, vehicles, and infrastructure with zero-shot learning.", icon: Activity },
              { title: "Predictive Analytics", desc: "Forecast changes in spatial areas using historical bi-temporal data.", icon: BarChart3 },
            ].map((feature, i) => (
              <div key={i} className="bg-background border border-border p-6 rounded-lg hover:border-secondary/50 transition-colors">
                <feature.icon className="w-8 h-8 text-secondary mb-4" />
                <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
                <p className="text-neutral text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
