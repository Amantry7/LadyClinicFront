export type WSStatus = 'idle' | 'connecting' | 'open' | 'closing' | 'closed';

export interface NotificationsWSOptions {
  url?: string; // по умолчанию wss://api.ladyclinic.kg/ws/notifications/
  heartbeatMs?: number;
  maxBackoffMs?: number;
  onOpen?: (ev: Event) => void;
  onClose?: (ev: CloseEvent) => void;
  onError?: (ev: Event) => void;
  onMessage?: (ev: MessageEvent) => void;
}

export class NotificationsWS {
  private url: string;
  private ws: WebSocket | null = null;
  private status: WSStatus = 'idle';
  private reconnectAttempts = 0;
  private reconnectTimer: number | null = null;
  private heartbeatTimer: number | null = null;
  private heartbeatMs: number;
  private maxBackoffMs: number;

  private onOpenCb?: (ev: Event) => void;
  private onCloseCb?: (ev: CloseEvent) => void;
  private onErrorCb?: (ev: Event) => void;
  private onMessageCb?: (ev: MessageEvent) => void;

  constructor(opts?: NotificationsWSOptions) {
    this.url = opts?.url ?? 'wss://api.ladyclinic.kg/ws/notifications/';
    this.heartbeatMs = opts?.heartbeatMs ?? 25_000;
    this.maxBackoffMs = opts?.maxBackoffMs ?? 30_000;

    this.onOpenCb = opts?.onOpen;
    this.onCloseCb = opts?.onClose;
    this.onErrorCb = opts?.onError;
    this.onMessageCb = opts?.onMessage;
  }

  /** чтобы можно было проверять готовность */
  get ready(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  /** публичная отправка сообщений */
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView) {
    if (this.ready && this.ws) this.ws.send(data);
  }

  connect(): void {
    if (typeof window === 'undefined') return; // SSR guard
    if (this.status === 'connecting' || this.status === 'open') return;

    this.status = 'connecting';
    this.ws = new WebSocket(this.url); // Cookie прикрепятся автоматически

    this.ws.onopen = (ev: Event) => {
      this.status = 'open';
      this.reconnectAttempts = 0;
      if (this.reconnectTimer) {
        window.clearTimeout(this.reconnectTimer);
        this.reconnectTimer = null;
      }
      this.startHeartbeat();
      this.onOpenCb?.(ev);
    };

    this.ws.onmessage = (ev: MessageEvent) => {
      this.onMessageCb?.(ev);
    };

    this.ws.onerror = (ev: Event) => {
      this.onErrorCb?.(ev);
      // close вызовется сам → переподключимся
    };

    this.ws.onclose = (ev: CloseEvent) => {
      this.status = 'closed';
      this.stopHeartbeat();
      this.onCloseCb?.(ev);
      this.scheduleReconnect();
    };
  }

  close(code?: number, reason?: string): void {
    this.status = 'closing';
    this.stopHeartbeat();
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      this.ws.close(code, reason);
    }
    this.ws = null;
    if (this.reconnectTimer) {
      window.clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    if (!this.heartbeatMs) return;

    this.heartbeatTimer = window.setInterval(() => {
      if (this.ready && this.ws) {
        this.ws.send(JSON.stringify({ type: 'keepalive' }));
      }
    }, this.heartbeatMs);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      window.clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  private scheduleReconnect() {
    const base = Math.min(this.maxBackoffMs, 1000 * 2 ** this.reconnectAttempts);
    const jitter = Math.floor(Math.random() * 1000);
    const delay = base + jitter;

    this.reconnectAttempts += 1;
    if (this.reconnectTimer) window.clearTimeout(this.reconnectTimer);
    this.reconnectTimer = window.setTimeout(() => this.connect(), delay);
  }
}
