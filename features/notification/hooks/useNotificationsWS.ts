'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { NotificationsWS } from '../service/NotificationsWS';

export function useNotificationsWS() {
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const wsRef = useRef<NotificationsWS | null>(null);

  const ws = useMemo(() => {
    return new NotificationsWS({
      onOpen: () => setConnected(true),
      onClose: () => setConnected(false),
      onMessage: (ev: MessageEvent) => {
        try {
          const data = JSON.parse(ev.data as string);
          setLastMessage(data);
        } catch {
          setLastMessage(ev.data);
        }
      },
    });
  }, []);

  useEffect(() => {
    wsRef.current = ws;
    ws.connect(); // ← без аргументов (раньше была ошибка "Expected 0 arguments")
    return () => ws.close(1000, 'unmount');
  }, [ws]);

  const send = (payload: unknown) => {
    if (!wsRef.current) return;
    const data = typeof payload === 'string' ? payload : JSON.stringify(payload);
    if (wsRef.current.ready) wsRef.current.send(data); // теперь ready и send существуют
  };

  return { connected, lastMessage, send };
}
