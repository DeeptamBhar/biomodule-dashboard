# Biomodule Telemetry Dashboard

A real-time telemetry dashboard for a Mars Rover **biomodule system**, built with **React** and designed for competition use (ARC / URC style workflows).

The dashboard visualizes:
- Live **camera feed** from the biomodule
- **Temperature & humidity** sensor data
- Multiple **sampling sites (Site 1–4)**
- Performance metrics like **FPS and stream latency**

The system is designed to be **hardware-agnostic**, **ROS-optional**, and **demo-safe**.

---

##  Features

-  **Live MJPEG video feed** from a Jetson Orin Nano
-  **Snapshot capture** (saved locally in browser)
-  **FPS & latency overlay** on video stream
-  **Multi-site data panels** (Site 1–4)
-  Modular React component architecture
-  ROS-safe / UI-only fallback mode
-  Camera selector (future-ready for multiple feeds)

---

##  Tech Stack

### Frontend
- React (Vite)
- Vanilla CSS (dashboard-style layout)
- Browser-native MJPEG streaming

### Backend / Hardware
- NVIDIA **Jetson Orin Nano**
- Logitech C270 webcam
- Python + Flask (MJPEG server)
- OpenCV (V4L2 backend)

> ROS integration is planned but not required for UI operation.

---

## 📐 System Architecture (High Level)



# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
