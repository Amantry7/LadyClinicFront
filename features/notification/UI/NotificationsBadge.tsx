'use client';

import { useEffect } from 'react';
import { useNotificationsWS } from '../hooks/useNotificationsWS';

export default function NotificationsBadge() {
    const { connected, lastMessage, send } = useNotificationsWS();

    useEffect(() => {
        if (lastMessage) {
            // обнови своё состояние/стор
            console.log('WS message:', lastMessage);
        }
    }, [lastMessage]);

    return (
        <div className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${connected ? 'bg-green-500' : 'bg-gray-400'}`} />
            <button
                className="px-3 py-1 rounded bg-neutral-800 text-white"
                onClick={() => send({ type: 'ack' })}
            >
                ACK
            </button>
        </div>
    );
}
