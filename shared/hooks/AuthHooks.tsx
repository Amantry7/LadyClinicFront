// hooks/useAuth.tsx - исправленная версия с правильными импортами

import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from 'react';
import { AuthService, AuthState } from './AuthService';

// Интерфейс для контекста
interface AuthContextType {
    authState: AuthState;
    loading: boolean;
    login: (currentPath?: string) => void;
    logout: () => Promise<void>;
    refreshAuthState: () => Promise<void>;
}

// Контекст для авторизации
export const AuthContext = createContext<AuthContextType | null>(null);

// Хук для использования контекста авторизации
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Интерфейс для провайдера
interface AuthProviderProps {
    children: ReactNode;
}

// Провайдер авторизации
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>({
        authenticated: false,
        user: null,
    });
    const [loading, setLoading] = useState(true);

    const refreshAuthState = useCallback(async () => {
        setLoading(true);
        try {
            console.log('Refreshing auth state...');
            const newAuthState = await AuthService.getCurrentUser();
            console.log('Auth state refreshed:', newAuthState);
            setAuthState(newAuthState);
        } catch (error) {
            console.error('Error refreshing auth state:', error);
            setAuthState({ authenticated: false, user: null });
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback((currentPath?: string) => {
        AuthService.initiateSSO(currentPath);
    }, []);

    const logout = useCallback(async () => {
        setLoading(true);
        try {
            const success = await AuthService.logout();
            if (success) {
                setAuthState({ authenticated: false, user: null });
            }
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Обработка URL параметров для SSO
    useEffect(() => {
        const handleURLParams = async () => {
            const urlParams = new URLSearchParams(window.location.search);

            if (urlParams.get('sso_success') === 'true') {
                console.log('SSO success detected, refreshing auth state...');

                // Удаляем параметр из URL сразу
                const newUrl = window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);

                // Ждем немного для завершения процесса на сервере
                await new Promise(resolve => setTimeout(resolve, 500));

                // Обновляем состояние авторизации
                await refreshAuthState();

                console.log('SSO success processing completed');

            } else if (urlParams.get('error')) {
                // Ошибка авторизации
                const error = urlParams.get('error');
                const errorDescription = urlParams.get('error_description');
                console.error('SSO Error:', error, errorDescription);

                // Показываем уведомление об ошибке
                alert(`Ошибка авторизации: ${error}${errorDescription ? ` - ${errorDescription}` : ''}`);

                // Удаляем параметры из URL
                const newUrl = window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);

                setLoading(false);

            } else if (urlParams.get('logout') === 'true') {
                console.log('Logout success detected');

                // Успешный выход
                setAuthState({ authenticated: false, user: null });

                // Удаляем параметр из URL
                const newUrl = window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);

                setLoading(false);

            } else {
                // Обычная проверка авторизации при загрузке
                await refreshAuthState();
            }
        };

        handleURLParams();
    }, [refreshAuthState]);

    const value: AuthContextType = {
        authState,
        loading,
        login,
        logout,
        refreshAuthState,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Интерфейс для защищенного роута
interface ProtectedRouteProps {
    children: ReactNode;
    fallback?: ReactNode;
}

// Компонент для защищенных роутов
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, fallback }) => {
    const { authState, loading, login } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                <div className="ml-4 text-lg">Проверка авторизации...</div>
            </div>
        );
    }

    if (!authState.authenticated) {
        if (fallback) {
            return <>{fallback}</>;
        }

        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center max-w-md">
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-lg">
                            <span className="text-2xl font-bold text-white">BB</span>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Требуется авторизация</h2>
                    <p className="text-gray-600 mb-6">
                        Для доступа к этой странице необходимо войти в систему
                    </p>
                    <button
                        onClick={() => login(window.location.href)}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                        Войти через BigBee
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};