import React from 'react';
import { Card, Typography, Collapse, Tag, Space, Divider, Spin, Alert } from 'antd';
import {
    MedicineBoxOutlined,
    HeartOutlined,
    ExperimentOutlined,
    HomeOutlined,
    ReloadOutlined
} from '@ant-design/icons';
import { useServicePriceCards } from '../../../shared/hooks/useServicePriceCards';
import { parseHtmlListItems } from '../../../shared/utils/htmlParser';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const MedicalServices: React.FC = () => {
    const { services, loading, error, refetch } = useServicePriceCards();

    // Функция для получения иконки по индексу или названию
    const getServiceIcon = (index: number, title: string) => {
        const icons = [
            <MedicineBoxOutlined />,
            <HeartOutlined />,
            <ExperimentOutlined />,
            <HomeOutlined />
        ];
        
        // Можно добавить логику выбора иконки по названию услуги
        if (title.toLowerCase().includes('роды') || title.toLowerCase().includes('кесарево')) {
            return <MedicineBoxOutlined />;
        }
        if (title.toLowerCase().includes('беременность')) {
            return <HeartOutlined />;
        }
        if (title.toLowerCase().includes('лечение')) {
            return <ExperimentOutlined />;
        }
        
        return icons[index % icons.length];
    };

    // Форматирование цены
    const formatPrice = (price: number): string => {
        return price.toLocaleString('ru-RU');
    };

    if (loading) {
        return (
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px', textAlign: 'center' }}>
                <Spin size="large" />
                <div style={{ marginTop: 16 }}>
                    <Text>Загрузка услуг...</Text>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
                <Alert
                    message="Ошибка загрузки"
                    description={error}
                    type="error"
                    showIcon
                    action={
                        <button 
                            onClick={refetch}
                            style={{ 
                                background: 'none', 
                                border: 'none', 
                                color: '#1890ff', 
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                            }}
                        >
                            <ReloadOutlined /> Повторить
                        </button>
                    }
                />
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '20px' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
                <Title level={2} style={{ margin: 0 }}>Медицинские услуги</Title>
            </div>

            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                {services.map((service, index) => {
                    const includes = parseHtmlListItems(service.items);
                    
                    return (
                        <Card
                            key={service.id}
                            size="small"
                            style={{ borderRadius: 8 }}
                            bodyStyle={{ padding: 16 }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                                <div style={{ 
                                    fontSize: 24, 
                                    color: '#1890ff',
                                    marginTop: 4
                                }}>
                                    {getServiceIcon(index, service.title)}
                                </div>
                                
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                                        <div>
                                            <Title level={4} style={{ margin: 0, marginBottom: 4 }}>
                                                {service.title}
                                            </Title>
                                            {service.badge && (
                                                <Tag color="blue" style={{ margin: 0 }}>
                                                    {service.badge}
                                                </Tag>
                                            )}
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <Title level={3} style={{ 
                                                margin: 0, 
                                                color: '#1890ff',
                                                fontWeight: 'bold'
                                            }}>
                                                {formatPrice(service.price)} сом
                                            </Title>
                                        </div>
                                    </div>

                                    <Divider style={{ margin: '12px 0' }} />

                                    <Collapse 
                                        ghost 
                                        size="small"
                                        expandIconPosition="end"
                                    >
                                        <Panel 
                                            header={
                                                <Text strong style={{ color: '#595959' }}>
                                                    Что входит в стоимость
                                                </Text>
                                            } 
                                            key="1"
                                        >
                                            <ul style={{ 
                                                margin: 0, 
                                                paddingLeft: 20,
                                                color: '#595959'
                                            }}>
                                                {includes.map((item: string, itemIndex: number) => (
                                                    <li key={itemIndex} style={{ marginBottom: 4 }}>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                            
                                            {service.note && (
                                                <>
                                                    <Divider style={{ margin: '12px 0' }} />
                                                    <div style={{ 
                                                        background: '#fff7e6', 
                                                        border: '1px solid #ffd591',
                                                        borderRadius: 4,
                                                        padding: 8,
                                                        fontSize: 12,
                                                        color: '#d48806'
                                                    }}>
                                                        <Text style={{ color: '#d48806', fontStyle: 'italic' }}>
                                                            {service.note}
                                                        </Text>
                                                    </div>
                                                </>
                                            )}
                                        </Panel>
                                    </Collapse>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </Space>
        </div>
    );
};

export default MedicalServices;