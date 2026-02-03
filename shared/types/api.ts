// Generic pagination response
export interface PaginationResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// Definitions from Swagger
export interface BirthPackageBenefits {
  id: string // uuid
  title: string
}

export interface BirthPackage {
  id: string // uuid
  title: string
  description: string
  price: number
  birth_package_benefits: BirthPackageBenefits[]
}

export interface BrancheBenefits {
  id: string // uuid
  branch: string // uuid
  title: string
  created: string // date-time
}

export interface Branche {
  id: string // uuid
  title: string
  specialization?: string | null
  description?: string | null
  founded?: string | null
  color?: string | null
  branche_benefits: BrancheBenefits[]
  address?: string | null
  phone_1?: string | null
  phone_2?: string | null
  phone_3?: string | null
  email?: string | null
  whats_app?: string | null
  work_hours?: string | null
}

export interface CertificationAndLicenses {
  id: string // uuid
  title: string
  description?: string | null
  number?: string | null
  validity_period?: string | null // date
  image?: string | null // uri
  icon?: string | null
  is_active?: boolean | null
  created: string // date-time
}

export interface ChambersBenefits {
  id: string // uuid
  title: string
}

export interface Chambers {
  id: string // uuid
  title: string
  image: string // uri
  chamber_benefits: ChambersBenefits[]
}

export interface Doctor {
  id: string // uuid
  first_name: string
  last_name?: string | null
  image?: string | null // uri
  position?: string | null
  experience?: string | null
  price?: string | null
  tags?: string | null
}

export interface Gallery {
  id: string // uuid
  title?: string | null
  image?: string | null // uri
  created: string // date-time
}

export interface OurBenefits {
  id: string // uuid
  title: string
  description?: string | null
  icon: string // uri
  created: string // date-time
}

export interface Review {
  id: string // uuid
  full_name: string
  message: string
  star: number
  date: string // date
  image?: string | null // uri
  created: string // date-time
}

export interface Service {
  id: string // uuid
  title: string
  description: string
  parent?: string | null // uuid
  image: string // uri
  subservices: string // This seems to be a string, but might be an array of Service IDs or objects in a real scenario. Keeping as per Swagger.
}

export interface WeInNumber {
  id: string // uuid
  title: string
  description?: string | null
  icon: string // uri
  created: string // date-time
}

export type UserRole = "patient" | "doctor" | "admin" | "lab_tech" | "registrar"
export type UserGender = "M" | "F"
export type LoyaltyLevel = "basic" | "silver" | "gold"

export interface ServicePriceCard {
  id: string // uuid
  title: string
  badge?: string | null
  price: number
  items: string // HTML content with list items
  note?: string | null
  priority: number
  created: string // date-time
}

export interface User {
  id: number
  username: string
  first_name?: string
  last_name?: string
  phone?: string | null
  role?: UserRole
  is_phone_verified?: boolean
  last_otp_sent?: string | null // date-time
  patient_uid?: string // uuid
  middle_name?: string
  birth_date?: string | null // date
  gender?: UserGender
  card_guid_reproduction?: string | null
  card_guid_lady_clinic?: string | null
  loyalty_level?: LoyaltyLevel
  loyalty_points?: string // decimal
  referral_code?: string
  referred_by?: number | null
  referral_count?: number
  specialty?: string
  schedule?: Record<string, any> | null // object
  badge_id?: string | null
  family_access?: number[]
}

// Language types
export interface Language {
  code: string
  name: string
}

export interface LanguagesResponse {
  languages: Language[]
  default_language: string
}

export interface CurrentLanguageResponse {
  language: string
}
