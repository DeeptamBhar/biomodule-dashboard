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
      className="panel"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: 0,
      }}
    >
      {/* Overlay: FPS + Latency */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "14px",
          zIndex: 3,
          background: "rgba(0,0,0,0.55)",
          padding: "6px 10px",
          borderRadius: "6px",
          fontSize: "0.8rem",
          lineHeight: "1.4",
        }}
      >
        <div> FPS: <b>{fps}</b></div>
        <div> Latency: <b>{latency} ms</b></div>
      </div>

      {/* Snapshot button */}
      <button
        onClick={takeSnapshot}
        style={{
          position: "absolute",
          top: "10px",
          right: "14px",
          zIndex: 3,
          background: "#0c0356",
          color: "white",
          border: "1px solid orange",
          borderRadius: "6px",
          padding: "6px 10px",
          cursor: "pointer",
        }}
      >
        Capture Image
      </button>

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
        }}
      />
    </div>
  );
}
