import { api } from "@/shared/api/base";
import { NotificationDTO, Paginated } from "../types/notifications";


export interface ListParams {
  limit?: number;
  offset?: number;
}

export const notificationsApi = {
  list(params?: ListParams) {
    return api.get<Paginated<NotificationDTO>>('/notifications/notifications/', { params }).then(r => r.data);
  },

  // ✅ alias под твой вызов
  listNotifications(params?: ListParams) {
    return notificationsApi.list(params);
  },


  markRead(notificationId: string) {
    return api.post<NotificationDTO>(`/notifications/${encodeURIComponent(notificationId)}/read/`).then(r => r.data);
  },
};
