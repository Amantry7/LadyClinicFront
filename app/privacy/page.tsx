'use client'

import React from 'react';
import { Typography, Card } from 'antd';
import Public from '@/shared/components/Layout/Public';

const { Title, Paragraph, Text } = Typography;

const PrivacyPage = () => {
    return (
        <Public>
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Title level={1} className="text-gray-800 mb-4">
                            Политика конфиденциальности
                        </Title>
                        <Text className="text-lg text-gray-600">
                            Обработка и защита персональных данных в LadyClinic
                        </Text>
                    </div>

                    <Card className="shadow-lg border-0">
                        <div className="space-y-8">
                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    1. Общие положения
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Настоящая Политика конфиденциальности определяет порядок обработки персональных данных 
                                    пользователей медицинской клиники "LadyClinic" (далее — Клиника). Мы обязуемся защищать 
                                    конфиденциальность ваших персональных данных в соответствии с требованиями законодательства 
                                    Кыргызской Республики.
                                </Paragraph>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    2. Какие данные мы собираем
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Мы можем собирать следующие категории персональных данных:
                                </Paragraph>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                    <li>Контактная информация (ФИО, номер телефона, email)</li>
                                    <li>Медицинская информация (анамнез, результаты обследований)</li>
                                    <li>Данные о записи на прием (дата, время, специалист)</li>
                                    <li>Техническая информация (IP-адрес, данные браузера)</li>
                                </ul>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    3. Цели обработки данных
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Ваши персональные данные обрабатываются для:
                                </Paragraph>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                    <li>Предоставления медицинских услуг</li>
                                    <li>Ведения медицинской документации</li>
                                    <li>Записи на прием к врачам</li>
                                    <li>Информирования о услугах клиники</li>
                                    <li>Соблюдения требований законодательства</li>
                                </ul>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    4. Защита данных
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Мы применяем технические и организационные меры для защиты ваших данных:
                                </Paragraph>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                    <li>Шифрование данных при передаче</li>
                                    <li>Ограничение доступа к персональным данным</li>
                                    <li>Регулярное обновление систем безопасности</li>
                                    <li>Обучение персонала правилам обработки данных</li>
                                </ul>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    5. Ваши права
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Вы имеете право:
                                </Paragraph>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                    <li>Получать информацию об обработке ваших данных</li>
                                    <li>Требовать исправления неточных данных</li>
                                    <li>Требовать удаления данных (за исключением медицинской документации)</li>
                                    <li>Отозвать согласие на обработку данных</li>
                                </ul>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    6. Контактная информация
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    По вопросам обработки персональных данных обращайтесь:
                                </Paragraph>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <Text strong>Email:</Text> <Text>privacy@ladyclinic.kg</Text><br/>
                                    <Text strong>Телефон:</Text> <Text>+996 XXX XXX XXX</Text><br/>
                                    <Text strong>Адрес:</Text> <Text>г. Бишкек, ул. Примерная, 123</Text>
                                </div>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    7. Изменения в политике
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. 
                                    Актуальная версия всегда доступна на нашем сайте.
                                </Paragraph>
                                <Text className="text-sm text-gray-500">
                                    Дата последнего обновления: 26 сентября 2025 года
                                </Text>
                            </section>
                        </div>
                    </Card>
                </div>
            </div>
        </Public>
    );
};

export default PrivacyPage;
