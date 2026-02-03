import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { cmsApi } from "../api/cms-api"
import type {
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
  PaginationResponse,
} from "@/shared/types/api"

interface CmsState {
  birthPackages: {
    data: BirthPackage[]
    loading: boolean
    error: string | null
    count: number
  }
  branches: {
    data: Branche[]
    loading: boolean
    error: string | null
    count: number
  }
  certificationsAndLicenses: {
    data: CertificationAndLicenses[]
    loading: boolean
    error: string | null
    count: number
  }
  chambers: {
    data: Chambers[]
    loading: boolean
    error: string | null
    count: number
  }
  doctors: {
    data: Doctor[]
    loading: boolean
    error: string | null
    count: number
  }
  galleryItems: {
    data: Gallery[]
    loading: boolean
    error: string | null
    count: number
  }
  ourBenefits: {
    data: OurBenefits[]
    loading: boolean
    error: string | null
    count: number
  }
  reviews: {
    data: Review[]
    loading: boolean
    error: string | null
    count: number
  }
  services: {
    data: Service[]
    loading: boolean
    error: string | null
    count: number
  }
  weInNumbers: {
    data: WeInNumber[]
    loading: boolean
    error: string | null
    count: number
  }
}

const initialState: CmsState = {
  birthPackages: { data: [], loading: false, error: null, count: 0 },
  branches: { data: [], loading: false, error: null, count: 0 },
  certificationsAndLicenses: { data: [], loading: false, error: null, count: 0 },
  chambers: { data: [], loading: false, error: null, count: 0 },
  doctors: { data: [], loading: false, error: null, count: 0 },
  galleryItems: { data: [], loading: false, error: null, count: 0 },
  ourBenefits: { data: [], loading: false, error: null, count: 0 },
  reviews: { data: [], loading: false, error: null, count: 0 },
  services: { data: [], loading: false, error: null, count: 0 },
  weInNumbers: { data: [], loading: false, error: null, count: 0 },
}

// Async Thunks for each CMS entity
export const fetchCmsBirthPackages = createAsyncThunk(
  "cms/fetchBirthPackages",
  async ({ limit, offset }: { limit?: number; offset?: number } = {}) => {
    const response = await cmsApi.getBirthPackages(limit, offset)
    return response
  },
)

export const fetchCmsBranches = createAsyncThunk(
  "cms/fetchBranches",
  async ({ limit, offset }: { limit?: number; offset?: number } = {}) => {
    const response = await cmsApi.getBranches(limit, offset)
    return response
  },
)

export const fetchCmsCertificationsAndLicenses = createAsyncThunk(
  "cms/fetchCertificationsAndLicenses",
  async ({ limit, offset }: { limit?: number; offset?: number } = {}) => {
    const response = await cmsApi.getCertificationsAndLicenses(limit, offset)
    return response
  },
)

export const fetchCmsChambers = createAsyncThunk(
  "cms/fetchChambers",
  async ({ limit, offset }: { limit?: number; offset?: number } = {}) => {
    const response = await cmsApi.getChambers(limit, offset)
    return response
  },
)

export const fetchCmsDoctors = createAsyncThunk(
  "cms/fetchDoctors",
  async ({ limit, offset }: { limit?: number; offset?: number } = {}) => {
    const response = await cmsApi.getDoctors(limit, offset)
    return response
  },
)

export const fetchCmsGalleryItems = createAsyncThunk(
  "cms/fetchGalleryItems",
  async ({ limit, offset }: { limit?: number; offset?: number } = {}) => {
    const response = await cmsApi.getGalleryItems(limit, offset)
    return response
  },
)

export const fetchCmsOurBenefits = createAsyncThunk(
  "cms/fetchOurBenefits",
  async ({ limit, offset }: { limit?: number; offset?: number } = {}) => {
    const response = await cmsApi.getOurBenefits(limit, offset)
    return response
  },
)

export const fetchCmsReviews = createAsyncThunk(
  "cms/fetchReviews",
  async ({ limit, offset }: { limit?: number; offset?: number } = {}) => {
    const response = await cmsApi.getReviews(limit, offset)
    return response
  },
)

export const fetchCmsServices = createAsyncThunk(
  "cms/fetchServices",
  async ({ limit, offset }: { limit?: number; offset?: number } = {}) => {
    const response = await cmsApi.getServices(limit, offset)
    return response
  },
)

export const fetchCmsWeInNumbers = createAsyncThunk(
  "cms/fetchWeInNumbers",
  async ({ limit, offset }: { limit?: number; offset?: number } = {}) => {
    const response = await cmsApi.getWeInNumbers(limit, offset)
    return response
  },
)

const cmsSlice = createSlice({
  name: "cms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Birth Packages
      .addCase(fetchCmsBirthPackages.pending, (state) => {
        state.birthPackages.loading = true
        state.birthPackages.error = null
      })
      .addCase(fetchCmsBirthPackages.fulfilled, (state, action: PayloadAction<PaginationResponse<BirthPackage>>) => {
        state.birthPackages.loading = false
        state.birthPackages.data = action.payload.results
        state.birthPackages.count = action.payload.count
      })
      .addCase(fetchCmsBirthPackages.rejected, (state, action) => {
        state.birthPackages.loading = false
        state.birthPackages.error = action.error.message || "Failed to fetch birth packages"
      })
      // Branches
      .addCase(fetchCmsBranches.pending, (state) => {
        state.branches.loading = true
        state.branches.error = null
      })
      .addCase(fetchCmsBranches.fulfilled, (state, action: PayloadAction<PaginationResponse<Branche>>) => {
        state.branches.loading = false
        state.branches.data = action.payload.results
        state.branches.count = action.payload.count
      })
      .addCase(fetchCmsBranches.rejected, (state, action) => {
        state.branches.loading = false
        state.branches.error = action.error.message || "Failed to fetch branches"
      })
      // Certifications and Licenses
      .addCase(fetchCmsCertificationsAndLicenses.pending, (state) => {
        state.certificationsAndLicenses.loading = true
        state.certificationsAndLicenses.error = null
      })
      .addCase(
        fetchCmsCertificationsAndLicenses.fulfilled,
        (state, action: PayloadAction<PaginationResponse<CertificationAndLicenses>>) => {
          state.certificationsAndLicenses.loading = false
          state.certificationsAndLicenses.data = action.payload.results
          state.certificationsAndLicenses.count = action.payload.count
        },
      )
      .addCase(fetchCmsCertificationsAndLicenses.rejected, (state, action) => {
        state.certificationsAndLicenses.loading = false
        state.certificationsAndLicenses.error = action.error.message || "Failed to fetch certifications and licenses"
      })
      // Chambers
      .addCase(fetchCmsChambers.pending, (state) => {
        state.chambers.loading = true
        state.chambers.error = null
      })
      .addCase(fetchCmsChambers.fulfilled, (state, action: PayloadAction<PaginationResponse<Chambers>>) => {
        state.chambers.loading = false
        state.chambers.data = action.payload.results
        state.chambers.count = action.payload.count
      })
      .addCase(fetchCmsChambers.rejected, (state, action) => {
        state.chambers.loading = false
        state.chambers.error = action.error.message || "Failed to fetch chambers"
      })
      // Doctors
      .addCase(fetchCmsDoctors.pending, (state) => {
        state.doctors.loading = true
        state.doctors.error = null
      })
      .addCase(fetchCmsDoctors.fulfilled, (state, action: PayloadAction<PaginationResponse<Doctor>>) => {
        state.doctors.loading = false
        state.doctors.data = action.payload.results
        state.doctors.count = action.payload.count
      })
      .addCase(fetchCmsDoctors.rejected, (state, action) => {
        state.doctors.loading = false
        state.doctors.error = action.error.message || "Failed to fetch doctors"
      })
      // Gallery Items
      .addCase(fetchCmsGalleryItems.pending, (state) => {
        state.galleryItems.loading = true
        state.galleryItems.error = null
      })
      .addCase(fetchCmsGalleryItems.fulfilled, (state, action: PayloadAction<PaginationResponse<Gallery>>) => {
        state.galleryItems.loading = false
        state.galleryItems.data = action.payload.results
        state.galleryItems.count = action.payload.count
      })
      .addCase(fetchCmsGalleryItems.rejected, (state, action) => {
        state.galleryItems.loading = false
        state.galleryItems.error = action.error.message || "Failed to fetch gallery items"
      })
      // Our Benefits
      .addCase(fetchCmsOurBenefits.pending, (state) => {
        state.ourBenefits.loading = true
        state.ourBenefits.error = null
      })
      .addCase(fetchCmsOurBenefits.fulfilled, (state, action: PayloadAction<PaginationResponse<OurBenefits>>) => {
        state.ourBenefits.loading = false
        state.ourBenefits.data = action.payload.results
        state.ourBenefits.count = action.payload.count
      })
      .addCase(fetchCmsOurBenefits.rejected, (state, action) => {
        state.ourBenefits.loading = false
        state.ourBenefits.error = action.error.message || "Failed to fetch our benefits"
      })
      // Reviews
      .addCase(fetchCmsReviews.pending, (state) => {
        state.reviews.loading = true
        state.reviews.error = null
      })
      .addCase(fetchCmsReviews.fulfilled, (state, action: PayloadAction<PaginationResponse<Review>>) => {
        state.reviews.loading = false
        state.reviews.data = action.payload.results
        state.reviews.count = action.payload.count
      })
      .addCase(fetchCmsReviews.rejected, (state, action) => {
        state.reviews.loading = false
        state.reviews.error = action.error.message || "Failed to fetch reviews"
      })
      // Services
      .addCase(fetchCmsServices.pending, (state) => {
        state.services.loading = true
        state.services.error = null
      })
      .addCase(fetchCmsServices.fulfilled, (state, action: PayloadAction<PaginationResponse<Service>>) => {
        state.services.loading = false
        state.services.data = action.payload.results
        state.services.count = action.payload.count
      })
      .addCase(fetchCmsServices.rejected, (state, action) => {
        state.services.loading = false
        state.services.error = action.error.message || "Failed to fetch services"
      })
      // We In Numbers
      .addCase(fetchCmsWeInNumbers.pending, (state) => {
        state.weInNumbers.loading = true
        state.weInNumbers.error = null
      })
      .addCase(fetchCmsWeInNumbers.fulfilled, (state, action: PayloadAction<PaginationResponse<WeInNumber>>) => {
        state.weInNumbers.loading = false
        state.weInNumbers.data = action.payload.results
        state.weInNumbers.count = action.payload.count
      })
      .addCase(fetchCmsWeInNumbers.rejected, (state, action) => {
        state.weInNumbers.loading = false
        state.weInNumbers.error = action.error.message || "Failed to fetch 'We In Number' items"
      })
  },
})

export default cmsSlice.reducer
