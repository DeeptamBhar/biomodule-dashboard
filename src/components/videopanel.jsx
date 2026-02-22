import { useEffect, useRef, useState } from "react";

export default function VideoPanel() {
  const CAMERA_URL = "http://192.168.0.121:8080/video";

  const imgRef = useRef(null);
  const lastFrameTime = useRef(performance.now());
  const frameCount = useRef(0);

  const [fps, setFps] = useState(0);
  const [latency, setLatency] = useState(0);

  // FPS calculation (every 1 second)
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(frameCount.current);
      frameCount.current = 0;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Snapshot handler (already working)
  const takeSnapshot = () => {
    const img = imgRef.current;
    if (!img) return;

    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const link = document.createElement("a");
    link.download = `snapshot_${Date.now()}.jpg`;
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  };

  // Called on every frame refresh
  const handleFrameLoad = () => {
    const now = performance.now();
    const delta = now - lastFrameTime.current;

    lastFrameTime.current = now;
    frameCount.current += 1;

    // Approximate stream latency (ms between frames)
    setLatency(Math.round(delta));
  };

  return (
    <div
      className="cyber-panel"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: 0,
        backgroundColor: "#000",
      }}
    >
      {/* Tactical HUD Corner Brackets */}
      <div style={{ position: "absolute", top: "10px", left: "10px", width: "30px", height: "30px", borderTop: "3px solid var(--neon-cyan)", borderLeft: "3px solid var(--neon-cyan)", zIndex: 4 }}></div>
      <div style={{ position: "absolute", top: "10px", right: "10px", width: "30px", height: "30px", borderTop: "3px solid var(--neon-cyan)", borderRight: "3px solid var(--neon-cyan)", zIndex: 4 }}></div>
      <div style={{ position: "absolute", bottom: "10px", left: "10px", width: "30px", height: "30px", borderBottom: "3px solid var(--neon-cyan)", borderLeft: "3px solid var(--neon-cyan)", zIndex: 4 }}></div>
      <div style={{ position: "absolute", bottom: "10px", right: "10px", width: "30px", height: "30px", borderBottom: "3px solid var(--neon-cyan)", borderRight: "3px solid var(--neon-cyan)", zIndex: 4 }}></div>

      {/* Digital Noise Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 2,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Moving Scanline */}
      <div className="tactical-scanline"></div>

      {/* Overlay: FPS + Latency */}
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "20px",
          zIndex: 5,
          background: "rgba(0, 50, 50, 0.6)",
          border: "1px solid var(--neon-cyan)",
          backdropFilter: "blur(4px)",
          padding: "6px 12px",
          color: "var(--neon-cyan)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          letterSpacing: "1px",
          textTransform: "uppercase",
          boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)",
          clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", borderBottom: "1px solid rgba(0,255,255,0.3)", paddingBottom: "2px", marginBottom: "2px" }}>
          <span>SYS.FPS</span> <b className="neon-cyan">{fps}</b>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
          <span>NET.LAT</span> <b className="neon-cyan">{latency}ms</b>
        </div>
      </div>

      {/* Snapshot button (Tactical Trigger) */}
      <button
        onClick={takeSnapshot}
        className="parallax-hover"
        style={{
          position: "absolute",
          top: "16px",
          right: "20px",
          zIndex: 5,
          background: "rgba(255, 42, 42, 0.15)",
          color: "var(--neon-red)",
          border: "1px solid var(--neon-red)",
          backdropFilter: "blur(4px)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.85rem",
          fontWeight: "bold",
          padding: "8px 16px",
          cursor: "pointer",
          letterSpacing: "2px",
          textTransform: "uppercase",
          boxShadow: "0 0 15px rgba(255, 42, 42, 0.3)",
          clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
          transition: "all 0.2s ease",
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = "rgba(255, 42, 42, 0.35)"; e.currentTarget.style.boxShadow = "0 0 25px rgba(255, 42, 42, 0.6)"; }}
        onMouseOut={(e) => { e.currentTarget.style.background = "rgba(255, 42, 42, 0.15)"; e.currentTarget.style.boxShadow = "0 0 15px rgba(255, 42, 42, 0.3)"; }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ display: "inline-block", width: "8px", height: "8px", background: "var(--neon-red)", borderRadius: "50%", animation: "glitch-anim 2s infinite" }}></span>
          CAPTURE
        </div>
      </button>

      {/* Target Crosshair Center */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 3, pointerEvents: "none", width: "40px", height: "40px", border: "1px solid rgba(0, 255, 255, 0.3)", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "4px", height: "4px", backgroundColor: "var(--neon-cyan)", borderRadius: "50%" }}></div>
      </div>

      {/* MJPEG stream */}
      <img
        ref={imgRef}
        src={CAMERA_URL}
        crossOrigin="anonymous"
        alt="Biomodule Camera"
        onLoad={handleFrameLoad}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "contrast(1.2) saturate(1.1) sepia(0.2) hue-rotate(180deg)", /* Give it a slightly technical/cyan tint */
        }}
      />
    </div>
  );
}
