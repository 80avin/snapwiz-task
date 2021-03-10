import { Button, Radio } from 'antd';
import React, { useCallback, useState } from 'react';

const EngagementHeader = props => {
  const [activeTab, setActiveTab] = useState(0)
  const changeTab = useCallback(
    (e) => {
      setActiveTab(e.target.value)
    },
    [],
  );
  return (
    <div className="sw-header">
      <div className="logo"></div>
      <div className="spacing" />
      <div>
        <Radio.Group onChange={changeTab} value={activeTab}>
          <Radio.Button value="1">SUMMARY</Radio.Button>
          <Radio.Button value="2">ACTIVITY BY SCHOOL</Radio.Button>
          <Radio.Button value="3">ACTIVITY BY TEACHER</Radio.Button>
        </Radio.Group>
      </div>
      <div className="spacing"/>
      <div></div>
    </div>
  )
}
export default EngagementHeader;