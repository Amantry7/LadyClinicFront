// utils/auth.ts

// Интерфейсы для типизации
export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    username: string;
}

export interface TokenInfo {
    permissions: string[];
    roles: string[];
    company_id: string;
    service: string;
}

export interface AuthState {
    authenticated: boolean;
    user: User | null;
    token_info?: TokenInfo;
}

export interface AuthResponse {
    authenticated: boolean;
    user: User | null;
    token_info?: TokenInfo;
}
// Конфигурация API
const API_BASE_URL = 'https://api.ladyclinic.kg/api/v1/users';

export class AuthService {
    private static async makeRequest(url: string, options: RequestInit = {}): Promise<Response> {

        console.log('=== REQUEST DEBUG ===');
        console.log('URL:', url);
        console.log('Current cookies:', document.cookie);
        console.log('Request credentials:', options.credentials || 'include');
        const defaultOptions: RequestInit = {
            credentials: 'include', // Важно для работы с cookies сессии Django
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, defaultOptions);
            console.log(`API Request to ${url}:`, response.status, response.statusText);
            return response;
        } catch (error) {
            console.error(`API Request failed to ${url}:`, error);
            throw error;
        }
    }

    /**
     * Получает текущее состояние авторизации пользователя
     */
    static async getCurrentUser(): Promise<AuthState> {
        try {
            const response = await this.makeRequest(`${API_BASE_URL}/auth/user/`);

            // Если сервер вернул не 2xx — пробуем взять кеш, иначе дефолт
            if (!response.ok) {
                const cached = typeof window !== undefined && localStorage.getItem('user_data');
                if (cached) {
                    try {
                        const parsed: AuthResponse = JSON.parse(cached);
                        return {
                            authenticated: parsed.authenticated,
                            user: parsed.user,
                            token_info: parsed.token_info,
                        };
                    } catch {
                        // Кеш битый — очищаем и возвращаем неавторизованного
                        this.clearLocalStorage();
                        return { authenticated: false, user: null };
                    }
                }
                // Нет кеша — неавторизован
                return { authenticated: false, user: null };
            }

            // OK-ответ сервера
            const data: AuthResponse = await response.json();
            console.log('Current user data:', data);

            if (data.authenticated && data.user) {
                // Сохраняем для офлайна
                typeof window !== undefined && localStorage.setItem('user_data', JSON.stringify(data));
                typeof window !== undefined && localStorage.setItem('user_id', data.user.id);
                return {
                    authenticated: true,
                    user: data.user,
                    token_info: data.token_info,
                };
            }

            // Ответ OK, но пользователь не авторизован — чистим кеш и возвращаем false
            this.clearLocalStorage();
            return { authenticated: false, user: null };

        } catch (error) {
            console.error('Error fetching current user:', error);

            // Сетевые проблемы — пробуем кеш
            const savedData = localStorage.getItem('user_data');
            if (savedData) {
                try {
                    const parsedData: AuthResponse = JSON.parse(savedData);
                    console.log('Using cached user data due to network error');
                    return {
                        authenticated: parsedData.authenticated,
                        user: parsedData.user,
                        token_info: parsedData.token_info,
                    };
                } catch (parseError) {
                    console.error('Error parsing cached user data:', parseError);
                }
            }

            // Ничего не вышло — чистим и возвращаем false
            this.clearLocalStorage();
            return { authenticated: false, user: null };
        }
    }

    /**
     * Инициирует процесс SSO авторизации
     */
    static initiateSSO(returnUrl?: string): void {
        const ssoUrl = `${API_BASE_URL}/sso/login/`;
        const params = new URLSearchParams();

        if (returnUrl) {
            params.append('next', returnUrl);
        }

        const finalUrl = params.toString() ? `${ssoUrl}?${params}` : ssoUrl;

        console.log('Initiating SSO to:', finalUrl);
        window.location.href = finalUrl;
    }

    /**
     * Выход из системы
     */
    static async logout(): Promise<boolean> {
        try {
            console.log('Initiating logout...');

            const response = await this.makeRequest(`${API_BASE_URL}/auth/logout/`, {
                method: 'POST',
            });

            const success = response.ok;

            if (success) {
                console.log('Logout successful');
                this.clearLocalStorage();

                // Опционально: перенаправляем на главную страницу
                // window.location.href = '/';
            } else {
                console.error('Logout failed:', response.status, response.statusText);
            }

            return success;

        } catch (error) {
            console.error('Error during logout:', error);

            // Даже при ошибке сети очищаем локальные данные
            this.clearLocalStorage();
            return false;
        }
    }

    /**
     * Проверяет, есть ли у пользователя определенное разрешение
     */
    static hasPermission(tokenInfo: TokenInfo | undefined, permission: string): boolean {
        return tokenInfo?.permissions?.includes(permission) ?? false;
    }

    /**
     * Проверяет, есть ли у пользователя определенная роль
     */
    static hasRole(tokenInfo: TokenInfo | undefined, role: string): boolean {
        return tokenInfo?.roles?.includes(role) ?? false;
    }

    /**
     * Получает полное имя пользователя
     */
    static getDisplayName(user: User | null): string {
        if (!user) return 'Пользователь';

        const fullName = `${user.first_name} ${user.last_name}`.trim();
        if (fullName) return fullName;

        if (user.username && user.username !== user.email) return user.username;

        return user.email.split('@')[0];
    }

    /**
     * Очищает все данные из localStorage
     */
    private static clearLocalStorage(): void {
        //   typeof window !== undefined &&  localStorage.removeItem('user_data');
        //   typeof window !== undefined &&  localStorage.removeItem('user_id');
    }

    /**
     * Проверяет, истек ли токен (если есть информация об exp)
     */
    static isTokenExpired(tokenInfo: TokenInfo | undefined): boolean {
        // Эта проверка зависит от того, включаете ли вы exp в token_info
        // В текущей реализации Django такой информации нет, 
        // но можно добавить в будущем
        return false;
    }

    /**
     * Обновляет токен, если это необходимо
     */
    static async refreshTokenIfNeeded(): Promise<boolean> {
        // Логика обновления токена через refresh_token
        // В текущей реализации Django сессии обновляются автоматически
        // Но можно реализовать проверку и обновление при необходимости

        try {
            const authState = await this.getCurrentUser();
            return authState.authenticated;
        } catch (error) {
            console.error('Token refresh failed:', error);
            return false;
        }
    }
}

// Вспомогательные функции для компонентов
export const isAuthenticated = (authState: AuthState): boolean => {
    return authState.authenticated && authState.user !== null;
};

export const requireAuth = (authState: AuthState): authState is AuthState & { user: User } => {
    return isAuthenticated(authState);
};

// Константы разрешений (должны соответствовать серверным)
export const PERMISSIONS = {
    LOGIN: 'login',
    VIEW_PROFILE: 'view_profile',
    VIEW_OWN_BOOKINGS: 'view_own_bookings',
    CREATE_BOOKING: 'create_booking',
    MANAGE_BOOKINGS: 'manage_bookings',
    ADMIN_ACCESS: 'admin_access',
} as const;

// Константы ролей
export const ROLES = {
    CLIENT: 'client',
    EMPLOYEE: 'employee',
    ADMIN: 'admin',
    OWNER: 'owner',
} as const;