import React, { useCallback, useState } from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined, FilterFilled, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Collapse, Tooltip } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import PropTypes from 'prop-types';

function FiltersPanel(props) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(null);
  const toggleFilters = useCallback(
    () => {
      setFiltersOpen(p => !p);
    },
    [],
  );
  const getExpandIcon = useCallback(
    (e) => {
      if(e.isActive) return <MinusOutlined />
      return <PlusOutlined />
    },
    [],
  );
  return (
    <Sider collapsedWidth="32px" className="filters-panel" theme="light" collapsed={!filtersOpen}>
      <div className="filter-header">
        <div className="hide-collapsed full-width">FILTERS</div>
        <div style={{flexShrink: 0}}>
          <Tooltip title="Filters">
            <Button onClick={toggleFilters} icon={filtersOpen?<ArrowLeftOutlined />:<FilterFilled />} />
          </Tooltip>
        </div>
      </div>
      <div className="hide-collapsed">
      <Collapse expandIconPosition="right" expandIcon={getExpandIcon} accordion bordered={false} >
        {
          Object.keys(props.filters).map((k,i) => (
            <Collapse.Panel key={i.toString()} header={k}>
              {props.filters[k]}
            </Collapse.Panel>
          ))
        }
      </Collapse>
      </div>
    </Sider>
  )
}
FiltersPanel.propTypes = {
  filters: PropTypes.object,
}
FiltersPanel.defaultProps = {
  filters: {},
}

export default FiltersPanel;
