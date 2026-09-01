import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, LayoutDashboard, Search, UploadCloud, Bell, Map as MapIcon, 
  Database, Settings, Activity, User, CreditCard, Key, LogOut,
  CheckCircle2, FileText, MessageSquare, Layers, ScanLine, 
  FileJson, ArrowRightLeft, FileCheck, Loader2
} from 'lucide-react';
import Map, { NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

// --- Spring Physics Config for Apple HIG feel ---
const springTransition = { type: "spring", stiffness: 300, damping: 30 };
const springLayout = { type: "spring", stiffness: 400, damping: 35 };

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
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={springTransition}
      className="max-w-7xl mx-auto space-y-6 h-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Queries', value: '14,205', status: '+12% this week', icon: Search },
          { label: 'Active Targets', value: '4,192', status: 'Tracking normally', icon: ScanLine },
          { label: 'Data Processed', value: '1.2 PB', status: 'Across 3 buckets', icon: Database },
          { label: 'System Health', value: '99.9%', status: 'All systems operational', icon: Activity },
        ].map((stat, i) => (
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            transition={springTransition}
            key={i} 
            className="bg-white/70 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-semibold text-gray-500">{stat.label}</p>
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">{stat.value}</p>
            <p className="text-sm text-gray-500 font-medium">{stat.status}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <Globe className="w-10 h-10 text-blue-500" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3 tracking-tight">Workspace Overview</h2>
        <p className="text-gray-500 max-w-md text-lg leading-relaxed">
          Select <span className="font-semibold text-blue-600">Spatial Query</span> to open the analysis engine, or <span className="font-semibold text-blue-600">Data Ingestion</span> to upload new imagery.
        </p>
      </div>
    </motion.div>
  );

  const renderDataIngestion = () => (
    <motion.div 
      key="ingestion"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={springTransition}
      className="max-w-5xl mx-auto h-full flex flex-col pt-8"
    >
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-800 tracking-tight mb-3">Data Ingestion</h2>
        <p className="text-gray-500 text-lg">Upload imagery for specialized VLM analysis.</p>
      </div>

      <div className="flex p-1.5 bg-gray-100/50 backdrop-blur-xl border border-white/60 rounded-full shadow-inner mb-10 mx-auto">
        {['single', 'bitemporal', 'fusion'].map((mode) => (
          <button
            key={mode}
            onClick={() => setIngestMode(mode)}
            className={`relative px-8 py-3 text-sm font-semibold rounded-full z-10 transition-colors ${
              ingestMode === mode ? 'text-gray-800' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {ingestMode === mode && (
              <motion.div 
                layoutId="ingestTab" 
                className="absolute inset-0 bg-white rounded-full -z-10 shadow-sm border border-gray-200/50"
                transition={springLayout}
              />
            )}
            {mode === 'single' && 'Single Image'}
            {mode === 'bitemporal' && 'Bi-Temporal'}
            {mode === 'fusion' && 'Optical + SAR'}
          </button>
        ))}
      </div>

      <div className="flex gap-8">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={springTransition}
          className="flex-1 bg-white/60 backdrop-blur-2xl border-2 border-dashed border-gray-300 rounded-3xl p-16 text-center hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer shadow-[0_8px_30px_rgb(0,0,0,0.02)]" 
          onClick={handleUploadClick}
        >
          <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-8">
            <UploadCloud className="w-10 h-10 text-blue-500" />
          </div>
          
          <AnimatePresence mode="wait">
            {!isUploading ? (
              <motion.div key="ready" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={springTransition}>
                <h3 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">
                  {ingestMode === 'bitemporal' ? 'Upload T1 and T2 Images' : ingestMode === 'fusion' ? 'Upload Optical & SAR Pair' : 'Upload Raster Image'}
                </h3>
                <p className="text-gray-500 text-lg mb-6">Drag and drop GeoTIFFs or click to browse.</p>
                <span className="inline-block px-5 py-2 bg-gray-100/80 rounded-full text-sm font-semibold text-gray-600">
                  Maximum file size: 10GB
                </span>
              </motion.div>
            ) : (
              <motion.div key="uploading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={springTransition}>
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-6" />
                <h3 className="text-xl font-bold text-gray-800 tracking-tight">Validating Metadata...</h3>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="w-80 bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8">
          <h3 className="text-lg font-bold text-gray-800 tracking-tight mb-6 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-blue-500" /> Validation
          </h3>
          <div className="space-y-6">
            {[
              { label: 'Coordinate System Match', status: isUploading ? 'checking' : 'pending' },
              { label: 'Resolution Analysis', status: isUploading ? 'checking' : 'pending' },
              { label: 'Format Verification', status: isUploading ? 'checking' : 'pending' },
              { label: 'Cloud Cover Estimate', status: isUploading ? 'checking' : 'pending' },
            ].map((check, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className={`text-sm font-medium ${check.status === 'checking' ? 'text-blue-600' : 'text-gray-600'}`}>{check.label}</span>
                {check.status === 'pending' && <div className="w-5 h-5 rounded-full border-2 border-gray-200" />}
                {check.status === 'checking' && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
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
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={springTransition}
      className="absolute inset-0 flex rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
    >
      {/* Left: Chat / Execution Panel */}
      <div className="w-[450px] bg-white/80 backdrop-blur-3xl border-r border-white/60 flex flex-col z-20">
        <div className="p-6 border-b border-gray-200/50 flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-bold text-gray-800 text-lg tracking-tight">Assistant</h2>
            <p className="text-sm font-medium text-gray-500">VLM Engine</p>
          </div>
        </div>

        {/* Chat History / Trace Log */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0 shadow-sm">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="bg-gray-100/80 p-5 rounded-2xl rounded-tl-sm text-gray-800">
              <p className="text-sm font-medium mb-2">Connected to <span className="font-bold">Global Ports Monitor</span>.</p>
              <p className="text-sm text-gray-600 leading-relaxed">I can perform text-guided grounding, change detection, and scene captioning. What would you like to analyze?</p>
            </div>
          </div>

          <AnimatePresence>
            {isQuerying && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={springTransition} className="flex gap-4 flex-row-reverse">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="w-full flex flex-col items-end">
                  <div className="bg-blue-600 text-white p-4 rounded-2xl rounded-tr-sm text-sm font-medium shadow-sm mb-4">
                    {chatQuery}
                  </div>
                  
                  <div className="w-full bg-white/60 border border-gray-200/50 p-5 rounded-2xl shadow-sm space-y-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Internal Trace</p>
                    
                    <div className="flex items-center gap-3 text-sm">
                      {executionTrace >= 1 ? <CheckCircle2 className="w-5 h-5 text-blue-500" /> : <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
                      <span className={executionTrace >= 1 ? "text-gray-800 font-medium" : "text-gray-500"}>Validating query intent</span>
                    </div>
                    
                    {executionTrace >= 1 && (
                      <div className="flex items-center gap-3 text-sm">
                        {executionTrace >= 2 ? <CheckCircle2 className="w-5 h-5 text-blue-500" /> : <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
                        <span className={executionTrace >= 2 ? "text-gray-800 font-medium" : "text-gray-500"}>Routing to Spatial Model</span>
                      </div>
                    )}
                    
                    {executionTrace >= 2 && (
                      <div className="flex items-center gap-3 text-sm">
                        {executionTrace >= 3 ? <CheckCircle2 className="w-5 h-5 text-blue-500" /> : <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />}
                        <span className={executionTrace >= 3 ? "text-gray-800 font-medium" : "text-gray-500"}>Generating masks</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {executionTrace === 3 && !isQuerying && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={springTransition} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0 shadow-sm">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="w-full space-y-4">
                  <div className="bg-gray-100/80 p-5 rounded-2xl rounded-tl-sm text-gray-800 shadow-sm">
                    <p className="text-sm font-bold text-gray-900 mb-2">Analysis Complete</p>
                    <p className="text-sm text-gray-600 leading-relaxed">Detected 14 structural anomalies. I've rendered the change masks directly onto the map.</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 bg-white border border-gray-200 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm">
                      <FileText className="w-4 h-4 text-blue-500" /> PDF Report
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 bg-white border border-gray-200 py-3 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm">
                      <FileJson className="w-4 h-4 text-blue-500" /> GeoJSON
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-5 bg-white/80 border-t border-gray-200/50">
          <form onSubmit={handleQuerySubmit} className="relative">
            <input 
              type="text"
              value={chatQuery}
              onChange={(e) => setChatQuery(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-gray-100 border border-transparent rounded-2xl pl-5 pr-14 py-4 text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-inner"
              disabled={isQuerying}
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isQuerying}
              className="absolute right-2 top-2 bottom-2 aspect-square bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-sm disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
            </motion.button>
          </form>
        </div>
      </div>

      {/* Right: Map Environment */}
      <div className="flex-1 relative bg-gray-200">
        <Map
          initialViewState={{ longitude: -122.414, latitude: 37.776, zoom: 12 }}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
          style={{ width: '100%', height: '100%' }}
        >
          <NavigationControl position="bottom-right" />
          
          <AnimatePresence>
            {executionTrace === 3 && !isQuerying && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={springTransition}
                className="absolute top-1/2 left-1/2 w-48 h-48 border-2 border-blue-500 bg-blue-500/10 -translate-x-1/2 -translate-y-1/2 rounded-2xl pointer-events-none"
              >
                <div className="absolute -top-8 left-0 bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm text-gray-800 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                  Target Identified
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Map>

        {/* Floating Controls (Liquid Glass) */}
        <div className="absolute top-6 right-6 bg-white/70 backdrop-blur-3xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-5 w-64">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Layers className="w-4 h-4" /> Overlays
          </h3>
          <div className="space-y-4 text-sm font-medium">
            <div className="flex items-center justify-between">
              <span className="text-gray-800">Satellite Base</span>
              <div className="w-11 h-6 bg-blue-500 rounded-full relative cursor-pointer shadow-inner"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" /></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">SAR Layer</span>
              <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer shadow-inner"><div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 shadow-sm" /></div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-800">AI GeoJSON</span>
              <div className="w-11 h-6 bg-blue-500 rounded-full relative cursor-pointer shadow-inner"><div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" /></div>
            </div>
          </div>
        </div>

        {/* Before/After Swipe */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-3xl border border-white/60 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.1)] px-6 py-3 flex items-center gap-5 cursor-ew-resize">
          <span className="text-xs font-bold text-gray-500">2025 (T1)</span>
          <div className="w-10 h-1.5 rounded-full bg-gray-200 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border border-gray-300 rounded-full shadow-md" />
          </div>
          <span className="text-xs font-bold text-blue-600">2026 (T2)</span>
        </div>
      </div>
    </motion.div>
  );

  const renderDatasets = () => (
    <motion.div 
      key="datasets"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={springTransition}
      className="max-w-7xl mx-auto pt-6"
    >
      <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="p-8 border-b border-gray-200/50 flex justify-between items-center bg-white/40">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-500" /> Active Databases
          </h2>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-md"
          >
            Add Source
          </motion.button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200/50">
              <th className="p-6 font-semibold">Dataset Name</th>
              <th className="p-6 font-semibold">Source</th>
              <th className="p-6 font-semibold">Size</th>
              <th className="p-6 font-semibold">Last Synced</th>
              <th className="p-6 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              { name: 'Global Ports Monitor', source: 'AWS S3', size: '2.4 TB', sync: '2 mins ago', status: 'Active' },
              { name: 'EU Crop Yield 2026', source: 'Google Cloud Storage', size: '850 GB', sync: '1 hr ago', status: 'Active' },
              { name: 'Historical Traffic AI', source: 'Local Drive', size: '42 GB', sync: 'Yesterday', status: 'Paused' },
            ].map((row, i) => (
              <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-white/50 transition-colors">
                <td className="p-6 font-bold text-gray-800">{row.name}</td>
                <td className="p-6 text-gray-600">{row.source}</td>
                <td className="p-6 text-gray-600">{row.size}</td>
                <td className="p-6 text-gray-600">{row.sync}</td>
                <td className="p-6 text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
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

  const renderSettings = () => (
    <motion.div 
      key="settings"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={springTransition}
      className="max-w-4xl mx-auto pt-6"
    >
      <div className="bg-white/70 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-8">
        <div className="flex items-center gap-6 mb-8 border-b border-gray-200/50 pb-8">
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold shadow-inner">
            JS
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight">John Smith</h2>
            <p className="text-gray-500 text-lg">john@company.com</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-800 tracking-tight">Profile Settings</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Full Name</label>
              <input type="text" defaultValue="John Smith" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Email Address</label>
              <input type="email" defaultValue="john@company.com" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Organization</label>
              <input type="text" defaultValue="Acme Corp" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500" disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-600">Role</label>
              <input type="text" defaultValue="Lead Analyst" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500" disabled />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-blue-600 text-white px-8 py-3 rounded-xl text-sm font-semibold shadow-md">
              Save Changes
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview': return renderOverview();
      case 'Data Ingestion': return renderDataIngestion();
      case 'Datasets': return renderDatasets();
      case 'Spatial Query': return renderSpatialQuery();
      case 'Map View': return renderSpatialQuery(); 
      case 'Settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    // Soft gradient mesh background mimicking macOS/visionOS
    <div className="h-screen w-full bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-blue-50 font-sans overflow-hidden p-4 md:p-6 flex gap-6 box-border selection:bg-blue-200">
      
      {/* Sidebar Navigation - Floating Liquid Glass Panel */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={springTransition}
        className="w-72 bg-white/60 backdrop-blur-3xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col z-20 shrink-0 overflow-hidden"
      >
        <div className="p-8 flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-md">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-2xl text-gray-800 tracking-tight">SatQuery</span>
        </div>
        
        <nav className="flex-1 py-4 px-4 space-y-2">
          {[
            { name: 'Overview', icon: LayoutDashboard },
            { name: 'Spatial Query', icon: Search },
            { name: 'Data Ingestion', icon: UploadCloud },
            { name: 'Datasets', icon: Database },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 text-sm font-semibold rounded-2xl transition-all ${
                activeTab === item.name 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-gray-500 hover:bg-white/50 hover:text-gray-800'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.name ? 'text-blue-600' : 'text-gray-400'}`} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4">
          <button 
            onClick={() => setActiveTab('Settings')}
            className={`w-full flex items-center gap-4 px-5 py-3.5 text-sm font-semibold rounded-2xl transition-all ${
              activeTab === 'Settings' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:bg-white/50 hover:text-gray-800'
            }`}
          >
            <Settings className={`w-5 h-5 ${activeTab === 'Settings' ? 'text-blue-600' : 'text-gray-400'}`} />
            Settings
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 z-10 relative">
        
        {/* Top Header - Floating Element */}
        <header className="h-20 bg-white/60 backdrop-blur-3xl border border-white/50 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-between px-8 shrink-0 mb-6 z-30">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">{activeTab}</h1>
          
          <div className="flex items-center gap-6">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative p-2.5 text-gray-500 hover:text-gray-800 hover:bg-white rounded-full transition-colors shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </motion.button>
            
            <div className="w-px h-8 bg-gray-200/50" />
            
            {/* Profile Menu Container */}
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 cursor-pointer bg-white/50 hover:bg-white pl-2 pr-4 py-1.5 rounded-full border border-gray-200/50 transition-all shadow-sm"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                  JS
                </div>
                <span className="text-sm font-semibold text-gray-700">John S.</span>
              </motion.div>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={springTransition}
                    className="absolute right-0 mt-3 w-64 bg-white/80 backdrop-blur-3xl border border-white/60 rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.1)] py-3 z-50 origin-top-right overflow-hidden"
                  >
                    <div className="px-6 py-4 border-b border-gray-100">
                      <p className="text-base font-bold text-gray-800">John Smith</p>
                      <p className="text-sm text-gray-500 font-medium">john@company.com</p>
                    </div>
                    
                    <div className="py-2 px-3 space-y-1">
                      <button 
                        onClick={() => { setActiveTab('Settings'); setIsProfileOpen(false); }}
                        className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100/80 hover:text-gray-900 flex items-center gap-3 transition-colors"
                      >
                        <User className="w-4 h-4 text-gray-400" /> My Profile
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-2 px-3 mt-1">
                      <button 
                        onClick={() => navigate('/')}
                        className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
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
        <div className="flex-1 relative">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
