import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, AppWindow, ScanSearch, Earth, Library, 
  SlidersHorizontal, LogOut, Bell, User, ChevronRight, Activity, 
  CloudLightning, Layers, Sun, Moon, Database
} from 'lucide-react';
import { useTheme } from '../ThemeContext';

const springTransition = { type: "spring", stiffness: 400, damping: 30 };

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: springTransition 
  }
};

const viewContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  },
  exit: { opacity: 0, scale: 0.98, transition: springTransition }
};

const viewItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: springTransition 
  }
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Overview', icon: AppWindow },
    { name: 'Spatial Query', icon: ScanSearch },
    { name: 'Data Ingestion', icon: CloudLightning },
    { name: 'Map View', icon: Earth },
    { name: 'Datasets', icon: Library },
  ];

  const handleLogout = () => navigate('/');

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
          className="bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_20px_rgba(37,99,235,0.5)] transition-all flex items-center gap-2 group"
        >
          New Query <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Bento Box Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Large Primary Widget */}
        <motion.div 
          variants={viewItemVariants}
          whileHover={{ y: -4 }}
          className="md:col-span-2 bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-8 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] transition-colors relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 text-blue-500/5 dark:text-blue-500/10 pointer-events-none">
            <ScanSearch className="w-64 h-64" />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10">
                <ScanSearch className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-bold shadow-inner">
                +12.4%
              </span>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-tight">Total Processed Queries</h3>
            <p className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter mt-2">1,284</p>
          </div>
        </motion.div>

        {/* Medium Secondary Widget */}
        <motion.div 
          variants={viewItemVariants}
          whileHover={{ y: -4 }}
          className="md:col-span-1 bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-8 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] transition-colors flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-[1.25rem] flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10 mb-4">
              <Library className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-tight">Data Indexed</h3>
          </div>
          <p className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mt-2">45.2 <span className="text-xl text-gray-400">TB</span></p>
        </motion.div>

        {/* Medium Secondary Widget */}
        <motion.div 
          variants={viewItemVariants}
          whileHover={{ y: -4 }}
          className="md:col-span-1 bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-8 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] transition-colors flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-[1.25rem] flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10 mb-4">
              <Activity className="w-6 h-6 text-rose-600 dark:text-rose-400" />
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-tight">Active Models</h3>
          </div>
          <p className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter mt-2">8 <span className="text-xl text-gray-400">nodes</span></p>
        </motion.div>
      </div>

      <motion.div 
        variants={viewItemVariants}
        className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-colors"
      >
        <div className="p-8 border-b border-gray-200/50 dark:border-white/10 flex justify-between items-center bg-white/30 dark:bg-transparent">
          <h3 className="font-extrabold text-xl text-gray-900 dark:text-white tracking-tighter">Recent Analysis Executions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 font-bold tracking-tight border-b border-gray-200/50 dark:border-white/10">
              <tr>
                <th className="px-8 py-5">Natural Language Query</th>
                <th className="px-8 py-5">Target Model</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-semibold text-gray-700 dark:text-gray-300">
              {[
                { q: "Count shipping containers in Port of Long Beach", m: "Object Detection v4", s: "Completed", t: "2 mins ago" },
                { q: "Highlight deforestation in Amazon sector 7G", m: "Change Detection (SAR)", s: "Processing", t: "15 mins ago" },
                { q: "Identify new construction in Dubai marina", m: "Zero-Shot Vis", s: "Completed", t: "1 hour ago" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/80 dark:hover:bg-white/5 transition-colors">
                  <td className="px-8 py-5 dark:text-gray-100">{row.q}</td>
                  <td className="px-8 py-5 text-gray-500 dark:text-gray-400">{row.m}</td>
                  <td className="px-8 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-inner ${
                      row.s === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse'
                    }`}>
                      {row.s}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-gray-400 dark:text-gray-500">{row.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderSpatialQuery = () => (
    <motion.div 
      key="spatial-query"
      variants={viewContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="h-full flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto"
    >
      <motion.div variants={viewItemVariants} className="w-full lg:w-1/3 flex flex-col gap-6">
        <div className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] p-8 flex-1 flex flex-col transition-colors">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tighter">Query Configuration</h2>
          <div className="space-y-6 flex-1">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Natural Language Prompt</label>
              <textarea 
                rows="4" 
                placeholder="e.g. Find all military aircraft on the tarmac..."
                className="w-full px-5 py-4 bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-semibold resize-none shadow-sm dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Source Dataset</label>
              <select className="w-full px-5 py-4 bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-semibold shadow-sm dark:text-white">
                <option>Global Sentinel-2 (Recent)</option>
                <option>Custom: Port of LA (High Res)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Execution Model</label>
              <select className="w-full px-5 py-4 bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-2xl focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-semibold shadow-sm dark:text-white">
                <option>Auto-Select Pipeline (Recommended)</option>
                <option>Zero-Shot Vision Language Model</option>
              </select>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl text-base font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_15px_rgba(37,99,235,0.3)] mt-8"
          >
            Execute Analysis
          </motion.button>
        </div>
      </motion.div>
      <motion.div variants={viewItemVariants} className="w-full lg:w-2/3 bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden relative min-h-[500px] transition-colors">
        <div className="absolute inset-0 bg-blue-50/50 dark:bg-slate-800/30 flex flex-col items-center justify-center p-8 text-center">
          <Earth className="w-20 h-20 text-blue-200 dark:text-blue-900/50 mb-6" />
          <h3 className="text-2xl font-extrabold text-gray-400 dark:text-gray-600 tracking-tighter">Spatial Canvas</h3>
          <p className="text-gray-400 dark:text-gray-600 text-sm mt-2 max-w-sm font-semibold">MapLibre GL context will initialize here upon query execution.</p>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderDataIngestion = () => (
    <motion.div 
      key="ingestion"
      variants={viewContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-4xl mx-auto pt-6"
    >
      <motion.div variants={viewItemVariants} className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden p-10 transition-colors">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tighter mb-8">Data Ingestion</h2>
        
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-[2rem] p-20 flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800/80 transition-colors cursor-pointer group">
          <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <CloudLightning className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">Drop Assets Here</h3>
          <p className="text-gray-500 dark:text-gray-400 font-semibold text-sm max-w-sm">Upload GeoTIFF, SAR, or Optical imagery. Maximum file size 10GB per asset.</p>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-white dark:bg-slate-700 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 rounded-full font-bold shadow-sm hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            Browse Local Files
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderDatasets = () => (
    <motion.div 
      key="datasets"
      variants={viewContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-7xl mx-auto"
    >
      <motion.div variants={viewItemVariants} className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tighter">Datasets</h1>
          <p className="text-gray-500 dark:text-gray-400 font-semibold mt-1">Manage your connected buckets and uploaded imagery.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white px-6 py-3 rounded-full text-sm font-bold shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2"
        >
          <Database className="w-4 h-4" /> Link New Source
        </motion.button>
      </motion.div>

      <motion.div variants={viewItemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Global Sentinel-2', type: 'Live Connection', size: '2.4 PB', status: 'Active' },
          { name: 'Port of LA (High Res)', type: 'Uploaded', size: '1.2 GB', status: 'Indexed' },
          { name: 'Amazon Basin SAR', type: 'AWS S3 Sync', size: '400 GB', status: 'Syncing' },
        ].map((ds, i) => (
          <motion.div 
            key={i} 
            whileHover={{ y: -4 }}
            className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-8 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] transition-colors"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center">
                <Library className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-inner ${
                ds.status === 'Active' || ds.status === 'Indexed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse'
              }`}>
                {ds.status}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">{ds.name}</h3>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 font-semibold">
              <span>{ds.type}</span>
              <span>{ds.size}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  const renderProfile = () => (
    <motion.div 
      key="profile"
      variants={viewContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-4xl mx-auto pt-6"
    >
      <motion.div variants={viewItemVariants} className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden p-10 transition-colors">
        <div className="flex items-center gap-6 mb-10 border-b border-gray-200/50 dark:border-white/10 pb-10">
          <div className="w-24 h-24 rounded-[2rem] bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-4xl font-black shadow-[inset_0_1px_1px_rgba(0,0,0,0.05),0_4px_10px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-white/10">
            JS
          </div>
          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tighter">John Smith</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold mt-1">john@company.com</p>
          </div>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Identity Details</h3>
          
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Full Name</label>
              <input type="text" defaultValue="John Smith" className="w-full bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-semibold focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm dark:text-white" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
              <input type="email" defaultValue="john@company.com" className="w-full bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm font-semibold focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm dark:text-white" />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Organization</label>
              <input type="text" defaultValue="Acme Corp" className="w-full bg-gray-50/50 dark:bg-slate-900/50 border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-400 dark:text-gray-500" disabled />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Clearance Role</label>
              <input type="text" defaultValue="Lead Analyst" className="w-full bg-gray-50/50 dark:bg-slate-900/50 border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm font-semibold text-gray-400 dark:text-gray-500" disabled />
            </div>
          </div>

          <div className="pt-8 flex justify-end">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }} className="bg-blue-600 text-white px-8 py-4 rounded-full text-sm font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_15px_rgba(37,99,235,0.3)]">
              Update Identity
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  const renderSettings = () => (
    <motion.div 
      key="settings"
      variants={viewContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="max-w-4xl mx-auto pt-6"
    >
      <motion.div variants={viewItemVariants} className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2.5rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden p-10 transition-colors">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tighter mb-10 pb-6 border-b border-gray-200/50 dark:border-white/10">System Preferences</h2>
        
        <div className="space-y-10">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Default Map Context
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 p-5 rounded-[1.5rem] shadow-sm">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Base Map Style</p>
                <select className="w-full bg-gray-50/50 dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all">
                  <option>Positron (Light)</option>
                  <option>Dark Matter</option>
                  <option>Satellite High-Res</option>
                </select>
              </div>
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 p-5 rounded-[1.5rem] shadow-sm">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Coordinate System</p>
                <select className="w-full bg-gray-50/50 dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all">
                  <option>WGS 84 (EPSG:4326)</option>
                  <option>Web Mercator (EPSG:3857)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Push Notifications
            </h3>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-[1.5rem] p-3 shadow-sm">
              {[
                { title: 'Analysis Completion', desc: 'Notify when a spatial query finishes processing.' },
                { title: 'Data Sync Alerts', desc: 'Alert when a linked database finishes syncing.' },
                { title: 'System Updates', desc: 'Receive notifications about platform upgrades.' }
              ].map((notif, i) => (
                <div key={i} className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors rounded-xl cursor-pointer group">
                  <div>
                    <p className="text-base font-bold text-gray-900 dark:text-white">{notif.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">{notif.desc}</p>
                  </div>
                  <div className="w-12 h-7 bg-blue-600 rounded-full relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-colors">
                    <div className="w-6 h-6 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
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
      case 'My Profile': return renderProfile();
      default: return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-sans flex antialiased selection:bg-blue-200 dark:selection:bg-blue-900 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      
      {/* Sidebar Navigation */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={springTransition}
        className="w-[19rem] border-r border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-900/50 backdrop-blur-3xl flex flex-col z-20 shadow-[inset_-1px_0_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_-1px_0_1px_rgba(255,255,255,0.05)] transition-colors duration-500"
      >
        <div className="p-8 pb-6">
          <div className="flex items-center gap-4 mb-12 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-blue-600 rounded-[1rem] flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_4px_10px_rgba(37,99,235,0.3)]">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tighter text-gray-900 dark:text-white">SatQuery</span>
          </div>
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 px-3">Menu</p>
          <motion.nav 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1.5"
          >
            {navigation.map((item) => (
              <motion.button
                key={item.name}
                variants={itemVariants}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-[1.25rem] text-sm font-bold transition-all ${
                  activeTab === item.name
                    ? 'bg-white dark:bg-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/10 text-blue-600 dark:text-blue-400'
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
                  ? 'bg-white dark:bg-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/10 text-blue-600 dark:text-blue-400'
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] opacity-[0.02] dark:opacity-5 bg-cover bg-center mix-blend-overlay pointer-events-none" />
        
        {/* Top Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springTransition}
          className="h-[5.5rem] bg-white/40 dark:bg-slate-900/50 backdrop-blur-2xl border-b border-white/60 dark:border-white/10 flex items-center justify-between px-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative z-10 transition-colors duration-500"
        >
          <div className="text-xl font-bold text-gray-800 dark:text-white tracking-tighter">{activeTab}</div>
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            
            <div className="relative ml-2">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
              >
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
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute right-0 mt-4 w-56 bg-white/80 dark:bg-slate-800/90 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-3xl shadow-[0_20px_50px_rgb(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden z-50"
                  >
                    <div className="p-5 border-b border-gray-100/50 dark:border-white/10 bg-white/50 dark:bg-transparent">
                      <p className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">John Smith</p>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate mt-0.5">john@company.com</p>
                    </div>
                    
                    <div className="py-2 px-2 space-y-1 bg-white/50 dark:bg-transparent">
                      <button 
                        onClick={() => { setActiveTab('My Profile'); setIsProfileOpen(false); }}
                        className="w-full text-left px-3 py-3 rounded-2xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-white flex items-center gap-3 transition-colors"
                      >
                        <User className="w-4 h-4" /> Identity
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100/50 dark:border-white/10 pt-2 px-2 pb-2 bg-white/50 dark:bg-transparent">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-3 rounded-2xl text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-3 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.header>

        {/* Dynamic View Content */}
        <div className="flex-1 overflow-auto p-12 relative z-0">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
