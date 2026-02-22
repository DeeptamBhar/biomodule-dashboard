import { useState, useEffect } from "react";

export default function SiteBox({ title, videoUrl, data, recordings }) {
  // State to hold sparkline data points (e.g., 20 points)
  const [history, setHistory] = useState(Array(20).fill(50));
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory(prev => {
        const next = [...prev.slice(1)];
        // Add random fluctuation around the last point (clamped between 10 and 90)
        let newPoint = next[next.length - 1] + (Math.random() * 20 - 10);
        newPoint = Math.max(10, Math.min(90, newPoint));
        next.push(newPoint);
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Generate SVG path string
  const width = 60;
  const height = 24;
  const pathData = `M 0,${(100 - history[0]) / 100 * height} ` + history.map((val, i) => {
    const x = (i / (history.length - 1)) * width;
    const y = ((100 - val) / 100) * height; // Invert Y
    return `L ${x},${y}`;
  }).join(' ');

  return (
    <div
      className="cyber-panel parallax-hover"
      style={{
        position: "relative",
        overflow: "hidden",
        fontSize: "0.9rem",
        lineHeight: "1.8",
        padding: "0" // Remove padding from the main wrapper so video anchors to top
      }}
    >
      {/* Active Video Playback Mode (Opaque, Unfiltered, Block level) */}
      {activeVideo && (
        <div style={{
          position: "relative",
          width: "100%",
          height: "140px", /* Fixed height for the video player at the top */
          backgroundColor: "#000",
          zIndex: 5
        }}>
          <video
            src={activeVideo}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scaleX(-1)", /* Mirror to match original recording feed */
              borderBottom: "1px solid rgba(0,255,255,0.3)"
            }}
          />
        </div>
      )}

      {/* Subtle Live Video Background Layer (Aesthetic Mode) */}
      {!activeVideo && videoUrl && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.35, /* Keep opacity low to ensure readability */
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)"
        }}>
          <img
            src={videoUrl}
            crossOrigin="anonymous"
            alt={`${title} Camera Feed`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "sepia(1) hue-rotate(180deg) saturate(2) brightness(0.8) contrast(1.2)"
            }}
          />
          {/* Scanline overlay for aesthetic */}
          <div className="tactical-scanline" style={{ opacity: 0.5 }}></div>
        </div>
      )}

      {/* Content wrapper to raise above the video background */}
      <div style={{
        position: "relative",
        zIndex: 1,
        padding: "16px",
        height: activeVideo ? "calc(100% - 140px)" : "100%", // Adjust height based on video presence
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h4 className="neon-orange" style={{ margin: 0, fontSize: "1.2rem", letterSpacing: "1px", textTransform: "uppercase" }}>
            {title}
          </h4>

          {/* Real-time SVG Sparkline Base */}
          <div style={{ width: `${width}px`, height: `${height}px`, position: "relative" }}>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
              <path
                d={pathData}
                fill="none"
                stroke="var(--neon-cyan)"
                strokeWidth="1.5"
                style={{ filter: "drop-shadow(0px 0px 4px var(--neon-cyan))", transition: "d 1s linear" }}
              />
            </svg>
          </div>
        </div>

        <div style={{ opacity: 0.9, display: "flex", flexDirection: "column", gap: "6px" }}>
          {Object.entries(data).map(([key, value]) => {
            // Attempt to extract the number from the string e.g., "27.5 °C"
            const numberMatch = value.match(/[\d.]+/);
            const unitMatch = value.replace(/[\d.]+/g, '').trim();

            // When active video is playing, condense the padding to fit the new layout
            const paddingBottom = activeVideo ? "2px" : "4px";

            return (
              <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid rgba(0, 255, 255, 0.1)", paddingBottom: paddingBottom }}>
                <span style={{ color: "rgba(255,255,255,0.6)", textTransform: "uppercase", fontSize: activeVideo ? "0.7rem" : "0.8rem", letterSpacing: "1px" }}>{key}</span>
                <span>
                  <span className="data-number neon-cyan" style={{ fontSize: activeVideo ? "0.9rem" : "1.05rem" }}>{numberMatch ? numberMatch[0] : value}</span>
                  {numberMatch && <span style={{ marginLeft: "4px", fontSize: "0.75rem", color: "var(--neon-orange)" }}>{unitMatch}</span>}
                </span>
              </div>
            );
          })}
        </div>

        {/* Recordings Archive */}
        {recordings && recordings.length > 0 && (
          <div style={{ marginTop: "10px", borderTop: "1px solid rgba(0,255,255,0.2)", paddingTop: "8px", zIndex: 10, position: "relative" }}>
            <span style={{ fontSize: "0.7rem", color: "var(--neon-cyan)", textTransform: "uppercase", letterSpacing: "1px" }}>ARCHIVES ({recordings.length})</span>
            <div style={{ display: "flex", gap: "6px", marginTop: "6px", flexWrap: "wrap" }}>
              {recordings.map((rec, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVideo(rec)}
                  style={{
                    background: activeVideo === rec ? "rgba(0,255,255,0.3)" : "rgba(0,0,0,0.5)",
                    border: "1px solid var(--neon-cyan)",
                    color: "white",
                    fontSize: "0.75rem",
                    padding: "2px 8px",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    transition: "background 0.2s"
                  }}
                >
                  CLIP #{idx + 1}
                </button>
              ))}
              {activeVideo && (
                <button
                  onClick={() => setActiveVideo(null)}
                  style={{
                    background: "rgba(255,42,42,0.2)",
                    border: "1px solid var(--neon-red)",
                    color: "white",
                    fontSize: "0.75rem",
                    padding: "2px 8px",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    marginLeft: "auto"
                  }}
                >
                  LIVE VIEW
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
