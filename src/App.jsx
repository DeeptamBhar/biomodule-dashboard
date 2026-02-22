import Header from "./components/header";
import VideoPanel from "./components/videoPanel";
import Footer from "./components/footer";
import SiteBox from "./components/sitebox";
import ImuWidget from "./components/imuwidget";
import { useState, useRef, useEffect } from "react";

export default function App() {
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Map to percentage for the CSS variable
    const xPercent = (clientX / innerWidth) * 100;
    const yPercent = (clientY / innerHeight) * 100;

    containerRef.current.style.setProperty('--mouse-x', `${xPercent}%`);
    containerRef.current.style.setProperty('--mouse-y', `${yPercent}%`);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}
    >
      <Header />

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.2fr 2fr",
          gap: "24px",
          padding: "24px",
          background: "radial-gradient(circle at center, rgba(0,255,255,0.05) 0%, transparent 60%)",
        }}
      >
        {/* LEFT: SITE DATA (2x2 GRID) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: "minmax(350px, 1fr)",
            gap: "16px",
          }}
        >
          <SiteBox
            title="Site 1"
            videoUrl="http://192.168.0.121:8080/video"
            data={{
              Temperature: "27.5 °C",
              Moisture: "35 %",
              Nitrogen: "685 mg/kg",
            }}
          />
          <SiteBox
            title="Site 2"
            videoUrl="http://192.168.0.121:8080/video"
            data={{
              Temperature: "28.1 °C",
              Moisture: "33 %",
              Nitrogen: "660 mg/kg",
            }}
          />
          <SiteBox
            title="Site 3"
            videoUrl="http://192.168.0.121:8080/video"
            data={{
              Temperature: "26.9 °C",
              Moisture: "38 %",
              Nitrogen: "702 mg/kg",
            }}
          />
          <SiteBox
            title="Site 4"
            videoUrl="http://192.168.0.121:8080/video"
            data={{
              Temperature: "27.8 °C",
              Moisture: "36 %",
              Nitrogen: "690 mg/kg",
            }}
          />
        </div>

        {/* RIGHT: VIDEO AND IMU */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px"
          }}
        >
          <div style={{ width: "100%", height: "500px", minHeight: "50vh" }}>
            <VideoPanel />
          </div>
          <div style={{ width: "100%", height: "300px", minHeight: "30vh" }}>
            <ImuWidget />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
