import { useState } from 'react';

export const useMedicalPageState = () => {
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
    const [currentLang, setCurrentLang] = useState('RU');

    return {
        mobileMenuVisible,
        setMobileMenuVisible,
        currentLang,
        setCurrentLang
    };
};
