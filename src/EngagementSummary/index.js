import React, { Component } from "react";
import { Breadcrumb, Drawer, Layout, Menu, Space, Tabs, Typography } from "antd";
import Sider from "antd/lib/layout/Sider";
import LineAreaChart from "../LineAreaChart";
const { Header, Content, Footer } = Layout;

class EngagementSummary extends Component {
  state = {
    drawer: null
  };
  openDrawer = (name) => () => {
    this.setState({ drawer: name });
  };
  toggleDrawer = (name) => () => {
    this.setState((prev) => ({ drawer: prev.drawer === name ? null : name }));
  };
  render() {
    return (
      <Layout >
        {/* <Header theme="light">
          <div className="logo" />
          <Menu
            style={{ margin: "0 auto" }}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
          >
            <Menu.Item key="1">SUMMARY</Menu.Item>
            <Menu.Item disabled key="2">
              nav 2
            </Menu.Item>
            <Menu.Item disabled key="3">
              nav 3
            </Menu.Item>
          </Menu>
        </Header> */}
        {/* </Header> */}
        <Content>

        <Tabs defaultActiveKey="1" centered>
          <Tabs.TabPane tab="SUMMARY" key="1">
            <Breadcrumb>
              <Breadcrumb.Item>{"<"} INSIGHTS</Breadcrumb.Item>
              <Breadcrumb.Item>ENGAGEMENT SUMMARY</Breadcrumb.Item>
            </Breadcrumb>
            <Layout hasSider>
              {/* <Sider collapsible>Sider</Sider> */}
              <Drawer mask={false} />
              <Content>
                <div className="header-row">
                  <div className="paper-text">
                    <div>Active Teachers</div>
                    <div></div>
                  </div>
                  <div className="paper-text">
                    <div>Active Students</div>
                    <div></div>
                  </div>
                  <div className="paper-text">
                    <div>Assignments Assigned</div>
                    <div></div>
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
        </Content>
      </Layout>
    );
  }
}

export default EngagementSummary;
