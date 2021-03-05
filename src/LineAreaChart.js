import React from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
  Brush
} from "recharts";
import { Button, Tooltip as TooltipAntd } from "antd";
import {
  SearchOutlined,
  ArrowLeftOutlined,
  CaretLeftFilled,
  CaretRightFilled
} from "@ant-design/icons";

import moment from "moment";
import api from "./api";

class LineAreaChart extends React.PureComponent {
  state = {
    hover: null,
    page: 0,
    data: []
  };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = (opts = {}) => {
    const { page } = opts;
    api.get("/engagement").then((res) => {
      this.setState({ data: res.data });
    });
  };
  handleLegendMouseEnter = (o) => {
    this.setState({ hover: o.dataKey });
  };
  handleLegendMouseLeave = (o) => {
    if (o.dataKey === this.state.hover) this.setState({ hover: null });
  };
  getPage = () => {
    const page = this.state.page;
    let startIdx = this.state.data.length - 4 * page - 5;
    startIdx = Math.max(0, startIdx);
    let endIdx = startIdx + 5;
    endIdx = Math.min(this.state.data.length, endIdx);
    return this.state.data.slice(startIdx, endIdx);
  };
  render() {
    const extraProps = (dataKey) => ({
      opacity: this.state.hover
        ? this.state.hover === dataKey
          ? 1
          : 0.2
        : undefined
    });
    const activePage = this.getPage();
    const isFirst =
      activePage.length === 0 || activePage[0].date === this.state.data[0].date;
    const isLast =
      activePage.length === 0 ||
      activePage[activePage.length - 1].date ===
        this.state.data[this.state.data.length - 1].date;
    // const domain = activePage.length>0?[activePage[0].date, activePage[activePage.length-1].date]:undefined;
    const domain = ["dataMin", "dataMax"];
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "0 10px",
            minWidth: "30px",
            display: "flex",
            alignItems: "center"
          }}
        >
          <TooltipAntd title="Older">
            <Button
              onClick={() => {
                this.setState((p) => ({ page: p.page + 1 }));
              }}
              type="primary"
              shape="circle"
              disabled={!!isFirst}
              icon={<CaretLeftFilled />}
            />
          </TooltipAntd>
        </div>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart width={500} height={400} data={activePage}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" scale="band" />
            <YAxis
              label={{
                value: "ASSESSMENTS ASSIGNED",
                angle: -90,
                position: "outside"
              }}
              yAxisId="left"
            />
            <YAxis
              label={{
                value: "STUDENTS TAKING ASSESSMENTS",
                angle: 90,
                position: "outside"
              }}
              yAxisId="right"
              orientation="right"
            />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              onMouseEnter={this.handleLegendMouseEnter}
              onMouseLeave={this.handleLegendMouseLeave}
              margin={{
                bottom: 8
              }}
            />
            <Area
              yAxisId="left"
              {...extraProps("assessments_assigned")}
              type="monotone"
              fill="#8884d8"
              stroke="#8884d8"
              dataKey="assessments_assigned"
              name="Assessments assigned"
            />
            <Line
              strokeWidth="2"
              yAxisId="right"
              {...extraProps("students_taking_assessments")}
              name="Students Taking Assessments"
              dataKey="students_taking_assessments"
            />
            {/* <Brush dataKey="date" /> */}
          </ComposedChart>
        </ResponsiveContainer>
        <div
          style={{
            padding: "0 10px",
            minWidth: "30px",
            display: "flex",
            alignItems: "center"
          }}
        >
          {
            <TooltipAntd title="Newer">
              <Button
                onClick={() => {
                  this.setState((p) => ({ page: p.page - 1 }));
                }}
                type="primary"
                shape="circle"
                disabled={!!isLast}
                icon={<CaretRightFilled />}
              />
            </TooltipAntd>
          }
        </div>
      </div>
    );
  }
}
export default LineAreaChart;
