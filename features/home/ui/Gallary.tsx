'use client';

import React, { useState, useEffect } from 'react';
import { Image, Skeleton, Typography } from 'antd';
import { useAppSelector } from '@/shared/hooks/redux-hooks';
import type { Gallery } from '@/shared/types/api';

const { Title } = Typography;

const CompactGallery: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { data: galleryData, loading: galleryLoading } = useAppSelector((state) => state.cms.galleryItems);

  useEffect(() => {
    if (galleryData && !galleryLoading) {
      setLoading(false);
    }
  }, [galleryData, galleryLoading]);

  if (loading || galleryLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton.Input active size="large" style={{ width: 300, height: 40 }} />
            <div className="mt-4">
              <Skeleton.Input active size="default" style={{ width: 500, height: 20 }} />
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton.Image
                key={index}
                active
                style={{ width: '100%', height: '200px', borderRadius: '12px' }}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Фильтруем изображения с null значениями
  const filteredGalleryData = galleryData?.filter((item: Gallery) => item.image) || [];

  if (!galleryData || filteredGalleryData.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-12">
          <Title level={2} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Галерея клиники
          </Title>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Посмотрите на наши современные палаты, оборудование и комфортную атмосферу клиники
          </p>
        </div>

        {/* Компактная сетка изображений */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {filteredGalleryData.map((item: Gallery, index: number) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl shadow-md cursor-pointer"
              style={{ aspectRatio: '4/3' }} // Фиксированное соотношение сторон
            >
              <Image
                src={item.image!} // Используем ! так как мы отфильтровали null значения
                alt={item.title || `Галерея изображение ${index + 1}`}
                width="100%"
                height="100%"
                style={{ 
                  objectFit: 'cover',
                  borderRadius: '12px'
                }}
                preview={{
                  mask: (
                    <div className="flex flex-col items-center justify-center h-full text-white">
                      <svg
                        className="w-12 h-12 mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Просмотр</span>
                    </div>
                  ),
                }}
                loading="lazy"
              />
              
              {/* Заголовок изображения */}
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white text-sm font-medium truncate">{item.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompactGallery;
