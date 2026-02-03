import { useState, useEffect } from 'react'
import { servicesApi } from '../api/services'
import { ServicePriceCard } from '../types/api'

interface UseServicePriceCardsReturn {
  services: ServicePriceCard[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export const useServicePriceCards = (): UseServicePriceCardsReturn => {
  const [services, setServices] = useState<ServicePriceCard[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await servicesApi.getServicePriceCards()
      setServices(response.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке услуг')
      console.error('Error fetching service price cards:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  return {
    services,
    loading,
    error,
    refetch: fetchServices
  }
}
