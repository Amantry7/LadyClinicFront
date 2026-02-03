'use client';

import { MenuItem } from '../types';

export const menuItems: MenuItem[] = [
    { key: '1', label: 'О нас', href: '#about' },
    { key: '2', label: 'Услуги', href: '#services' },
    { key: '3', label: 'Врачи', href: '#doctors' },
    { key: '4', label: 'Контакты', href: '#contacts' },
];

// hooks/useScrollAnimation.ts
import { useState, useEffect } from 'react';

export const useScrollAnimation = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        //@ts-ignore
                        entry.target.style.opacity = '1';
                        //@ts-ignore
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('.fade-in');
        elements.forEach((el) => observer.observe(el));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    return { scrollY };
};
