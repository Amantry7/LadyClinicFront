export type NotificationKind = 'welcome' | 'info' | 'success' | 'warning' | 'error';

export interface NotificationDTO {
    id: string;
    type: NotificationKind | string; // сервер может прислать кастомный тип
    title: string;
    message: string;
    status?: 'pending' | 'sent' | 'read';
    created_at?: string;
    sent_at?: string | null;
    is_read?: boolean;
    read_at?: string | null;
}

export interface Paginated<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}
