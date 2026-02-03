// theme.js - Конфигурация темы Ant Design
import { theme } from 'antd';

const customTheme = {
    token: {
        // Основные цвета
        colorPrimary: '#F0AFCD', // Розовый - основной акцентный цвет
        colorSuccess: '#52c41a',
        colorWarning: '#faad14',
        colorError: '#ff4d4f',
        colorInfo: '#5E4297', // Фиолетовый - информационный цвет

        // Цвета текста
        // colorText: '#525252', // Темно-серый для основного текста
        // colorTextSecondary: '#737373', // Светлее для вторичного текста
        // colorTextTertiary: '#a3a3a3', // Еще светлее для третичного текста
        // colorTextQuaternary: '#d4d4d4', // Самый светлый для неактивного текста

        // Цвета заголовков
        // colorTextHeading: '#525252', // Темно-серый для заголовков

        // Цвета границ
        colorBorder: '#F0AFCD33', // Полупрозрачный розовый
        colorBorderSecondary: '#e5e5e5',

        // Цвета фона
        colorBgContainer: '#ffffff',
        colorBgElevated: '#ffffff',
        colorBgLayout: '#fafafa',
        colorBgSpotlight: '#F0AFCD0A', // Очень светлый розовый для акцентов

        // Радиусы
        borderRadius: 8,
        borderRadiusLG: 16,
        borderRadiusSM: 6,
        borderRadiusXS: 4,

        // Размеры
        fontSize: 14,
        fontSizeLG: 16,
        fontSizeXL: 20,
        fontSizeHeading1: 38,
        fontSizeHeading2: 30,
        fontSizeHeading3: 24,
        fontSizeHeading4: 20,
        fontSizeHeading5: 16,

        // Высоты компонентов
        controlHeight: 40,
        controlHeightLG: 48,
        controlHeightSM: 32,

        // Отступы
        padding: 16,
        paddingLG: 24,
        paddingSM: 12,
        paddingXS: 8,

        // Тени
        boxShadow: '0 2px 8px rgba(240, 175, 205, 0.15)',
        boxShadowSecondary: '0 4px 16px rgba(240, 175, 205, 0.1)',

        // Шрифты
        fontFamily: `'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`,
        fontWeightStrong: 600,

        // Анимации
        motionDurationFast: '0.1s',
        motionDurationMid: '0.2s',
        motionDurationSlow: '0.3s',
    },

    components: {
        // Button - Кнопки
        Button: {
            primaryColor: '#ffffff',
            colorPrimary: '#F0AFCD',
            colorPrimaryHover: '#E396B8',
            colorPrimaryActive: '#D17EA3',
            borderRadius: 8,
            borderRadiusLG: 12,
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(240, 175, 205, 0.3)',
            boxShadowSecondary: '0 4px 12px rgba(240, 175, 205, 0.2)',
        },

        // Card - Карточки
        Card: {
            borderRadius: 16,
            boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)',
            colorBorderSecondary: '#F0AFCD20',
            headerBg: 'transparent',
            actionsBg: 'transparent',
        },

        // Input - Поля ввода
        Input: {
            borderRadius: 8,
            colorBorder: '#e5e5e5',
            colorBorderHover: '#F0AFCD',
            activeBorderColor: '#F0AFCD',
            activeShadow: '0 0 0 3px rgba(240, 175, 205, 0.1)',
            hoverBorderColor: '#F0AFCD',
        },

        // Select - Выпадающие списки
        Select: {
            borderRadius: 8,
            colorBorder: '#e5e5e5',
            colorBorderHover: '#F0AFCD',
            activeBorderColor: '#F0AFCD',
            optionSelectedBg: '#F0AFCD10',
            optionActiveBg: '#F0AFCD08',
        },

        // DatePicker - Выбор даты
        DatePicker: {
            borderRadius: 8,
            colorBorder: '#e5e5e5',
            colorBorderHover: '#F0AFCD',
            activeBorderColor: '#F0AFCD',
            cellActiveWithRangeBg: '#F0AFCD20',
            cellHoverWithRangeBg: '#F0AFCD10',
        },

        // Menu - Меню
        Menu: {
            itemSelectedBg: '#F0AFCD10',
            itemSelectedColor: '#5E4297',
            itemHoverBg: '#F0AFCD08',
            itemHoverColor: '#5E4297',
            itemColor: '#525252',
        },

        // Typography - Типографика
        Typography: {
            titleMarginBottom: '0.5em',
            titleMarginTop: '1.2em',
        },

        // Form - Формы
        Form: {
            labelColor: '#525252',
            labelFontSize: 14,
            labelRequiredMarkColor: '#F0AFCD',
            itemMarginBottom: 20,
        },

        // Alert - Уведомления
        Alert: {
            borderRadius: 8,
            colorInfo: '#5E4297',
            colorInfoBg: '#5E429710',
            colorInfoBorder: '#5E429730',
        },

        // Badge - Бейджи
        Badge: {
            colorPrimary: '#F0AFCD',
            borderRadius: 6,
        },

        // Drawer - Боковая панель
        Drawer: {
            colorBgElevated: '#ffffff',
            colorText: '#525252',
            colorTextHeading: '#525252',
        },

        // Modal - Модальные окна
        Modal: {
            borderRadius: 16,
            colorText: '#525252',
            colorTextHeading: '#525252',
        },

        // Table - Таблицы
        Table: {
            headerBg: '#F0AFCD08',
            headerColor: '#525252',
            borderColor: '#F0AFCD20',
            rowHoverBg: '#F0AFCD05',
        },

        // Tabs - Вкладки
        Tabs: {
            colorPrimary: '#F0AFCD',
            itemSelectedColor: '#F0AFCD',
            itemHoverColor: '#5E4297',
            itemColor: '#525252',
            inkBarColor: '#F0AFCD',
        },

        // Progress - Прогресс-бары
        Progress: {
            colorInfo: '#F0AFCD',
            remainingColor: '#F0AFCD20',
        },

        // Slider - Слайдеры
        Slider: {
            colorPrimary: '#F0AFCD',
            colorPrimaryBorder: '#F0AFCD',
            handleColor: '#F0AFCD',
            trackBg: '#F0AFCD',
            railBg: '#F0AFCD30',
        },

        // Switch - Переключатели
        Switch: {
            colorPrimary: '#F0AFCD',
            colorPrimaryHover: '#E396B8',
        },

        // Radio - Радио кнопки
        Radio: {
            colorPrimary: '#F0AFCD',
            dotColor: '#ffffff',
        },

        // Checkbox - Чекбоксы
        Checkbox: {
            colorPrimary: '#F0AFCD',
            colorPrimaryHover: '#E396B8',
        },

        // Rate - Рейтинг
        Rate: {
            colorFillContent: '#F0AFCD',
        },

        // Steps - Шаги
        Steps: {
            colorPrimary: '#F0AFCD',
            colorFillContent: '#F0AFCD',
        },

        // Spin - Загрузка
        Spin: {
            colorPrimary: '#F0AFCD',
        },

        // Tag - Теги
        Tag: {
            colorFillSecondary: '#F0AFCD10',
            colorText: '#5E4297',
            colorBorder: '#F0AFCD30',
        },

        // Timeline - Временная шкала
        Timeline: {
            dotColor: '#F0AFCD',
            tailColor: '#F0AFCD30',
        },

        // Divider - Разделители
        Divider: {
            colorSplit: '#F0AFCD30',
            colorText: '#525252',
        },
    },

    algorithm: theme.defaultAlgorithm,
};

export default customTheme;

// Дополнительные CSS переменные для кастомизации
export const cssVariables = `
:root {
  --primary-color: #F0AFCD;
  --secondary-color: #5E4297;
  --text-color: #525252;
  --text-secondary: #737373;
  --border-color: #F0AFCD33;
  --bg-light: #F0AFCD0A;
  --shadow-primary: 0 2px 8px rgba(240, 175, 205, 0.15);
  --shadow-secondary: 0 4px 16px rgba(240, 175, 205, 0.1);
  --gradient-primary: linear-gradient(135deg, #F0AFCD 0%, #5E4297 100%);
  --gradient-light: linear-gradient(135deg, #F0AFCD10 0%, #5E429710 100%);
}

/* Дополнительные утилитарные классы */
.text-primary { color: var(--primary-color) !important; }
.text-secondary { color: var(--secondary-color) !important; }
.bg-primary { background-color: var(--primary-color) !important; }
.bg-secondary { background-color: var(--secondary-color) !important; }
.bg-gradient-primary { background: var(--gradient-primary) !important; }
.border-primary { border-color: var(--primary-color) !important; }
.shadow-primary { box-shadow: var(--shadow-primary) !important; }
.shadow-secondary { box-shadow: var(--shadow-secondary) !important; }

/* Анимации и переходы */
.transition-all { transition: all 0.3s ease !important; }
.hover-lift:hover { transform: translateY(-2px) !important; }
.hover-scale:hover { transform: scale(1.05) !important; }

// /* Кастомные стили для компонентов */
// .ant-btn-primary {
//   background: #4A2C7A;
//   border: none;
//   box-shadow: var(--shadow-primary);
//   transition: all 0.5s ease;
// }

// .ant-btn-primary:hover {
//   background:  #5E4297;
//   box-shadow: var(--shadow-secondary);
//   transform: translateY(-1px);
// }

.ant-card {
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.ant-card:hover {
  box-shadow: var(--shadow-secondary);
  transform: translateY(-2px);
}
`;