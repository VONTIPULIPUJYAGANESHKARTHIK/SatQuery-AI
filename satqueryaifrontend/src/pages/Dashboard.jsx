import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, LayoutDashboard, Search, UploadCloud, Bell, Map as MapIcon, 
  Database, Settings, Activity, User, CreditCard, Key, LogOut,
  SlidersHorizontal, CheckCircle2, FileText, Download, MessageSquare,
  Layers, ScanLine, FileJson, ArrowRightLeft, FileCheck
} from 'lucide-react';
import Map, { NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Data Ingestion State
  const [ingestMode, setIngestMode] = useState('single');
  const [isUploading, setIsUploading] = useState(false);

  // Spatial Query State
  const [chatQuery, setChatQuery] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [executionTrace, setExecutionTrace] = useState(0);

  // --- Handlers ---

  const handleUploadClick = () => {
    setIsUploading(true);
    setTimeout(() => setIsUploading(false), 3000);
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (!chatQuery.trim()) return;
    
    setIsQuerying(true);
    setExecutionTrace(0);
    
    // Simulate Auditable Execution Trace steps
    setTimeout(() => setExecutionTrace(1), 500); // Validating intent
    setTimeout(() => setExecutionTrace(2), 1500); // Routing to model
    setTimeout(() => setExecutionTrace(3), 2500); // Generating GeoJSON
    setTimeout(() => setIsQuerying(false), 3500); // Done
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Queries', value: '14,205', status: '+12% this week', icon: Search },
          { label: 'Active Targets', value: '4,192', status: 'Tracking normally', icon: ScanLine },
          { label: 'Data Processed', value: '1.2 PB', status: 'Across 3 buckets', icon: Database },
          { label: 'System Health', value: '99.9%', status: 'All systems operational', icon: Activity },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold text-neutral uppercase tracking-widest">{stat.label}</p>
              <stat.icon className="w-4 h-4 text-secondary" />
            </div>
            <p className="text-3xl font-extrabold text-primary mb-1">{stat.value}</p>
            <p className="text-sm text-green-600 font-medium">{stat.status}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-white border border-border rounded-xl shadow-sm p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
        <Globe className="w-16 h-16 text-secondary/30 mb-4" />
        <h2 className="text-2xl font-bold text-primary mb-2">Workspace Overview</h2>
        <p className="text-neutral max-w-md">Select 'Spatial Query' to open the split-screen analysis engine, or 'Data Ingestion' to upload new imagery.</p>
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
      className="max-w-5xl mx-auto h-full flex flex-col pt-8"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">Data Ingestion</h2>
        <p className="text-neutral">Multi-modal upload pathways for specialized VLM analysis.</p>
      </div>

      {/* Ultra-smooth Sliding Tabs */}
      <div className="flex p-1 bg-white border border-border rounded-xl shadow-sm mb-8 relative self-start">
        {['single', 'bitemporal', 'fusion'].map((mode) => (
          <button
            key={mode}
            onClick={() => setIngestMode(mode)}
            className={`relative px-6 py-2.5 text-sm font-bold rounded-lg z-10 transition-colors ${
              ingestMode === mode ? 'text-white' : 'text-neutral hover:text-primary'
            }`}
          >
            {ingestMode === mode && (
              <motion.div 
                layoutId="ingestTab" 
                className="absolute inset-0 bg-primary rounded-lg -z-10 shadow-md"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {mode === 'single' && 'Single Image (VQA)'}
            {mode === 'bitemporal' && 'Bi-Temporal (Change)'}
            {mode === 'fusion' && 'Optical + SAR (Fusion)'}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        {/* Upload Zone */}
        <div className="flex-1 bg-white border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-secondary transition-colors group cursor-pointer" onClick={handleUploadClick}>
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-10 h-10 text-secondary" />
          </div>
          
          <AnimatePresence mode="wait">
            {!isUploading ? (
              <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="text-xl font-bold text-primary mb-2">
                  {ingestMode === 'bitemporal' ? 'Upload T1 and T2 Images' : ingestMode === 'fusion' ? 'Upload Optical & SAR Pair' : 'Upload Raster Image'}
                </h3>
                <p className="text-neutral mb-4">Drag and drop GeoTIFFs or click to browse.</p>
                <span className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-xs font-bold text-primary uppercase">
                  Up to 10GB / file
                </span>
              </motion.div>
            ) : (
              <motion.div key="uploading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-bold text-primary">Ingesting & Validating...</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Metadata Validation Panel */}
        <div className="w-80 bg-white border border-border rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-secondary" /> Metadata Validation
          </h3>
          <div className="space-y-4">
            {[
              { label: 'CRS / EPSG Check', status: isUploading ? 'checking' : 'pending' },
              { label: 'Resolution Analysis', status: isUploading ? 'checking' : 'pending' },
              { label: 'Format Verification', status: isUploading ? 'checking' : 'pending' },
              { label: 'Cloud Cover Assessment', status: isUploading ? 'checking' : 'pending' },
            ].map((check, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-neutral">{check.label}</span>
                {check.status === 'pending' && <span className="w-4 h-4 rounded-full border-2 border-gray-300" />}
                {check.status === 'checking' && <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderSpatialQuery = () => (
    <motion.div 
      key="spatial-query"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex"
    >
      {/* Left: Chat / Execution Panel */}
      <div className="w-[450px] bg-white border-r border-border flex flex-col z-20 shadow-xl">
        <div className="p-4 border-b border-border bg-gray-50/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-secondary/10 flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h2 className="font-bold text-primary text-sm">Query Engine</h2>
            <p className="text-xs text-neutral">VLM 4.0 Active</p>
          </div>
        </div>

        {/* Chat History / Trace Log */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
          
          {/* Welcome Message */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white border border-border p-4 rounded-xl shadow-sm">
              <p className="text-sm text-primary mb-2">Connected to <strong>Global Ports Monitor (T1 & T2)</strong>.</p>
              <p className="text-sm text-neutral">I can perform text-guided grounding, bi-temporal change detection, and scene captioning. What would you like to analyze?</p>
            </div>
          </div>

          {/* Active Query Simulation */}
          <AnimatePresence>
            {isQuerying && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-secondary" />
                </div>
                <div className="w-full">
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-primary font-medium mb-4">
                    {chatQuery}
                  </div>
                  
                  {/* Auditable Execution Trace */}
                  <div className="bg-white border border-border p-4 rounded-xl shadow-sm space-y-3">
                    <p className="text-xs font-bold text-neutral uppercase tracking-widest border-b border-border pb-2 mb-2">Execution Trace</p>
                    
                    <div className="flex items-center gap-3 text-sm">
                      {executionTrace >= 1 ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Loader2 className="w-4 h-4 text-secondary animate-spin" />}
                      <span className={executionTrace >= 1 ? "text-primary" : "text-secondary font-bold"}>Query Intent Classifier: Validating</span>
                    </div>
                    
                    {executionTrace >= 1 && (
                      <div className="flex items-center gap-3 text-sm">
                        {executionTrace >= 2 ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Loader2 className="w-4 h-4 text-secondary animate-spin" />}
                        <span className={executionTrace >= 2 ? "text-primary" : "text-secondary font-bold"}>Routing to Bi-Temporal Model</span>
                      </div>
                    )}
                    
                    {executionTrace >= 2 && (
                      <div className="flex items-center gap-3 text-sm">
                        {executionTrace >= 3 ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Loader2 className="w-4 h-4 text-secondary animate-spin" />}
                        <span className={executionTrace >= 3 ? "text-primary" : "text-secondary font-bold"}>Generating Spatial Change Mask (GeoJSON)</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {executionTrace === 3 && !isQuerying && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <div className="w-full space-y-3">
                  <div className="bg-white border border-border p-4 rounded-xl shadow-sm">
                    <p className="text-sm text-primary font-bold mb-2">Analysis Complete</p>
                    <p className="text-sm text-neutral">Detected 14 new structural modifications between T1 and T2. I've rendered the change masks on the map.</p>
                  </div>
                  
                  {/* Exportable Reports / Actions */}
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white border border-border py-2 rounded-lg text-xs font-bold text-primary hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm transition-colors">
                      <FileText className="w-3.5 h-3.5" /> PDF Report
                    </button>
                    <button className="flex-1 bg-white border border-border py-2 rounded-lg text-xs font-bold text-primary hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm transition-colors">
                      <FileJson className="w-3.5 h-3.5" /> .geojson
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-border">
          <form onSubmit={handleQuerySubmit} className="relative">
            <input 
              type="text"
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              placeholder="Ask anything about the map..."
              className="w-full bg-surface border border-border rounded-xl pl-4 pr-12 py-3.5 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all shadow-inner"
              disabled={isQuerying}
            />
            <button 
              type="submit"
              disabled={isQuerying}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Right: MapLibre Environment */}
      <div className="flex-1 relative bg-gray-200">
        <Map
          initialViewState={{ longitude: -122.414, latitude: 37.776, zoom: 12 }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          style={{ width: '100%', height: '100%' }}
        >
          <NavigationControl position="bottom-right" />
          
          {/* Mock AI Overlays rendered when analysis finishes */}
          <AnimatePresence>
            {executionTrace === 3 && !isQuerying && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/2 left-1/2 w-48 h-48 border-2 border-red-500 bg-red-500/20 -translate-x-1/2 -translate-y-1/2 rounded-lg pointer-events-none"
              >
                <div className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold uppercase">
                  Major Structural Change
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </Map>

        {/* Floating Layer Controls */}
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md border border-border rounded-xl shadow-xl p-4 w-64">
          <h3 className="text-xs font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Map Controls
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral">Optical Base</span>
              <div className="w-10 h-5 bg-secondary rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1" /></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral">SAR Overlay</span>
              <div className="w-10 h-5 bg-gray-200 rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-white rounded-full absolute left-1 top-1 shadow" /></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-neutral">AI Masks (GeoJSON)</span>
              <div className="w-10 h-5 bg-secondary rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1" /></div>
            </div>
          </div>
        </div>

        {/* Before/After Swipe Tool Overlay (Mock) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-border rounded-full shadow-xl px-6 py-3 flex items-center gap-4 cursor-ew-resize hover:bg-white transition-colors">
          <span className="text-xs font-bold text-neutral">T1 (2025)</span>
          <ArrowRightLeft className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-neutral">T2 (2026)</span>
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
      <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden mt-8">
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
      <p className="text-neutral max-w-md">This view is currently under active development.</p>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return renderOverview();
      case 'Data Ingestion': return renderDataIngestion();
      case 'Datasets': return renderDatasets();
      case 'Spatial Query': return renderSpatialQuery();
      case 'Map View': return renderSpatialQuery(); // Map View also opens the split screen for now
      case 'Settings': return renderPlaceholder('System Settings', Settings);
      default: return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-mesh font-sans overflow-hidden selection:bg-secondary/30">
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
        <header className="h-16 bg-surface/80 backdrop-blur-md border-b border-border flex items-center justify-between px-8 shrink-0 z-30">
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
        <div className={`flex-1 relative ${activeTab === 'Spatial Query' ? 'p-0 overflow-hidden' : 'p-8 overflow-auto'}`}>
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
