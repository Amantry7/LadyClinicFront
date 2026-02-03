'use client'
import { BigBeeLoginButton } from '@/features/Auth/UI/BigBeeLoginButton';
import SSOLoginButton from '@/features/Auth/UI/Test';
import NotificationsBadge from '@/features/notification/UI/NotificationsBadge';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Divider, Drawer, Segmented } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useLanguage } from '@/shared/contexts/LanguageContext'

const Nav = () => {
    const { currentLanguage, changeLanguage } = useLanguage();
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const roter = useRouter()
    
    // Преобразуем код языка в формат для отображения (ru -> RU, ky -> KG)
    const displayLang = currentLanguage === 'ky' ? 'KG' : 'RU';
    
    const handleLanguageChange = (value: string) => {
        // Преобразуем обратно (RU -> ru, KG -> ky)
        const langCode = value === 'KG' ? 'ky' : 'ru';
        changeLanguage(langCode);
    };
    const menuItems = [
        { key: '1', label: 'О нас', href: '/about' },
        { key: '5', label: 'Цены', href: '/price' },

        // { key: '2', label: 'Услуги', href: '#services' },
        { key: '3', label: 'Врачи', href: '/doctors' },
        { key: '4', label: 'Контакты', href: '/contacts' },
    ];
    return (
        <>
            <br /><br /><br />
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${1 > 50
                    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-100'
                    : 'bg-white/80 backdrop-blur-sm'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link href={'/'} className="flex-shrink-0">
                            <Image width={100} height={40} src="./logo.svg" style={{ height: '40px' }} alt="" />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-8">
                            {menuItems.map((item) => (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    className="text-gray-600 hover:text-pink-500 transition-colors duration-200 font-medium relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
                                </a>
                            ))}
                        </nav>

                        {/* Language Switch & Profile */}
                        <div className="hidden md:flex items-center space-x-4 gap-2">
                            <Segmented
                                value={displayLang}
                                onChange={handleLanguageChange}
                                shape='round'
                                options={[
                                    { label: 'RU', value: 'RU' },
                                    { label: 'KG', value: 'KG' }
                                ]}
                                size="middle"
                            />
                            <SSOLoginButton/>
                            {/* <Button shape='round'
                                href='/profile'
                                type="primary"
                                className="bg-gradient-to-r from-pink-400 to-purple-500 border-none hover:from-pink-500 hover:to-purple-600 rounded-full px-6"
                            >
                                Личный кабинет
                            </Button> */}
                        </div>
                        {/* Mobile menu button */}
                        <div className="  md:hidden text-gray-600">  <Button shape='round'
                            type="text"
                            icon={<MenuOutlined />}
                            onClick={() => setMobileMenuVisible(true)}
                        /></div>

                    </div>
                </div>
            </header>
            <Drawer
                title="Меню"
                placement="right"
                onClose={() => setMobileMenuVisible(false)}
                open={mobileMenuVisible}
                width={280}
            >
                <div className="space-y-4">
                    {menuItems.map((item) => (
                        <a
                            key={item.key}
                            href={item.href}
                            className="block py-2 text-gray-600 hover:text-pink-500 transition-colors duration-200"
                            onClick={() => setMobileMenuVisible(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                    <Divider />
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            {['RU', 'KG'].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => handleLanguageChange(lang)}
                                    className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ${displayLang === lang
                                        ? 'bg-pink-400 text-white'
                                        : 'text-pink-400 border border-pink-300'
                                        }`}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                        <BigBeeLoginButton />
                        <Button

                            shape='round'
                            type="primary"
                            href='/profile'
                            block
                            className="bg-gradient-to-r from-pink-400 to-purple-500 border-none mt-2"
                        >
                            Личный кабинет
                        </Button>
                    </div>
                </div>
            </Drawer></>

    )
}

export default Nav
