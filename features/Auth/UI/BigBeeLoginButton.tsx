'use client'
import { AuthService } from '@/shared/hooks/AuthService';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface BigBeeLoginButtonProps {
    text?: string;
    redirectUrl?: string;
    className?: string;
    style?: React.CSSProperties;
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
}

const SSO_URL = 'https://api.ladyclinic.kg/api/v1/users/sso/login/';

export const BigBeeLoginButton: React.FC<BigBeeLoginButtonProps> = ({
    text = 'Войти через BigBee',
    redirectUrl = typeof window !== 'undefined' ? window.location.href : '/',
    className = '',
    style = {},
    size = 'medium',
    loading = false,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    if (typeof window === 'undefined') {
        return null;
    }

    const urlParams = new URLSearchParams(window.location.search);

    useEffect(() => {
        if (urlParams.get('sso_success') === 'true') {
            console.log('SSO success detected, refreshing auth state...');
            name();
        }
    }, []);

    const handleClick = () => {
        if (loading) return;
        const finalUrl = `${SSO_URL}?next=${encodeURIComponent(redirectUrl)}`;
        window.location.href = finalUrl;
    };

    async function name() {
        try {
            const response = await AuthService.getCurrentUser()

            if (response) {
                const data = response;
                console.log('Current user data:', data);

                if (data.authenticated && data.user) {
                    // Save data to localStorage for offline access
                    typeof window !== undefined && localStorage.setItem('user_data', JSON.stringify(data));
                    typeof window !== undefined && localStorage.setItem('user_id', data.user.id);

                    return {
                        authenticated: true,
                        user: data.user,
                        token_info: data.token_info,
                    };
                }
            }
        } catch (error) {
            console.error('Error fetching current user:', error);

            // Fallback to localStorage data in case of network error
            const savedData = typeof window !== undefined && localStorage.getItem('user_data');
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
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

            return { authenticated: false, user: null };
        }
    }

    const sizeStyles = {
        small: {
            padding: '6px 12px',
            fontSize: '12px',
            height: '28px',
            iconSize: '14px',
        },
        medium: {
            padding: '8px 16px',
            fontSize: '14px',
            height: '36px',
            iconSize: '16px',
        },
        large: {
            padding: '12px 20px',
            fontSize: '16px',
            height: '44px',
            iconSize: '18px',
        },
    };

    const currentSize = sizeStyles[size];

    const buttonStyle: React.CSSProperties = {
        // Base styles
        ...currentSize,
        fontWeight: 500,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        border: '1px solid #d9d9d9',
        borderRadius: '6px',
        cursor: loading ? 'not-allowed' : 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minWidth: '120px',
        position: 'relative',
        overflow: 'hidden',
        userSelect: 'none',
        textDecoration: 'none',
        outline: 'none',
        transition: 'all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)',

        // Color scheme
        background: loading
            ? '#f5f5f5'
            : isPressed
                ? '#f0f0f0'
                : isHovered
                    ? '#fafafa'
                    : '#ffffff',
        color: loading ? '#bfbfbf' : '#262626',
        borderColor: loading
            ? '#d9d9d9'
            : isHovered
                ? '#4096ff'
                : '#d9d9d9',

        // Focus styles
        boxShadow: isHovered && !loading
            ? '0 2px 4px rgba(0, 0, 0, 0.06), 0 0 0 2px rgba(64, 150, 255, 0.1)'
            : '0 2px 4px rgba(0, 0, 0, 0.02)',

        // Transform for press effect
        transform: isPressed && !loading ? 'translateY(1px)' : 'translateY(0)',

        ...style,
    };

    const iconStyle: React.CSSProperties = {
        width: currentSize.iconSize,
        height: currentSize.iconSize,
        opacity: loading ? 0.5 : 1,
        transition: 'opacity 0.2s ease',
    };

    const loadingSpinnerStyle: React.CSSProperties = {
        width: currentSize.iconSize,
        height: currentSize.iconSize,
        border: '2px solid #f0f0f0',
        borderTop: '2px solid #bfbfbf',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginRight: '0',
    };

    return (
        <>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                .bigbee-btn:hover {
                    background-color: #fafafa !important;
                    border-color: #4096ff !important;
                }
                
                .bigbee-btn:active {
                    background-color: #f0f0f0 !important;
                    transform: translateY(1px) !important;
                }
                
                .bigbee-btn:focus-visible {
                    outline: 2px solid #4096ff !important;
                    outline-offset: 2px !important;
                }
            `}</style>
            <button
                className={`bigbee-btn ${className}`}
                style={buttonStyle}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setIsPressed(false);
                }}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                disabled={loading}
                aria-label={loading ? 'Загрузка...' : text}
            >
                {loading ? (
                    <div style={loadingSpinnerStyle} />
                ) : (
                    <svg
                        style={iconStyle}
                        xmlns="http://www.w3.org/2000/svg"
                        width={currentSize.iconSize}
                        height={currentSize.iconSize}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M15 3h4a2 2 0 0 1 2 2v4M10 14L21 3M10 14H7l-4 4v3h3l4-4v-3z" />
                    </svg>
                )}
                <span style={{
                    opacity: loading ? 0.5 : 1,
                    transition: 'opacity 0.2s ease',
                    fontWeight: 500,
                }}>
                    {loading ? 'Загрузка...' : text}
                </span>
            </button>
        </>
    );
};