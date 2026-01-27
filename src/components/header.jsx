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
      className="panel"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
      }}
    >
      {/* Title */}
      <div>
        <h2 className="orange" style={{ margin: 0 }}>
          BIOMODULE DASHBOARD
        </h2>
        <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.6 }}>
          Vicharaka | Telemetry Interface
        </p>
      </div>

      {/* Connection LED */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>
          ROS
        </span>
        <span
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            backgroundColor: connected ? "#4cff4c" : "#ff4c4c",
            boxShadow: connected
              ? "0 0 8px rgba(76,255,76,0.8)"
              : "0 0 8px rgba(255,76,76,0.6)",
          }}
        />
        <span
          style={{
            fontSize: "0.8rem",
            color: connected ? "#4cff4c" : "#ff4c4c",
            fontWeight: "bold",
          }}
        >
          {connected ? "ONLINE" : "OFFLINE"}
        </span>
      </div>
    </header>
  );
}
