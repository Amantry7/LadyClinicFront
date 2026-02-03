import { useState, useEffect } from 'react'
import { languagesApi } from '../api/languages'
import { Language, LanguagesResponse } from '../types/api'

export const useLanguages = () => {
  const [languages, setLanguages] = useState<Language[]>([])
  const [defaultLanguage, setDefaultLanguage] = useState<string>('ru')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLanguages = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data: LanguagesResponse = await languagesApi.getLanguages()
        setLanguages(data.languages)
        setDefaultLanguage(data.default_language)
      } catch (err) {
        setError('Не удалось загрузить список языков')
        console.error('Error fetching languages:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLanguages()
  }, [])

  return {
    languages,
    defaultLanguage,
    isLoading,
    error
  }
}
