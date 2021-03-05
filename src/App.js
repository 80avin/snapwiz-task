// import "antd/dist/antd.css";
import "./styles.css";
import EngagementSummary from "./EngagementSummary";
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";

export default function App() {
  return (
    <div className="App">
      <div style={{ minHeight: "500px", minWidth: "500px" }}>
        {/* <LineAreaChart /> */}
        <Layout hasSider>
          <Sider collapsed theme="dark">

          </Sider>
          <Content>
            <EngagementSummary />
          </Content>
        </Layout>
      </div>
    </div>
  );
}
