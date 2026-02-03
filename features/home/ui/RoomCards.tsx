import React from 'react';
import { Card, Button, Typography } from 'antd';
import {
  HeartOutlined,
  RestOutlined,
  SmileOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  MedicineBoxOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '@/shared/hooks/redux-hooks';
import { Chambers } from '@/shared/types/api';

const { Title, Text } = Typography;

interface RoomFeature {
  icon: React.ReactNode;
  text: string;
}

interface RoomCard {
  id: string;
  title: string;
  price: string;
  priceLabel: string;
  image: string;
  features: RoomFeature[];
  buttonText: string;
  buttonVariant?: 'primary' | 'default';
}

const RoomCards: React.FC = () => {
  const { data } = useAppSelector((state) => state.cms.chambers);



  const RoomCard: React.FC<{ room: Chambers }> = ({ room }) => (
    <Card
      className="group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      bodyStyle={{ padding: 0 }}
    >
      <div className="relative h-64 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${room.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/30 " />


        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-semibold drop-shadow-md">{room.title}</h3>
        </div>
      </div>

      <div className="p-6 bg-white">
        <div className="space-y-3 mb-6">
          {room.chamber_benefits.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-700">
              <Text className="text-sm">{feature.title}</Text>
            </div>
          ))}
        </div>

        {/* <Button
          type={room.buttonVariant === 'primary' ? 'primary' : 'default'}
          size="large"
          block
          className={`rounded-full font-medium transition-all duration-300 ${
            room.buttonVariant === 'primary'
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-0 hover:from-pink-600 hover:to-purple-600'
              : 'border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300'
          }`}
        >
          {room.buttonText}
        </Button> */}
      </div>
    </Card>
  );

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Title
            level={1}
            className="!text-4xl md:!text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent !mb-4"
          >
            Наши палаты
          </Title>
          <Text className="text-lg text-gray-600 max-w-2xl mx-auto">
            Мы предлагаем несколько категорий палат, чтобы вы могли выбрать именно то, что подходит вам:
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomCards;
