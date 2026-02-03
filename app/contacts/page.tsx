"use client"
import React, { useState } from 'react';
import {
    Collapse,
    Card,
    Row,
    Col,
    Typography,
    Button,
    Space,
    Divider,
    Tag,
    Timeline,
    Avatar,
    Spin
} from 'antd';
import {
    QuestionCircleOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
    ClockCircleOutlined,
    WhatsAppOutlined,
    CalendarOutlined,
    FileTextOutlined,
    UserOutlined,
    BellOutlined,
    RightOutlined,
    GlobalOutlined
} from '@ant-design/icons';
import Public from '@/shared/components/Layout/Public';
import { useAppSelector } from '@/shared/hooks/redux-hooks';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const FAQContactsPage: React.FC = () => {
    const [activeKey, setActiveKey] = useState<string | string[]>(['1']);
    const { branches } = useAppSelector(s => s.cms)
    
    // Функция для извлечения номера телефона из WhatsApp ссылки
    const extractPhoneFromWhatsApp = (whatsAppLink: string): string => {
        if (whatsAppLink.includes('wa.me/')) {
            return whatsAppLink.split('wa.me/')[1]?.split('?')[0] || whatsAppLink;
        }
        return whatsAppLink;
    };

    if (typeof window === undefined) {
        return <Spin />
    }
    const faqData = [
        {
            key: '1',
            icon: <CalendarOutlined className="text-blue-500" />,
            question: 'Как записаться на приём?',
            answer: (
                <div className="space-y-3">
                    <Paragraph className="mb-2">
                        Вы можете записаться на приём несколькими способами:
                    </Paragraph>
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <Timeline
                            items={[
                                {
                                    dot: <PhoneOutlined className="text-blue-500" />,
                                    children: <Text>Позвоните по телефону <strong>+996 550 88 10 10</strong></Text>
                                },
                                {
                                    dot: <WhatsAppOutlined className="text-green-500" />,
                                    children: <Text>WhatsApp: <strong>+996 550 88 10 10</strong></Text>
                                },
                                {
                                    dot: <EnvironmentOutlined className="text-orange-500" />,
                                    children: <Text>Лично в регистратуре клиники</Text>
                                }
                            ]}
                        />
                    </div>
                </div>
            )
        },
        {
            key: '2',
            icon: <FileTextOutlined className="text-green-500" />,
            question: 'Как получить результаты?',
            answer: (
                <div className="space-y-3">
                    <Paragraph>
                        Результаты анализов и обследований доступны следующими способами:
                    </Paragraph>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-green-50 p-4 rounded-lg">
                            <Title level={5} className="text-green-600 mb-2">
                                <GlobalOutlined /> Онлайн-кабинет
                            </Title>
                            <Text>Войдите в личный кабинет на сайте и скачайте результаты в PDF формате</Text>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <Title level={5} className="text-blue-600 mb-2">
                                <PhoneOutlined /> По телефону
                            </Title>
                            <Text>Позвоните в клинику для получения результатов по телефону</Text>
                        </div>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                        <Text className="text-orange-700">
                            <strong>Важно:</strong> Для получения результатов необходимо предъявить документ, удостоверяющий личность
                        </Text>
                    </div>
                </div>
            )
        },
        {
            key: '3',
            icon: <UserOutlined className="text-orange-500" />,
            question: 'Что делать, если забыл логин?',
            answer: (
                <div className="space-y-4">
                    <Paragraph>
                        Если вы забыли логин от личного кабинета, выполните следующие действия:
                    </Paragraph>
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
                        <Space direction="vertical" className="w-full">
                            <div className="flex items-center space-x-2">
                                <Avatar size="small" className="bg-orange-500">1</Avatar>
                                <Text>Нажмите "Забыли логин?" на странице входа</Text>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Avatar size="small" className="bg-orange-500">2</Avatar>
                                <Text>Введите номер телефона или email</Text>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Avatar size="small" className="bg-orange-500">3</Avatar>
                                <Text>Получите логин в SMS или на email</Text>
                            </div>
                        </Space>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                        <Text className="text-blue-700">
                            <PhoneOutlined /> <strong>Техподдержка:</strong> +996 (312) 123-457
                        </Text>
                    </div>
                </div>
            )
        },
        {
            key: '4',
            icon: <BellOutlined className="text-purple-500" />,
            question: 'Как работают уведомления?',
            answer: (
                <div className="space-y-3">
                    <Paragraph>
                        Система уведомлений поможет вам не пропустить важные события:
                    </Paragraph>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={8}>
                            <Card className="h-full border-l-4 border-l-green-500">
                                <Title level={5} className="text-green-600 mb-2">
                                    <BellOutlined /> SMS
                                </Title>
                                <Text>Напоминания о приёме за 1 час и 1 день</Text>
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card className="h-full border-l-4 border-l-blue-500">
                                <Title level={5} className="text-blue-600 mb-2">
                                    <MailOutlined /> Email
                                </Title>
                                <Text>Результаты анализов и справки</Text>
                            </Card>
                        </Col>
                        <Col xs={24} md={8}>
                            <Card className="h-full border-l-4 border-l-purple-500">
                                <Title level={5} className="text-purple-600 mb-2">
                                    <WhatsAppOutlined /> WhatsApp
                                </Title>
                                <Text>Быстрые уведомления и поддержка</Text>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }
    ];


    return (
        <Public>
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50">
                <div className="max-w-7xl mx-auto px-4 py-8">


                    {/* Header */}
                    <div className="text-center mb-12">
                        <Title level={1} className="text-gray-800 mb-4">
                            Контакты
                        </Title>
                        <Text className="text-lg text-gray-600">
                            Найдите ответы на популярные вопросы или свяжитесь с нами
                        </Text>
                    </div>

                    {/* Contacts Section */}
                    <div>

                        <Row gutter={[24, 24]} align="stretch">
                            {branches.data.map((branch) => (
                                <Col
                                    key={branch.id}
                                    xs={24}          // 1 колонка (на всю ширину) на мобиле
                                    sm={24}          // 1 колонка на small
                                    md={12}          // 2 колонки на планшетах
                                    lg={12}           // 3 колонки на десктопе
                                    xl={12}           // 4 колонки на крупных
                                    xxl={12}
                                >
                                    <Card
                                        className={`h-full shadow-lg border-0 border-l-4 border-l-${branch.color}-500 hover:shadow-xl transition-shadow duration-300`}
                                    >
                                        <div className="space-y-4 ">
                                            <div className="text-center">
                                                <Title level={3} className={`text-${branch.color}-600 mb-2`}>
                                                    {branch.description}
                                                </Title>

                                            </div>

                                            <Divider className="my-4" />

                                            <div className="space-y-3">
                                                {/* Адрес - показываем только если есть */}
                                                {branch.address && (
                                                    <div className="flex items-start space-x-3">
                                                        <EnvironmentOutlined className="text-gray-500 mt-1" />
                                                        <div>
                                                            <Text className="font-medium text-gray-800">Адрес:</Text>
                                                            <br />
                                                            <Text className="text-gray-600">{branch.address}</Text>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-start space-x-3">
                                                    <ClockCircleOutlined className="text-gray-500 mt-1" />
                                                    <div>
                                                        <Text className="font-medium text-gray-800">Часы работы:</Text>
                                                        <br />
                                                    </div>
                                                </div>

                                                {/* Телефон - показываем только если есть */}
                                                {branch.phone_1 && (
                                                    <div className="flex items-center space-x-3">
                                                        <PhoneOutlined className="text-blue-500" />
                                                        <div>
                                                            <Text className="font-medium text-gray-800">Телефон:</Text>
                                                            <br />
                                                            <a 
                                                                href={`tel:${branch.phone_1}`}
                                                                className="text-blue-600 hover:text-blue-800 cursor-pointer hover:underline"
                                                            >
                                                                {branch.phone_1}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* WhatsApp - показываем только если есть и извлекаем номер из ссылки */}
                                                {branch.whats_app && (
                                                    <div className="flex items-center space-x-3">
                                                        <WhatsAppOutlined className="text-green-500" />
                                                        <div>
                                                            <Text className="font-medium text-gray-800">WhatsApp:</Text>
                                                            <br />
                                                            <a 
                                                                href={branch.whats_app} 
                                                                target="_blank" 
                                                                rel="noopener noreferrer"
                                                                className="text-green-600 hover:text-green-800 cursor-pointer hover:underline"
                                                            >
                                                                {branch.phone_1}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Email - показываем только если есть */}
                                                {branch.email && (
                                                    <div className="flex items-center space-x-3">
                                                        <MailOutlined className="text-orange-500" />
                                                        <div>
                                                            <Text className="font-medium text-gray-800">Email:</Text>
                                                            <br />
                                                            <a 
                                                                href={`mailto:${branch.email}`}
                                                                className="text-orange-600 hover:text-orange-800 cursor-pointer hover:underline"
                                                            >
                                                                {branch.email}
                                                            </a>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <Divider className="my-4" />

                                            <div className="flex space-x-2">
                                                {/* Кнопка звонка - показываем только если есть телефон */}
                                                {branch.phone_1 && (
                                                    <Button
                                                        type="default"
                                                        className="flex-1 border-gray-300 hover:border-blue-400"
                                                        icon={<PhoneOutlined />}
                                                        onClick={() => window.open(`tel:${branch.phone_1}`, '_self')}
                                                    >
                                                        Позвонить
                                                    </Button>
                                                )}

                                                {/* Кнопка WhatsApp - показываем только если есть WhatsApp */}
                                                {branch.whats_app && (
                                                    <Button
                                                        type="default"
                                                        className="flex-1 border-green-300 hover:border-green-400 text-green-600"
                                                        icon={<WhatsAppOutlined />}
                                                        onClick={() => branch.whats_app && window.open(branch.whats_app, '_blank')}
                                                    >
                                                        WhatsApp
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* FAQ Section */}
                    <div className="mb-16 mt-8">
                        <div className="text-center mb-8">
                            <Title level={2} className="text-gray-800 mb-2">
                                <QuestionCircleOutlined className="mr-2" />
                                Часто задаваемые вопросы
                            </Title>
                            <Text className="text-gray-600">
                                Ответы на самые популярные вопросы пациентов
                            </Text>
                        </div>

                        <Card className="shadow-lg border-0">
                            <Collapse
                                activeKey={activeKey}
                                onChange={setActiveKey}
                                expandIconPosition="end"
                                className="border-0"
                                expandIcon={({ isActive }) => (
                                    <RightOutlined
                                        rotate={isActive ? 90 : 0}
                                        className="text-blue-500 text-lg"
                                    />
                                )}
                            >
                                {faqData.map((item) => (
                                    <Panel
                                        key={item.key}
                                        header={
                                            <div className="flex items-center space-x-3">
                                                <div className="text-xl">{item.icon}</div>
                                                <Title level={4} className="mb-0 text-gray-800">
                                                    {item.question}
                                                </Title>
                                            </div>
                                        }
                                        className="border-b border-gray-100 last:border-b-0"
                                    >
                                        <div className="pl-8">
                                            {item.answer}
                                        </div>
                                    </Panel>
                                ))}
                            </Collapse>
                        </Card>
                    </div>

                    
                </div>
            </div>
        </Public>
    );
};

export default FAQContactsPage;