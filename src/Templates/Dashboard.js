import React, { useCallback, useState } from "react";
import { Avatar, Button, Layout, Menu, Tooltip } from "antd";
import { AlignLeftOutlined, CaretLeftFilled, CaretRightFilled, FileAddOutlined, LeftCircleFilled, QuestionCircleFilled, QuestionOutlined, SettingFilled, SettingOutlined, UserAddOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
const { Sider, Content } = Layout;

const getInitials = text => text.split(/\s/).filter((v,i,arr) => (i===0 || i===arr.length-1)).map(s=>s[0]).join('').toUpperCase()

const createMenuItem = (key, children, icon) => <Menu.Item {...{key,children, icon}} />

const DashboardTemplate = (props) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const history = useHistory();
  const pathName = location.pathname.slice(1);
  const toggleCollapsed = useCallback(
    () => {
      setCollapsed(c => !c);
    },
    [],
  );
  const menuClicked = useCallback(
    (e)=>{
      history.push('/'+e.key);
    },
    []
  );
  const userName = 'Test User'
  return (
    <Layout
      style={{
        height: '100vh',
        width: '100%',
        maxWidth: '100%',
        maxHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <div style={{position: 'relative'}} >
        
      <Sider
        collapsed={collapsed}
        trigger={null}
        style={{
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Menu
          theme="dark"
          mode="vertical"
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            // alignItems: 'center'
          }}
          selectedKeys={[pathName]}
          onClick={menuClicked}
          >
          <Menu.Item key="engagement" icon={<AlignLeftOutlined />}>Engagement</Menu.Item>
          <Menu.Item key="assessments" icon={<AlignLeftOutlined />}>Assessments</Menu.Item>
          <Menu.Item icon={<FileAddOutlined />}>Menu 3</Menu.Item>
          <Menu.Divider  />
          <Menu.Item icon={<AlignLeftOutlined />}>Menu 4</Menu.Item>
          <Menu.Item icon={<AlignLeftOutlined />}>Menu 5</Menu.Item>
          <Menu.Item icon={<AlignLeftOutlined />}>Menu 6</Menu.Item>
          <Menu.Divider />
          <Menu.Item icon={<AlignLeftOutlined />}>Menu 7</Menu.Item>
          <Menu.Divider />
          <Menu.Item icon={<SettingFilled />}>Settings</Menu.Item>
          <div className="spacing" />
          <Menu.Item icon={<QuestionOutlined style={{fontSize: '24px'}} />}>Help</Menu.Item>
          <Menu.Item icon={<Avatar size="large" >{getInitials(userName)}</Avatar>}>Test User</Menu.Item>
        </Menu>
      </Sider>
        <div style={{
          position: 'absolute',
          top: '64px',
          right: '0',
          transform: 'translate(+50%, -50%)',
          height: 'max-content',
          zIndex: '1'
        }}>
        <Tooltip title={collapsed?'Expand':'Close'}>
          <Button
            size="small"
            onClick={toggleCollapsed}
            icon={collapsed?<CaretRightFilled />: <CaretLeftFilled />}
            type="primary"
            shape="circle" />
        </Tooltip>
        </div>
      </div>
      <Content
        style={{
          overflow: 'auto',
          // maxWidth: '100%',
          maxHeight: '100vh',
        }}
      >{children}</Content>
    </Layout>
  );
};

export default DashboardTemplate;
