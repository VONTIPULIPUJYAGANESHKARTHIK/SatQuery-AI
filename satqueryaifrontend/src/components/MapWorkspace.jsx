import React, { useState } from 'react';
import Map, { NavigationControl, Layer, Source } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Layers, ZoomIn, ZoomOut, SlidersHorizontal, Info } from 'lucide-react';

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
    <main className="flex-1 relative h-full bg-black">
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
              'fill-color': '#FF007F',
              'fill-opacity': 0.3,
            }} 
          />
          <Layer 
            id="mask-line" 
            type="line" 
            paint={{
              'line-color': '#FF007F',
              'line-width': 2,
            }} 
          />
        </Source>
        
        {/* Custom Controls (Top Right) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className="bg-panel/90 backdrop-blur border border-slate-700 rounded-lg p-1 shadow-lg flex flex-col">
            <button className="p-2 text-slate-300 hover:text-text-main hover:bg-slate-700/50 rounded transition-colors" title="Zoom In">
              <ZoomIn className="w-4 h-4" />
            </button>
            <div className="w-full h-px bg-slate-700 my-0.5" />
            <button className="p-2 text-slate-300 hover:text-text-main hover:bg-slate-700/50 rounded transition-colors" title="Zoom Out">
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
          
          <div className="bg-panel/90 backdrop-blur border border-slate-700 rounded-lg p-1 shadow-lg flex flex-col mt-2">
            <button className="p-2 text-accent hover:bg-accent/10 rounded transition-colors" title="Layers">
              <Layers className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-300 hover:text-text-main hover:bg-slate-700/50 rounded transition-colors" title="Opacity">
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Legend (Bottom Right) */}
        <div className="absolute bottom-6 right-6 bg-panel/80 backdrop-blur-md border border-slate-700 rounded-lg p-3 shadow-2xl max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <Info className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-slate-200">Map Legend</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm border border-map-overlay bg-map-overlay/30" />
            <span className="text-xs text-slate-400">Highlighted Targets: Water Bodies / Cargo</span>
          </div>
        </div>
      </Map>
    </main>
  );
}
