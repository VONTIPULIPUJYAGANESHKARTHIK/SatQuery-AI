# SatQuery AI 🌍✨

SatQuery AI is a state-of-the-art Spatial Intelligence Platform designed to bring powerful AI capabilities to satellite imagery analysis. Built with a modern, Apple-inspired "Liquid Glass" interface, SatQuery AI provides a comprehensive suite of tools for geospatial analysts, researchers, and data scientists.

## ✨ Key Features

SatQuery AI integrates **16 specialized spatial features** into a seamless, split-screen workspace:

1. **Single-Image VQA**: Answer domain-specific queries on land-cover and objects from one raster.
2. **Text-Guided Grounding**: Generate spatial bounding boxes or polygons based on natural-language entities.
3. **Scene Captioning**: Auto-generate descriptive text summaries for optical or SAR scenes.
4. **Bi-Temporal Change Description**: Answer queries about structural or environmental changes between T1 and T2 images.
5. **Spatial Change Masking**: Render pixel-level change maps highlighting newly modified zones.
6. **Optical-SAR Fusion**: Fuse multi-sensor images to penetrate cloud cover and darkness for cross-modal analysis.
7. **Query Intent Classifier**: Route natural-language prompts dynamically to the correct specialist model.
8. **Image Metadata Validation**: Automatically verify upload count, modality, CRS/EPSG, resolution, and header integrity.
9. **Auditable Execution Trace**: Display a step-by-step cryptographic (SHA-256) log of the agent's tool usage.
10. **Split-Screen Interface**: A beautiful Liquid Glass workspace separating AI controls from the visualization canvas.
11. **Multi-Modal Uploads**: Support for Single, Bi-Temporal, and Optical+SAR Fusion ingestion workflows.
12. **Map Overlays**: Dynamic bounding boxes and spatial masks rendered directly over the imagery.
13. **Before/After Swipe Tool**: An interactive slider for visualizing changes between pre-event and post-event rasters.
14. **Layer Controls**: Opacity sliders and visibility toggles for Optical, SAR, and AI Mask layers.
15. **Exportable Reports**: Generate detailed, cryptographically hashed JSON analysis reports.
16. **GIS Vector Export**: Export AI groundings directly to standard `.GeoJSON` format.

## 🚀 Tech Stack

- **Frontend Framework**: React + Vite
- **Styling**: Tailwind CSS (with custom Liquid Glass aesthetics)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router

## 🛠 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/VONTIPULIPUJYAGANESHKARTHIK/SatQuery-AI.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd SatQuery-AI/satqueryaifrontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🎨 UI Aesthetics
The platform features a highly polished design system:
- **Liquid Glass Theme**: Extensive use of `backdrop-blur-3xl` and translucent layers for a premium, lightweight feel.
- **Dynamic Routing**: Smooth transitions between the Immersive Map View, Spatial Query, Profile, and Settings panes.
- **Dark/Light Mode**: Full support for both themes, toggled seamlessly via the system navigation bar.

---
*Built for the future of Spatial Intelligence.*