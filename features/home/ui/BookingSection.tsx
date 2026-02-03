
// ui/BookingSection.tsx
import React from 'react';
import { Card, Form, Select, DatePicker, Input, Button, Row, Col, Typography, Alert } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { BookingService } from '../services/bookingService';
import { BookingFormData } from '../types';

const { Title, Text } = Typography;
const { Option } = Select;

export const BookingSection: React.FC = () => {
    const [form] = Form.useForm();

    const handleBookingSubmit = async (values: BookingFormData) => {
        const success = await BookingService.submitBooking(values);
        if (success) {
            // Показать уведомление об успехе
            form.resetFields();
        }
    };

    return (
        <section id="booking" className="py-24 bg-gradient-to-br from-[#5E4297] via-[#F0AFCD] to-[#F0AFCD]/70">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <Title level={2} className="!text-4xl font-extrabold text-[#525252] mb-3">
                        Запись на приём
                    </Title>
                    <Text className="text-lg text-[#525252]/80">
                        Выберите удобное время и клинику для консультации
                    </Text>
                </div>

                <Card className="bg-white/70 shadow-2xl backdrop-blur-lg border-none rounded-3xl p-6">
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleBookingSubmit}
                        className="space-y-6"
                    >
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="clinic"
                                    label={<span className="text-[#5E4297] font-medium">Филиал</span>}
                                    rules={[{ required: true, message: 'Выберите филиал' }]}
                                >
                                    <Select
                                        placeholder="Выберите клинику"
                                        size="large"
                                        className="rounded-xl"
                                    >
                                        <Option value="reproduction">Клиника «Репродукция»</Option>
                                        <Option value="lady">Леди Клиник</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="service"
                                    label={<span className="text-[#5E4297] font-medium">Услуга</span>}
                                    rules={[{ required: true, message: 'Выберите услугу' }]}
                                >
                                    <Select
                                        placeholder="Выберите услугу"
                                        size="large"
                                        className="rounded-xl"
                                    >
                                        <Option value="consultation">Консультация</Option>
                                        <Option value="diagnostics">Диагностика</Option>
                                        <Option value="treatment">Лечение</Option>
                                        <Option value="procedure">Процедура</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="date"
                                    label={<span className="text-[#5E4297] font-medium">Дата</span>}
                                    rules={[{ required: true, message: 'Выберите дату' }]}
                                >
                                    <DatePicker
                                        placeholder="Выберите дату"
                                        size="large"
                                        style={{ width: '100%' }}
                                        className="rounded-xl"
                                    />
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    name="phone"
                                    label={<span className="text-[#5E4297] font-medium">Телефон</span>}
                                    rules={[
                                        { required: true, message: 'Введите номер телефона' },
                                        {
                                            validator: (_, value) => {
                                                if (!value || BookingService.validatePhone(value)) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Неверный формат телефона'));
                                            }
                                        }
                                    ]}
                                >
                                    <Input
                                        placeholder="+996 XXX XXX XXX"
                                        size="large"
                                        className="rounded-xl"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div className="text-center pt-4">
                            <Button
                                shape="round"
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="bg-[#F0AFCD] hover:bg-[#e79dbd] text-[#5E4297] border-none rounded-full px-10 font-semibold transition-all duration-300"
                            >
                                Записаться на приём
                            </Button>
                        </div>
                    </Form>

                    <Alert
                        message="Функция в разработке"
                        description="Запись через форму временно недоступна. Пожалуйста, звоните по телефону +996 XXX XXX XXX"
                        type="info"
                        showIcon
                        className="mt-6 bg-[#F0AFCD]/30 text-[#5E4297] border-none rounded-xl"
                        icon={<ClockCircleOutlined className="text-[#5E4297]" />}
                    />
                </Card>
            </div>
        </section>
    );
};
