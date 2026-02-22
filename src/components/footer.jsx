import { useEffect, useState } from "react";
import * as ROSLIB from "roslib";
import { ros } from "../ros/ros";

export default function Footer() {
  // Fallback UI values
  const [lat, setLat] = useState("--");
  const [lon, setLon] = useState("--");
  const [status, setStatus] = useState("OFFLINE");

  useEffect(() => {
    // If ROS is not connected, stay in UI-only mode
    if (!ros) {
      console.warn("Footer running in UI-only mode (no ROS)");
      setStatus("OFFLINE");
      return;
    }

    setStatus("ONLINE");

    const gpsTopic = new ROSLIB.Topic({
      ros,
      name: "/gps/fix",
      messageType: "sensor_msgs/NavSatFix",
    });

    gpsTopic.subscribe((msg) => {
      setLat(msg.latitude.toFixed(6));
      setLon(msg.longitude.toFixed(6));
    });

    return () => {
      gpsTopic.unsubscribe();
    };
  }, []);

  return (
    <footer
      className="cyber-panel"
      style={{
        display: "flex",
        alignItems: "center",
        fontSize: "0.85rem",
        padding: "0", /* Padding removed for ticker */
        margin: "0 16px 16px 16px",
        height: "40px", /* Fixed height for ticker */
        letterSpacing: "1px",
        fontFamily: "var(--font-mono)",
        borderTop: "2px solid var(--neon-cyan)",
        overflow: "hidden"
      }}
    >
      {/* Static Label Left */}
      <div style={{
        padding: "0 16px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "rgba(0, 255, 255, 0.15)",
        borderRight: "1px solid var(--neon-cyan)",
        fontWeight: "bold",
        zIndex: 2
      }}>
        <span className="neon-cyan">SYS.DIAGNOSTICS //</span>
      </div>

      {/* Scrolling Ticker */}
      <div className="ticker-wrap" style={{ flex: 1, height: "100%" }}>
        <div className="ticker-content" style={{ display: "flex", alignItems: "center", gap: "50px", height: "100%" }}>
          <span style={{ opacity: 0.8 }}>
            🛰 ROVER_STATUS:{" "}
            <span
              className={status === "ONLINE" ? "neon-cyan" : "glitch"}
            >
              [{status}]
            </span>
          </span>

          <span>
            GPS_COORDS &gt; LAT: <b className="neon-orange">{lat}</b> // LON: <b className="neon-orange">{lon}</b>
          </span>

          <span style={{ opacity: 0.8 }}>
            TELEM_UPLINK: <span className={ros ? "neon-cyan" : "glitch"}>[{ros ? "ACTIVE" : "DISCONNECTED"}]</span>
          </span>

          <span style={{ opacity: 0.8 }}>
            POWER_CORE: <span className="neon-cyan">[NOMINAL 98%]</span>
          </span>
          <span style={{ opacity: 0.8 }}>
            THERMAL_REG: <span className="neon-cyan">[STABLE 22C]</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
