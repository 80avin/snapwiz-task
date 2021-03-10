import React, { useCallback } from "react";
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
    data: [],
    activePage: [],
  };
  chartRef = null;
  pageSize = 5;
  componentDidMount() {
    this.fetchData();
  }
  addChartRef = ref => {
    if(!ref) return;
    this.chartRef = ref;
    this.chartRef.container.addEventListener('wheel', this.handleWheel, {passive: false});
  }
  handleWheel = e => {
    e.preventDefault();
    if(e.deltaY===0) return;
    this.changeDomain(e.deltaY>0?-1:+1);
  }
  componentWillUnmount(){
    if(!this.chartRef) return;
    this.chartRef.container.removeEventListener('wheel', this.handleWheel, {passive: false});
  }
  changePage = (diff, absolute=false) => {
    this.changeDomain(diff*(this.pageSize-1), absolute);
  }
  changeDomain = (diff, absolute=false) => {
    // +ve diff -> left = higher idx in [data]
    const activePage = (!!this.state.activePage.length && !absolute)?[...this.state.activePage]:[this.pageSize, 0];
    let leftIdx = Math.min(activePage[0] + diff, this.state.data.length);
    leftIdx = Math.max(leftIdx, this.pageSize);
    let rightIdx = Math.max(0, leftIdx - this.pageSize);
    this.setState({activePage: [leftIdx, rightIdx]});
  }
  fetchData = (opts = {}) => {
    const { page } = opts;
    api.get("/engagement").then((res) => {
      this.setState({ data: res.data }, () => this.changeDomain(0, 1));
    });
  };
  handleLegendMouseEnter = (o) => {
    this.setState({ hover: o.dataKey });
  };
  handleLegendMouseLeave = (o) => {
    if (o.dataKey === this.state.hover) this.setState({ hover: null });
  };
  getPage = () => {
    return this.state.data.slice(this.state.activePage[1], this.state.activePage[0]).reverse()
  }
  labelFormatter = v=>moment(v).format("MMM'YY");
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
      activePage.length === 0 || activePage[0].date === this.state.data[this.state.data.length-1].date;
    const isLast =
      activePage.length === 0 ||
      activePage[activePage.length - 1].date ===
        this.state.data[0].date;
    const domain = activePage.length>0?[activePage[0].timestamp, activePage[activePage.length-1].timestamp]:[0,'auto']
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
                // this.setState((p) => ({ page: p.page + 1 }));
                this.changePage(1)
              }}
              type="primary"
              shape="circle"
              disabled={!!isFirst}
              icon={<CaretLeftFilled />}
            />
          </TooltipAntd>
        </div>
        <ResponsiveContainer width="100%" height={500}>
          {/* Trick to get the horizontal scroll animation working is [...this.state.data] */}
          <ComposedChart ref={this.addChartRef} onWheel={console.log} width={500} height={400} data={[...this.state.data]}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis tickFormatter={this.labelFormatter} allowDataOverflow dataKey="timestamp" type="number" domain={domain}/>
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
            <Tooltip labelFormatter={this.labelFormatter}/>
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
                  // this.setState((p) => ({ page: p.page - 1 }));
                  this.changePage(-1)
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
