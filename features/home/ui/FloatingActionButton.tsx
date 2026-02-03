
// ui/FloatingActionButton.tsx
import React from 'react';
import { Button } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

export const FloatingActionButton: React.FC = () => {
    return (
        <div className="fixed bottom-6 right-6 z-40">
            <Button
                type="primary"
                shape="circle"
                size="large"
                className="w-14 h-14 bg-gradient-to-r from-pink-400 to-purple-500 border-none shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
                icon={<PhoneOutlined className="text-xl" />}
                href="tel:+996XXXXXXXXX"
            />
        </div>
    );
};

