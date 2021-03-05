// import "antd/dist/antd.css";
import "./styles.css";
import EngagementSummary from "./EngagementSummary";

export default function App() {
  return (
    <div className="App">
      <div style={{ minHeight: "500px", minWidth: "500px" }}>
        {/* <LineAreaChart /> */}
        <EngagementSummary />
      </div>
    </div>
  );
}
