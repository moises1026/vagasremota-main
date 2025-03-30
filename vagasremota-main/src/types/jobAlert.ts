import type { JobType, JobLevel } from "./job"

export interface JobAlertFilters {
  types?: JobType[]
  levels?: JobLevel[]
  skills?: string[]
  salary?: {
    min: number
    max: number
  }
  location?: string
  remote?: boolean
  hybrid?: boolean
  onsite?: boolean
  keywords?: string[]
}

export interface JobAlert {
  id: string
  userId: string
  name: string
  filters: JobAlertFilters
  emailNotifications: boolean
  pushNotifications: boolean
  frequency: "daily" | "weekly" | "realtime"
  createdAt: Date
  updatedAt: Date
  lastNotification?: Date
  isActive: boolean
} 