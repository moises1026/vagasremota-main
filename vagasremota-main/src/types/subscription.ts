export type SubscriptionPlan = "free" | "basic" | "pro" | "enterprise"

export interface SubscriptionFeatures {
  jobPosts: number | "unlimited"
  highlightedJobs: boolean
  companyPage: boolean
  metrics: boolean
  videoInterviews: boolean
  candidateFeedback: boolean
  apiAccess: boolean
  dedicatedSupport: boolean
  customLayout: boolean
}

export interface SubscriptionPlanDetails {
  id: SubscriptionPlan
  name: string
  price: number
  features: SubscriptionFeatures
  description: string
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionPlan, SubscriptionPlanDetails> = {
  free: {
    id: "free",
    name: "Vagas Básicas",
    price: 0,
    description: "Ideal para pequenas empresas ou startups testarem a plataforma",
    features: {
      jobPosts: 1,
      highlightedJobs: false,
      companyPage: false,
      metrics: false,
      videoInterviews: false,
      candidateFeedback: false,
      apiAccess: false,
      dedicatedSupport: false,
      customLayout: false,
    },
  },
  basic: {
    id: "basic",
    name: "Vagas Essentials",
    price: 49,
    description: "Ideal para pequenas empresas que desejam mais visibilidade",
    features: {
      jobPosts: 5,
      highlightedJobs: true,
      companyPage: true,
      metrics: true,
      videoInterviews: false,
      candidateFeedback: false,
      apiAccess: false,
      dedicatedSupport: false,
      customLayout: false,
    },
  },
  pro: {
    id: "pro",
    name: "Vagas Pro",
    price: 99,
    description: "Ideal para empresas de médio porte que buscam otimizar o recrutamento",
    features: {
      jobPosts: 15,
      highlightedJobs: true,
      companyPage: true,
      metrics: true,
      videoInterviews: true,
      candidateFeedback: true,
      apiAccess: true,
      dedicatedSupport: false,
      customLayout: false,
    },
  },
  enterprise: {
    id: "enterprise",
    name: "Empreendimento Vagas",
    price: 199,
    description: "Solução completa para grandes empresas com alto volume de recrutamento",
    features: {
      jobPosts: "unlimited",
      highlightedJobs: true,
      companyPage: true,
      metrics: true,
      videoInterviews: true,
      candidateFeedback: true,
      apiAccess: true,
      dedicatedSupport: true,
      customLayout: true,
    },
  },
} 