import React, { useState } from 'react';
import Map, { Layer, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Layers, ZoomIn, ZoomOut, SlidersHorizontal, Info, Crosshair } from 'lucide-react';

// Mock GeoJSON for segmentation mask overlay
const mockMaskGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [-122.42, 37.78],
            [-122.41, 37.78],
            [-122.41, 37.79],
            [-122.42, 37.79],
            [-122.42, 37.78]
          ]
        ]
      }
    }
  ]
};

export default function MapWorkspace() {
  const [viewState, setViewState] = useState({
    longitude: -122.414,
    latitude: 37.776,
    zoom: 13,
    pitch: 0,
    bearing: 0
  });

  return (
    <div className="absolute inset-0 w-full h-full z-0 bg-primary">
      {/* MapLibre Container */}
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        style={{ width: '100%', height: '100%' }}
      >
        <Source id="ai-masks" type="geojson" data={mockMaskGeoJSON}>
          <Layer 
            id="mask-fill" 
            type="fill" 
            paint={{
              'fill-color': '#14B8A6', // hud-teal
              'fill-opacity': 0.15,
            }} 
          />
          <Layer 
            id="mask-line" 
            type="line" 
            paint={{
              'line-color': '#14B8A6',
              'line-width': 2,
            }} 
          />
        </Source>
        
        {/* Central HUD Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50 flex items-center justify-center">
          <Crosshair className="w-12 h-12 text-hud-amber stroke-[1px]" />
          <div className="absolute w-64 h-[1px] bg-hud-amber/20" />
          <div className="absolute h-64 w-[1px] bg-hud-amber/20" />
        </div>

        {/* Custom Controls (Top Right) */}
        <div className="absolute top-20 right-6 flex flex-col gap-4 z-40">
          <div className="bg-panel/60 backdrop-blur-xl border border-white/10 rounded-sm p-1 shadow-2xl flex flex-col">
            <button className="p-2.5 text-slate-400 hover:text-hud-teal hover:bg-white/5 transition-colors" title="Zoom In">
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-full h-px bg-white/5 my-0.5" />
            <button className="p-2.5 text-slate-400 hover:text-hud-teal hover:bg-white/5 transition-colors" title="Zoom Out">
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-panel/60 backdrop-blur-xl border border-white/10 rounded-sm p-1 shadow-2xl flex flex-col">
            <button className="p-2.5 text-hud-teal bg-hud-teal/10 rounded-sm transition-colors" title="Layers">
              <Layers className="w-4 h-4" />
            </button>
            <div className="w-full h-px bg-white/5 my-0.5" />
            <button className="p-2.5 text-slate-400 hover:text-hud-teal hover:bg-white/5 rounded-sm transition-colors" title="Opacity">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend (Bottom Right) */}
        <div className="absolute bottom-8 right-6 bg-panel/70 backdrop-blur-xl border border-white/10 rounded-sm p-4 shadow-2xl w-64 z-40">
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-hud-teal" />
              <span className="text-xs font-mono uppercase tracking-widest text-slate-300">Target Legend</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 font-mono text-[10px] uppercase">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm border border-hud-teal bg-hud-teal/20" />
              <span className="text-slate-400">Primary Targets (Vessels)</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm border border-hud-crimson bg-hud-crimson/20" />
              <span className="text-slate-400">Anomalous Activity</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-sm border border-hud-amber bg-hud-amber/20" />
              <span className="text-slate-400">Search Region bounds</span>
            </div>
          </div>
        </div>
      </Map>
    </div>
  );
}
