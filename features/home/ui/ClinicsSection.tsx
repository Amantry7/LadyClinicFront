
// ui/ClinicsSection.tsx
import React from 'react';
import { Card, Row, Col, Typography, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { clinicsData } from '../constants/clinicsData';

const { Title, Text, Paragraph } = Typography;

export const ClinicsSection: React.FC = () => {
    return (
        <section id="about" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Title level={2} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Наши филиалы
                    </Title>
                    <Text className="text-lg text-gray-600">
                        Две специализированные клиники под единой медицинской платформой
                    </Text>
                </div>

                <Row gutter={[32, 32]}>
                    {clinicsData.map((clinic, index) => (
                        <Col xs={24} lg={12} key={index}>
                            <Card
                                className={`fade-in h-full bg-gradient-to-br ${clinic.gradient} border-0 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 rounded-2xl overflow-hidden`}
                                style={{
                                    opacity: 0,
                                    transform: 'translateY(30px)',
                                    transition: 'all 0.6s ease',
                                    transitionDelay: `${index * 0.2}s`
                                }}
                            >
                                <div className="p-6">
                                    <div className="flex items-center mb-6">
                                        <div className="w-16 h-16 bg-white/80 rounded-2xl flex items-center justify-center mr-4 shadow-md">
                                            {clinic.icon}
                                        </div>
                                        <Title level={3} className="text-2xl font-bold text-gray-800 mb-0">
                                            {clinic.title}
                                        </Title>
                                    </div>

                                    <Paragraph className="text-gray-600 mb-6 text-base leading-relaxed">
                                        {clinic.description}
                                    </Paragraph>

                                    <div className="space-y-3 mb-6">
                                        {clinic.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center">
                                                <CheckCircleOutlined className="text-pink-500 mr-3 text-lg" />
                                                <Text className="text-gray-700">{feature}</Text>
                                            </div>
                                        ))}
                                    </div>

                                    <Button
                                        shape='round'
                                        type="primary"
                                        className="bg-gradient-to-r from-purple-500 to-pink-500 border-none rounded-full px-6 hover:from-purple-600 hover:to-pink-600"
                                        href="#services"
                                    >
                                        Подробнее
                                    </Button>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </section>
    );
};
