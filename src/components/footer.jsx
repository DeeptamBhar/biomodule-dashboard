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
      className="panel"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "0.85rem",
        padding: "10px 16px",
        letterSpacing: "0.5px",
      }}
    >
      {/* Rover status */}
      <span style={{ opacity: 0.8 }}>
        🛰 Rover Status:{" "}
        <span
          style={{
            color: status === "ONLINE" ? "#4cff4c" : "#ff4c4c",
            fontWeight: "bold",
          }}
        >
          {status}
        </span>
      </span>

      {/* GPS */}
      <span>
        GPS → Lat: <b>{lat}</b> | Lon: <b>{lon}</b>
      </span>

      {/* Telemetry */}
      <span style={{ opacity: 0.6 }}>
        Telemetry: {ros ? "ACTIVE" : "DISCONNECTED"}
      </span>
    </footer>
  );
}
