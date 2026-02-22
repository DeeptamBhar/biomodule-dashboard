import { useEffect, useState } from "react";
import { rosConnected } from "../ros/ros";

export default function Header() {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Poll ROS connection state safely
    const timer = setInterval(() => {
      setConnected(rosConnected);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <header
      className={`cyber-panel ${!connected ? 'system-critical' : ''}`}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        margin: "16px 16px 0 16px",
        borderBottom: "2px solid var(--neon-cyan)",
      }}
    >
      {/* Title */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 className="neon-cyan" style={{ margin: 0, fontSize: "1.8rem", letterSpacing: "3px", textTransform: "uppercase" }}>
          Biomodule Dashboard
        </h2>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
          <div style={{ width: "20px", height: "2px", background: "var(--neon-orange)" }}></div>
          <span className="neon-orange" style={{ fontSize: "0.85rem", letterSpacing: "2px", fontFamily: "var(--font-mono)" }}>
            VICHARAKA // TELEMETRY INTERFACE // v1.0
          </span>
        </div>
      </div>

      {/* Connection Status */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px 16px",
        background: connected ? "rgba(0, 255, 255, 0.1)" : "rgba(255, 42, 42, 0.1)",
        border: `1px solid ${connected ? 'var(--neon-cyan)' : 'var(--neon-red)'}`,
        borderRadius: "4px",
      }}>
        <span style={{ fontSize: "0.85rem", fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.7)" }}>
          SYS.LINK&gt;
        </span>
        <span
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: connected ? "var(--neon-cyan)" : "transparent",
            boxShadow: connected ? "0 0 10px var(--neon-cyan)" : "none",
            animation: connected ? "none" : "glitch-anim 0.5s infinite",
            background: connected ? "" : "var(--neon-red)"
          }}
        />
        <span
          className={connected ? "neon-cyan" : "glitch"}
          style={{
            fontSize: "0.95rem",
            fontFamily: "var(--font-mono)",
            letterSpacing: "1px",
            lineHeight: 1
          }}
        >
          {connected ? "ESTABLISHED" : "NO SIGNAL"}
        </span>
      </div>
    </header>
  );
}
