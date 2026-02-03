import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { Button, Card, Col, Row, Typography } from 'antd';
import Image from 'next/image';
import React from 'react'
const { Title, Text, Paragraph } = Typography;

const ServiceSection = () => {
    const { data } = useAppSelector(state => state.cms.services)

    return (
        <section id="services" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <Title level={2} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Наши услуги
                    </Title>
                    <Text className="text-lg text-gray-600">
                        Комплексный подход к вашему здоровью
                    </Text>
                </div>

                <Row gutter={[24, 24]}>
                    {data.map((service, index) => (
                        <Col xs={24} sm={12} lg={6} key={index}>
                            <Card
                                className="fade-in h-full border-0 shadow-lg hover:shadow-2xl bg-gradient-to-br from-white to-gray-50 rounded-2xl transform hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative"
                              
                                cover={<img width={100} height={100} alt={service.title} src={service.image} className="h-48 w-full object-cover rounded-t-2xl" />}
                            >
                                <div className=" relative z-10">
                                    <Title level={4} className="text-xl font-semibold text-gray-800 mb-4">
                                        {service.title}
                                    </Title>
                                    <Paragraph className="text-gray-600 mb-6 leading-relaxed">
                                        {service.description}
                                    </Paragraph>
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>


            </div>
        </section>
    )
}

export default ServiceSection
