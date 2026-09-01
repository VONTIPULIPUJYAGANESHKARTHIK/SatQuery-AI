import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, AppWindow, ScanSearch, Earth, Library, 
  SlidersHorizontal, LogOut, Bell, User, ChevronRight, Activity, 
  CloudLightning, Layers, Sun, Moon, Database, MessageSquare, 
  Download, FileText, Cpu, CheckCircle2, Shield, Eye, RefreshCw, 
  Sliders, ShieldCheck, FileCheck, ArrowRightLeft, Sparkles, Terminal
} from 'lucide-react';
import { useTheme } from '../ThemeContext';

const springTransition = { type: "spring", stiffness: 400, damping: 30 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: springTransition }
};

const viewContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 0, scale: 0.98, transition: springTransition }
};

const viewItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springTransition }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Spatial Query');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  // Feature 11: Multi-Modal Ingestion Tabs
  const [ingestionMode, setIngestionMode] = useState('Single'); // 'Single' | 'Bi-Temporal' | 'Fusion'

  // Feature 7 & 1-6: Query Intent & Mode State
  const [selectedTask, setSelectedTask] = useState('VQA'); // 'VQA' | 'Grounding' | 'Captioning' | 'Change' | 'Fusion'
  const [promptText, setPromptText] = useState('Count commercial shipping vessels and classify land cover types.');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(true);

  // Feature 13 & 14: Interactive Map Controls
  const [swipePos, setSwipePos] = useState(50); // 0 - 100 percentage for Before/After swipe
  const [showOptical, setShowOptical] = useState(true);
  const [showSAR, setShowSAR] = useState(true);
  const [showMask, setShowMask] = useState(true);
  const [maskOpacity, setMaskOpacity] = useState(0.85);

  // Feature 9: Cryptographic Execution Trace Open State
  const [showAuditTrace, setShowAuditTrace] = useState(false);

  const navigation = [
    { name: 'Spatial Query', icon: ScanSearch },
    { name: 'Overview', icon: AppWindow },
    { name: 'Data Ingestion', icon: CloudLightning },
    { name: 'Map View', icon: Earth },
    { name: 'Datasets', icon: Library },
  ];

  const handleLogout = () => navigate('/');

  // Feature 15 & 16: Export Handlers
  const handleExportGeoJSON = () => {
    const geojson = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { id: "OBJ-9042", class: "Vessel", confidence: 0.984 },
          geometry: { type: "Polygon", coordinates: [[[-118.271, 33.748], [-118.265, 33.748], [-118.265, 33.752], [-118.271, 33.752], [-118.271, 33.748]]] }
        }
      ]
    };
    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `satquery_grounding_${Date.now()}.geojson`;
    a.click();
  };

  const handleExportReport = () => {
    const reportData = {
      title: "SatQuery AI Spatial Analysis Audit Report",
      timestamp: new Date().toISOString(),
      intent: selectedTask,
      ingestionMode,
      sha256_hash: "a4f89d309e12048569c7f3b890123ef456789a0123456789abcdef0123456789",
      confidence: "98.4%",
      summary: "Detected 14 commercial container vessels, 2 naval transports, and 0 structural changes between T1 (2024-01-10) and T2 (2024-08-20)."
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `satquery_report_${Date.now()}.json`;
    a.click();
  };

  // Feature 10: Split-Screen Spatial Intelligence Workspace
  const renderSpatialWorkspace = () => (
    <motion.div 
      key="spatial-workspace"
      variants={viewContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-[calc(100vh-8.5rem)] flex flex-col lg:flex-row gap-6 max-w-[1700px] mx-auto overflow-hidden"
    >
      {/* Left Panel: Controls, Chat, Metadata & Audit Trace */}
      <motion.div variants={viewItemVariants} className="w-full lg:w-[420px] xl:w-[460px] flex flex-col gap-5 h-full overflow-y-auto pr-1">
        
        {/* Ingestion & Task Selection Card */}
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2rem] p-6 shadow-lg transition-colors shrink-0">
          
          {/* Feature 11: Multi-Modal Upload Tabs */}
          <div className="mb-5">
            <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">Ingestion Mode</label>
            <div className="grid grid-cols-3 gap-2 bg-gray-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
              {[
                { id: 'Single', label: 'Single' },
                { id: 'Bi-Temporal', label: 'Bi-Temporal' },
                { id: 'Fusion', label: 'Opt+SAR' },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setIngestionMode(mode.id)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    ingestionMode === mode.id 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Feature 7 & 1-6: Specialist Model Task Selection */}
          <div className="mb-5">
            <label className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest block mb-2">Specialist Task</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'VQA', label: 'Single VQA', icon: MessageSquare },
                { id: 'Grounding', label: 'Text Grounding', icon: ScanSearch },
                { id: 'Captioning', label: 'Scene Caption', icon: FileText },
                { id: 'Change', label: 'Change Mask', icon: ArrowRightLeft },
                { id: 'Fusion', label: 'SAR Fusion', icon: Sparkles },
              ].map((task) => (
                <button
                  key={task.id}
                  onClick={() => {
                    setSelectedTask(task.id);
                    if (task.id === 'Change') setIngestionMode('Bi-Temporal');
                    if (task.id === 'Fusion') setIngestionMode('Fusion');
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                    selectedTask === task.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'bg-white/50 dark:bg-slate-800/40 border-gray-200 dark:border-white/5 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                  }`}
                >
                  <task.icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{task.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Input & Intent Classifier Badge */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Natural Language Prompt</label>
              
              {/* Feature 7: Intent Classifier HUD Badge */}
              <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-full text-[10px] font-mono font-bold flex items-center gap-1 border border-indigo-400/30">
                <Cpu className="w-3 h-3" /> ROUTED: {selectedTask.toUpperCase()}
              </span>
            </div>
            
            <textarea 
              rows="3" 
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Ask a question or enter entities to ground..."
              className="w-full px-4 py-3 bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-xs font-semibold resize-none shadow-inner dark:text-white"
            />

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setIsProcessing(true);
                setTimeout(() => { setIsProcessing(false); setHasAnalyzed(true); }, 1000);
              }}
              className="w-full bg-blue-600 text-white py-3.5 rounded-2xl text-xs font-extrabold shadow-lg hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
            >
              {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isProcessing ? 'Executing Spatial AI Inference...' : 'Run Specialist Model'}
            </motion.button>
          </div>
        </div>

        {/* Feature 8: Image Metadata Validator Panel */}
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2rem] p-5 shadow-lg transition-colors shrink-0">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-mono font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-500" /> Header Metadata Validator
            </h3>
            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold rounded-full border border-emerald-500/20">
              PASSED 100%
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono font-semibold">
            <div className="bg-gray-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-gray-100 dark:border-white/5">
              <span className="text-gray-400 block text-[9px]">PROJECTION</span>
              <span className="text-gray-800 dark:text-gray-200">EPSG:4326 (WGS84)</span>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-gray-100 dark:border-white/5">
              <span className="text-gray-400 block text-[9px]">RESOLUTION (GSD)</span>
              <span className="text-gray-800 dark:text-gray-200">0.5m / pixel</span>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-gray-100 dark:border-white/5">
              <span className="text-gray-400 block text-[9px]">MODALITY</span>
              <span className="text-blue-600 dark:text-blue-400">{ingestionMode === 'Fusion' ? 'Optical + SAR (Dual)' : 'Sentinel-2 COG'}</span>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-gray-100 dark:border-white/5">
              <span className="text-gray-400 block text-[9px]">IMAGE SIZE</span>
              <span className="text-gray-800 dark:text-gray-200">4096 x 4096 px</span>
            </div>
          </div>
        </div>

        {/* Feature 9: Auditable Execution Trace Log */}
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2rem] p-5 shadow-lg transition-colors shrink-0">
          <button 
            onClick={() => setShowAuditTrace(!showAuditTrace)}
            className="w-full flex items-center justify-between text-xs font-mono font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-500" /> Cryptographic Trace Log
            </span>
            <span>{showAuditTrace ? '[-]' : '[+]'}</span>
          </button>

          {showAuditTrace && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 space-y-2 font-mono text-[10px] bg-slate-950 text-emerald-400 p-3 rounded-xl border border-white/10 overflow-x-auto max-h-36 overflow-y-auto"
            >
              <p>[0.00s] INIT: Prompt received "{promptText}"</p>
              <p>[0.08s] INTENT: Routed to ModelSpecialist_{selectedTask.toUpperCase()}</p>
              <p>[0.21s] VALIDATE: EPSG:4326 validated (SHA256: e3b0c442...)</p>
              <p>[0.45s] RASTER: T1/T2 alignment warped successfully</p>
              <p>[0.89s] INFERENCE: 14 objects grounded with confidence &gt; 95%</p>
              <p>[1.02s] AUDIT COMPLETE: SHA256 signature generated</p>
            </motion.div>
          )}
        </div>

        {/* Feature 15 & 16: GIS Vector & Analytical Report Export Actions */}
        <div className="grid grid-cols-2 gap-3 shrink-0">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportGeoJSON}
            className="py-3 px-4 bg-emerald-600 text-white rounded-2xl text-xs font-bold shadow-md hover:bg-emerald-500 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" /> Export .GeoJSON
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportReport}
            className="py-3 px-4 bg-indigo-600 text-white rounded-2xl text-xs font-bold shadow-md hover:bg-indigo-500 transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" /> Export Report
          </motion.button>
        </div>

      </motion.div>

      {/* Right Panel: Feature 10 & 12-14 Interactive Spatial Map Viewport */}
      <motion.div 
        variants={viewItemVariants} 
        className="w-full lg:flex-1 bg-slate-950 rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white/10 flex flex-col justify-between p-6 select-none"
      >
        {/* Feature 13: Interactive Before/After Swipe Slider Layer Container */}
        <div className="absolute inset-0 overflow-hidden">
          
          {/* T2 (After) Image Layer - Base */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
            style={{ 
              backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/6/6b/Earth_Eastern_Hemisphere.jpg')`,
              opacity: showOptical ? 1 : 0
            }}
          />

          {/* T1 (Before) Swiped Image Layer (Clipped dynamically by swipePos) */}
          {ingestionMode === 'Bi-Temporal' && (
            <div 
              className="absolute inset-0 bg-cover bg-center border-r-2 border-white shadow-2xl"
              style={{ 
                backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg')`,
                width: `${swipePos}%`,
                opacity: showOptical ? 1 : 0
              }}
            >
              <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-white/20">
                T1: PRE-EVENT (2024-01-10)
              </div>
            </div>
          )}

          {/* Feature 6: Optical-SAR Fusion Radar Overlay Layer */}
          {showSAR && (
            <div 
              className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/b/ba/The_earth_at_night.jpg')] bg-cover bg-center mix-blend-color-dodge opacity-40 pointer-events-none" 
            />
          )}

          {/* Feature 2, 5 & 12: AI Grounding Bounding Box & Spatial Change Mask Overlay */}
          {showMask && (
            <div 
              className="absolute inset-0 pointer-events-none flex items-center justify-center p-12"
              style={{ opacity: maskOpacity }}
            >
              {selectedTask === 'Change' ? (
                /* Feature 5: Spatial Change Mask Overlay */
                <div className="w-full h-full border-4 border-rose-500/80 bg-rose-500/20 rounded-3xl backdrop-blur-[2px] flex items-center justify-center relative shadow-[0_0_50px_rgba(244,63,94,0.4)]">
                  <div className="absolute top-4 left-4 bg-rose-600 text-white font-mono text-[11px] font-bold px-3 py-1 rounded-full">
                    PIXEL CHANGE MASK DETECTED [+14.2% MODIFIED ZONES]
                  </div>
                </div>
              ) : (
                /* Feature 2: Grounding Bounding Box Overlay */
                <div className="w-72 h-48 border-2 border-dashed border-emerald-400 bg-emerald-500/10 rounded-2xl relative shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse flex flex-col justify-between p-3">
                  <div className="bg-emerald-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded w-max">
                    GROUNDED: COMMERCIAL VESSEL (98.4%)
                  </div>
                  <div className="text-[9px] font-mono text-emerald-300 bg-slate-900/80 p-1.5 rounded border border-emerald-500/30">
                    BBOX: [33.748° N, -118.271° W]
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Feature 13: Draggable Swipe Bar Handle */}
          {ingestionMode === 'Bi-Temporal' && (
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={swipePos} 
              onChange={(e) => setSwipePos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          )}

          {/* Visual Swipe Handle Divider */}
          {ingestionMode === 'Bi-Temporal' && (
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,1)] pointer-events-none z-20 flex items-center justify-center"
              style={{ left: `${swipePos}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg font-bold text-xs">
                ↔
              </div>
            </div>
          )}
        </div>

        {/* Viewport Header Controls HUD */}
        <div className="relative z-10 flex justify-between items-center bg-slate-900/85 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              SENTINEL-2 / RADARSAT-2 FUSION CANVAS
            </span>
          </div>

          <div className="flex items-center gap-3">
            {ingestionMode === 'Bi-Temporal' && (
              <span className="text-[11px] font-mono text-blue-300 font-bold bg-blue-900/40 px-3 py-1 rounded-lg border border-blue-500/30">
                SWIPE POS: {swipePos}%
              </span>
            )}
            <span className="px-2.5 py-1 bg-slate-800 text-gray-300 text-xs font-mono rounded-lg border border-white/10">
              EPSG:4326
            </span>
          </div>
        </div>

        {/* Feature 14: Layer Controls & Opacity Floating Bar */}
        <div className="relative z-10 flex justify-between items-center bg-slate-900/85 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-xl gap-4">
          
          {/* Layer Visibility Toggles */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowOptical(!showOptical)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                showOptical ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-800 text-gray-400 border-white/10'
              }`}
            >
              Optical
            </button>
            <button 
              onClick={() => setShowSAR(!showSAR)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                showSAR ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-gray-400 border-white/10'
              }`}
            >
              SAR Radar
            </button>
            <button 
              onClick={() => setShowMask(!showMask)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                showMask ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-gray-400 border-white/10'
              }`}
            >
              AI Mask
            </button>
          </div>

          {/* Mask Opacity Slider */}
          <div className="flex items-center gap-3 text-xs font-mono text-gray-300">
            <span>MASK OPACITY</span>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05"
              value={maskOpacity}
              onChange={(e) => setMaskOpacity(Number(e.target.value))}
              className="w-24 accent-blue-500"
            />
            <span className="w-8 text-right">{Math.round(maskOpacity * 100)}%</span>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );

  const renderOverview = () => (
    <motion.div 
      key="overview"
      variants={viewContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 max-w-7xl mx-auto"
    >
      <motion.div variants={viewItemVariants} className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tighter">Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 font-semibold mt-1">System status and recent analysis runs.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('Spatial Query')}
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-lg hover:bg-blue-500 transition-all flex items-center gap-2 group"
        >
          Open Workspace <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Bento Box Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          variants={viewItemVariants}
          whileHover={{ y: -4 }}
          className="md:col-span-2 bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-8 rounded-[2.5rem] shadow-lg transition-colors relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10">
              <ScanSearch className="w-7 h-7 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold">
              +14.8%
            </span>
          </div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-tight">Total Inferences Executed</h3>
          <p className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mt-2">1,492</p>
        </motion.div>

        <motion.div 
          variants={viewItemVariants}
          whileHover={{ y: -4 }}
          className="md:col-span-1 bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-8 rounded-[2.5rem] shadow-lg transition-colors flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-[1.25rem] flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10 mb-4">
              <Library className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-tight">Data Indexed</h3>
          </div>
          <p className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mt-2">52.8 <span className="text-xl text-gray-400">TB</span></p>
        </motion.div>

        <motion.div 
          variants={viewItemVariants}
          whileHover={{ y: -4 }}
          className="md:col-span-1 bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-8 rounded-[2.5rem] shadow-lg transition-colors flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-[1.25rem] flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10 mb-4">
              <Activity className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-tight">Specialist Models</h3>
          </div>
          <p className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mt-2">16 <span className="text-xl text-gray-400">active</span></p>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderDataIngestion = () => (
    <motion.div key="ingestion" variants={viewContainerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-4xl mx-auto pt-6">
      <motion.div variants={viewItemVariants} className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2.5rem] shadow-xl p-10 transition-colors">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tighter mb-8">Multi-Modal Ingestion Portal</h2>
        
        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { id: 'Single', label: 'Single Raster (VQA/Grounding)' },
            { id: 'Bi-Temporal', label: 'Bi-Temporal Pair (T1 & T2)' },
            { id: 'Fusion', label: 'Optical + SAR Dual Ingestion' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setIngestionMode(mode.id)}
              className={`p-4 rounded-2xl text-xs font-bold border transition-all text-center ${
                ingestionMode === mode.id
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                  : 'bg-white/50 dark:bg-slate-800/40 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-[2rem] p-16 flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800/80 transition-colors cursor-pointer group">
          <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10 mb-4 group-hover:scale-110 transition-transform">
            <CloudLightning className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Drop {ingestionMode} Satellite Assets Here</h3>
          <p className="text-gray-500 dark:text-gray-400 font-semibold text-xs max-w-sm">Supports GeoTIFF, COG, Sentinel-1/2, and RADARSAT-2 data files.</p>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderDatasets = () => (
    <motion.div key="datasets" variants={viewContainerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-7xl mx-auto">
      <motion.div variants={viewItemVariants} className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tighter">Datasets</h1>
          <p className="text-gray-500 dark:text-gray-400 font-semibold mt-1">Manage connected S3/GCS buckets and raster archives.</p>
        </div>
      </motion.div>

      <motion.div variants={viewItemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Global Sentinel-2 COG', type: 'Live Stream', size: '2.4 PB', status: 'Active' },
          { name: 'Port of Long Beach SAR', type: 'Uploaded', size: '1.2 GB', status: 'Indexed' },
          { name: 'Amazon Rainforest Bi-Temporal', type: 'AWS S3 Sync', size: '400 GB', status: 'Syncing' },
        ].map((ds, i) => (
          <div key={i} className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-8 rounded-[2.5rem] shadow-lg">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                <Library className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs font-bold">
                {ds.status}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">{ds.name}</h3>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 font-semibold">
              <span>{ds.type}</span>
              <span>{ds.size}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );

  const renderProfile = () => (
    <motion.div key="profile" variants={viewContainerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-3xl mx-auto pt-10">
      <motion.div variants={viewItemVariants} className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2rem] shadow-xl p-10 flex flex-col items-center text-center">
        <div className="w-28 h-28 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-4xl font-black mb-6 shadow-sm border border-blue-200 dark:border-blue-800/50">
          JS
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">John Smith</h2>
        <p className="text-gray-500 dark:text-gray-400 font-semibold mb-8">Lead Geospatial Analyst • john.smith@satquery.ai</p>
        
        <div className="w-full max-w-md space-y-3">
          <button className="w-full bg-blue-600 text-white px-6 py-3.5 rounded-xl font-bold shadow hover:bg-blue-500 transition-colors">
            Edit Profile
          </button>
          <button 
            onClick={handleLogout}
            className="w-full bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 border border-gray-200 dark:border-white/10 px-6 py-3.5 rounded-xl font-bold shadow-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderSettings = () => (
    <motion.div key="settings" variants={viewContainerVariants} initial="hidden" animate="visible" exit="exit" className="max-w-3xl mx-auto pt-10">
      <motion.div variants={viewItemVariants} className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2rem] shadow-xl p-8">
        
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Settings</h2>
        <p className="text-gray-500 dark:text-gray-400 font-semibold mb-8">Manage your workspace preferences.</p>

        <div className="space-y-4">
          <div className="bg-white/50 dark:bg-slate-800/40 border border-gray-100 dark:border-white/5 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Toggle dark appearance</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="bg-white/50 dark:bg-slate-800/40 border border-gray-100 dark:border-white/5 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Notifications</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Enable alert sounds and popups</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" defaultChecked className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="bg-white/50 dark:bg-slate-800/40 border border-gray-100 dark:border-white/5 p-5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">Language</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">Choose interface language</p>
            </div>
            <select className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 text-sm font-bold rounded-lg px-3 py-1.5 outline-none">
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );

  // Feature: Full-Screen Map Viewport for "Map View" tab
  const renderMapView = () => (
    <motion.div 
      key="map-view"
      variants={viewContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-[calc(100vh-8.5rem)] w-full max-w-[1920px] mx-auto overflow-hidden relative rounded-[2.5rem] shadow-2xl border border-white/10 select-none bg-slate-950"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* Base Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
          style={{ 
            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/6/6b/Earth_Eastern_Hemisphere.jpg')`,
            opacity: showOptical ? 1 : 0
          }}
        />

        {/* T1 (Before) Swiped Image Layer (Clipped dynamically by swipePos) */}
        {ingestionMode === 'Bi-Temporal' && (
          <div 
            className="absolute inset-0 bg-cover bg-center border-r-2 border-white shadow-2xl"
            style={{ 
              backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg')`,
              width: `${swipePos}%`,
              opacity: showOptical ? 1 : 0
            }}
          >
            <div className="absolute top-4 left-4 bg-slate-900/80 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-white/20">
              T1: PRE-EVENT (2024-01-10)
            </div>
          </div>
        )}

        {/* Optical-SAR Fusion Radar Overlay Layer */}
        {showSAR && (
          <div 
            className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/b/ba/The_earth_at_night.jpg')] bg-cover bg-center mix-blend-color-dodge opacity-40 pointer-events-none" 
          />
        )}

        {/* AI Grounding Bounding Box & Spatial Change Mask Overlay */}
        {showMask && (
          <div 
            className="absolute inset-0 pointer-events-none flex items-center justify-center p-12"
            style={{ opacity: maskOpacity }}
          >
            {selectedTask === 'Change' ? (
              <div className="w-full h-full border-4 border-rose-500/80 bg-rose-500/20 rounded-3xl backdrop-blur-[2px] flex items-center justify-center relative shadow-[0_0_50px_rgba(244,63,94,0.4)]">
                <div className="absolute top-4 left-4 bg-rose-600 text-white font-mono text-[11px] font-bold px-3 py-1 rounded-full">
                  PIXEL CHANGE MASK DETECTED [+14.2% MODIFIED ZONES]
                </div>
              </div>
            ) : (
              <div className="w-72 h-48 border-2 border-dashed border-emerald-400 bg-emerald-500/10 rounded-2xl relative shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse flex flex-col justify-between p-3">
                <div className="bg-emerald-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded w-max">
                  GROUNDED: COMMERCIAL VESSEL (98.4%)
                </div>
                <div className="text-[9px] font-mono text-emerald-300 bg-slate-900/80 p-1.5 rounded border border-emerald-500/30">
                  BBOX: [33.748° N, -118.271° W]
                </div>
              </div>
            )}
          </div>
        )}

        {/* Draggable Swipe Bar Handle */}
        {ingestionMode === 'Bi-Temporal' && (
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={swipePos} 
            onChange={(e) => setSwipePos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
        )}

        {/* Visual Swipe Handle Divider */}
        {ingestionMode === 'Bi-Temporal' && (
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,1)] pointer-events-none z-20 flex items-center justify-center"
            style={{ left: `${swipePos}%` }}
          >
            <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-lg font-bold text-xs">
              ↔
            </div>
          </div>
        )}
      </div>

      {/* Viewport Header Controls HUD */}
      <div className="absolute top-6 left-6 right-6 z-10 flex justify-between items-center bg-slate-900/85 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            FULLSCREEN IMMERSIVE MAP
          </span>
        </div>

        <div className="flex items-center gap-3">
          {ingestionMode === 'Bi-Temporal' && (
            <span className="text-[11px] font-mono text-blue-300 font-bold bg-blue-900/40 px-3 py-1 rounded-lg border border-blue-500/30">
              SWIPE POS: {swipePos}%
            </span>
          )}
          <span className="px-2.5 py-1 bg-slate-800 text-gray-300 text-xs font-mono rounded-lg border border-white/10">
            EPSG:4326
          </span>
        </div>
      </div>

      {/* Layer Controls & Opacity Floating Bar */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center bg-slate-900/85 backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-xl gap-6">
        {/* Layer Visibility Toggles */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowOptical(!showOptical)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              showOptical ? 'bg-blue-600 text-white border-blue-400' : 'bg-slate-800 text-gray-400 border-white/10'
            }`}
          >
            Optical
          </button>
          <button 
            onClick={() => setShowSAR(!showSAR)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              showSAR ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-gray-400 border-white/10'
            }`}
          >
            SAR Radar
          </button>
          <button 
            onClick={() => setShowMask(!showMask)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
              showMask ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-gray-400 border-white/10'
            }`}
          >
            AI Mask
          </button>
        </div>

        <div className="w-px h-6 bg-white/20" />

        {/* Mask Opacity Slider */}
        <div className="flex items-center gap-3 text-xs font-mono text-gray-300">
          <span>MASK OPACITY</span>
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.05"
            value={maskOpacity}
            onChange={(e) => setMaskOpacity(Number(e.target.value))}
            className="w-24 accent-blue-500"
          />
          <span className="w-8 text-right">{Math.round(maskOpacity * 100)}%</span>
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Spatial Query': return renderSpatialWorkspace();
      case 'Map View': return renderMapView();
      case 'Overview': return renderOverview();
      case 'Data Ingestion': return renderDataIngestion();
      case 'Datasets': return renderDatasets();
      case 'Settings': return renderSettings();
      case 'My Profile': return renderProfile();
      default: return renderSpatialWorkspace();
    }
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans flex antialiased selection:bg-blue-200 dark:selection:bg-blue-900 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      
      {/* Sidebar Navigation */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={springTransition}
        className="w-[19rem] border-r border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-900/50 backdrop-blur-3xl flex flex-col z-20 shadow-xl transition-colors duration-500 shrink-0"
      >
        <div className="p-8 pb-6">
          <div className="flex items-center gap-4 mb-10 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-blue-600 rounded-[1rem] flex items-center justify-center shadow-lg">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter text-gray-900 dark:text-white">SatQuery</span>
          </div>
          
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 px-3">Workspace</p>
          
          <motion.nav variants={containerVariants} initial="hidden" animate="visible" className="space-y-1.5">
            {navigation.map((item) => (
              <motion.button
                key={item.name}
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-[1.25rem] text-sm font-bold transition-all ${
                  activeTab === item.name
                    ? 'bg-white dark:bg-slate-800 shadow-md border border-gray-100 dark:border-white/10 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border border-transparent'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </motion.button>
            ))}
          </motion.nav>
        </div>

        <div className="mt-auto p-8 pt-4">
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 px-3">System</p>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-1.5">
            <motion.button 
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab('Settings')}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-[1.25rem] text-sm font-bold transition-all ${
                activeTab === 'Settings'
                  ? 'bg-white dark:bg-slate-800 shadow-md border border-gray-100 dark:border-white/10 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" /> Settings
            </motion.button>
            <motion.button 
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-[1.25rem] text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors border border-transparent"
            >
              <LogOut className="w-5 h-5" /> Logout
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springTransition}
          className="h-[5.5rem] bg-white/40 dark:bg-slate-900/50 backdrop-blur-2xl border-b border-white/60 dark:border-white/10 flex items-center justify-between px-10 shadow-sm relative z-10 transition-colors duration-500 shrink-0"
        >
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold text-gray-800 dark:text-white tracking-tighter">{activeTab}</div>
            <span className="px-2.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-mono font-bold rounded-full border border-blue-400/30">
              V4.2 AI SPECIALIST
            </span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={toggleTheme} className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900" />
            </button>
            
            <div className="relative ml-2">
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none">
                <div className="text-right hidden md:block">
                  <div className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">John Smith</div>
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Stratos Corp</div>
                </div>
                <div className="w-11 h-11 rounded-[1rem] bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shadow-sm">
                  JS
                </div>
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-56 bg-white/90 dark:bg-slate-800/90 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden z-50 p-2"
                  >
                    <button onClick={() => { setActiveTab('My Profile'); setIsProfileOpen(false); }} className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-white/10 flex items-center gap-3">
                      <User className="w-4 h-4" /> Identity Profile
                    </button>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 rounded-2xl text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-3">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.header>

        {/* Dynamic View Container */}
        <div className="flex-1 overflow-hidden p-6 relative z-0">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
