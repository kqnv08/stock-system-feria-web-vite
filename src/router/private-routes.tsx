import {
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;


const App: React.FC = () => {
const navigate = useNavigate();

const items: MenuProps['items'] = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Usuarios',
        onClick: () => navigate("dashboard")
    },
    {
        key: '2',
        icon: <VideoCameraOutlined />,
        label: 'Videos',
        onClick: () => navigate("products")
    },
    {
        key: '3',
        icon: <UploadOutlined />,
        label: 'Archivos',
    },
]
    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Stock System ©2023 Created by Facu Vega</Footer>
            </Layout>
        </Layout>
    )
};

export default App;