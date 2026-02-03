'use client';

import { useEffect, useMemo, useState } from 'react';
import { Pagination, Skeleton, Empty, Space, Typography, Badge, Tabs, Input, Select, Drawer, Descriptions, App } from 'antd';
import { NotificationItem } from './NotificationItem';
import type { NotificationDTO, Paginated } from '../types/notifications';
import { notificationsApi } from '../service/notificationsApi';
import { CopyOutlined } from '@ant-design/icons';

type TabKey = 'all' | 'unread' | 'read';

export default function NotificationsList() {
  const { message } = App.useApp();
  const [data, setData] = useState<Paginated<NotificationDTO> | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [offset, setOffset] = useState(0);

  // UI-состояния
  const [tab, setTab] = useState<TabKey>('all');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<'new' | 'old'>('new');

  // Drawer
  const [detail, setDetail] = useState<NotificationDTO | null>(null);

  const load = async (limit = pageSize, off = offset) => {
    setLoading(true);
    try {
      const list = await notificationsApi.listNotifications({ limit, offset: off });
      setData(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangePage = (page: number, size: number) => {
    const off = (page - 1) * size;
    setPageSize(size);
    setOffset(off);
    void load(size, off);
  };

  const markRead = async (id: string) => {
    await notificationsApi.markRead(id);
    setData(prev =>
      prev
        ? {
            ...prev,
            results: prev.results.map(n =>
              n.id === id ? { ...n, is_read: true, status: 'read', read_at: new Date().toISOString() } : n
            ),
          }
        : prev
    );
  };

  // Клиентская фильтрация/поиск/сортировка
  const filtered = useMemo(() => {
    const list = data?.results ?? [];
    let res = list;

    if (tab === 'unread') res = res.filter(n => !(n.is_read || n.status === 'read'));
    if (tab === 'read') res = res.filter(n => n.is_read || n.status === 'read');

    if (query) {
      const q = query.toLowerCase();
      res = res.filter(n =>
        (n.message || '').toLowerCase().includes(q) ||
        (n.type || '').toLowerCase().includes(q)
      );
    }

    res = res
      .slice()
      .sort((a, b) => {
        const da = new Date(a.created_at ?? 0).getTime();
        const db = new Date(b.created_at ?? 0).getTime();
        return sort === 'new' ? db - da : da - db;
      });

    return res;
  }, [data, tab, query, sort]);

  const unreadCount = useMemo(
    () => (data?.results ?? []).filter(n => !(n.is_read || n.status === 'read')).length,
    [data]
  );

  return (
    <div className="max-w-3xl mx-auto w-full px-2 md:px-0">
      <Space className="mb-4 w-full items-center justify-between">
        <Typography.Title level={3} className="!mb-0">Уведомления</Typography.Title>
        <Badge count={unreadCount} showZero>
          <Typography.Text type="secondary">Непрочитанные</Typography.Text>
        </Badge>
      </Space>

      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mb-3">
        <Tabs
          className="flex-1"
          activeKey={tab}
          onChange={k => setTab(k as TabKey)}
          items={[
            { key: 'all', label: 'Все' },
            { key: 'unread', label: `Непрочитанные (${unreadCount})` },
            { key: 'read', label: 'Прочитанные' },
          ]}
        />
        <div className="flex gap-2 w-full md:w-auto">
          <Input
            allowClear
            placeholder="Поиск по тексту/типу…"
            className="flex-1 md:w-80"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <Select
            value={sort}
            onChange={setSort}
            options={[
              { label: 'Сначала новые', value: 'new' },
              { label: 'Сначала старые', value: 'old' },
            ]}
            className="w-44"
          />
        </div>
      </div>

      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : filtered.length ? (
        <>
          {filtered.map(n => (
            <NotificationItem
              key={n.id}
              item={n}
              onMarkRead={markRead}
              onOpenDetail={setDetail}
            />
          ))}

          <div className="flex justify-end mt-4 sticky bottom-2 bg-transparent">
            <Pagination
              total={data?.count ?? 0}
              pageSize={pageSize}
              current={Math.floor(offset / pageSize) + 1}
              onChange={onChangePage}
              showSizeChanger
            />
          </div>

          <Drawer
            title="Уведомление"
            open={!!detail}
            onClose={() => setDetail(null)}
            width={Math.min(560, typeof window !== 'undefined' ? window.innerWidth - 24 : 560)}
          >
            {detail ? (
              <Descriptions bordered size="small" column={1} className="rounded-xl overflow-hidden">
                <Descriptions.Item label="ID">
                  <span className="break-all">{detail.id}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Тип">{detail.type || 'notification'}</Descriptions.Item>
                <Descriptions.Item label="Статус">{detail.status || '-'}</Descriptions.Item>
                <Descriptions.Item label="Создано">
                  {detail.created_at ? new Date(detail.created_at).toLocaleString() : '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Сообщение">
                  {detail.message || '-'}
                </Descriptions.Item>
              </Descriptions>
            ) : null}

            {detail && (
              <div className="mt-3 flex gap-8">
                <a
                  className="text-primary hover:underline cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(detail.message || '').then(() => {
                      message.success('Текст уведомления скопирован');
                    });
                  }}
                >
                  <CopyOutlined /> Скопировать текст
                </a>
                {!detail.is_read && (
                  <a
                    className="text-primary hover:underline cursor-pointer"
                    onClick={async () => {
                      await markRead(detail.id);
                      setDetail(prev => (prev ? { ...prev, is_read: true, status: 'read' } : prev));
                      message.success('Отмечено как прочитанное');
                    }}
                  >
                    Отметить прочитанным
                  </a>
                )}
              </div>
            )}
          </Drawer>
        </>
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Ничего не найдено"
          className="mt-12"
        />
      )}
    </div>
  );
}
