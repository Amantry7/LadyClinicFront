"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { Card, Input, Select, Button, Modal, DatePicker, TimePicker, message, Avatar, Badge, Tag, Spin } from 'antd';
import { SearchOutlined, CalendarOutlined, UserOutlined, StarFilled, PhoneOutlined, ClockCircleOutlined, HeartOutlined, TrophyOutlined } from '@ant-design/icons';
import Public from '@/shared/components/Layout/Public';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/redux-hooks';
import { fetchCmsDoctors } from '@/entities/cms/model/cms-slice';

const { Option } = Select;
const { TextArea } = Input;

interface Doctor {
    id: number;
    name: string;
    surname: string;
    specialization: string;
    qualification: string;
    experience: number;
    photo: string;
    rating: number;
    reviews: number;
    schedule: {
        [key: string]: string[];
    };
    status: 'online' | 'offline' | 'busy';
    price: number;
    achievements: string[];
}



const DoctorsCatalog: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
    const { doctors } = useAppSelector(s => s.cms)
    const dispatch = useAppDispatch()

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
    const [formData, setFormData] = useState<any>({
        name: '',
        phone: '',
        date: null,
        time: null,
        complaint: ''
    });

    useEffect(() => {
        dispatch(fetchCmsDoctors({}))
    }, [])
    if (typeof window === undefined) {
        return <Spin />
    }


    const filteredDoctors = useMemo(() => {
        return doctors.data.filter(doctor => {
            const matchesSearch =
                doctor.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                //@ts-ignore
                doctor.last_name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesSpecialization =
                !selectedSpecialization || doctor.position === selectedSpecialization;

            return matchesSearch && matchesSpecialization;
        });
    }, [searchTerm, selectedSpecialization]);

    const handleAppointment = (doctor: Doctor) => {
        setSelectedDoctor(doctor);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setSelectedDoctor(null);
        setFormData({
            name: '',
            phone: '',
            date: null,
            time: null,
            complaint: ''
        });
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.phone || !formData.date || !formData.time) {
            message.error('Заполните все обязательные поля');
            return;
        }

        message.success('Запись успешно создана!');
        handleModalClose();
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'online': return 'green';
            case 'busy': return 'orange';
            case 'offline': return 'red';
            default: return 'gray';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'online': return 'Онлайн';
            case 'busy': return 'Занят';
            case 'offline': return 'Оффлайн';
            default: return 'Неизвестно';
        }
    };

    return (
        <Public>
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50">
                <div className="max-w-7xl mx-auto p-6">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-100 to-purple-600 bg-clip-text text-transparent mb-4">
                            Наши специалисты
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Команда лучших врачей с многолетним опытом для вашего здоровья и благополучия
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mb-8 border border-white/20">
                                <Input
                                    placeholder="Поиск по имени врача..."
                                    prefix={<SearchOutlined className="text-blue-500" />}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="h-12 rounded-xl border-2 border-blue-100 focus:border-blue-400 transition-colors"
                                />
                           
                    </div>

                    {/* Doctors Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDoctors.map(doctor => (
                            <Card
                                key={doctor.id}
                                className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0"
                                bodyStyle={{ padding: 0 }}
                            >

                                {/* Doctor Photo */}
                                <div className="relative h-48 overflow-hidden">
                                  <img src={`${doctor.image}`} className='w-full h-full object-cover' alt="" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                {doctor.last_name}      {doctor.first_name}
                                            </h3>
                                          <p>  {doctor.position}</p>
                                        </div>

                                    </div>

                                    <div className="space-y-2 mb-4">

                                        <div className="flex items-center text-sm text-gray-600">
                                            <ClockCircleOutlined className="mr-2 text-green-500" />
                                            Стаж: {doctor.experience} лет
                                        </div>

                                    </div>

                                    {/* Achievements
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-1">
                                            {doctor.tags.map((achievement, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-2 py-1 rounded-full"
                                                >
                                                    {achievement}
                                                </span>
                                            ))}
                                        </div>
                                    </div> */}
                                </div>
                            </Card>
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredDoctors.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-gray-300 text-8xl mb-6">
                                <UserOutlined />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-600 mb-4">Врачи не найдены</h3>
                            <p className="text-lg text-gray-500 mb-8">Попробуйте изменить параметры поиска</p>
                            <Button
                                type="primary"
                                size="large"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 rounded-xl px-8 py-3 h-auto"
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedSpecialization('');
                                }}
                            >
                                Сбросить фильтры
                            </Button>
                        </div>
                    )}

                </div>
            </div>
        </Public>
    );
};

export default DoctorsCatalog;