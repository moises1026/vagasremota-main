import type { SubscriptionPlan } from "./subscription"

export interface CompanyMetrics {
  totalViews: number
  totalApplications: number
  conversionRate: number
  averageResponseTime: number
  candidateSatisfaction: number
  activeJobs: number
  totalJobs: number
  monthlyApplications: number
  monthlyViews: number
}

export interface CompanyProfile {
  id: string
  userId: string
  name: string
  logo?: string
  cover?: string
  description: string
  mission?: string
  vision?: string
  values?: string[]
  website?: string
  industry?: string
  size?: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+"
  foundedYear?: number
  location?: {
    address?: string
    city?: string
    state?: string
    country?: string
    remote?: boolean
    hybrid?: boolean
    onsite?: boolean
  }
  benefits?: {
    healthInsurance?: boolean
    dentalInsurance?: boolean
    visionInsurance?: boolean
    lifeInsurance?: boolean
    disabilityInsurance?: boolean
    retirementPlan?: boolean
    paidTimeOff?: boolean
    maternityLeave?: boolean
    paternityLeave?: boolean
    flexibleHours?: boolean
    remoteWork?: boolean
    professionalDevelopment?: boolean
    gymMembership?: boolean
    other?: string[]
  }
  culture?: {
    workStyle?: string
    teamStructure?: string
    communicationStyle?: string
    workLifeBalance?: string
  }
  socialMedia?: {
    linkedin?: string
    instagram?: string
    facebook?: string
    twitter?: string
    youtube?: string
  }
  subscription: {
    plan: SubscriptionPlan
    startDate: Date
    endDate: Date
    autoRenew: boolean
    status: "active" | "cancelled" | "expired"
  }
  metrics: CompanyMetrics
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  isActive: boolean
}

export interface CompanyReview {
  id: string
  companyId: string
  candidateId: string
  rating: number
  pros: string[]
  cons: string[]
  comment: string
  processRating: number
  communicationRating: number
  feedbackRating: number
  transparencyRating: number
  createdAt: Date
  isVerified: boolean
  isAnonymous: boolean
} 