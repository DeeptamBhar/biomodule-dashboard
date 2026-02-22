import { useState, useEffect } from "react";

export default function ImuWidget() {
    const [pitch, setPitch] = useState(0);
    const [roll, setRoll] = useState(0);
    const [yaw, setYaw] = useState(0);

    // Simulate IMU data fluctuations
    useEffect(() => {
        const interval = setInterval(() => {
            setPitch(p => p + (Math.random() * 2 - 1));
            setRoll(r => r + (Math.random() * 2 - 1));
            setYaw(y => (y + 1) % 360);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="cyber-panel parallax-hover"
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px",
                position: "relative",
                overflow: "hidden"
            }}
        >
            <h4 className="neon-cyan" style={{ position: "absolute", top: "12px", left: "16px", margin: 0, fontSize: "0.9rem", letterSpacing: "1px" }}>
                ROVER.IMU_SYS
            </h4>

            {/* 3D Scene */}
            <div style={{
                perspective: "800px",
                width: "120px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "16px"
            }}>
                {/* The Rover Wireframe Box */}
                <div style={{
                    width: "60px",
                    height: "20px",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${pitch}deg) rotateY(${yaw}deg) rotateZ(${roll}deg)`,
                    transition: "transform 0.1s linear"
                }}>
                    {/* Top face */}
                    <div style={{ position: "absolute", width: "60px", height: "40px", border: "1px solid var(--neon-cyan)", transform: "rotateX(90deg) translateZ(10px)", background: "rgba(0,255,255,0.1)" }}></div>
                    {/* Bottom face */}
                    <div style={{ position: "absolute", width: "60px", height: "40px", border: "1px solid var(--neon-cyan)", transform: "rotateX(-90deg) translateZ(10px)" }}></div>
                    {/* Front face */}
                    <div style={{ position: "absolute", width: "60px", height: "20px", border: "1px solid var(--neon-orange)", transform: "translateZ(20px)", background: "rgba(255,157,0,0.2)" }}></div>
                    {/* Back face */}
                    <div style={{ position: "absolute", width: "60px", height: "20px", border: "1px solid var(--neon-cyan)", transform: "rotateY(180deg) translateZ(20px)" }}></div>
                    {/* Left face */}
                    <div style={{ position: "absolute", width: "40px", height: "20px", border: "1px solid var(--neon-cyan)", transform: "rotateY(-90deg) translateZ(30px)" }}></div>
                    {/* Right face */}
                    <div style={{ position: "absolute", width: "40px", height: "20px", border: "1px solid var(--neon-cyan)", transform: "rotateY(90deg) translateZ(30px)" }}></div>
                </div>
            </div>

            {/* Data Readout */}
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                marginTop: "16px",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.7)",
                borderTop: "1px solid rgba(0,255,255,0.2)",
                paddingTop: "8px"
            }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>PITCH</span>
                    <b className="data-number neon-cyan">{pitch.toFixed(1)}°</b>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>ROLL</span>
                    <b className="data-number neon-cyan">{roll.toFixed(1)}°</b>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>YAW</span>
                    <b className="data-number neon-cyan">{yaw.toFixed(1)}°</b>
                </div>
            </div>
        </div>
    );
}
