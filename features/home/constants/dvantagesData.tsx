
// constants/advantagesData.tsx
import React from 'react';
import {
    TrophyOutlined,
    MedicineBoxOutlined,
    TeamOutlined,
    StarOutlined,
    CustomerServiceOutlined
} from '@ant-design/icons';
import { Advantage } from '../types';

export const advantagesData: Advantage[] = [
    {
        icon: <TrophyOutlined className="text-3xl text-purple-500" />,
        title: '15+ лет опыта',
        description: 'Многолетний опыт работы наших специалистов в области репродуктивной медицины'
    },
    {
        icon: <MedicineBoxOutlined className="text-3xl text-purple-500" />,
        title: 'Современное оборудование',
        description: 'Новейшие медицинские технологии и оборудование экспертного класса'
    },
    {
        icon: <TeamOutlined className="text-3xl text-purple-500" />,
        title: 'Экспертные врачи',
        description: 'Команда высококвалифицированных специалистов с международными сертификатами'
    },
    {
        icon: <StarOutlined className="text-3xl text-purple-500" />,
        title: 'Высокие результаты',
        description: 'Успешность наших процедур значительно превышает средние показатели'
    },
    {
        icon: <CustomerServiceOutlined className="text-3xl text-purple-500" />,
        title: 'Полная конфиденциальность',
        description: 'Гарантируем полную конфиденциальность и индивидуальный подход'
    },
    {
        icon: <CustomerServiceOutlined className="text-3xl text-purple-500" />,
        title: '24/7 поддержка',
        description: 'Круглосуточная поддержка пациентов и экстренная помощь'
    }
];
