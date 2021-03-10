import { Breadcrumb, Drawer, Typography } from 'antd'
import Layout, { Content } from 'antd/lib/layout/layout'
import React from 'react'
import LineAreaChart from '../LineAreaChart'

export default function FrequencyTab() {
  return (
    <>
    <Breadcrumb>
      <Breadcrumb.Item>{"<"} INSIGHTS</Breadcrumb.Item>
      <Breadcrumb.Item>RESPONSE FREQUENCY</Breadcrumb.Item>
    </Breadcrumb>
    <Layout>
      <Drawer mask={false} />
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
    </>
  )
}
