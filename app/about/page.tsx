'use client'
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Heart, Users, Award, MapPin, Phone, Mail, Calendar, Shield, Microscope, Stethoscope, Activity, Star, CheckCircle, Clock, UserCheck, Building, Target, Eye, Handshake } from 'lucide-react';
import Public from '@/shared/components/Layout/Public';
import { Button, Spin } from 'antd';
import DGisMapWidget from '@/features/about/Map/TwoGisMap';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { fetchCmsBranches, fetchCmsDoctors } from '@/entities/cms/model/cms-slice';

const AboutPage = () => {
    const { doctors, branches } = useAppSelector(s => s.cms)
    const dispatch = useAppDispatch()
    const [visibleStats, setVisibleStats] = useState(false);
    const [animatedValues, setAnimatedValues] = useState({
        experience: 0,
        patients: 0,
        success: 0,
        doctors: 0
    });
    if (typeof window === undefined) {
        return <Spin />
    }
    useEffect(() => {
        dispatch(fetchCmsDoctors({}))
        dispatch(fetchCmsBranches({}));

    }, [])
    const statsRef = useRef(null);

    const stats = [
        { icon: Clock, label: 'Лет опыта', value: 15, suffix: '+' },
        { icon: Users, label: 'Пациентов', value: 25000, suffix: '+' },
        { icon: Heart, label: 'Успешных случаев', value: 98, suffix: '%' },
        { icon: UserCheck, label: 'Врачей высшей категории', value: 12, suffix: '' }
    ];

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !visibleStats) {
                    setVisibleStats(true);
                    animateStats();
                }
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => observer.disconnect();
    }, [visibleStats]);

    const animateStats = () => {
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;

        stats.forEach((stat, index) => {
            const increment = stat.value / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.value) {
                    current = stat.value;
                    clearInterval(timer);
                }

                setAnimatedValues(prev => ({
                    ...prev,
                    [Object.keys(prev)[index]]: Math.floor(current)
                }));
            }, stepDuration);
        });
    };

    return (
        <Public>
            <div className="min-h-screen bg-white">
                {/* Breadcrumb */}
                <div className="bg-gray-50 py-4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>Главная</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-[#5E4297] font-medium">О нас</span>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#F0AFCD]/10 via-white to-[#5E4297]/5 py-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent"></div>
                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-4xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold text-[#525252] mb-6">
                                Рожать в любви
                                <span className="block text-[#F0AFCD] mt-2">и заботе</span>
                            </h1>
                            <p className="text-xl text-[#525252]/80 leading-relaxed">
                                Мы создаём атмосферу доверия и тепла, где рождение ребёнка становится не только медицинским процессом, но и духовным, трогательным событием для всей семьи.
                            </p>
                        </div>
                    </div>
                </section>

                {/* История и миссия */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-[#525252] mb-6">
                                    Наша история и <span className="text-[#F0AFCD]">миссия</span>
                                </h2>
                                <p className="text-[#525252]/80 mb-6 leading-relaxed">
                                    Медицинское объединение создано путем слияния двух ведущих клиник -
                                    "Репродукция" и "Леди Клиник". Это решение было принято для обеспечения
                                    комплексного подхода к женскому здоровью.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start space-x-3">
                                        <Target className="w-6 h-6 text-[#F0AFCD] mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-[#525252] mb-1">Наша миссия</h3>
                                            <p className="text-[#525252]/70">помогать детям появляться на свет в атмосфере любви, а мамам иметь качественное долголетие.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Eye className="w-6 h-6 text-[#5E4297] mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-[#525252] mb-1">Видение</h3>
                                            <p className="text-[#525252]/70">Стать ведущим центром женского здоровья в Центральной Азии</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Handshake className="w-6 h-6 text-[#F0AFCD] mt-1 flex-shrink-0" />
                                        <div>
                                            <h3 className="font-semibold text-[#525252] mb-1">Ценности</h3>
                                            <p className="text-[#525252]/70">быть на каждом этапе жизни женщины рядом</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-[#F0AFCD]/20 to-[#5E4297]/20 rounded-2xl p-8 transform rotate-3">
                                    <div className="bg-white rounded-xl shadow-lg p-6 transform -rotate-3">
                                        <Heart className="w-12 h-12 text-[#F0AFCD] mb-4" />
                                        <h3 className="text-xl font-bold text-[#525252] mb-2">Забота о каждой пациентке</h3>
                                        <p className="text-[#525252]/70">Индивидуальный подход и комплексное сопровождение на всех этапах лечения</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Филиалы */}
                <section className="py-16 bg-gradient-to-br from-gray-50 to-[#F0AFCD]/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-[#525252] mb-4">
                                Наши <span className="text-[#F0AFCD]">филиалы</span>
                            </h2>
                            <p className="text-[#525252]/70 max-w-2xl mx-auto">
                                Две специализированные клиники - одно пространство заботы
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Репродукция */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="bg-gradient-to-r from-[#F0AFCD] to-[#F0AFCD]/80 p-6">
                                    <Building className="w-12 h-12 text-white mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-2">Клиника "Репродукция"</h3>
                                    <p className="text-white/90">Специализация: репродуктивное здоровье</p>
                                </div>
                                <div className="p-6">

                                    <p className="text-[#525252]/70 mb-6">
                                        Ведущий центр репродуктивной медицины, специализирующийся на лечении бесплодия
                                        и планировании семьи с использованием современных вспомогательных репродуктивных технологий.
                                    </p>
                                    <div className="space-y-3">

                                        <div className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-[#F0AFCD]" />
                                            <span className="text-[#525252]">Лечение бесплодия</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-[#F0AFCD]" />
                                            <span className="text-[#525252]">Гормональная коррекция</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-[#F0AFCD]" />
                                            <span className="text-[#525252]">Планирование семьи</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Леди Клиник */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                <div className="bg-gradient-to-r from-[#5E4297] to-[#5E4297]/80 p-6">
                                    <Heart className="w-12 h-12 text-white mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-2">"Леди Клиник"</h3>
                                    <p className="text-white/90">Специализация: женское здоровье</p>
                                </div>
                                <div className="p-6">

                                    <p className="text-[#525252]/70 mb-6">
                                        Женская клиника и родильный дом. Предоставляет комплексную медицинскую помощь — от гинекологических операций до ведения беременности и послеродового сопровождения.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-[#5E4297]" />
                                            <span className="text-[#525252]">Ведение родов</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-[#5E4297]" />
                                            <span className="text-[#525252]">Принятие родов</span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <CheckCircle className="w-5 h-5 text-[#5E4297]" />
                                            <span className="text-[#525252]">                                            <span className="text-[#525252]"> Гинекологические операции</span>
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Статистика */}
                <section ref={statsRef} className="py-16 bg-gradient-to-r from-[#5E4297] to-[#F0AFCD]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-white mb-4">Наши достижения в цифрах</h2>
                            <p className="text-white/90">Результаты, которыми мы гордимся</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                const animatedValue = Object.values(animatedValues)[index];

                                return (
                                    <div key={index} className="text-center">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                                            <Icon className="w-12 h-12 text-white mx-auto mb-4" />
                                            <div className="text-3xl font-bold text-white mb-2">
                                                {animatedValue}{stat.suffix}
                                            </div>
                                            <p className="text-white/80 text-sm">{stat.label}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Преимущества */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-[#525252] mb-4">
                                Наши <span className="text-[#F0AFCD]">преимущества</span>
                            </h2>
                            <p className="text-[#525252]/70 max-w-2xl mx-auto">
                                Что делает нас особенными в сфере женского здоровья
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {advantages.map((advantage, index) => {
                                const Icon = advantage.icon;
                                return (
                                    <div key={index} className="group hover:transform hover:-translate-y-2 transition-all duration-300 h-full">
                                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg group-hover:shadow-xl border border-gray-100 group-hover:border-[#F0AFCD]/20 h-full flex flex-col">
                                            <div className="bg-gradient-to-r from-[#F0AFCD] to-[#5E4297] p-3 rounded-xl w-fit mb-4">
                                                <Icon className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold text-[#525252] mb-3">{advantage.title}</h3>
                                            <p className="text-[#525252]/70 text-sm leading-relaxed flex-grow">{advantage.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Оборудование */}
                <section className="py-16 bg-gradient-to-br from-gray-50 to-[#5E4297]/5">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-[#525252] mb-4">
                                Современное <span className="text-[#5E4297]">оборудование</span>
                            </h2>
                            <p className="text-[#525252]/70 max-w-2xl mx-auto">
                                Используем новейшие технологии для точной диагностики и эффективного лечения
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: 'УЗИ экспертного класса', desc: 'Высокоточная диагностика с 4D визуализацией', icon: Activity },
                                { title: 'Лабораторная диагностика', desc: 'Полный спектр анализов с быстрыми результатами', icon: Microscope },
                                { title: 'Хирургическое оборудование', desc: 'Малоинвазивные технологии для безопасных операций', icon: Stethoscope }
                            ].map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:-translate-y-1">
                                        <Icon className="w-12 h-12 text-[#5E4297] mb-4" />
                                        <h3 className="text-xl font-bold text-[#525252] mb-3">{item.title}</h3>
                                        <p className="text-[#525252]/70">{item.desc}</p>
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <span className="text-sm text-[#5E4297] font-medium">Сертифицировано международными стандартами</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Команда */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold text-[#525252] mb-6">
                                    Наша <span className="text-[#F0AFCD]">команда</span>
                                </h2>
                                <p className="text-[#525252]/80 mb-6 leading-relaxed">
                                    Команда высококвалифицированных специалистов с многолетним опытом работы в области
                                    женского здоровья. Каждый врач регулярно повышает квалификацию и следует
                                    современным международным протоколам лечения.
                                </p>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center space-x-3">
                                        <Star className="w-5 h-5 text-[#F0AFCD]" />
                                        <span className="text-[#525252]">Врачи высшей категории</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Star className="w-5 h-5 text-[#F0AFCD]" />
                                        <span className="text-[#525252]">Международная сертификация</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Star className="w-5 h-5 text-[#F0AFCD]" />
                                        <span className="text-[#525252]">Постоянное обучение</span>
                                    </div>
                                </div>
                                <button className="mt-auto bg-gradient-to-r from-[#F0AFCD] to-[#5E4297] text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                                    <span className="text-white">Познакомиться с врачами</span>
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {doctors.data?.map((items: any, i: any) => (
                                    <div key={i} className="bg-gradient-to-br from-[#F0AFCD]/10 to-[#5E4297]/10 rounded-2xl p-6 text-center">
                                        <div className="w-16 h-16 bg-gradient-to-r overflow-hidden from-[#F0AFCD] to-[#5E4297] rounded-full mx-auto mb-3"><img className='w-full h-full object-cover' src={items.image} alt="" /></div>
                                        <h4 className="font-semibold text-[#525252] mb-1"> {items.last_name} {items.first_name}</h4>
                                        <p className="text-xs text-[#525252]/60">{items.position}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>


                {/* Расположение */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-[#525252] mb-4">
                                Наше <span className="text-[#F0AFCD]">расположение</span>
                            </h2>
                            <p className="text-[#525252]/70">Удобное расположение с отличной транспортной доступностью</p>
                        </div>

                        <DGisMapWidget />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-r from-[#5E4297] to-[#F0AFCD]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Позаботьтесь о своем здоровье уже сегодня
                        </h2>
                        <p className="text-white/90 text-lg mb-8">
                            Запишитесь на консультацию к нашим специалистам и получите профессиональную медицинскую помощь
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size='large' type='primary' icon={<Phone className="w-5 h-5 inline-block mr-2" />}>
                                Связаться с нами
                            </Button>

                        </div>

                        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
                            <div className="text-white">
                                <Phone className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Телефон</h3>
                                <a href={`tel:${branches?.data[0]?.phone_1}`} className="text-white/80">{branches?.data[0]?.phone_1}</a>
                            </div>
                            <div className="text-white">
                                <Mail className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Email</h3>
                                <p className="text-white/80">{branches?.data[0]?.email}</p>
                            </div>
                            <div className="text-white">
                                <MapPin className="w-8 h-8 mx-auto mb-2" />
                                <h3 className="font-semibold mb-1">Адрес</h3>
                                <p className="text-white/80">{branches?.data[0]?.address}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Public>
    );
};

export default AboutPage;