'use client';
import React from 'react';
import { Card, Avatar, Typography, Tooltip } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  EyeOutlined,
  ShareAltOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Meta } = Card;
const { Title, Paragraph, Text } = Typography;

const newsList = [
  {
    title: 'Открытие нового отделения репродуктивной медицины в клинике Репродукция',
    description:
      'Современное оборудование и команда ведущих специалистов теперь доступны для пациентов. Новое отделение оснащено самым современным оборудованием для диагностики и лечения бесплодия.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    author: 'Редакция',
    date: '10 июня 2025 г.',
    time: '3 мин',
    views: 1250
  },
  {
    title: 'Планирование беременности: полный гид для будущих родителей',
    description:
      'Подробное руководство по подготовке к беременности, включая необходимые анализы, рекомендации по питанию и образу жизни.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    author: 'Др. Анна Петрова',
    date: '8 июня 2025 г.',
    time: '7 мин',
    views: 892
  },
  {
    title: 'Новое УЗИ-оборудование 4D в Леди Клиник',
    description:
      'Установлено современное оборудование для проведения УЗИ-диагностики с возможностью получения трехмерных изображений плода.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    author: 'Др. Марина Соколова',
    date: '5 июня 2025 г.',
    time: '4 мин',
    views: 654
  },
  
];

const NewsCardsSection = () => {
  return (
    <section className="bg-white py-20" id="news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Title level={2} className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-800">
          Новости и статьи
        </Title>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news, index) => (
            <Card
              key={index}
              hoverable
              cover={<img alt={news.title} src={news.image} className="h-48 w-full object-cover" />}
              className="rounded-2xl shadow-lg flex flex-col justify-between"
              bodyStyle={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div className="flex-grow">
                <Title level={4} className="mb-2">
                  {news.title}
                </Title>
                <Paragraph className="text-gray-600">{news.description}</Paragraph>
              </div>

              <div className="mt-4 text-sm text-gray-500 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Avatar size="small" icon={<UserOutlined />} />
                  <Text>{news.author}</Text>
                </div>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex gap-3 items-center text-gray-500 text-xs">
                    <span>
                      <CalendarOutlined className="mr-1" />
                      {news.date}
                    </span>
                    <span>
                      <ClockCircleOutlined className="ml-2 mr-1" />
                      {news.time}
                    </span>
                    <span>
                      <EyeOutlined className="ml-2 mr-1" />
                      {news.views}
                    </span>
                  </div>
                  <Tooltip title="Поделиться">
                    <ShareAltOutlined className="cursor-pointer hover:text-pink-500 transition" />
                  </Tooltip>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsCardsSection;
