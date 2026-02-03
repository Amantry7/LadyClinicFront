import React, { useState, useEffect, ReactNode } from 'react';
import {
    Layout,
    Menu,
    Card,
    Avatar,
    Badge,
    Button,
    Row,
    Col,
    Statistic,
    List,
    Tag,
    Typography,
    Space,
    Drawer,
    Grid,
    notification,
    Timeline,
    Table,
    Modal,
    Form,
    Input,
    DatePicker,
    Select,
    FloatButton,
    Tabs,
    Progress,
    Empty,
    Divider
} from 'antd';
import {
    UserOutlined,
    CalendarOutlined,
    FileTextOutlined,
    MedicineBoxOutlined,
    HeartOutlined,
    BellOutlined,
    SettingOutlined,
    MenuOutlined,
    PhoneOutlined,
    MailOutlined,
    ClockCircleOutlined,
    PlusOutlined,
    EyeOutlined,
    HomeOutlined,
    HistoryOutlined,
    TeamOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { fetchUserById } from '@/entities/user/model/user-slice';
import NotificationsBadge from '@/features/notification/UI/NotificationsBadge';
import NotificationsList from '@/features/notification/UI/NotificationsList';
import UsersManager from '@/entities/user/ui/UsersManager';
import { useRouter } from 'next/navigation';
interface PatientDashboardProps {
    userId?: number // если есть id текущего пользователя
}

function calcAge(birth?: string | null) {
    if (!birth) return null
    const d = new Date(birth)
    if (Number.isNaN(+d)) return null
    const now = new Date()
    let age = now.getFullYear() - d.getFullYear()
    const m = now.getMonth() - d.getMonth()
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--
    return age >= 0 ? age : null
}
const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    type: 'info' | 'warning' | 'success' | 'error';
    read: boolean;
}

const PatientDashboard: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentRoute, setCurrentRoute] = useState('dashboard');
    const screens = useBreakpoint();
    const router = useRouter();


    const notifications: Notification[] = [
        {
            id: '1',
            title: 'Напоминание о приеме',
            message: 'Завтра в 10:00 прием у кардиолога в кабинете 301',
            time: '2 часа назад',
            type: 'warning',
            read: false
        },
        {
            id: '2',
            title: 'Результаты анализов',
            message: 'Результаты общего анализа крови от 05.08.2025 готовы',
            time: '1 день назад',
            type: 'success',
            read: false
        },
        {
            id: '3',
            title: 'Изменение расписания',
            message: 'Прием 23.08 перенесен на 15:00 по просьбе врача',
            time: '2 дня назад',
            type: 'info',
            read: true
        }
    ];

    const menuItems = [
        {
            key: '',
            icon: <HomeOutlined />,
            label: 'Главная',
            route: '/'
        },
        {
            key: 'appointments',
            icon: <CalendarOutlined />,
            label: 'Записи',
            route: '/appointments'
        },
        {
            key: 'medical-records',
            icon: <FileTextOutlined />,
            label: 'Мед. карта',
            route: '/medical-records'
        },
        {
            key: 'prescriptions',
            icon: <MedicineBoxOutlined />,
            label: 'Рецепты',
            route: '/prescriptions'
        },
        {
            key: 'notifications',
            icon: <BellOutlined />,
            label: 'Уведомления',
            route: '/notifications',
            badge: notifications.filter(n => !n.read).length
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Настройки',
            route: '/settings'
        }
    ];

    const isMobile = !screens.md;
    const unreadNotifications = notifications.filter(n => !n.read).length;

    // Навигация по роутам
    const handleRouteChange = (route: string) => {
        setCurrentRoute(route);
        // В реальном приложении здесь был бы Next.js Router
        router.push(`/profile/${route}`);
    };

    const getCurrentPageTitle = () => {
        const currentItem = menuItems.find(item => item.key === currentRoute);
        return currentItem?.label || 'Главная';
    };

    // Боковое меню
    const sidebarContent = (
        <Menu
            mode="inline"
            onClick={({ key }) => handleRouteChange(key)}
            selectedKeys={[currentRoute]}
            style={{ height: '100%', borderRight: 0, paddingTop: '8px' }}
            items={menuItems.map(item => ({
                key: item.key,
                icon: item.badge ? <Badge count={item.badge} size="small">{item.icon}</Badge> : item.icon,
                label: item.label,
                onClick: () => handleRouteChange(item.key)
            }))}
        />
    );

    // Мобильная нижняя навигация
    const MobileBottomNav: React.FC = () => (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderTop: '1px solid #f0f0f0',
            padding: '8px 0',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            boxShadow: '0 -2px 8px rgba(0,0,0,0.1)'
        }}>
            {menuItems.slice(0, 5).map((item) => (
                <Button
                    key={item.key}
                    type="text"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: 'auto',
                        padding: '4px 8px',
                        color: currentRoute === item.key ? '#1890ff' : '#666',
                        fontSize: '10px',
                        minWidth: '60px'
                    }}
                    onClick={() => handleRouteChange(item.key)}
                >
                    {item.badge ? (
                        <Badge count={item.badge} size="small">
                            {React.cloneElement(item.icon, { style: { fontSize: '18px' } })}
                        </Badge>
                    ) : (
                        React.cloneElement(item.icon, { style: { fontSize: '18px' } })
                    )}
                    <span style={{ marginTop: '2px', fontSize: '10px' }}>{item.label}</span>
                </Button>
            ))}
        </div>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Десктопная боковая панель */}
            {!isMobile && (
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    collapsedWidth="80"
                    width={240}
                    style={{
                        background: '#fff',
                        zIndex: 1213,
                        top: 0,
                        position: 'fixed',
                        height: '100vh',

                    }}
                >
                    <Link href={'/'} className="flex items-center p-3 justify-center w-full">
                        <img src="./logo.svg" style={{ height: '40px' }} alt="" />
                    </Link>

                    {sidebarContent}
                </Sider>
            )}
            <div style={collapsed ? { width: '80px', transition: '0.5s' } : { width: '240px', transition: '0.5s' }}></div>

            <Layout>
                {/* Шапка */}
                <Header style={{
                    background: '#fff',
                    padding: isMobile ? '0 16px' : '0 24px',
                    display: 'flex',
                    alignItems: 'center',
                    // boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    zIndex: 100,
                    position: 'sticky',
                    top: 0
                }}>
                    {!isMobile && (
                        <Button
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{ marginRight: '16px' }}
                        />
                    )}

                    <Title level={4} style={{ margin: 0, flex: 1 }}>
                        {isMobile ? '🏥 МедКлиника' : getCurrentPageTitle()}
                    </Title>

                    <Space size="middle">
                        <Badge count={unreadNotifications} size="small">
                            <Button
                                type="text"
                                shape="circle"
                                icon={<BellOutlined />}
                                onClick={() => handleRouteChange('notifications')}
                            />
                        </Badge>
                        <Avatar
                            style={{ backgroundColor: '#1890ff' }}
                            icon={<UserOutlined />}
                        />
                    </Space>
                </Header>

                {/* Основной контент */}
                <Content style={{
                    background: '#f5f5f5',
                    minHeight: 'calc(100vh - 64px)',
                    paddingBottom: isMobile ? '80px' : '0'
                }}>
                    {children}
                    {/* {renderContent()} */}
                </Content>
            </Layout>

            {/* Мобильная нижняя навигация */}
            {isMobile && <MobileBottomNav />}

            {/* Плавающая кнопка для быстрых действий */}
            {!isMobile && (
                <FloatButton
                    icon={<PlusOutlined />}
                    type="primary"
                    style={{ right: 24, bottom: 24 }}
                    tooltip="Быстрая запись"
                />
            )}

        </Layout>
    );
};

export default PatientDashboard;