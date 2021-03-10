import React, { Component } from "react";
import { Breadcrumb, Button, Drawer, Layout, Menu, Select, Space, Tabs, Typography } from "antd";
import Sider from "antd/lib/layout/Sider";
import LineAreaChart from "../LineAreaChart";
import EngagementHeader from "./EngagementHeader";
import { ArrowLeftOutlined, PrinterFilled } from "@ant-design/icons";
import FiltersPanel from "../FiltersPanel";
import logo from '../assets/logo.png'

const { Header, Content, Footer } = Layout;

const schoolYears = [21,20,19,18,17,16].map(i => ({label:`20${i}-${i-1}`, value: i}));

class EngagementSummary extends Component {
  state = {
    drawer: null,
    filtersOpen: false,
  };
  openDrawer = (name) => () => {
    this.setState({ drawer: name });
  };
  toggleDrawer = (name) => () => {
    this.setState((prev) => ({ drawer: prev.drawer === name ? null : name }));
  };
  toggleFilters = () => {
    this.setState(prevState => ({filtersOpen: !prevState.filtersOpen}))
  }
  filters = {
    'FIND THE TEST': (<>
      <label><span style={{display: 'block'}}>SCHOOL YEAR</span>
        <Select allowClear className="full-width" options={schoolYears} placeholder="Select a value"/>
      </label>
    <label><span style={{display: 'block'}}>TEST GRADE</span>
      <Select allowClear className="full-width" options={schoolYears} placeholder="Select a value"/>
    </label>
    <label><span style={{display: 'block'}}>TEST SUBJECT</span>
      <Select allowClear className="full-width" options={schoolYears} placeholder="Select a value"/>
    </label>
    <label><span style={{display: 'block'}}>TEST TYPE</span>
      <Select mode="multiple" allowClear className="full-width" options={schoolYears} placeholder="Select a value"/>
    </label>
    <label><span style={{display: 'block'}}>TAGS</span>
      <Select allowClear className="full-width" options={schoolYears} placeholder="Select a value"/>
    </label>
    <label><span style={{display: 'block'}}>TEST</span>
      <Select allowClear className="full-width" options={schoolYears} placeholder="Select a value"/>
    </label>
    </>),
    'CLASS FILTER': (<>
      <label><span style={{display: 'block'}}>TEST TYPE</span>
        <Select allowClear className="full-width" options={schoolYears} placeholder="Select a value"/>
      </label>
      </>),
    'PERFORMANCE': (<>
      <label><span style={{display: 'block'}}>SCHOOL YEAR</span>
        <Select allowClear className="full-width" options={schoolYears} placeholder="Select a value"/>
      </label>
      </>),
  }
  render() {
    return (
        <Tabs tabBarExtraContent={{
          left: (<div className="header-logo"><img src={logo}/></div>),
          right: (<Button size="large" onClick={() => window.print()} icon={<PrinterFilled/>}></Button>)
        }} type="card" defaultActiveKey="1" centered>
          <Tabs.TabPane tab="SUMMARY" key="1">
            <Breadcrumb>
              <Breadcrumb.Item>{"<"} INSIGHTS</Breadcrumb.Item>
              <Breadcrumb.Item>ENGAGEMENT SUMMARY</Breadcrumb.Item>
            </Breadcrumb>
            <Layout hasSider>
              <FiltersPanel filters={this.filters}/>
              <Content>
                <div className="header-row">
                  <div className="paper-text">
                    <div>Active Teachers</div>
                    <div className="value">94</div>
                  </div>
                  <div className="paper-text">
                    <div>Active Students</div>
                    <div className="value">289</div>
                  </div>
                  <div className="paper-text">
                    <div>Assignments Assigned</div>
                    <div className="value">408</div>
                  </div>
                </div>
                <Typography.Title level={4} >
                Activity Timeline
                </Typography.Title>
                <LineAreaChart />
              </Content>
            </Layout>
          </Tabs.TabPane>
          <Tabs.TabPane disabled tab="ACTIVITY BY SCHOOL" key="2">
            ACTIVITY BY SCHOOL
          </Tabs.TabPane>
          <Tabs.TabPane disabled tab="ACTIVITY BY TEACHER" key="3">
            ACTIVITY BY TEACHER
          </Tabs.TabPane>
        </Tabs>
    );
  }
}

export default EngagementSummary;
