import { useEffect, useRef, useState } from "react";

export default function VideoPanel() {
  const videoRef = useRef(null);
  const rafRef = useRef(null);

  const [fps, setFps] = useState(0);
  const [latency, setLatency] = useState(1); // Local webcam latency is negligible
  const [isThermal, setIsThermal] = useState(false);

  // Tactical data states
  const [targetCoords, setTargetCoords] = useState({ x: 45, y: 112 });

  // Webcam setup
  useEffect(() => {
    async function setupCamera() {
      try {
        // First, get basic video permission to unlock device labels
        let stream = await navigator.mediaDevices.getUserMedia({ video: true });

        // Now find Logitech camera specifically
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(d => d.kind === 'videoinput');

        // Try to identify logitech webcam
        const logiCam = videoDevices.find(d => d.label.toLowerCase().includes('logitech'));
        if (logiCam) {
          console.log("Selected Logitech Camera:", logiCam.label);
          // Stop the initial generic stream
          stream.getTracks().forEach(track => track.stop());
          // Request the specific logitech one
          stream = await navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: logiCam.deviceId } } });
        } else {
          console.log("Logitech not found by name, using default camera");
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    }
    setupCamera();

    // Clean up
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Frame counter for FPS and Target calculation
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const loop = () => {
      const now = performance.now();
      frameCount++;

      // Calculate FPS every second
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;

        // Simulate target movement on the same timer
        setTargetCoords(prev => ({
          x: prev.x + (Math.random() * 4 - 2),
          y: prev.y + (Math.random() * 4 - 2)
        }));
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
  }, []);

  // Snapshot handler
  const takeSnapshot = () => {
    const video = videoRef.current;
    if (!video) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    // Mirror the canvas to match the CSS mirrored video
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    if (isThermal) {
      ctx.filter = "invert(1) hue-rotate(180deg) saturate(3) contrast(1.5)";
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = `snapshot_${Date.now()}.jpg`;
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
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
          <span>SYS.FPS</span> <b className="data-number neon-cyan">{fps}</b>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
          <span>NET.LAT</span> <b className="data-number neon-cyan">{latency}</b><span style={{ fontSize: "0.7rem" }}>ms</span>
        </div>
      </div>

      {/* Top Right Controls (Snapshot & Thermal) */}
      <div style={{ position: "absolute", top: "16px", right: "20px", zIndex: 5, display: "flex", gap: "10px" }}>
        {/* Thermal Toggle Button */}
        <button
          onClick={() => setIsThermal(!isThermal)}
          className="parallax-hover"
          style={{
            background: isThermal ? "rgba(255, 157, 0, 0.2)" : "rgba(0, 255, 255, 0.1)",
            color: isThermal ? "var(--neon-orange)" : "var(--neon-cyan)",
            border: `1px solid ${isThermal ? "var(--neon-orange)" : "var(--neon-cyan)"}`,
            backdropFilter: "blur(4px)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.85rem",
            fontWeight: "bold",
            padding: "8px 12px",
            cursor: "pointer",
            letterSpacing: "1px",
            textTransform: "uppercase",
            boxShadow: `0 0 10px ${isThermal ? "rgba(255, 157, 0, 0.3)" : "rgba(0, 255, 255, 0.2)"}`,
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            gap: "6px"
          }}
        >
          <span style={{ display: "inline-block", width: "8px", height: "8px", background: isThermal ? "var(--neon-orange)" : "var(--neon-cyan)", borderRadius: "50%" }}></span>
          THERMAL
        </button>

        {/* Snapshot button (Tactical Trigger) */}
        <button
          onClick={takeSnapshot}
          className="parallax-hover"
          style={{
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
            clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)",
            transition: "all 0.2s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ display: "inline-block", width: "8px", height: "8px", background: "var(--neon-red)", borderRadius: "50%", animation: "glitch-anim 2s infinite" }}></span>
            CAPTURE
          </div>
        </button>
      </div>

      {/* Target Crosshair Center & Coordinates */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 3, pointerEvents: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
        {/* Reticle Graphics */}
        <div style={{ position: "relative", width: "60px", height: "60px" }}>
          {/* Outer circle */}
          <div style={{ position: "absolute", width: "100%", height: "100%", border: "1px dashed rgba(0, 255, 255, 0.4)", borderRadius: "50%", animation: "spin 10s linear infinite" }}></div>
          {/* Inner circle */}
          <div style={{ position: "absolute", top: "10px", left: "10px", width: "40px", height: "40px", border: "1px solid rgba(0, 255, 255, 0.8)", borderRadius: "50%" }}></div>
          {/* Center dot */}
          <div style={{ position: "absolute", top: "28px", left: "28px", width: "4px", height: "4px", backgroundColor: "var(--neon-cyan)", borderRadius: "50%", boxShadow: "0 0 5px var(--neon-cyan)" }}></div>
          {/* Tick marks */}
          <div style={{ position: "absolute", top: "-5px", left: "29px", width: "2px", height: "10px", backgroundColor: "var(--neon-cyan)" }}></div>
          <div style={{ position: "absolute", bottom: "-5px", left: "29px", width: "2px", height: "10px", backgroundColor: "var(--neon-cyan)" }}></div>
          <div style={{ position: "absolute", left: "-5px", top: "29px", width: "10px", height: "2px", backgroundColor: "var(--neon-cyan)" }}></div>
          <div style={{ position: "absolute", right: "-5px", top: "29px", width: "10px", height: "2px", backgroundColor: "var(--neon-cyan)" }}></div>
        </div>

        {/* Dynamic Coordinates */}
        <div style={{
          background: "rgba(0,0,0,0.5)",
          padding: "2px 6px",
          border: "1px solid rgba(0,255,255,0.3)",
          color: "var(--neon-cyan)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          display: "flex",
          gap: "8px"
        }}>
          <span>AX: <b className="data-number">{targetCoords.x.toFixed(2)}</b></span>
          <span>AY: <b className="data-number">{targetCoords.y.toFixed(2)}</b></span>
        </div>
      </div>

      {/* CSS for Reticle Spin */}
      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>

      {/* Local Webcam Stream */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: "scaleX(-1)", /* Mirror the webcam feed */
          filter: isThermal
            ? "invert(1) hue-rotate(180deg) saturate(3) contrast(1.5)"
            : "contrast(1.2) saturate(1.1) sepia(0.2) hue-rotate(180deg)", /* Give it a technical/cyan tint normally */
          transition: "filter 0.5s ease"
        }}
      />
    </div>
  );
}
