import type { Job } from "./job"

export interface ApiKey {
  id: string
  companyId: string
  key: string
  name: string
  createdAt: Date
  lastUsed?: Date
  isActive: boolean
  permissions: {
    read: boolean
    write: boolean
    delete: boolean
  }
}

export interface ApiJob {
  id: string
  externalId: string
  title: string
  description: string
  type: Job["type"]
  level: Job["level"]
  location: string
  salary: Job["salary"]
  skills: string[]
  requirements: string[]
  benefits: string[]
  status: "active" | "draft" | "closed"
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date
  metadata?: Record<string, unknown>
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: unknown
  }
}

export interface ApiWebhook {
  id: string
  companyId: string
  url: string
  events: string[]
  secret?: string
  isActive: boolean
  createdAt: Date
  lastTriggered?: Date
}

export interface ApiRateLimit {
  requestsPerMinute: number
  requestsPerHour: number
  requestsPerDay: number
  currentUsage: {
    minute: number
    hour: number
    day: number
  }
} 