
// ui/HeroSection.tsx
import React from 'react';
import { Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

interface HeroSectionProps {
    className?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
    return (
        <section className={`pt-16 pb-20 bg-gradient-to-br from-pink-50 via-white to-purple-50 overflow-hidden relative ${className || ''}`}>
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-pink-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center py-20">
                    <Title
                        level={1}
                        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-purple-600 bg-clip-text text-transparent animate-fade-in"
                    >
                        Медицинская забота
                        <br />
                        нового уровня
                    </Title>

                    <Paragraph className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Объединяем клиники "Репродукция" и "Леди Клиник" для предоставления комплексной
                        медицинской помощи в Бишкеке, Кыргызстан. Современные технологии и опытные специалисты для вашего здоровья.
                    </Paragraph>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <Button
                            shape='round'
                            type="primary"
                            size="large"
                            className="bg-gradient-to-r from-pink-400 to-purple-500 border-none hover:from-pink-500 hover:to-purple-600 rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                            href="/contacts"
                        >
                            Записаться
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};