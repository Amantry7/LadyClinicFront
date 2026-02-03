'use client';

import { notification } from 'antd'; // добавляем Button, Space и Divider
import { useEffect, useRef, useState, useMemo } from 'react';
import { NotificationsWS } from '../service/NotificationsWS'; // Проверьте правильность пути
import type { NotificationDTO } from '../types/notifications';
import { useAppDispatch } from '@/shared/hooks/redux-hooks';
import { fetchCmsBranches } from '@/entities/cms/model/cms-slice';


const mapTypeToAntd: Record<string, 'info' | 'success' | 'warning' | 'error' | 'open'> = {
    welcome: 'success',
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'error',
};

export default function NotifyToaster() {
    const [api, contextHolder] = notification.useNotification(); // Получаем api и contextHolder для уведомлений
    const wsRef = useRef<NotificationsWS | null>(null);
    const dispatch = useAppDispatch()
    const [error, setError] = useState<string | null>(null);
    if (typeof window === 'undefined') {
        return null; // Возвращаем null на сервере
    }
    useEffect(() => {
        dispatch(fetchCmsBranches({}));
    }, [])
    // Создаем аудио объект для воспроизведения звука уведомления
    const sound = new Audio('/audio.mp3'); // Путь к вашему аудиофайлу

    useEffect(() => {
        wsRef.current = new NotificationsWS({
            url: 'wss://api.ladyclinic.kg/ws/notifications/',
            onMessage: (ev: MessageEvent) => {
                let payload: unknown;
                try {
                    payload = JSON.parse(String(ev.data));
                } catch {
                    payload = ev.data;
                }

                const n: NotificationDTO =
                    typeof payload === 'object' &&
                        payload !== null &&
                        //@ts-ignore
                        (payload.type === 'notification' && payload.notification)
                        //@ts-ignore
                        ? payload.notification
                        : (payload as NotificationDTO);

                // Для "connection_established" уведомлений
                if (n?.type === 'connection_established') {
                    api.success({
                        message: 'Подключение установлено',
                        description: n.message || 'WebSocket connection successful!',
                        duration: 5,
                        placement: 'topRight',
                    });
                    sound.play(); // Воспроизведение звука
                    return;
                }

                // Для уведомлений с типом "notification"
                if (!n?.message || (n?.title === "" && n?.type === "")) {
                    n.title = n.title || 'Уведомление'; // Устанавливаем дефолтный title
                    n.type = n.type || 'info'; // Устанавливаем дефолтный type
                }

                const antdType = mapTypeToAntd[n?.type ?? 'info'] ?? 'info';

                // Используем api для уведомлений с контекстом
                api[antdType]({
                    message: n.title || 'Уведомление',
                    description: n.message || '',
                    duration: 5,
                    placement: 'topRight',
                });
                sound.play(); // Воспроизведение звука
            },
            onError: (err) => {
                setError(`Ошибка WebSocket: ${err}`);
            }
        });

        wsRef.current.connect();

        // Очистка при размонтировании
        return () => {
            if (wsRef.current) {
                wsRef.current.close();
            }
        };
    }, [api]);

    // Отображение ошибок, если они возникли


    return (
        <div>
            {contextHolder}
        </div>
    );
}
