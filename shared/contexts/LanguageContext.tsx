'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language } from '../types/api'

interface LanguageContextType {
  currentLanguage: string
  availableLanguages: Language[]
  changeLanguage: (lang: string) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = 'ladyclinic_language'

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('ru')
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([
    { code: 'ru', name: 'Русский' },
    { code: 'ky', name: 'Кыргызча' }
  ])
  const [isLoading, setIsLoading] = useState(false)

  // Загрузка языка из localStorage при инициализации
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage)
      }
    }
  }, [])

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    }
    // Перезагружаем страницу для применения нового языка ко всем компонентам
    window.location.reload()
  }

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        availableLanguages,
        changeLanguage,
        isLoading
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
