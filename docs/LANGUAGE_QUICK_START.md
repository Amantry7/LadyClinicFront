# Быстрый старт: Мультиязычность

## Что уже работает

✅ Переключатель языка в навигации (десктоп и мобильная версия)
✅ Автоматическая отправка заголовка `Accept-Language` во всех API запросах
✅ Сохранение выбранного языка в localStorage
✅ Поддержка русского (ru) и кыргызского (ky) языков

## Как использовать в новых компонентах

### Простой пример

```tsx
'use client'
import { useLanguage } from '@/shared/contexts/LanguageContext'

export default function MyPage() {
  const { currentLanguage } = useLanguage()
  
  return (
    <div>
      <h1>
        {currentLanguage === 'ru' ? 'Добро пожаловать' : 'Кош келиңиз'}
      </h1>
    </div>
  )
}
```

### Пример с API данными

Все API запросы автоматически получают правильный язык:

```tsx
'use client'
import { useEffect, useState } from 'react'
import { servicesApi } from '@/shared/api/services'

export default function ServicesPage() {
  const [services, setServices] = useState([])
  
  useEffect(() => {
    // API автоматически получит заголовок Accept-Language
    servicesApi.getServicePriceCards().then(data => {
      setServices(data.results)
    })
  }, [])
  
  return (
    <div>
      {services.map(service => (
        <div key={service.id}>
          <h2>{service.title}</h2> {/* Уже на правильном языке! */}
        </div>
      ))}
    </div>
  )
}
```

## Тестирование

1. Откройте приложение
2. Переключите язык в навигации (RU ↔ KG)
3. Страница перезагрузится
4. Все данные с API будут на выбранном языке

## Проверка в DevTools

Откройте Network tab и проверьте заголовки запросов:
```
Accept-Language: ru  // или ky
```

## Важно

- Не нужно вручную добавлять заголовки к API запросам
- Не нужно проверять язык перед каждым запросом
- Все работает автоматически через axios interceptor
