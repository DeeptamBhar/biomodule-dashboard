import { useEffect, useState } from "react";
import * as ROSLIB from "roslib";
import { ros } from "../ros/ros";

export default function Sidebar() {
  // UI fallback values (used when ROS is absent)
  const [temp, setTemp] = useState("--");
  const [humidity, setHumidity] = useState("--");
  const [oxygen, setOxygen] = useState("--");

  useEffect(() => {
    // If ROS is not connected, do nothing (UI stays alive)
    if (!ros) {
      console.warn("Sidebar running in UI-only mode (no ROS)");
      return;
    }

    // ROS topics
    const tempTopic = new ROSLIB.Topic({
      ros,
      name: "/env/temperature",
      messageType: "std_msgs/Float32",
    });

    const humTopic = new ROSLIB.Topic({
      ros,
      name: "/env/humidity",
      messageType: "std_msgs/Float32",
    });

    const oxyTopic = new ROSLIB.Topic({
      ros,
      name: "/env/oxygen",
      messageType: "std_msgs/Float32",
    });

    // Subscriptions
    tempTopic.subscribe((msg) => setTemp(msg.data.toFixed(1)));
    humTopic.subscribe((msg) => setHumidity(msg.data.toFixed(1)));
    oxyTopic.subscribe((msg) => setOxygen(msg.data.toFixed(1)));

    // Cleanup on unmount
    return () => {
      tempTopic.unsubscribe();
      humTopic.unsubscribe();
      oxyTopic.unsubscribe();
    };
  }, []);

  return (
    <aside className="panel">
      <h3 className="orange" style={{ marginBottom: "6px" }}>
        Site 1
      </h3>

      <div style={{ marginBottom: "12px" }}>
        <label><input type="checkbox" /> Protein</label><br />
        <label><input type="checkbox" /> Carbohydrate</label><br />
        <label><input type="checkbox" /> Chlorophyll</label>
      </div>

      <hr style={{ opacity: 0.3 }} />

      <h3 className="orange" style={{ marginBottom: "4px" }}>
        Live Sensors
      </h3>
      <p style={{ fontSize: "0.8rem", opacity: 0.6, marginBottom: "10px" }}>
        {ros ? "ROS data stream" : "UI-only mode"}
      </p>

      <div style={{ lineHeight: "1.8" }}>
        <p>🌡 Temperature: <b>{temp} °C</b></p>
        <p>💧 Humidity: <b>{humidity} %</b></p>
        <p>🫁 Oxygen: <b>{oxygen} %</b></p>
      </div>
    </aside>
  );
}
