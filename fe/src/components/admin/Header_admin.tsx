import { Header } from 'antd/es/layout/layout'
import { Avatar, theme, Input, Dropdown, Menu } from "antd"
import { SearchProps } from 'antd/es/input';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const { Search } = Input;

const Header_admin = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    const menu = (
        <Menu>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                Logout
            </Menu.Item>
        </Menu>
    );
    return (
        <Header style={{ padding: 0, background: colorBgContainer }} className="flex items-center gap-4 justify-end mx-4">
            <Search placeholder="input search text" allowClear onSearch={onSearch} style={{ width: 200 }} />
            <Dropdown overlay={menu} trigger={['click']}>
                <div className="flex items-center gap-3 cursor-pointer">
                    <Avatar size={34} icon={<UserOutlined />} />
                    <span>Admin</span>
                </div>
            </Dropdown>
        </Header>
    )
}

export default Header_admin