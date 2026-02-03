import { api } from "@/shared/api/base"
import type {
  PaginationResponse,
  BirthPackage,
  Branche,
  CertificationAndLicenses,
  Chambers,
  Doctor,
  Gallery,
  OurBenefits,
  Review,
  Service,
  WeInNumber,
} from "@/shared/types/api"

export const cmsApi = {
  getBirthPackages: async (limit?: number, offset?: number) => {
    const params = { limit, offset }
    const response = await api.get<PaginationResponse<BirthPackage>>("/cms/birth_package/", { params })
    return response.data
  },
  getBranches: async (limit?: number, offset?: number) => {
    const params = { limit, offset }
    const response = await api.get<PaginationResponse<Branche>>("https://api.ladyclinic.kg/api/v1/cms/branche/", { params })
    return response.data
  },
  getCertificationsAndLicenses: async (limit?: number, offset?: number) => {
    const params = { limit, offset }
    const response = await api.get<PaginationResponse<CertificationAndLicenses>>("/cms/certification_and_licenses/", {
      params,
    })
    return response.data
  },
  getChambers: async (limit?: number, offset?: number) => {
    const params = { limit, offset }
    const response = await api.get<PaginationResponse<Chambers>>("/cms/chamber/", { params })
    return response.data
  },
  getDoctors: async (limit?: number, offset?: number) => {
    const params = { limit, offset }
    const response = await api.get<PaginationResponse<Doctor>>("/cms/doctor/", { params })
    return response.data
  },
  getGalleryItems: async (limit?: number, offset?: number) => {
    const params = { limit, offset }
    const response = await api.get<PaginationResponse<Gallery>>("/cms/gallery/", { params })
    return response.data
  },
  getOurBenefits: async (limit?: number, offset?: number) => {
    const params = { limit, offset }
    const response = await api.get<PaginationResponse<OurBenefits>>("/cms/our_benefits/", { params })
    return response.data
  },
  getReviews: async (limit?: number, offset?: number) => {
    const params = { limit, offset }
    const response = await api.get<PaginationResponse<Review>>("/cms/review/", { params })
    return response.data
  },
  getServices: async (limit?: number, offset?: number) => {
    const params = { limit, offset }
    const response = await api.get<PaginationResponse<Service>>("/cms/service/", { params })
    return response.data
  },
  getWeInNumbers: async (limit?: number, offset?: number) => {
    const params = { limit, offset }
    const response = await api.get<PaginationResponse<WeInNumber>>("/cms/we_in_number/", { params })
    return response.data
  },
}
