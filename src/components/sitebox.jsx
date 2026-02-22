export default function SiteBox({ title, data }) {
  return (
    <div
      className="cyber-panel parallax-hover"
      style={{
        padding: "16px",
        fontSize: "0.9rem",
        lineHeight: "1.8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h4 className="neon-orange" style={{ margin: 0, fontSize: "1.2rem", letterSpacing: "1px" }}>
          {title}
        </h4>

        {/* Animated Waveform */}
        <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "16px" }}>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
          <div className="waveform-bar"></div>
        </div>
      </div>

      <div style={{ opacity: 0.9, display: "flex", flexDirection: "column", gap: "6px" }}>
        {Object.entries(data).map(([key, value]) => (
          <div key={key} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(0, 255, 255, 0.1)", paddingBottom: "4px" }}>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>{key}</span>
            <span className="neon-cyan" style={{ fontWeight: 600 }}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
