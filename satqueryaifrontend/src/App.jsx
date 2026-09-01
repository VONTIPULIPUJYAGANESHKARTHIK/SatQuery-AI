import React from 'react';
import Sidebar from './components/Sidebar';
import MapWorkspace from './components/MapWorkspace';

function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-primary text-text-main">
      <Sidebar />
      <MapWorkspace />
    </div>
  );
}

export default App;
