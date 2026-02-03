'use client'

import React from 'react';
import { Typography, Card } from 'antd';
import Public from '@/shared/components/Layout/Public';

const { Title, Paragraph, Text } = Typography;

const TermsPage = () => {
    return (
        <Public>
            <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-violet-50 py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <Title level={1} className="text-gray-800 mb-4">
                            Публичная оферта
                        </Title>
                        <Text className="text-lg text-gray-600">
                            Условия предоставления медицинских услуг в LadyClinic
                        </Text>
                    </div>

                    <Card className="shadow-lg border-0">
                        <div className="space-y-8">
                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    1. Общие положения
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Настоящая публичная оферта (далее — Оферта) является официальным предложением 
                                    медицинской клиники "LadyClinic" о заключении договора на оказание медицинских услуг. 
                                    Оферта адресована неограниченному кругу лиц и действует с момента размещения на сайте.
                                </Paragraph>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    2. Предмет договора
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Клиника обязуется оказать, а Пациент принять и оплатить медицинские услуги в области:
                                </Paragraph>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                    <li>Гинекологии и акушерства</li>
                                    <li>Ведения беременности</li>
                                    <li>Родовспоможения</li>
                                    <li>УЗИ диагностики</li>
                                    <li>Лабораторных исследований</li>
                                    <li>Консультативных услуг</li>
                                </ul>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    3. Порядок оказания услуг
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Медицинские услуги оказываются в следующем порядке:
                                </Paragraph>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                    <li>Запись на прием через сайт, телефон или при личном обращении</li>
                                    <li>Первичная консультация и осмотр врача</li>
                                    <li>Назначение необходимых обследований</li>
                                    <li>Проведение лечебных мероприятий</li>
                                    <li>Контрольные осмотры по показаниям</li>
                                </ul>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    4. Стоимость и оплата услуг
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Стоимость медицинских услуг определяется действующим прейскурантом клиники. 
                                    Оплата производится:
                                </Paragraph>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                    <li>Наличными в кассе клиники</li>
                                    <li>Банковской картой</li>
                                    <li>Безналичным переводом</li>
                                    <li>Через мобильные платежные системы</li>
                                </ul>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    5. Права и обязанности сторон
                                </Title>
                                <div className="space-y-4">
                                    <div>
                                        <Title level={3} className="text-gray-800 mb-2">
                                            Клиника обязуется:
                                        </Title>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                            <li>Оказывать услуги качественно и в срок</li>
                                            <li>Соблюдать медицинскую тайну</li>
                                            <li>Информировать о состоянии здоровья</li>
                                            <li>Предоставлять медицинскую документацию</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <Title level={3} className="text-gray-800 mb-2">
                                            Пациент обязуется:
                                        </Title>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                                            <li>Своевременно оплачивать услуги</li>
                                            <li>Соблюдать внутренний распорядок</li>
                                            <li>Предоставлять достоверную информацию</li>
                                            <li>Выполнять рекомендации врача</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    6. Отмена и перенос приема
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Пациент имеет право отменить или перенести запись не менее чем за 2 часа до назначенного времени. 
                                    При несвоевременной отмене клиника оставляет за собой право взимать штраф в размере 50% 
                                    от стоимости консультации.
                                </Paragraph>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    7. Ответственность сторон
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Стороны несут ответственность за неисполнение или ненадлежащее исполнение своих обязательств 
                                    в соответствии с действующим законодательством Кыргызской Республики.
                                </Paragraph>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    8. Разрешение споров
                                </Title>
                                <Paragraph className="text-gray-700 leading-relaxed">
                                    Все споры разрешаются путем переговоров. При недостижении согласия споры подлежат 
                                    рассмотрению в судебном порядке по месту нахождения клиники.
                                </Paragraph>
                            </section>

                            <section>
                                <Title level={2} className="text-gray-800 mb-4">
                                    9. Контактная информация
                                </Title>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <Text strong>Наименование:</Text> <Text>ОсОО "LadyClinic"</Text><br/>
                                    <Text strong>Адрес:</Text> <Text>г. Бишкек, ул. Примерная, 123</Text><br/>
                                    <Text strong>Телефон:</Text> <Text>+996 XXX XXX XXX</Text><br/>
                                    <Text strong>Email:</Text> <Text>info@ladyclinic.kg</Text><br/>
                                    <Text strong>Лицензия:</Text> <Text>№XXXXXX от XX.XX.XXXX</Text>
                                </div>
                            </section>

                            <section>
                                <Text className="text-sm text-gray-500">
                                    Дата публикации: 26 сентября 2025 года<br/>
                                    Оферта действует до отзыва или изменения условий
                                </Text>
                            </section>
                        </div>
                    </Card>
                </div>
            </div>
        </Public>
    );
};

export default TermsPage;
