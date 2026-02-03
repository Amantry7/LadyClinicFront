import { api } from './base'
import { PaginationResponse, ServicePriceCard } from '../types/api'

export const servicesApi = {
  // Получить все прайс-карты услуг
  getServicePriceCards: async (): Promise<PaginationResponse<ServicePriceCard>> => {
    const response = await api.get('/cms/service_price_card/')
    return response.data
  },

  // Получить прайс-карту по ID
  getServicePriceCardById: async (id: string): Promise<ServicePriceCard> => {
    const response = await api.get(`/cms/service_price_card/${id}/`)
    return response.data
  }
}
