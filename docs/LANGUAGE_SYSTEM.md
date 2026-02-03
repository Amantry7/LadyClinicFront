# Система мультиязычности LadyClinic

## Обзор

Проект поддерживает два языка:
- **Русский (ru)** - язык по умолчанию
- **Кыргызский (ky)**

## Архитектура

### 1. API Endpoints

- `GET /api/v1/languages/` - получить список доступных языков
- `GET /api/v1/language/current/` - получить текущий язык запроса

### 2. Компоненты системы

#### LanguageContext (`shared/contexts/LanguageContext.tsx`)
Глобальный контекст для управления языком приложения:
- Хранит текущий язык в `localStorage`
- Предоставляет функцию `changeLanguage()` для смены языка
- Автоматически перезагружает страницу при смене языка

#### Axios Interceptor (`shared/api/base.ts`)
Автоматически добавляет заголовок `Accept-Language` ко всем API запросам:
```typescript
config.headers["Accept-Language"] = language; // 'ru' или 'ky'
```

#### API Functions (`shared/api/languages.ts`)
Функции для работы с языковыми эндпоинтами:
- `getLanguages()` - получить список языков
- `getCurrentLanguage()` - получить текущий язык

#### Hooks
- `useLanguage()` - основной хук для работы с языком в компонентах
- `useLanguages()` - хук для загрузки списка доступных языков

## Использование

### В компонентах

```tsx
import { useLanguage } from '@/shared/contexts/LanguageContext'

const MyComponent = () => {
  const { currentLanguage, changeLanguage } = useLanguage()
  
  return (
    <div>
      <p>Текущий язык: {currentLanguage}</p>
      <button onClick={() => changeLanguage('ky')}>
        Переключить на кыргызский
      </button>
    </div>
  )
}
```

### Получение списка языков

```tsx
import { useLanguages } from '@/shared/hooks/useLanguages'

const LanguageSelector = () => {
  const { languages, isLoading, error } = useLanguages()
  
  if (isLoading) return <div>Загрузка...</div>
  if (error) return <div>Ошибка: {error}</div>
  
  return (
    <select>
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  )
}
```

## Переключатель языка в навигации

Переключатель языка интегрирован в компонент `Nav`:
- Десктоп версия: `Segmented` компонент из Ant Design
- Мобильная версия: кнопки в боковом меню

Формат отображения:
- `ru` → `RU`
- `ky` → `KG`

## Хранение данных

Текущий язык сохраняется в `localStorage` с ключом `ladyclinic_language`.

## Поток данных

1. Пользователь выбирает язык в UI
2. `changeLanguage()` сохраняет выбор в `localStorage`
3. Страница перезагружается
4. Axios interceptor читает язык из `localStorage`
5. Все API запросы отправляются с заголовком `Accept-Language`
6. Сервер возвращает данные на выбранном языке

## Типы данных

```typescript
interface Language {
  code: string      // 'ru' или 'ky'
  name: string      // 'Русский' или 'Кыргызча'
}

interface LanguagesResponse {
  languages: Language[]
  default_language: string
}

interface CurrentLanguageResponse {
  language: string
}
```

## Примечания

- При смене языка происходит полная перезагрузка страницы для обновления всех данных
- Если язык не выбран, используется русский по умолчанию
- Все API запросы автоматически включают заголовок `Accept-Language`
