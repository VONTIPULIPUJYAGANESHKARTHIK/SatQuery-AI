import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, LayoutDashboard, Search, UploadCloud, Bell, Map as MapIcon, Database, Settings, Activity, Loader2 } from 'lucide-react';
import Map, { NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <div className="flex h-screen bg-mesh font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-surface/80 backdrop-blur-xl border-r border-border flex flex-col z-20 shadow-lg"
      >
        <div className="p-6 border-b border-border flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <Globe className="w-6 h-6 text-secondary" />
          <span className="font-extrabold text-xl text-primary tracking-tight">SatQuery</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {[
            { name: 'Overview', icon: LayoutDashboard },
            { name: 'Spatial Query', icon: Search },
            { name: 'Data Ingestion', icon: UploadCloud },
            { name: 'Map View', icon: MapIcon },
            { name: 'Datasets', icon: Database },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                activeTab === item.name 
                  ? 'bg-primary text-white shadow-md' 
                  : 'text-neutral hover:bg-gray-100 hover:text-primary'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.name ? 'text-white' : 'text-neutral'}`} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-neutral hover:bg-gray-100 hover:text-primary rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent z-10 relative">
        {/* Top Header */}
        <header className="h-16 bg-surface/50 backdrop-blur-md border-b border-border flex items-center justify-between px-8 shrink-0">
          <h1 className="text-xl font-bold text-primary">{activeTab}</h1>
          <div className="flex items-center gap-5">
            <button className="relative p-2 text-neutral hover:text-primary hover:bg-white rounded-full transition-colors shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-surface" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-secondary to-blue-400 text-white flex items-center justify-center text-sm font-bold shadow-md cursor-pointer hover:shadow-lg transition-shadow">
              JS
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto space-y-8"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Active Models', value: '3', status: 'Optimal latency' },
                { label: 'Processed Entities', value: '1,204', status: '+12% this week' },
                { label: 'System Health', value: '99.9%', status: 'All systems operational' },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -2 }}
                  className="bg-white border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <p className="text-xs font-bold text-neutral uppercase tracking-widest">{stat.label}</p>
                  <p className="text-4xl font-extrabold text-primary mt-3 mb-1">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5" /> {stat.status}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Analysis Workspace Container */}
            <div className="bg-white border border-border rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden min-h-[600px]">
              
              {/* Query Panel */}
              <div className="w-full md:w-[400px] border-r border-border p-6 flex flex-col bg-gray-50/50">
                <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Search className="w-4 h-4 text-secondary" /> Analysis Command
                </h2>
                
                <div className="space-y-6 flex-1">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Source Data</label>
                    <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-secondary hover:bg-secondary/5 cursor-pointer transition-all bg-white shadow-sm">
                      <UploadCloud className="w-8 h-8 text-secondary mx-auto mb-3" />
                      <span className="text-sm text-primary font-bold block mb-1">Drag & Drop GeoTIFF</span>
                      <span className="text-xs text-neutral">or click to browse local files</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Natural Language Query</label>
                    <textarea 
                      className="w-full bg-white border border-border rounded-xl p-4 text-sm text-primary placeholder-neutral focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all shadow-sm resize-none"
                      rows={5}
                      placeholder="e.g. Identify and highlight all commercial shipping vessels currently docked..."
                    />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAnalysis}
                  disabled={isAnalyzing}
                  className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-colors mt-6 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing Vector Data...</>
                  ) : (
                    'Execute Analysis'
                  )}
                </motion.button>
              </div>

              {/* Map/Result View */}
              <div className="w-full md:flex-1 bg-gray-200 relative overflow-hidden">
                <Map
                  initialViewState={{
                    longitude: -122.414,
                    latitude: 37.776,
                    zoom: 12
                  }}
                  mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                  style={{ width: '100%', height: '100%' }}
                >
                  <NavigationControl position="top-right" />
                  
                  <AnimatePresence>
                    {!isAnalyzing && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <div className="bg-white/90 backdrop-blur-md border border-border p-6 rounded-2xl shadow-xl text-center max-w-xs">
                          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MapIcon className="w-6 h-6 text-secondary" />
                          </div>
                          <p className="text-base font-bold text-primary mb-1">Awaiting Telemetry</p>
                          <p className="text-sm text-neutral leading-relaxed">Provide an image source and query to begin neural extraction.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Map>
              </div>
            </div>

          </motion.div>
        </div>
      </main>
    </div>
  );
}
