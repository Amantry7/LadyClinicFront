'use client';

import { Badge, Button, Card, Space, Tag, Typography, Tooltip } from 'antd';
import { CheckCircleTwoTone, InfoCircleTwoTone, WarningTwoTone, CloseCircleTwoTone, BellTwoTone } from '@ant-design/icons';
import type { NotificationDTO } from '../types/notifications';
import clsx from 'clsx';

interface Props {
  item: NotificationDTO;
  onMarkRead?: (id: string) => void;
  onOpenDetail?: (item: NotificationDTO) => void;
}

const typeMeta: Record<string, { icon: React.ReactNode; tagColor: string; toneClass: string }> = {
  welcome: { icon: <CheckCircleTwoTone twoToneColor="#52c41a" />, tagColor: 'green', toneClass: 'ring-emerald-200' },
  info: { icon: <InfoCircleTwoTone twoToneColor="#1677ff" />, tagColor: 'blue', toneClass: 'ring-blue-200' },
  success: { icon: <CheckCircleTwoTone twoToneColor="#52c41a" />, tagColor: 'green', toneClass: 'ring-emerald-200' },
  warning: { icon: <WarningTwoTone twoToneColor="#faad14" />, tagColor: 'gold', toneClass: 'ring-amber-200' },
  error: { icon: <CloseCircleTwoTone twoToneColor="#ff4d4f" />, tagColor: 'red', toneClass: 'ring-rose-200' },
};

function humanType(t?: string) {
  switch (t) {
    case 'welcome': return 'Приветствие';
    case 'info': return 'Информация';
    case 'success': return 'Успешно';
    case 'warning': return 'Внимание';
    case 'error': return 'Ошибка';
    default: return t || 'Уведомление';
  }
}

export function NotificationItem({ item, onMarkRead, onOpenDetail }: Props) {
  const isRead = item.is_read || item.status === 'read';
  const created = item.created_at ? new Date(item.created_at).toLocaleString() : '';
  const meta = typeMeta[item.type ?? 'info'] ?? { icon: <BellTwoTone twoToneColor="#8c8c8c" />, tagColor: 'default', toneClass: 'ring-gray-200' };

  return (
    <Card
      size="small"

      style={{ marginBottom: 16 }}
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0">{meta.icon}</div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Space wrap size={6}>
              <Typography.Text strong className="truncate max-w-[60vw] md:max-w-[40rem]">
                {humanType(item.type)}
              </Typography.Text>
              <Tag color={meta.tagColor} className="text-sm">{item.type || 'notification'}</Tag>
            </Space>
            <Typography.Text type="secondary" className="text-xs">
              {created}
            </Typography.Text>
          </div>

          {item.message && (
            <Typography.Paragraph className="mb-1 mt-1 text-sm">
              {item.message}
            </Typography.Paragraph>
          )}

          {/* <div className="flex gap-2">
            {!isRead && (
              <Button
                size="small"
                type="primary"
                onClick={() => onMarkRead?.(item.id)}
                className="!rounded-full !px-4 !py-1"
              >
                Отметить как прочитанное
              </Button>
            )}
            <Tooltip title="Подробнее">
              <Button
                size="small"
                onClick={() => onOpenDetail?.(item)}
                className="!rounded-full !px-4 !py-1"
              >
                Открыть
              </Button>
            </Tooltip>
          </div> */}
        </div>
      </div>
    </Card>
  );
}
