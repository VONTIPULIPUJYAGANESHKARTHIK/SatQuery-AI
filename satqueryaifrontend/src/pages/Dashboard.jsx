import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Globe, LayoutDashboard, Crosshair, Map as MapIcon, Database, 
  Settings, LogOut, Bell, User, ChevronRight, Activity, 
  Image as ImageIcon, UploadCloud, Layers
} from 'lucide-react';

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
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Overview</h1>
          <p className="text-gray-500 font-medium">System status and recent analysis runs.</p>
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
            className="bg-white/70 backdrop-blur-3xl border border-white/60 p-6 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <span className={`text-sm font-bold ${stat.trend.includes('+') ? 'text-green-600' : 'text-gray-500'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm font-semibold">{stat.title}</h3>
            <p className="text-3xl font-black text-gray-900 tracking-tight mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        variants={viewItemVariants}
        className="bg-white/70 backdrop-blur-3xl border border-white/60 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200/50 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 tracking-tight">Recent Spatial Queries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/50 text-gray-500 font-semibold border-b border-gray-200/50">
              <tr>
                <th className="px-6 py-4 font-bold">Query</th>
                <th className="px-6 py-4 font-bold">Model</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {[
                { q: "Count shipping containers in Port of Long Beach", m: "Object Detection v4", s: "Completed", t: "2 mins ago" },
                { q: "Highlight deforestation in Amazon sector 7G", m: "Change Detection (SAR)", s: "Processing", t: "15 mins ago" },
                { q: "Identify new construction in Dubai marina", m: "Zero-Shot Vis", s: "Completed", t: "1 hour ago" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/50 transition-colors">
                  <td className="px-6 py-4 text-gray-900">{row.q}</td>
                  <td className="px-6 py-4 text-gray-500">{row.m}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      row.s === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700 animate-pulse'
                    }`}>
                      {row.s}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{row.t}</td>
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
        <div className="bg-white/70 backdrop-blur-3xl border border-white/60 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] p-6 flex-1 flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Query Configuration</h2>
          <div className="space-y-5 flex-1">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Natural Language Query</label>
              <textarea 
                rows="4" 
                placeholder="e.g. Find all military aircraft on the tarmac..."
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium resize-none shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Dataset</label>
              <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium shadow-sm">
                <option>Global Sentinel-2 (Recent)</option>
                <option>Custom: Port of LA (High Res)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Model</label>
              <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all text-sm font-medium shadow-sm">
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
      <motion.div variants={viewItemVariants} className="w-full lg:w-2/3 bg-white/70 backdrop-blur-3xl border border-white/60 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden relative min-h-[500px]">
        {/* Placeholder Map - In future would be MapLibreGL */}
        <div className="absolute inset-0 bg-blue-50/50 flex flex-col items-center justify-center p-8 text-center">
          <MapIcon className="w-16 h-16 text-blue-200 mb-4" />
          <h3 className="text-xl font-bold text-gray-400">Map Interface</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-sm">MapLibre GL context will initialize here when a dataset is selected or a query is run.</p>
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
      <motion.div variants={viewItemVariants} className="bg-white/70 backdrop-blur-3xl border border-white/60 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">Data Ingestion</h2>
        
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-16 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-white transition-colors cursor-pointer group">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-4 group-hover:scale-110 transition-transform">
            <UploadCloud className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Drag & Drop Imagery</h3>
          <p className="text-gray-500 font-medium text-sm max-w-xs">Upload GeoTIFF, SAR, or Optical imagery. Maximum file size 10GB per asset.</p>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-full font-bold shadow-sm hover:border-blue-500 hover:text-blue-600 transition-colors"
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
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Datasets</h1>
          <p className="text-gray-500 font-medium">Manage your connected buckets and uploaded imagery.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white border border-gray-200 text-gray-800 px-5 py-2.5 rounded-2xl text-sm font-bold shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-2"
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
            className="bg-white/70 backdrop-blur-3xl border border-white/60 p-6 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)]"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Layers className="w-5 h-5 text-blue-600" />
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                ds.status === 'Active' || ds.status === 'Indexed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700 animate-pulse'
              }`}>
                {ds.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-1">{ds.name}</h3>
            <div className="flex justify-between text-sm text-gray-500 font-medium">
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
      <motion.div variants={viewItemVariants} className="bg-white/70 backdrop-blur-3xl border border-white/60 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-8">
        <div className="flex items-center gap-6 mb-8 border-b border-gray-200/50 pb-8">
          <div className="w-24 h-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-bold shadow-[inset_0_1px_1px_rgba(0,0,0,0.05),0_4px_10px_rgba(0,0,0,0.05)] border border-gray-100">
            JS
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">John Smith</h2>
            <p className="text-gray-500 text-lg font-medium">john@company.com</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">Profile Details</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Full Name</label>
              <input type="text" defaultValue="John Smith" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Email Address</label>
              <input type="email" defaultValue="john@company.com" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Organization</label>
              <input type="text" defaultValue="Acme Corp" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-400" disabled />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700">Role</label>
              <input type="text" defaultValue="Lead Analyst" className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium text-gray-400" disabled />
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
      <motion.div variants={viewItemVariants} className="bg-white/70 backdrop-blur-3xl border border-white/60 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden p-8">
        <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-8 pb-4 border-b border-gray-200/50">Application Settings</h2>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" /> Default Map Preferences
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
                <p className="text-sm font-bold text-gray-700 mb-2">Base Map Style</p>
                <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all">
                  <option>Positron (Light)</option>
                  <option>Dark Matter</option>
                  <option>Satellite High-Res</option>
                </select>
              </div>
              <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
                <p className="text-sm font-bold text-gray-700 mb-2">Coordinate System</p>
                <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/10 transition-all">
                  <option>WGS 84 (EPSG:4326)</option>
                  <option>Web Mercator (EPSG:3857)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" /> Notifications
            </h3>
            <div className="bg-white border border-gray-200 rounded-2xl p-2 shadow-sm">
              {[
                { title: 'Analysis Completion', desc: 'Notify when a spatial query finishes processing.' },
                { title: 'Data Sync Alerts', desc: 'Alert when a linked database finishes syncing.' },
                { title: 'System Updates', desc: 'Receive notifications about platform upgrades.' }
              ].map((notif, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-gray-900">{notif.title}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">{notif.desc}</p>
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
    <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-white to-blue-50 font-sans flex antialiased selection:bg-blue-200 text-gray-800">
      
      {/* Sidebar Navigation */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={springTransition}
        className="w-72 border-r border-white/60 bg-white/40 backdrop-blur-3xl flex flex-col z-20 shadow-[inset_-1px_0_1px_rgba(255,255,255,0.6)]"
      >
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">SatQuery AI</span>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Menu</p>
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
                    ? 'bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 text-blue-600'
                    : 'text-gray-500 hover:bg-white/50 hover:text-gray-900 border border-transparent'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </motion.button>
            ))}
          </motion.nav>
        </div>

        <div className="mt-auto p-8 pt-4">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">System</p>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-1">
            <motion.button 
              variants={itemVariants}
              onClick={() => setActiveTab('Settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === 'Settings'
                  ? 'bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100 text-blue-600'
                  : 'text-gray-500 hover:bg-white/50 hover:text-gray-900 border border-transparent'
              }`}
            >
              <Settings className="w-5 h-5" /> Settings
            </motion.button>
            <motion.button 
              variants={itemVariants}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors border border-transparent"
            >
              <LogOut className="w-5 h-5" /> Logout
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] opacity-[0.02] bg-cover bg-center mix-blend-overlay pointer-events-none" />
        
        {/* Top Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springTransition}
          className="h-20 bg-white/40 backdrop-blur-2xl border-b border-white/60 flex items-center justify-between px-10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] relative z-10"
        >
          <div className="text-lg font-bold text-gray-800 tracking-tight">{activeTab}</div>
          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-blue-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-white"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity focus:outline-none"
              >
                <div className="text-right hidden md:block">
                  <div className="text-sm font-bold text-gray-900 tracking-tight">John Smith</div>
                  <div className="text-xs font-medium text-gray-500">Stratos Corp</div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm">
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
                    className="absolute right-0 mt-3 w-56 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-[0_20px_50px_rgb(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.9)] overflow-hidden z-50"
                  >
                    <div className="p-4 border-b border-gray-100/50 bg-white/50">
                      <p className="text-sm font-bold text-gray-900 tracking-tight">John Smith</p>
                      <p className="text-xs font-medium text-gray-500 truncate mt-0.5">john@company.com</p>
                    </div>
                    
                    <div className="py-2 px-2 space-y-1">
                      <button 
                        onClick={() => { setActiveTab('My Profile'); setIsProfileOpen(false); }}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3 transition-colors"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </button>
                    </div>
                    
                    <div className="border-t border-gray-100/50 pt-2 px-2 pb-2 mt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
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
