import { FileTextOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuProps } from "rc-menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";


type MenuItem = Required<MenuProps>['items'][number];
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<NavLink to="/admin">Thống kê</NavLink>, '1', <PieChartOutlined />),
    getItem(<NavLink to="/music">Sản phẩm</NavLink>, 'sub1', <FileTextOutlined />, [
        getItem(<NavLink to="/admin/products">Sản phẩm</NavLink>, '3'),
        getItem(<NavLink to="/admin/categori">Danh mục</NavLink>, '4'),
    ]),
]
const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            < div className="demo-logo-vertical">
                <img src="https://picsum.photos/200/50" alt="" className='p-2' />
            </div>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider >
    );
}

export default Sidebar