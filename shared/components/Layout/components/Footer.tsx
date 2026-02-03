import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useAppSelector } from '@/shared/hooks/redux-hooks';
import Link from 'next/link';


export default function MedicalFooter() {
    // В реальном приложении раскомментируйте эту строку:
    const { data } = useAppSelector((state) => state.cms.branches);

    // Используем mock данные для демонстрации

    const quickLinks = [
        'Услуги',
        'Врачи',
        'О нас',
        'Контакты',
        'Отзывы'
    ];

    return (
        <footer className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* Филиалы клиник */}
                    {data?.map((branch) => (
                        <div key={branch.id} className="space-y-3 sm:space-y-4">
                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                                {branch.title}
                            </h3>

                            <div className="space-y-2 sm:space-y-3">
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                                        {branch.address}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 flex-shrink-0" />
                                    <a
                                        href={`tel:${branch.phone_1}`}
                                        className="text-gray-300 text-xs sm:text-sm hover:text-pink-400 transition-colors"
                                    >
                                        {branch.phone_1}
                                    </a>
                                </div>

                                <div className="flex items-center gap-2 sm:gap-3">
                                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 flex-shrink-0" />
                                    <a
                                        href={`mailto:${branch.email}`}
                                        className="text-gray-300 text-xs sm:text-sm hover:text-pink-400 transition-colors break-all"
                                    >
                                        {branch.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Быстрые ссылки */}
                    <div className="space-y-3 sm:space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                            Быстрые ссылки
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                            {quickLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-gray-300 text-xs sm:text-sm hover:text-pink-400 transition-colors py-1"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Социальные сети */}
                    <div className="space-y-3 sm:space-y-4 col-span-1 sm:col-span-2 lg:col-span-1">
                        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                            Мы в соцсетях
                        </h3>
                        <p className="text-gray-300 text-xs sm:text-sm mb-3 sm:mb-4">
                            Следите за новостями и советами по здоровью
                        </p>
                        <div className="flex gap-2 sm:gap-3 flex-wrap">
                            {data && data[0] && (
                                <>
                                    {
                                        //@ts-ignore
                                        data[0].facebook && (
                                            <a                                        //@ts-ignore

                                                href={data[0].facebook}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                                            >
                                                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </a>
                                        )}

                                    {
                                        //@ts-ignore

                                        data[0].instagram && (
                                            <a                                        //@ts-ignore

                                                href={data[0].instagram}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"
                                            >
                                                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </a>
                                        )}

                                    <a
                                        href="#"
                                        className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                                    >
                                        <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </a>

                                    {                                        //@ts-ignore

                                        data[0].youtube && (
                                            <a                                        //@ts-ignore

                                                href={data[0].youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                                            >
                                                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </a>
                                        )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Нижняя часть футера */}
                <div className="border-t border-gray-700 mt-8 sm:mt-12 pt-6 sm:pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <Link href={'/'} className="flex-shrink-0">
                                <img src="./logo.svg" style={{ height: '40px' }} alt="" />
                            </Link>
                        </div>

                        <div className="flex flex-col sm:flex-row md:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 text-center">
                            <span>© 2025 LadyClinic</span>
                            <span className="hidden sm:block">•</span>
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Политика конфиденциальности
                            </Link>
                            <span className="hidden sm:block">•</span>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Публичная оферта
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}