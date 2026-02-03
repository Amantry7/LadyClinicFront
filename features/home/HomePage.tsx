
'use client'
import React, { useEffect, useState, useCallback, lazy, Suspense, memo } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
    Button,
    Card,
    Form,
    Select,
    DatePicker,
    Input,
    Row,
    Col,
    Typography,
    Alert,
    Tag,
    Flex,
    Skeleton
} from 'antd';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CustomerServiceOutlined,
    PhoneOutlined,
    InfoCircleOutlined,
    GiftOutlined
} from '@ant-design/icons';
import Public from '@/shared/components/Layout/Public';
import { Award, Heart, Microscope, Shield } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import {
    fetchCmsBirthPackages,
    fetchCmsBranches,
    fetchCmsCertificationsAndLicenses,
    fetchCmsChambers,
    fetchCmsGalleryItems,
    fetchCmsOurBenefits,
    fetchCmsReviews,
    fetchCmsServices
} from '@/entities/cms/model/cms-slice';
import Head from 'next/head';

// Lazy loading компонентов
const TestimonialsSection = lazy(() => import('./ui/TestimonialsSection'));
const RoomCards = lazy(() => import('./ui/RoomCards'));
const ServiceSection = lazy(() => import('./ui/ServiceSection'));
const MasonryGridGallery = lazy(() => import('./ui/Gallary'));

// Dynamic imports для больших компонентов
const DynamicTestimonials = dynamic(() => import('./ui/TestimonialsSection'), {
    loading: () => <Skeleton active paragraph={{ rows: 4 }} />,
    ssr: false
});

const DynamicGallery = dynamic(() => import('./ui/Gallary'), {
    loading: () => <Skeleton.Image style={{ width: '100%', height: '400px' }} />,
    ssr: false
});

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

//@ts-ignore
const AdvantageCard = memo(({ advantage, index }) => {
    const Icon = advantage.icon;
    return (
        <article
            className="group hover:transform hover:-translate-y-2 transition-all duration-300 h-full"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg group-hover:shadow-xl border border-gray-100 group-hover:border-[#F0AFCD]/20 h-full flex flex-col">
                <div className="bg-gradient-to-r from-[#F0AFCD] to-[#5E4297] p-3 rounded-xl w-fit mb-4" aria-hidden="true">
                    <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#525252] mb-3">{advantage.title}</h3>
                <p className="text-[#525252]/70 text-sm leading-relaxed flex-grow">{advantage.desc}</p>
            </div>
        </article>
    );
});

//@ts-ignore
const BirthPackageCard = memo(({ pkg, index }) => (
    <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
        <article className="fade-in h-full min-h-[500px] border-0 shadow-lg hover:shadow-2xl bg-gradient-to-br rounded-2xl transform hover:-translate-y-2 transition-all duration-500 relative group bg-white p-4">
            <div className="flex flex-col h-full">
                <header className="text-center mb-3">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                        {pkg.title}
                    </h3>
                    <p className="text-gray-600 mb-2 text-sm">
                        {pkg.description}
                    </p>
                    <div className="flex items-baseline justify-center">
                        <span className="text-2xl font-bold text-gray-800">
                            {pkg.price}
                        </span>
                    </div>
                </header>

                <ul className="space-y-1 mb-4 flex-grow" role="list">
                    {//@ts-ignore

                        pkg.birth_package_benefits?.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                                <CheckCircleOutlined className="text-green-500 mt-0.5 mr-2 flex-shrink-0 text-sm" aria-hidden="true" />
                                <span className="text-gray-700 text-xs leading-relaxed">
                                    {feature.title}
                                </span>
                            </li>
                        ))}
                </ul>

                <Button
                    type="primary"
                    size="large"
                    block
                    className="border-none rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl mt-auto"
                    href="#booking"
                    aria-label={`Выбрать пакет родов ${pkg.title}`}
                >
                    <GiftOutlined className="mr-2" aria-hidden="true" />
                    Выбрать пакет
                </Button>
            </div>
        </article>
    </Col>
));

// Основной компонент
export default function MedicalHomepage() {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [isVisible, setIsVisible] = useState({});
    const [videoLoaded, setVideoLoaded] = useState(false);

    const { data: birthPackages, loading: loadingBirthPackages } = useAppSelector((state) => state.cms.birthPackages);
    const { data: certifications, loading: loadingCerts } = useAppSelector((state) => state.cms.certificationsAndLicenses);

    // Оптимизированная загрузка данных с приоритетом
    useEffect(() => {
        // Приоритетные данные загружаем сразу
        const criticalData = async () => {
            dispatch(fetchCmsBirthPackages({}));
            dispatch(fetchCmsServices({}));
        };

        // Второстепенные данные загружаем с задержкой
        const secondaryData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            dispatch(fetchCmsCertificationsAndLicenses({}));
            dispatch(fetchCmsReviews({}));
        };

        // Не критичные данные загружаем в последнюю очередь
        const nonCriticalData = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));
            dispatch(fetchCmsGalleryItems({}));
            dispatch(fetchCmsChambers({}));
            dispatch(fetchCmsBranches({}));
        };

        criticalData();
        secondaryData();
        nonCriticalData();
    }, [dispatch]);

    // Intersection Observer для lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    // Оптимизированный обработчик формы
    const handleBookingSubmit = useCallback((values: any) => {
        console.log('Booking form values:', values);
        // Здесь можно добавить debounce для API запросов
    }, []);

    // Данные преимуществ
    const advantages = [
        {
            icon: Shield,
            title: 'Новый УЗИ аппарат',
            desc: 'Высокая точность диагностики и возможность видеть мельчайшие детали'
        },
        {
            icon: Microscope,
            title: 'Школа будущих мам и доулы рядом',
            desc: 'Роды с максимальным комфортом в сопровождении психолога и доул.'
        },
        {
            icon: Award,
            title: 'Опытная команда врачей:',
            desc: 'Наши врачи имеют многолетний опыт работы в областных больницах и клиниках, знают все нюансы женского организма.'
        },
        {
            icon: Heart,
            title: 'Собственная лаборатория',
            desc: 'Возможность сдать анализы прямо в клинике.'
        }
    ];

    // Структурированные данные
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "MedicalOrganization",
        "name": "Клиника женского здоровья",
        "description": "Ведущая клиника женского здоровья в Бишкеке. Роды, гинекология, планирование беременности, УЗИ диагностика",
        "url": "https://your-domain.com",
        "telephone": "+996XXXXXXXXX",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ваш адрес",
            "addressLocality": "Бишкек",
            "addressCountry": "KG"
        }
    };

    return (
        <>
            <Head>
                {/* Critical CSS inline */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                        .critical-above-fold {
                            min-height: 100vh;
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        }
                        .fade-in { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
                        .fade-in.visible { opacity: 1; transform: translateY(0); }
                    `
                }} />

                {/* Meta теги для производительности */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
                <meta httpEquiv="x-dns-prefetch-control" content="on" />

                {/* Preconnect для критичных доменов */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://cdnjs.cloudflare.com" />

                {/* Resource hints */}
                <link rel="dns-prefetch" href="//your-api-domain.com" />
                <link rel="prefetch" href="/api/services" />

                {/* Critical resources */}
                <link rel="preload" as="font" href="/fonts/main.woff2" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" as="image" href="/assets/hero-image.webp" />

                {/* Основные meta теги */}
                <title>Клиника женского здоровья в Бишкеке | Роды, гинекология, УЗИ | Запись онлайн</title>
                <meta name="description" content="🏥 Ведущая клиника женского здоровья в Бишкеке ✓ Роды ✓ Гинекология ✓ Планирование беременности ✓ УЗИ диагностика ✓ Опытные врачи ✓ Запись онлайн 📞 +996XXXXXXXXX" />

                {/* Open Graph */}
                <meta property="og:image" content="/assets/clinic-og-image.webp" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Структурированные данные */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head>

            <Public>
                <div className="min-h-screen bg-white">

                    <section className="pt-16 pb-20 bg-gradient-to-br overflow-hidden relative">
                        {/* Animated background elements */}
                        <video
                            src="/assets/Идея_ролик.mp4"
                            className="absolute inset-0 w-full h-full object-cover opacity-30"
                            muted={true}
                            autoPlay={true}
                            loop={true}
                        ></video>
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="text-center py-20">
                                <Title
                                    level={1}
                                >
                                    Рожать в любви и заботе
                                </Title>
                                <Paragraph style={{ animationDelay: '0.2s' }}>
                                    Современная женская клиника и родильный дом в городе Ош
                                </Paragraph>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                                    <Button shape='round' type="primary" size="large" href="#booking">Записаться</Button>
                                </div>
                            </div>
                        </div>
                    </section>


                    {/* Секция преимуществ */}
                    <section
                        className="py-16 bg-white"
                        aria-labelledby="advantages-heading"
                        data-animate
                        id="advantages"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 id="advantages-heading" className="text-3xl font-bold text-[#525252] mb-4">
                                    Наши <span className="text-[#F0AFCD]">преимущества</span>
                                </h2>
                                <p className="text-[#525252]/70 max-w-2xl mx-auto">
                                    Почему пациентки выбирают нашу клинику для родов и лечения гинекологических заболеваний
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {advantages.map((advantage, index) => (
                                    <AdvantageCard
                                        key={index}//@ts-ignore

                                        advantage={advantage}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Lazy загруженная секция услуг */}
                    <Suspense fallback={<Skeleton active paragraph={{ rows: 8 }} />}>
                        <ServiceSection />
                    </Suspense>

                    {/* Секция пакетов родов с оптимизацией */}
                    <section
                        id="birth-packages"
                        className="py-20 bg-white"
                        aria-labelledby="packages-heading"
                        data-animate
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 id="packages-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                    Пакеты родов
                                </h2>
                                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                    Выберите подходящий пакет услуг для комфортных родов. Каждый пакет разработан с учетом индивидуальных потребностей будущих мам
                                </p>
                            </div>

                            {loadingBirthPackages ? (
                                <Row gutter={[24, 32]}>
                                    {[1, 2, 3].map(i => (
                                        <Col xs={24} lg={8} key={i}>
                                            <Skeleton.Button
                                                active
                                                size="large"
                                                style={{ width: '100%', height: '400px' }}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <Row gutter={[24, 32]} justify="center">
                                    {birthPackages?.map((pkg, index) => (//@ts-ignore

                                        <BirthPackageCard key={index} pkg={pkg} index={index} />
                                    ))}
                                </Row>
                            )}
                        </div>
                    </section>

                    {/* Lazy загруженные компоненты */}
                    <Suspense fallback={<Skeleton active paragraph={{ rows: 6 }} />}>
                        <RoomCards />
                    </Suspense>

                    {/* Сертификации с оптимизированной загрузкой */}
                    <section
                        id="certification"
                        className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
                        aria-labelledby="certification-heading"
                        data-animate
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-16">
                                <h2 id="certification-heading" className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                    Лицензии и сертификаты клиники
                                </h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Наша клиника имеет все необходимые лицензии Минздрава КР и международные сертификаты качества
                                </p>
                            </div>

                            {loadingCerts ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[1, 2, 3].map(i => (
                                        <Skeleton key={i} active paragraph={{ rows: 4 }} />
                                    ))}
                                </div>
                            ) : (
                                <Flex gap={10} wrap="wrap" justify="center">
                                    {certifications?.map((cert, index) => (
                                        <Card
                                            key={index}
                                            className="max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-white to-gray-50"
                                            loading={loadingCerts}
                                        >
                                            <div className="p-4">
                                                {/* Верхняя секция с иконкой и статусом */}
                                                <div className="flex justify-between items-start mb-3">
                                                    {cert.icon && (
                                                        <Image width={40} height={40} src={cert.icon} alt="Certificate icon" className="w-10 h-10" />
                                                    )}
                                                    <Tag
                                                        color={cert.is_active ? "green" : "red"}
                                                        className="ml-auto"
                                                    >
                                                        {cert.is_active ? "Активно" : "Неактивно"}
                                                    </Tag>
                                                </div>

                                                {/* Изображение сертификата */}
                                                {cert.image && (
                                                    <div className="mb-4">
                                                        <Image width={40} height={40}
                                                            src={cert.image}
                                                            alt="Certificate"
                                                            className="w-full h-40 object-cover rounded-lg border-2 border-gray-100"
                                                        />
                                                    </div>
                                                )}

                                                {/* Основная информация */}
                                                <div className="text-center mb-4">
                                                    <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                                                        {cert.title}
                                                    </h3>

                                                    <p className="text-gray-600 text-sm mb-3 line-height-relaxed">
                                                        {cert.description}
                                                    </p>
                                                </div>

                                                {/* Детали сертификата */}
                                                <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
                                                    {cert.number && (
                                                        <div className="flex justify-between items-center text-xs">
                                                            <span className="font-medium text-gray-700">Номер:</span>
                                                            <span className="text-gray-600 font-mono">{cert.number}</span>
                                                        </div>
                                                    )}

                                                    {cert.validity_period && (
                                                        <div className="flex justify-between items-center text-xs">
                                                            <span className="font-medium text-gray-700">Действует до:</span>
                                                            <span className="text-gray-600">
                                                                {new Date(cert.validity_period).toLocaleDateString('ru-RU', {
                                                                    day: '2-digit',
                                                                    month: '2-digit',
                                                                    year: 'numeric'
                                                                })}
                                                            </span>
                                                        </div>
                                                    )}


                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </Flex>
                            )}
                        </div>
                    </section>

                    {/* Отзывы с динамической загрузкой */}
                    <DynamicTestimonials />

                    {/* Галерея с ленивой загрузкой */}
                    <DynamicGallery />

                    {/* Форма записи
                    <section
                        id="booking"
                        className="py-24 bg-gradient-to-br from-[#5E4297] via-[#F0AFCD] to-[#F0AFCD]/70"
                        aria-labelledby="booking-heading"
                    >
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 id="booking-heading" className="text-4xl font-extrabold text-white mb-3">
                                    Запись к врачу онлайн
                                </h2>
                                <p className="text-lg text-white/80">
                                    Выберите удобное время и врача для консультации
                                </p>
                            </div>

                            <Card className="bg-white/90 backdrop-blur-lg border-none rounded-3xl p-6">
                                <Form
                                    form={form}
                                    layout="vertical"
                                    onFinish={handleBookingSubmit}
                                    className="space-y-6"
                                    preserve={false}
                                >
                                    <Row gutter={[16, 16]}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="clinic"
                                                label="Филиал клиники"
                                                rules={[{ required: true, message: 'Выберите филиал' }]}
                                            >
                                                <Select
                                                    placeholder="Выберите филиал"
                                                    size="large"
                                                    showSearch
                                                    optionFilterProp="children"
                                                    loading={false}
                                                >
                                                    <Option value="reproduction">Клиника «Репродукция»</Option>
                                                    <Option value="lady">Леди Клиник</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="service"
                                                label="Медицинская услуга"
                                                rules={[{ required: true, message: 'Выберите услугу' }]}
                                            >
                                                <Select
                                                    placeholder="Выберите услугу"
                                                    size="large"
                                                    showSearch
                                                    optionFilterProp="children"
                                                >
                                                    <Option value="consultation">Консультация гинеколога</Option>
                                                    <Option value="diagnostics">УЗИ диагностика</Option>
                                                    <Option value="pregnancy">Ведение беременности</Option>
                                                    <Option value="delivery">Роды</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="date"
                                                label="Дата приёма"
                                                rules={[{ required: true, message: 'Выберите дату' }]}
                                            >
                                                <DatePicker
                                                    placeholder="Выберите дату"
                                                    size="large"
                                                    style={{ width: '100%' }}
                                                    showTime={false}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                name="phone"
                                                label="Номер телефона"
                                                rules={[
                                                    { required: true, message: 'Введите номер телефона' },
                                                    { pattern: /^\+996\d{9}$/, message: 'Неверный формат номера' }
                                                ]}
                                            >
                                                <Input
                                                    placeholder="+996 XXX XXX XXX"
                                                    size="large"
                                                    maxLength={13}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <div className="text-center pt-4">
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            size="large"
                                            className="px-10 font-semibold"
                                            loading={false}
                                        >
                                            Записаться к врачу
                                        </Button>
                                    </div>
                                </Form>
                            </Card>
                        </div>
                    </section> */}

                    {/* Floating кнопка звонка */}
                    <div className="fixed bottom-6 right-6 z-50">
                        <Button
                            type="primary"
                            shape="circle"
                            size="large"
                            className="w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300"
                            icon={<PhoneOutlined />}
                            href="tel:+996XXXXXXXXX"
                            aria-label="Позвонить в клинику"
                        />
                    </div>
                </div>

                {/* Критические стили */}
                <style jsx>{`
                    /* Critical CSS */
                    .fade-in {
                        opacity: 0;
                        transform: translateY(20px);
                        transition: opacity 0.6s ease, transform 0.6s ease;
                    }
                    
                    .fade-in.visible {
                        opacity: 1;
                        transform: translateY(0);
                    }

                    /* Performance optimizations */
                    * {
                        box-sizing: border-box;
                    }

                    img {
                        max-width: 100%;
                        height: auto;
                    }

                    /* GPU acceleration для анимаций */
                    .group:hover,
                    .hover\\:transform:hover {
                        will-change: transform;
                        backface-visibility: hidden;
                    }

                    /* Оптимизация для мобильных */
                    @media (max-width: 768px) {
                        .text-6xl {
                            font-size: 2.5rem;
                        }
                        
                        .py-20 {
                            padding: 3rem 0;
                        }
                    }

                    /* Prefers reduced motion */
                    @media (prefers-reduced-motion: reduce) {
                        * {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                            transition-duration: 0.01ms !important;
                        }
                    }
                `}</style>
            </Public>
        </>
    );
}