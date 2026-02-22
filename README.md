# Biomodule Telemetry Dashboard

A real-time telemetry dashboard for a Mars Rover **biomodule system**. This project has been redesigned into a high-fidelity **Mission Control** command center, built with **React** and **Vite**, designed for competition use (ARC / URC style workflows).

##  Features

- **High-Fidelity UI**: Dark-mode, aerospace engineering aesthetic with glassmorphism and real-time interactive backgrounds.
- **Dynamic Site Cards (Site 1–4)**: Live environment data tracking (Temperature, Moisture, Nitrogen) visualized with real-time scrolling SVG sparklines.
- **Live Video Feed**: Central camera panel configured to automatically detect and stream from an attached **Logitech Webcam** via WebRTC, complete with a tactical HUD, coordinate tracking, and a thermal vision toggle.
- **3D Rover Orientation**: A responsive 3D wireframe IMU widget simulating the rover's Pitch, Roll, and Yaw telemetry.
- **System Diagnostics**: Scrolling status tickers and critical warning animations.

---

##  Getting Started

This project is built with React and Vite. Follow these steps to get the dashboard running on your local machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DeeptamBhar/biomodule-dashboard.git
   cd biomodule_dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Running the Development Server

To start the local development server:
```bash
npm run dev
```
Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173/`).

> **Note on Camera Permissions**: When you open the dashboard, your browser will request permission to access your camera. Granting this permission is required to view the primary video feed. The application is configured to preferentially connect to a **Logitech** webcam if one is detected.

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The compiled application will be generated in the `dist/` directory, ready to be hosted on any static web server.

---

##  Tech Stack

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS (CSS Grid, Flexbox, custom variables, keyframe animations, 3D transforms)
- **Typography**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono), Share Tech Mono, Rajdhani
- **Camera Integration**: Browser-native `navigator.mediaDevices` WebRTC API
