import { api } from './base'
import { LanguagesResponse, CurrentLanguageResponse } from '../types/api'

export const languagesApi = {
  // Получить список всех доступных языков
  getLanguages: async (): Promise<LanguagesResponse> => {
    const response = await api.get('/languages/')
    return response.data
  },

  // Получить текущий язык
  getCurrentLanguage: async (): Promise<CurrentLanguageResponse> => {
    const response = await api.get('/language/current/')
    return response.data
  }
}
