import React from 'react';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import MapWorkspace from './components/MapWorkspace';

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-primary text-text-main">
      <TopBar />
      <MapWorkspace />
      
      {/* Floating Sidebar Container */}
      <div className="absolute top-16 left-4 bottom-4 z-40 pointer-events-none">
        <div className="pointer-events-auto h-full">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
