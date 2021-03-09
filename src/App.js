// import "antd/dist/antd.css";
import "./styles.css";
import EngagementSummary from "./EngagementSummary";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import DashboardTemplate from "./Templates/Dashboard";

export default function App() {
  return (
    <div className="App">
      <DashboardTemplate>
            <EngagementSummary />
      </DashboardTemplate>
    </div>
  );
}
