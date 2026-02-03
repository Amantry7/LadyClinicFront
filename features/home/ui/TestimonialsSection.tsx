'use client';
import React from 'react';
import { Carousel, Card, Avatar, Typography, Rate } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/shared/hooks/redux-hooks';

const { Title, Text, Paragraph } = Typography;

const TestimonialsSection = () => {
    const { data } = useAppSelector((state) => state.cms.reviews);

    return (
        <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50" id="testimonials">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
                <Title level={2} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Отзывы наших пациентов
                </Title>
                <Text className="text-lg text-gray-600">
                    Мы ценим ваше доверие и стремимся стать ещё лучше
                </Text>
            </div>
            <div className='continer mx-auto'
            >
                <Carousel
                    dots
                    autoplay
                    slidesToShow={4}
                    autoplaySpeed={7000}
                    style={{ maxWidth: '1400px', margin: '0 auto' }}
                    arrows
                    prevArrow={<LeftOutlined />}
                    nextArrow={<RightOutlined />}
                    responsive={[
                        { breakpoint: 480, settings: { slidesToShow: 1 } },
                        { breakpoint: 768, settings: { slidesToShow: 1 } },
                        { breakpoint: 1024, settings: { slidesToShow: 3 } },
                        { breakpoint: 1200, settings: { slidesToShow: 4 } },
                    ]}
                >
                    {data.map((review, index) => (
                        <div key={index} className="px-4 h-full">
                            <Card
                                bordered={false}
                                className="shadow-xl bg-white rounded-2xl p-6 transition-transform transform duration-300"
                                style={{ height: '320px', display: 'flex', flexDirection: 'column' }}
                            >
                                <div className="flex items-center mb-4 gap-4">
                                    <Avatar
                                        size="large"
                                        icon={<UserOutlined />}
                                        src={review.image}
                                        className="bg-purple-200"
                                    />
                                    <div className="text-left">
                                        <Text strong>{review.full_name}</Text>
                                        <br />
                                        <Text type="secondary" className="text-xs">{review.date}</Text>
                                    </div>
                                </div>
                                <Rate disabled defaultValue={review.star} className="mb-2 text-pink-500" />
                                <div style={{ flex: 1, overflow: 'hidden' }}>
                                    <Paragraph 
                                        className="text-gray-700 leading-relaxed"
                                        ellipsis={{ rows: 4, expandable: false }}
                                    >
                                        {review.message}
                                    </Paragraph>
                                </div>
                            </Card>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default TestimonialsSection;
