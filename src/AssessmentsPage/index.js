import { PrinterFilled } from "@ant-design/icons";
import { Breadcrumb, Button, Drawer, Layout, Tabs, Typography } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { PureComponent } from "react";
import LineAreaChart from "../LineAreaChart";
import FrequencyTab from "./FrequencyTab";
import SummaryTab from "./SummaryTab";
import logo from '../assets/logo.png'

class AssessmentsPage extends PureComponent {
  render() {
    return (
      <Tabs tabBarExtraContent={{
        left: (<div className="header-logo"><img src={logo}/></div>),
        right: (<Button size="large" onClick={() => window.print()} icon={<PrinterFilled/>}></Button>)
      }} type="card" defaultActiveKey="4" centered>
        <Tabs.TabPane key="1" tab="SUMMARY" >
          <SummaryTab />
        </Tabs.TabPane>
        <Tabs.TabPane key="2" disabled tab="PERFORMANCE" />
        <Tabs.TabPane key="3" disabled tab="ANALYSIS" />
        <Tabs.TabPane key="4" tab="FREQUENCY">
          <FrequencyTab />
        </Tabs.TabPane>
        <Tabs.TabPane key="5" disabled tab="STANDARDS" />
        <Tabs.TabPane key="6" disabled tab="STUDENTS" />
      </Tabs>
    );
  }
}

export default AssessmentsPage;
