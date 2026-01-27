import Header from "./components/header";
import Sidebar from "./components/sidebar";
import VideoPanel from "./components/videoPanel";
import Footer from "./components/footer";
import SiteBox from "./components/sitebox";

export default function App() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      {/* MAIN CONTENT */}
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.2fr 2fr",
          gap: "16px",
          padding: "16px",
          overflow: "hidden",
        }}
      >
        {/* LEFT: SITE DATA (2x2 GRID) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "12px",
          }}
        >
          <SiteBox
            title="Site 1"
            data={{
              Temperature: "27.5 °C",
              Moisture: "35 %",
              Nitrogen: "685 mg/kg",
            }}
          />
          <SiteBox
            title="Site 2"
            data={{
              Temperature: "28.1 °C",
              Moisture: "33 %",
              Nitrogen: "660 mg/kg",
            }}
          />
          <SiteBox
            title="Site 3"
            data={{
              Temperature: "26.9 °C",
              Moisture: "38 %",
              Nitrogen: "702 mg/kg",
            }}
          />
          <SiteBox
            title="Site 4"
            data={{
              Temperature: "27.8 °C",
              Moisture: "36 %",
              Nitrogen: "690 mg/kg",
            }}
          />
        </div>

        {/* RIGHT: VIDEO (SMALLER, FOCUSED) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div style={{ width: "90%", height: "65%" }}>
            <VideoPanel />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
