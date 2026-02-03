'use client';

import React, { useEffect, useState } from 'react';
import { Spin, Tag, Empty, Alert, Tooltip, ConfigProvider } from 'antd';
import {
    HeartOutlined,
    MedicineBoxOutlined,
    FileProtectOutlined,
    ExperimentOutlined,
    CalendarOutlined,
    UserOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import { fetchAnalyses, fetchMedicalCards } from '@/features/profile/api';
import { Analysis, MedicalCard } from '@/features/profile/types';
import { motion } from 'framer-motion';

// Helper to fix truncated blood type
const formatBloodType = (value?: string) => {
    if (!value) return 'Не указана';
    const lower = value.toLowerCase();
    if (lower.includes('отрицате')) return value.replace('отрицате', 'отрицательная');
    if (lower.includes('положите')) return value.replace('положите', 'положительная');
    return value;
};

const MedicalRecordsPage = () => {
    const [loading, setLoading] = useState(true);
    const [medicalCard, setMedicalCard] = useState<MedicalCard | null>(null);
    const [analyses, setAnalyses] = useState<Analysis[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const cards = await fetchMedicalCards();
                if (cards.length > 0) {
                    const card = cards[0];
                    setMedicalCard(card);
                    const allAnalyses = await fetchAnalyses();
                    const myAnalyses = allAnalyses.filter(a => a.medical_card?.id === card.id);
                    setAnalyses(myAnalyses);
                } else {
                    setMedicalCard(null);
                }
            } catch (err) {
                setError('Не удалось загрузить медицинские данные.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[500px]">
                <Spin size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <Alert message="Ошибка" description={error} type="error" showIcon className="rounded-xl" />
            </div>
        );
    }

    if (!medicalCard) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] text-gray-500">
                <Empty description="Медицинская карта не найдена" />
            </div>
        );
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Inter, sans-serif',
                },
            }}
        >
            <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-fade-in relative z-10">

                {/* Hero Card */}
                <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600"></div>

                    {/* Header */}
                    <div className="p-8 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-b from-pink-50/50 to-white">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-gradient-to-tr from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                                <MedicineBoxOutlined className="text-3xl text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight m-0">
                                    Медицинская карта
                                </h1>
                                <p className="text-gray-500 font-medium m-0 mt-1 flex items-center gap-2">
                                    <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase tracking-wider text-gray-600">ID</span>
                                    {medicalCard.card_number}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Tag color="magenta" bordered={false} className="px-3 py-1 rounded-full text-sm font-medium">
                                Пациент
                            </Tag>
                        </div>
                    </div>

                    {/* Content Grid */}
                    <div className="p-8 pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Personal Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <UserOutlined /> Основное
                            </h3>
                            <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5">ФИО Пациента</p>
                                    <p className="text-lg font-semibold text-gray-800 m-0">
                                        {medicalCard.patient.last_name} {medicalCard.patient.first_name} {medicalCard.patient.middle_name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5">Полис ОМС</p>
                                    <p className="text-base font-medium text-gray-700 m-0">
                                        {medicalCard.insurance_policy || 'Не указан'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Medical Details */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <HeartOutlined /> Показатели
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-red-400 font-semibold mb-0.5 uppercase">Группа крови</p>
                                        <p className="text-xl font-bold text-gray-800 m-0">
                                            {formatBloodType(medicalCard.blood_type)}
                                        </p>
                                    </div>
                                    <HeartOutlined className="text-2xl text-red-300" />
                                </div>

                                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
                                    <div className="flex items-center gap-2 mb-1">
                                        <InfoCircleOutlined className="text-amber-400" />
                                        <p className="text-xs text-amber-500 font-bold uppercase m-0">Аллергии</p>
                                    </div>
                                    <p className="text-sm text-gray-700 m-0 leading-relaxed">
                                        {medicalCard.allergies || 'Нет известных аллергий'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Extra Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                <FileProtectOutlined /> Дополнительно
                            </h3>
                            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 h-full">
                                <p className="text-xs text-blue-400 font-semibold mb-2 uppercase">Хронические заболевания</p>
                                <p className="text-sm text-gray-700 m-0 leading-relaxed">
                                    {medicalCard.chronic_diseases || 'Не указаны'}
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Analyses Section */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                                <ExperimentOutlined />
                            </span>
                            Результаты анализов
                        </h2>
                        {analyses.length > 0 && (
                            <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-bold">
                                {analyses.length}
                            </span>
                        )}
                    </div>

                    {analyses.length === 0 ? (
                        <div className="bg-white rounded-3xl p-12 text-center shadow-lg border border-gray-100">
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Нет результатов анализов" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {analyses.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-pink-200 group relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-gray-200 group-hover:bg-pink-500 transition-colors duration-300"></div>

                                    <div className="flex justify-between items-start mb-4 pl-2">
                                        <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-pink-50 transition-colors">
                                            <ExperimentOutlined className="text-xl text-gray-400 group-hover:text-pink-500" />
                                        </div>
                                        <StatusTag status={item.status} />
                                    </div>

                                    <h4 className="text-lg font-bold text-gray-800 mb-2 pl-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                                        {item.title}
                                    </h4>

                                    <div className="pl-2 space-y-2">
                                        <p className="text-sm text-gray-400 m-0 flex items-center gap-2">
                                            <CalendarOutlined />
                                            {new Date(item.taken_at).toLocaleDateString('ru-RU', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>

                                    {item.lab_values && Object.keys(item.lab_values).length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-50 pl-2">
                                            <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Результаты</p>
                                            <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 font-mono">
                                                JSON данные доступны
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ConfigProvider>
    );
};

const StatusTag = ({ status }: { status: string }) => {
    let color = 'default';
    let text = status;
    let className = 'bg-gray-100 text-gray-500';

    if (status === 'ready') {
        text = 'Готов';
        className = 'bg-green-100 text-green-600';
    } else if (status === 'pending') {
        text = 'В работе';
        className = 'bg-blue-100 text-blue-600';
    } else if (status === 'cancelled') {
        text = 'Отменен';
        className = 'bg-red-100 text-red-600';
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${className}`}>
            {text}
        </span>
    );
};

export default MedicalRecordsPage;
