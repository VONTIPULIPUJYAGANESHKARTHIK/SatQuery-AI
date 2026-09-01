import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, LayoutDashboard, Search, UploadCloud, Bell, Map as MapIcon, 
  Database, Settings, Activity, Loader2, User, CreditCard, Key, LogOut 
} from 'lucide-react';
import Map, { NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  // --- View Renderers ---

  const renderOverview = () => (
    <motion.div 
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Models', value: '3', status: 'Optimal latency' },
          { label: 'Processed Entities', value: '1,204', status: '+12% this week' },
          { label: 'System Health', value: '99.9%', status: 'All systems operational' },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <p className="text-xs font-bold text-neutral uppercase tracking-widest">{stat.label}</p>
            <p className="text-4xl font-extrabold text-primary mt-3 mb-1">{stat.value}</p>
            <p className="text-sm text-green-600 font-medium flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" /> {stat.status}
            </p>
          </div>
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

          <button 
            onClick={handleAnalysis}
            disabled={isAnalyzing}
            className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-colors mt-6 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing Vector Data...</>
            ) : (
              'Execute Analysis'
            )}
          </button>
        </div>

        {/* Map/Result View */}
        <div className="w-full md:flex-1 bg-gray-200 relative overflow-hidden">
          <Map
            initialViewState={{ longitude: -122.414, latitude: 37.776, zoom: 12 }}
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
  );

  const renderDataIngestion = () => (
    <motion.div 
      key="ingestion"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto h-full flex flex-col items-center justify-center py-20"
    >
      <div className="w-full bg-white border border-border rounded-2xl shadow-sm p-12 text-center">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <UploadCloud className="w-10 h-10 text-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Upload Spatial Data</h2>
        <p className="text-neutral mb-8 max-w-md mx-auto">Upload GeoTIFFs, Shapefiles, or connect directly to your cloud buckets for batch processing.</p>
        
        <div className="border-2 border-dashed border-border rounded-xl p-16 hover:bg-gray-50 transition-colors cursor-pointer group">
          <UploadCloud className="w-8 h-8 text-neutral group-hover:text-secondary mx-auto mb-4 transition-colors" />
          <p className="text-primary font-bold">Select files or drag and drop</p>
          <p className="text-sm text-neutral mt-1">GeoTIFF up to 5GB</p>
        </div>
      </div>
    </motion.div>
  );

  const renderDatasets = () => (
    <motion.div 
      key="datasets"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto"
    >
      <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-bold text-primary">Connected Databases</h2>
          <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
            + Connect Source
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-neutral text-xs uppercase tracking-wider border-b border-border">
              <th className="p-4 font-bold">Dataset Name</th>
              <th className="p-4 font-bold">Source</th>
              <th className="p-4 font-bold">Size</th>
              <th className="p-4 font-bold">Last Synced</th>
              <th className="p-4 font-bold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              { name: 'Global Ports Monitor', source: 'AWS S3', size: '2.4 TB', sync: '2 mins ago', status: 'Active' },
              { name: 'EU Crop Yield 2026', source: 'Google Cloud Storage', size: '850 GB', sync: '1 hr ago', status: 'Active' },
              { name: 'Historical Traffic AI', source: 'Local Uploads', size: '42 GB', sync: 'Yesterday', status: 'Archived' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-primary">{row.name}</td>
                <td className="p-4 text-neutral">{row.source}</td>
                <td className="p-4 text-neutral">{row.size}</td>
                <td className="p-4 text-neutral">{row.sync}</td>
                <td className="p-4 text-right">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-neutral'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const renderPlaceholder = (title, icon) => (
    <motion.div 
      key={title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center h-full text-center p-12"
    >
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
        {React.createElement(icon, { className: "w-8 h-8 text-secondary" })}
      </div>
      <h2 className="text-xl font-bold text-primary mb-2">{title} Configuration</h2>
      <p className="text-neutral max-w-md">This view is currently under active development. Enterprise features will be available in the upcoming release.</p>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return renderOverview();
      case 'Data Ingestion': return renderDataIngestion();
      case 'Datasets': return renderDatasets();
      case 'Spatial Query': return renderPlaceholder('Spatial Query', Search);
      case 'Map View': return renderPlaceholder('Map Workspace', MapIcon);
      case 'Settings': return renderPlaceholder('System Settings', Settings);
      default: return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-mesh font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-surface/80 backdrop-blur-xl border-r border-border flex flex-col z-20 shadow-lg shrink-0"
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
          <button 
            onClick={() => setActiveTab('Settings')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'Settings' ? 'bg-primary text-white shadow-md' : 'text-neutral hover:bg-gray-100 hover:text-primary'
            }`}
          >
            <Settings className={`w-5 h-5 ${activeTab === 'Settings' ? 'text-white' : ''}`} />
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
            
            {/* Profile Menu Container */}
            <div className="relative">
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-9 h-9 rounded-full bg-gradient-to-tr from-secondary to-blue-400 text-white flex items-center justify-center text-sm font-bold shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              >
                JS
              </div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 bg-white border border-border rounded-xl shadow-2xl py-2 z-50 origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-bold text-primary">John Smith</p>
                      <p className="text-xs text-neutral truncate">john.smith@company.com</p>
                    </div>
                    
                    <div className="py-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-50 flex items-center gap-2">
                        <User className="w-4 h-4 text-neutral" /> My Profile
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-50 flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-neutral" /> Billing & Usage
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-primary hover:bg-gray-50 flex items-center gap-2">
                        <Key className="w-4 h-4 text-neutral" /> API Keys
                      </button>
                    </div>
                    
                    <div className="border-t border-border pt-2">
                      <button 
                        onClick={() => navigate('/')}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 font-medium"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-auto p-8 relative">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
