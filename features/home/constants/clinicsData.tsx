
// constants/clinicsData.tsx
import React from 'react';
import { UserOutlined, HeartOutlined } from '@ant-design/icons';
import { Clinic } from '../types';

export const clinicsData: Clinic[] = [
    {
        title: 'Клиника "Репродукция"',
        description: 'Специализированный центр репродуктивного здоровья с современным оборудованием и высококвалифицированными специалистами.',
        icon: <UserOutlined className="text-4xl text-pink-400" />,
        features: [
            'ЭКО и репродуктивные технологии',
            'Диагностика бесплодия',
            'Ведение беременности',
            'Гинекологическая хирургия',
            'Андрология'
        ],
        gradient: 'from-pink-100 to-purple-100'
    },
    {
        title: 'Леди Клиник',
        description: 'Комплексная женская клиника, предоставляющая полный спектр услуг по женскому здоровью и красоте.',
        icon: <HeartOutlined className="text-4xl text-purple-500" />,
        features: [
            'Гинекология и акушерство',
            'Эстетическая медицина',
            'Дерматология и косметология',
            'Эндокринология',
            'Психологическая поддержка'
        ],
        gradient: 'from-purple-100 to-pink-100'
    }
];
