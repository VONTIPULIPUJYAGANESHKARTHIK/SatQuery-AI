import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, LayoutDashboard, Search, UploadCloud, Bell, Map as MapIcon, 
  Database, Settings, Activity, User, CreditCard, Key, LogOut,
  CheckCircle2, FileText, MessageSquare, Layers, ScanLine, 
  FileJson, ArrowRightLeft, FileCheck, Terminal
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
    
    setTimeout(() => setExecutionTrace(1), 500); 
    setTimeout(() => setExecutionTrace(2), 1500); 
    setTimeout(() => setExecutionTrace(3), 2500); 
    setTimeout(() => setIsQuerying(false), 3500); 
  };

  // --- View Renderers ---

  const renderOverview = () => (
    <motion.div 
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Queries', value: '14,205', status: '+12% wk', icon: Search },
          { label: 'Active Targets', value: '4,192', status: 'Tracking', icon: ScanLine },
          { label: 'Data Processed', value: '1.2 PB', status: '3 nodes', icon: Database },
          { label: 'System Health', value: '99.9%', status: 'Nominal', icon: Activity },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-lg shadow-xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-3 relative z-10">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <stat.icon className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-3xl font-mono text-slate-100 mb-1 relative z-10">{stat.value}</p>
            <p className="text-xs text-cyan-500/80 font-mono relative z-10">{stat.status}</p>
          </div>
        ))}
      </div>
      
      <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-xl p-8 text-center min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-slate-900" />
        <Globe className="w-16 h-16 text-slate-700 mb-6 relative z-10" />
        <h2 className="text-xl font-bold text-slate-200 mb-2 tracking-wide relative z-10">CORE WORKSPACE</h2>
        <p className="text-slate-400 max-w-md text-sm leading-relaxed relative z-10">
          Awaiting command input. Select 'Spatial Query' to initialize the AI analysis engine, or 'Data Ingestion' to pipeline new telemetry.
        </p>
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
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-100 tracking-wide flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" /> DATA_INGESTION_PIPELINE
        </h2>
        <p className="text-slate-400 text-sm mt-1">Multi-modal upload pathways for specialized VLM analysis.</p>
      </div>

      <div className="flex p-1 bg-slate-900 border border-slate-800 rounded-lg shadow-md mb-8 relative self-start">
        {['single', 'bitemporal', 'fusion'].map((mode) => (
          <button
            key={mode}
            onClick={() => setIngestMode(mode)}
            className={`relative px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md z-10 transition-colors ${
              ingestMode === mode ? 'text-slate-950' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {ingestMode === mode && (
              <motion.div 
                layoutId="ingestTab" 
                className="absolute inset-0 bg-cyan-400 rounded-md -z-10 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {mode === 'single' && 'Single (VQA)'}
            {mode === 'bitemporal' && 'Bi-Temporal'}
            {mode === 'fusion' && 'Opt+SAR'}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        <div className="flex-1 bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl p-12 text-center hover:border-cyan-500/50 hover:bg-cyan-950/10 transition-all group cursor-pointer" onClick={handleUploadClick}>
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner">
            <UploadCloud className="w-8 h-8 text-cyan-400" />
          </div>
          
          <AnimatePresence mode="wait">
            {!isUploading ? (
              <motion.div key="ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <h3 className="text-lg font-bold text-slate-200 mb-2">
                  {ingestMode === 'bitemporal' ? 'Upload T1 and T2 Images' : ingestMode === 'fusion' ? 'Upload Optical & SAR Pair' : 'Upload Raster Image'}
                </h3>
                <p className="text-slate-400 text-sm mb-4">Drag and drop GeoTIFFs or click to browse system files.</p>
                <span className="inline-block px-3 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  Max size: 10GB / file
                </span>
              </motion.div>
            ) : (
              <motion.div key="uploading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4 shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-widest">Ingesting & Validating...</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-xl p-6">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
            <FileCheck className="w-4 h-4 text-cyan-400" /> Pre-Flight Check
          </h3>
          <div className="space-y-4 font-mono text-xs">
            {[
              { label: 'CRS_EPSG_MATCH', status: isUploading ? 'checking' : 'pending' },
              { label: 'RES_ANALYSIS', status: isUploading ? 'checking' : 'pending' },
              { label: 'FMT_VERIFY', status: isUploading ? 'checking' : 'pending' },
              { label: 'CLOUD_COVER_EST', status: isUploading ? 'checking' : 'pending' },
            ].map((check, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className={`${check.status === 'checking' ? 'text-cyan-400' : 'text-slate-500'}`}>{check.label}</span>
                {check.status === 'pending' && <span className="text-slate-600">[WAIT]</span>}
                {check.status === 'checking' && <span className="text-cyan-400 animate-pulse">[PROC]</span>}
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
      <div className="w-[420px] bg-slate-900 border-r border-slate-800 flex flex-col z-20 shadow-2xl">
        <div className="p-4 border-b border-slate-800 bg-slate-950/50 flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h2 className="font-bold text-slate-200 text-xs tracking-widest uppercase">Query Engine</h2>
            <p className="text-[10px] font-mono text-cyan-500">SYS_VLM_4.0 [ACTIVE]</p>
          </div>
        </div>

        {/* Chat History / Trace Log */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-950/30 font-sans">
          
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 text-slate-400" />
            </div>
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-slate-200 mb-2">Connected to <span className="text-cyan-400 font-mono text-xs">GLOBAL_PORTS_MONITOR [T1, T2]</span></p>
              <p className="text-xs text-slate-400 leading-relaxed">System ready for text-guided grounding, bi-temporal change detection, and scene captioning. Input parameters below.</p>
            </div>
          </div>

          <AnimatePresence>
            {isQuerying && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                <div className="w-8 h-8 rounded bg-cyan-950 border border-cyan-900 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="w-full">
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-lg text-sm text-slate-200 mb-4">
                    {chatQuery}
                  </div>
                  
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-sm space-y-3 font-mono">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-2">Execution Trace</p>
                    
                    <div className="flex items-center gap-3 text-xs">
                      {executionTrace >= 1 ? <span className="text-cyan-400">[OK]</span> : <span className="text-slate-500 animate-pulse">[..]</span>}
                      <span className={executionTrace >= 1 ? "text-slate-300" : "text-cyan-400"}>Query Intent Classifier: Validating</span>
                    </div>
                    
                    {executionTrace >= 1 && (
                      <div className="flex items-center gap-3 text-xs">
                        {executionTrace >= 2 ? <span className="text-cyan-400">[OK]</span> : <span className="text-slate-500 animate-pulse">[..]</span>}
                        <span className={executionTrace >= 2 ? "text-slate-300" : "text-cyan-400"}>Routing to Bi-Temporal Model</span>
                      </div>
                    )}
                    
                    {executionTrace >= 2 && (
                      <div className="flex items-center gap-3 text-xs">
                        {executionTrace >= 3 ? <span className="text-cyan-400">[OK]</span> : <span className="text-slate-500 animate-pulse">[..]</span>}
                        <span className={executionTrace >= 3 ? "text-slate-300" : "text-cyan-400"}>Generating Spatial Mask (GeoJSON)</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {executionTrace === 3 && !isQuerying && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="w-full space-y-3">
                  <div className="bg-slate-800 border border-cyan-500/30 p-4 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.05)]">
                    <p className="text-xs font-mono text-cyan-400 mb-2">ANALYSIS_COMPLETE</p>
                    <p className="text-sm text-slate-300 leading-relaxed">Detected 14 structural anomalies between T1 and T2. Spatial change masks have been rendered to the visualizer.</p>
                  </div>
                  
                  <div className="flex gap-2 font-mono">
                    <button className="flex-1 bg-slate-800 border border-slate-700 py-2.5 rounded text-[10px] text-slate-300 hover:bg-slate-700 hover:text-cyan-400 flex items-center justify-center gap-2 transition-colors">
                      <FileText className="w-3.5 h-3.5" /> EXP_PDF
                    </button>
                    <button className="flex-1 bg-slate-800 border border-slate-700 py-2.5 rounded text-[10px] text-slate-300 hover:bg-slate-700 hover:text-cyan-400 flex items-center justify-center gap-2 transition-colors">
                      <FileJson className="w-3.5 h-3.5" /> EXP_GEOJSON
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <form onSubmit={handleQuerySubmit} className="relative">
            <input 
              type="text"
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              placeholder="Initialize command..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-4 pr-12 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
              disabled={isQuerying}
            />
            <button 
              type="submit"
              disabled={isQuerying}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-slate-800 text-cyan-400 rounded-md flex items-center justify-center hover:bg-slate-700 transition-colors disabled:opacity-50"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Right: MapLibre Environment */}
      <div className="flex-1 relative bg-slate-950">
        <Map
          initialViewState={{ longitude: -122.414, latitude: 37.776, zoom: 12 }}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          style={{ width: '100%', height: '100%' }}
        >
          <NavigationControl position="bottom-right" />
          
          <AnimatePresence>
            {executionTrace === 3 && !isQuerying && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/2 left-1/2 w-48 h-48 border border-cyan-400 bg-cyan-500/10 -translate-x-1/2 -translate-y-1/2 rounded pointer-events-none shadow-[0_0_30px_rgba(34,211,238,0.2)]"
              >
                <div className="absolute -top-5 left-0 bg-cyan-500 text-slate-950 text-[9px] px-1.5 py-0.5 font-bold uppercase font-mono">
                  TARGET_01
                </div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </Map>

        {/* Floating Layer Controls */}
        <div className="absolute top-6 right-6 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-lg shadow-2xl p-4 w-60">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
            <Layers className="w-3.5 h-3.5" /> RENDER_LAYERS
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">OPTICAL_BASE</span>
              <div className="w-8 h-4 bg-cyan-500/20 border border-cyan-500/50 rounded-full relative cursor-pointer"><div className="w-2 h-2 bg-cyan-400 rounded-full absolute right-1 top-[3px] shadow-[0_0_5px_rgba(34,211,238,0.8)]" /></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">SAR_OVERLAY</span>
              <div className="w-8 h-4 bg-slate-800 border border-slate-700 rounded-full relative cursor-pointer"><div className="w-2 h-2 bg-slate-500 rounded-full absolute left-1 top-[3px]" /></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-300">AI_MASKS_GEOJSON</span>
              <div className="w-8 h-4 bg-cyan-500/20 border border-cyan-500/50 rounded-full relative cursor-pointer"><div className="w-2 h-2 bg-cyan-400 rounded-full absolute right-1 top-[3px] shadow-[0_0_5px_rgba(34,211,238,0.8)]" /></div>
            </div>
          </div>
        </div>

        {/* Before/After Swipe */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full shadow-2xl px-5 py-2 flex items-center gap-4 cursor-ew-resize hover:bg-slate-800 transition-colors">
          <span className="text-[10px] font-mono text-slate-400">T1_2025</span>
          <div className="w-6 h-1 rounded-full bg-slate-700 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
          </div>
          <span className="text-[10px] font-mono text-cyan-400">T2_2026</span>
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
      className="max-w-7xl mx-auto pt-6"
    >
      <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
          <h2 className="text-sm font-bold text-slate-200 tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" /> ACTIVE_DATABASES
          </h2>
          <button className="bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 px-4 py-1.5 rounded text-xs font-mono transition-colors">
            + BIND_SOURCE
          </button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 text-slate-500 text-[10px] uppercase tracking-widest border-b border-slate-800 font-mono">
              <th className="p-4 font-normal">Dataset_Name</th>
              <th className="p-4 font-normal">Source_URI</th>
              <th className="p-4 font-normal">Vol_Size</th>
              <th className="p-4 font-normal">Last_Sync</th>
              <th className="p-4 font-normal text-right">Sys_Status</th>
            </tr>
          </thead>
          <tbody className="text-sm font-sans">
            {[
              { name: 'GLOBAL_PORTS_MON', source: 's3://satquery-ports', size: '2.4 TB', sync: '00:02:14 ago', status: 'ACTIVE' },
              { name: 'EU_CROP_YIELD_26', source: 'gs://agri-data-eu', size: '850 GB', sync: '01:14:00 ago', status: 'ACTIVE' },
              { name: 'HIST_TRAFFIC_AI', source: 'local/mnt/data', size: '42 GB', sync: '24:00:00 ago', status: 'SLEEP' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                <td className="p-4 text-slate-200 text-xs font-mono">{row.name}</td>
                <td className="p-4 text-slate-400 text-xs font-mono">{row.source}</td>
                <td className="p-4 text-slate-400 text-xs font-mono">{row.size}</td>
                <td className="p-4 text-slate-400 text-xs font-mono">{row.sync}</td>
                <td className="p-4 text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${row.status === 'ACTIVE' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
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
      <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center mb-6 shadow-inner">
        {React.createElement(icon, { className: "w-8 h-8 text-slate-500" })}
      </div>
      <h2 className="text-lg font-mono text-slate-300 mb-2 tracking-wide uppercase">{title}_MODULE</h2>
      <p className="text-slate-500 text-sm max-w-md">Module isolated. Enterprise configuration required to unlock telemetry.</p>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return renderOverview();
      case 'Data Ingestion': return renderDataIngestion();
      case 'Datasets': return renderDatasets();
      case 'Spatial Query': return renderSpatialQuery();
      case 'Map View': return renderSpatialQuery(); 
      case 'Settings': return renderPlaceholder('Settings', Settings);
      default: return renderOverview();
    }
  };

  return (
    <div className="flex h-screen bg-[#0B0F19] font-sans overflow-hidden selection:bg-cyan-500/30">
      {/* Sidebar Navigation */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-[#1E293B] border-r border-slate-800 flex flex-col z-20 shrink-0"
      >
        <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/30 rounded flex items-center justify-center">
            <Globe className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-black text-lg text-slate-100 tracking-widest uppercase">SatQuery</span>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1">
          {[
            { name: 'Overview', icon: LayoutDashboard },
            { name: 'Spatial Query', icon: Search },
            { name: 'Data Ingestion', icon: UploadCloud },
            { name: 'Datasets', icon: Database },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider rounded transition-all ${
                activeTab === item.name 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]' 
                  : 'text-slate-400 border border-transparent hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              <item.icon className={`w-4 h-4 ${activeTab === item.name ? 'text-cyan-400' : 'text-slate-500'}`} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button 
            onClick={() => setActiveTab('Settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs font-mono uppercase tracking-wider rounded transition-colors ${
              activeTab === 'Settings' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 border border-transparent hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Settings className={`w-4 h-4 ${activeTab === 'Settings' ? 'text-cyan-400' : 'text-slate-500'}`} />
            Settings
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-transparent z-10 relative">
        {/* Top Header */}
        <header className="h-16 bg-[#1E293B]/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-30">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <h1 className="text-xs font-mono text-slate-300 uppercase tracking-widest">ENV_{activeTab.replace(' ', '_')}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-cyan-400 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,1)]" />
            </button>
            
            {/* Profile Menu Container */}
            <div className="relative">
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 rounded bg-slate-800 border border-slate-700 text-slate-200 flex items-center justify-center text-xs font-mono cursor-pointer hover:border-cyan-500/50 hover:text-cyan-400 transition-colors"
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
                    className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl py-2 z-50 origin-top-right"
                  >
                    <div className="px-4 py-3 border-b border-slate-800">
                      <p className="text-sm font-bold text-slate-200">John Smith</p>
                      <p className="text-xs font-mono text-slate-500 truncate">john.smith@stratos.io</p>
                    </div>
                    
                    <div className="py-2">
                      <button className="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-cyan-400 flex items-center gap-2 transition-colors">
                        <User className="w-3.5 h-3.5" /> MY_PROFILE
                      </button>
                      <button className="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-cyan-400 flex items-center gap-2 transition-colors">
                        <CreditCard className="w-3.5 h-3.5" /> BILLING_USAGE
                      </button>
                      <button className="w-full text-left px-4 py-2 text-xs font-mono text-slate-300 hover:bg-slate-800 hover:text-cyan-400 flex items-center gap-2 transition-colors">
                        <Key className="w-3.5 h-3.5" /> API_KEYS
                      </button>
                    </div>
                    
                    <div className="border-t border-slate-800 pt-2">
                      <button 
                        onClick={() => navigate('/')}
                        className="w-full text-left px-4 py-2 text-xs font-mono text-red-400 hover:bg-slate-800 hover:text-red-300 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" /> SYS_SIGNOUT
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic View Content */}
        <div className={`flex-1 relative ${activeTab === 'Spatial Query' ? 'p-0 overflow-hidden' : 'p-6 overflow-auto'}`}>
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
