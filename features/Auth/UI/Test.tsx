// components/SSOLoginButton.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { LogIn, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/shared/hooks/AuthHooks';
import { AuthService, PERMISSIONS } from '@/shared/hooks/AuthService';
import { Button } from 'antd';

interface SSOLoginButtonProps {
  className?: string;
  showUserInfo?: boolean;
  onLoginClick?: () => void;
  onLogoutClick?: () => void;
}

const SSOLoginButton: React.FC<SSOLoginButtonProps> = ({
  className = '',
  showUserInfo = true,
  onLoginClick,
  onLogoutClick
}) => {
  const { authState, loading, login, logout } = useAuth();

  const handleLogin = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      login(window.location.href);
    }
  };

  const handleLogout = async () => {
    if (onLogoutClick) {
      onLogoutClick();
    } else {
      const confirmLogout = window.confirm('Вы уверены, что хотите выйти из системы?');
      if (confirmLogout) {
        await logout();
      }
    }
  };

  if (loading) {
    return (
      <div className={`flex items-center px-4 py-2 bg-gray-100 rounded-xl ${className}`}>
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500"></div>
        <span className="ml-2 text-sm text-gray-600">Загрузка...</span>
      </div>
    );
  }

  if (authState.authenticated && authState.user) {
    const displayName = AuthService.getDisplayName(authState.user);
    const hasAdminAccess = AuthService.hasPermission(authState.token_info, PERMISSIONS.ADMIN_ACCESS);

    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        {showUserInfo && (
          <div className="flex items-center bg-yellow-50 border border-yellow-200 rounded-xl px-3 py-2">
            <User className="w-4 h-4 text-yellow-600 mr-2" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-700">
                {displayName}
              </span>
              {authState.token_info?.service && (
                <span className="text-xs text-gray-500">
                  {authState.token_info.service}
                </span>
              )}
            </div>
            {hasAdminAccess && (
              <div className="ml-2 px-2 py-1 bg-yellow-200 rounded-full">
                <span className="text-xs font-medium text-yellow-800">Admin</span>
              </div>
            )}
          </div>
        )}

        {/* User Menu Dropdown */}
        <div className="relative group">
          <button className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-xl font-medium text-sm transition-all duration-200">
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-800">{displayName}</div>
              <div className="text-xs text-gray-500">{authState.user.email}</div>
            </div>

            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Профиль
            </Link>

            <Link
              href="/bookings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Мои записи
            </Link>

            {hasAdminAccess && (
              <Link
                href="/admin"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Администрирование
              </Link>
            )}

            <div className="border-t border-gray-100 my-1"></div>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Button icon={<LogIn className="w-4 h-4" />}
      shape='round'
      type='primary'
      onClick={handleLogin}
    >
      Войти через BigBee
    </Button>
  );
};

export default SSOLoginButton;