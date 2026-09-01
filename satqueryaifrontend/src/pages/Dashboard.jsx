import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, LayoutDashboard, Crosshair, Map as MapIcon, Database, 
  Settings, LogOut, Bell, User, ChevronRight, Activity, 
  Image as ImageIcon, UploadCloud, Layers, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../ThemeContext';

const springTransition = { type: "spring", stiffness: 300, damping: 30 };

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
  hidden: { opacity: 0, y: 20, scale: 0.98 },
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
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Spatial Query', icon: Crosshair },
    { name: 'Data Ingestion', icon: UploadCloud },
    { name: 'Map View', icon: MapIcon },
    { name: 'Datasets', icon: Database },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  const renderOverview = () => (
    <motion.div 
      key="overview"
      variants={viewContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 max-w-7xl mx-auto"
    >
      <motion.div variants={viewItemVariants} className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Overview</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">System status and recent analysis runs.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('Spatial Query')}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_15px_rgba(37,99,235,0.3)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_0_20px_rgba(37,99,235,0.5)] transition-all flex items-center gap-2 group"
        >
          New Query <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Queries', value: '1,284', trend: '+12%', icon: Crosshair },
          { title: 'Data Ingested', value: '45.2 TB', trend: '+5.4%', icon: Database },
          { title: 'Active Models', value: '8', trend: 'Stable', icon: Activity }
        ].map((stat, i) => (
          <motion.div 
            key={i}
            variants={viewItemVariants}
            whileHover={{ y: -4 }}
            className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-6 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10">
                <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <span className={`text-sm font-bold ${stat.trend.includes('+') ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-semibold">{stat.title}</h3>
            <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        variants={viewItemVariants}
        className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-colors"
      >
        <div className="p-6 border-b border-gray-200/50 dark:border-white/10 flex justify-between items-center bg-white/30 dark:bg-transparent">
          <h3 className="font-bold text-gray-900 dark:text-white tracking-tight">Recent Spatial Queries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 dark:bg-slate-800/50 text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-200/50 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 font-bold">Query</th>
                <th className="px-6 py-4 font-bold">Model</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-medium">
              {[
                { q: "Count shipping containers in Port of Long Beach", m: "Object Detection v4", s: "Completed", t: "2 mins ago" },
                { q: "Highlight deforestation in Amazon sector 7G", m: "Change Detection (SAR)", s: "Processing", t: "15 mins ago" },
                { q: "Identify new construction in Dubai marina", m: "Zero-Shot Vis", s: "Completed", t: "1 hour ago" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{row.q}</td>
                  <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{row.m}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      row.s === 'Completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse'
                    }`}>
                      {row.s}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 dark:text-gray-500">{row.t}</td>
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
        <div className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] p-6 flex-1 flex flex-col transition-colors">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Query Configuration</h2>
          <div className="space-y-5 flex-1">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Natural Language Query</label>
              <textarea 
                rows="4" 
                placeholder="e.g. Find all military aircraft on the tarmac..."
                className="w-full px-4 py-3 bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium resize-none shadow-sm dark:text-white dark:placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Select Dataset</label>
              <select className="w-full px-4 py-3 bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium shadow-sm dark:text-white">
                <option>Global Sentinel-2 (Recent)</option>
                <option>Custom: Port of LA (High Res)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Model</label>
              <select className="w-full px-4 py-3 bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium shadow-sm dark:text-white">
                <option>Auto-Select (Recommended)</option>
                <option>Zero-Shot Detection (VLM)</option>
              </select>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-blue-600 text-white py-3.5 rounded-xl text-sm font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_15px_rgba(37,99,235,0.3)] mt-6"
          >
            Run Analysis
          </motion.button>
        </div>
      </motion.div>
      <motion.div variants={viewItemVariants} className="w-full lg:w-2/3 bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden relative min-h-[500px] transition-colors">
        <div className="absolute inset-0 bg-blue-50/50 dark:bg-slate-800/30 flex flex-col items-center justify-center p-8 text-center">
          <MapIcon className="w-16 h-16 text-blue-200 dark:text-blue-900/50 mb-4" />
          <h3 className="text-xl font-bold text-gray-400 dark:text-gray-600">Map Interface</h3>
          <p className="text-gray-400 dark:text-gray-600 text-sm mt-2 max-w-sm">MapLibre GL context will initialize here when a dataset is selected or a query is run.</p>
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
      <motion.div variants={viewItemVariants} className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden p-8 transition-colors">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-8">Data Ingestion</h2>
        
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-16 flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-slate-800/30 hover:bg-white dark:hover:bg-slate-800/80 transition-colors cursor-pointer group">
          <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm border border-gray-100 dark:border-white/10 mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Drag & Drop Imagery</h3>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-sm max-w-xs">Upload GeoTIFF, SAR, or Optical imagery. Maximum file size 10GB per asset.</p>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 px-6 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 rounded-full font-bold shadow-sm hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            Browse Files
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
      <motion.div variants={viewItemVariants} className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Datasets</h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Manage your connected buckets and uploaded imagery.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2"
        >
          <Database className="w-4 h-4" /> Connect Source
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
            className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 p-6 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] transition-colors"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                ds.status === 'Active' || ds.status === 'Indexed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 animate-pulse'
              }`}>
                {ds.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight mb-1">{ds.name}</h3>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 font-medium">
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
      <motion.div variants={viewItemVariants} className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden p-8 transition-colors">
        <div className="flex items-center gap-6 mb-8 border-b border-gray-200/50 dark:border-white/10 pb-8">
          <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl font-bold shadow-[inset_0_1px_1px_rgba(0,0,0,0.05),0_4px_10px_rgba(0,0,0,0.05)] border border-gray-100 dark:border-white/10">
            JS
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">John Smith</h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">john@company.com</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Profile Details</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Full Name</label>
              <input type="text" defaultValue="John Smith" className="w-full bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
              <input type="email" defaultValue="john@company.com" className="w-full bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm dark:text-white" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Organization</label>
              <input type="text" defaultValue="Acme Corp" className="w-full bg-gray-50/50 dark:bg-slate-900/50 border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 dark:text-gray-500" disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Role</label>
              <input type="text" defaultValue="Lead Analyst" className="w-full bg-gray-50/50 dark:bg-slate-900/50 border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm font-medium text-gray-400 dark:text-gray-500" disabled />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="bg-blue-600 text-white px-8 py-3.5 rounded-xl text-sm font-bold shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_15px_rgba(37,99,235,0.3)]">
              Save Profile
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
      <motion.div variants={viewItemVariants} className="bg-white/70 dark:bg-slate-900/50 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden p-8 transition-colors">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-8 pb-4 border-b border-gray-200/50 dark:border-white/10">Application Settings</h2>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Default Map Preferences
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 p-4 rounded-2xl shadow-sm">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Base Map Style</p>
                <select className="w-full bg-gray-50/50 dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all">
                  <option>Positron (Light)</option>
                  <option>Dark Matter</option>
                  <option>Satellite High-Res</option>
                </select>
              </div>
              <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 p-4 rounded-2xl shadow-sm">
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Coordinate System</p>
                <select className="w-full bg-gray-50/50 dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all">
                  <option>WGS 84 (EPSG:4326)</option>
                  <option>Web Mercator (EPSG:3857)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" /> Notifications
            </h3>
            <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 rounded-2xl p-2 shadow-sm">
              {[
                { title: 'Analysis Completion', desc: 'Notify when a spatial query finishes processing.' },
                { title: 'Data Sync Alerts', desc: 'Alert when a linked database finishes syncing.' },
                { title: 'System Updates', desc: 'Receive notifications about platform upgrades.' }
              ].map((notif, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/5 last:border-0 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{notif.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{notif.desc}</p>
                  </div>
                  <div className="w-11 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-colors">
                    <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
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
        className="w-72 border-r border-white/60 dark:border-white/10 bg-white/40 dark:bg-slate-900/50 backdrop-blur-3xl flex flex-col z-20 shadow-[inset_-1px_0_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_-1px_0_1px_rgba(255,255,255,0.05)] transition-colors duration-500"
      >
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">SatQuery AI</span>
          </div>
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 px-2">Menu</p>
          <motion.nav 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-1"
          >
            {navigation.map((item) => (
              <motion.button
                key={item.name}
                variants={itemVariants}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
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
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 px-2">System</p>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-1">
            <motion.button 
              variants={itemVariants}
              onClick={() => setActiveTab('Settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === 'Settings'
                  ? 'bg-white dark:bg-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/10 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border border-transparent'
              }`}
            >
              <Settings className="w-5 h-5" /> Settings
            </motion.button>
            <motion.button 
              variants={itemVariants}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors border border-transparent"
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
          className="h-20 bg-white/40 dark:bg-slate-900/50 backdrop-blur-2xl border-b border-white/60 dark:border-white/10 flex items-center justify-between px-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative z-10 transition-colors duration-500"
        >
          <div className="text-lg font-bold text-gray-800 dark:text-white tracking-tight">{activeTab}</div>
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <button className="text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
              >
                <div className="text-right hidden md:block">
                  <div className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">John Smith</div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400">Stratos Corp</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shadow-sm">
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
                    className="absolute right-0 mt-3 w-56 bg-white/80 dark:bg-slate-800/90 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-2xl shadow-[0_20px_50px_rgb(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-100/50 dark:border-white/10 bg-white/50 dark:bg-transparent">
                      <p className="text-sm font-bold text-gray-900 dark:text-white tracking-tight">John Smith</p>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate mt-0.5">john@company.com</p>
                    </div>
                    
                    <div className="py-2 px-2 space-y-1 bg-white/50 dark:bg-transparent">
                      <button 
                        onClick={() => { setActiveTab('My Profile'); setIsProfileOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-white flex items-center gap-3 transition-colors"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100/50 dark:border-white/10 pt-2 px-2 pb-2 bg-white/50 dark:bg-transparent">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-3 transition-colors"
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
        <div className="flex-1 overflow-auto p-10 relative z-0">
          <AnimatePresence mode="wait">
            {renderContent()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
