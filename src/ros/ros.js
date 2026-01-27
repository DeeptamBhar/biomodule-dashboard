import * as ROSLIB from "roslib";

export let ros = null;
export let rosConnected = false;

export function connectROS(url = "ws://localhost:9090") {
  try {
    ros = new ROSLIB.Ros({ url });

    ros.on("connection", () => {
      rosConnected = true;
      console.log("✅ Connected to ROS");
    });

    ros.on("error", (err) => {
      rosConnected = false;
      console.warn("⚠️ ROS error:", err.message);
    });

    ros.on("close", () => {
      rosConnected = false;
      console.warn("⚠️ ROS not connected (safe mode)");
    });
  } catch (e) {
    rosConnected = false;
    console.warn("⚠️ ROS unavailable, UI-only mode");
  }

  return ros;
}
