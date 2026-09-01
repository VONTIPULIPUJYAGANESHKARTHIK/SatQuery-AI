import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, LayoutDashboard, Search, UploadCloud, Bell, ChevronLeft, Map as MapIcon, Database, Settings } from 'lucide-react';
import Map, { NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex h-screen bg-background font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-surface border-r border-border flex flex-col">
        <div className="p-4 border-b border-border flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Globe className="w-5 h-5 text-primary" />
          <span className="font-bold text-lg text-primary tracking-tight">SatQuery AI</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
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
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded transition-colors ${
                activeTab === item.name 
                  ? 'bg-blue-50 text-secondary' 
                  : 'text-neutral hover:bg-gray-50 hover:text-primary'
              }`}
            >
              <item.icon className={`w-4 h-4 ${activeTab === item.name ? 'text-secondary' : 'text-neutral'}`} />
              {item.name}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-neutral hover:bg-gray-50 hover:text-primary rounded transition-colors">
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-surface border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-primary">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-neutral hover:text-primary hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shadow-sm">
              JS
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Active Models', value: '3', status: 'Optimal' },
                { label: 'Images Processed', value: '1,204', status: '+12% this week' },
                { label: 'System Health', value: '99.9%', status: 'All systems operational' },
              ].map((stat, i) => (
                <div key={i} className="bg-surface border border-border p-5 rounded-lg shadow-sm">
                  <p className="text-sm font-semibold text-neutral uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-primary mt-2">{stat.value}</p>
                  <p className="text-xs text-secondary mt-1 font-medium">{stat.status}</p>
                </div>
              ))}
            </div>

            {/* Analysis Workspace Container */}
            <div className="bg-surface border border-border rounded-lg shadow-sm flex flex-col md:flex-row overflow-hidden min-h-[500px]">
              
              {/* Query Panel */}
              <div className="w-full md:w-1/3 border-r border-border p-5 flex flex-col">
                <h2 className="text-sm font-bold text-primary uppercase tracking-wider mb-4">AI Analysis Command</h2>
                
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-xs font-semibold text-neutral uppercase tracking-wider mb-2">Input Image</label>
                    <div className="border border-dashed border-border rounded p-4 text-center hover:border-secondary cursor-pointer transition-colors bg-background">
                      <UploadCloud className="w-5 h-5 text-neutral mx-auto mb-1" />
                      <span className="text-xs text-neutral font-medium">Select GeoTIFF</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral uppercase tracking-wider mb-2">Query</label>
                    <textarea 
                      className="w-full bg-background border border-border rounded p-3 text-sm text-primary placeholder-neutral focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-shadow"
                      rows={4}
                      placeholder="e.g. Detect commercial aircraft on the tarmac..."
                    />
                  </div>
                </div>

                <button className="w-full bg-primary text-white py-2.5 rounded text-sm font-semibold hover:bg-primary/90 transition-colors mt-4 shadow-sm">
                  Run Analysis
                </button>
              </div>

              {/* Map/Result View */}
              <div className="w-full md:w-2/3 bg-gray-100 relative">
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
                  
                  {/* Empty state overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-surface/90 backdrop-blur-sm border border-border p-4 rounded-lg shadow-sm text-center">
                      <MapIcon className="w-6 h-6 text-neutral mx-auto mb-2" />
                      <p className="text-sm font-semibold text-primary">Awaiting Analysis</p>
                      <p className="text-xs text-neutral">Upload an image and run a query</p>
                    </div>
                  </div>
                </Map>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
