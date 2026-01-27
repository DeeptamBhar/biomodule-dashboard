export default function SiteBox({ title, data }) {
  return (
    <div
      className="panel"
      style={{
        padding: "12px",
        fontSize: "0.8rem",
        lineHeight: "1.6",
      }}
    >
      <h4 className="orange" style={{ marginBottom: "6px" }}>
        {title}
      </h4>

      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <b>{key}</b>: {value}
        </div>
      ))}
    </div>
  );
}
